import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { z } from 'zod';

// Zod Validation Schema
const enquirySchema = z.object({
  name: z.string().min(2, "Name is too short").max(60, "Name is too long"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  message: z.string().min(5, "Message is too short").max(1000, "Message is too long"),
});

export async function POST(req) {
  try {
    const body = await req.json();

    // 1. Zod Validation
    const validation = enquirySchema.safeParse(body);
    if (!validation.success) {
      return Response.json(
        { success: false, message: 'Validation Error', errors: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = validation.data;

    // 2. Connect to MongoDB
    await dbConnect();

    // 3. Save to Database
    await Enquiry.create({ name, email, phone, message });

    // 4. Configure Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SCHOOL_EMAIL,
        pass: process.env.SCHOOL_EMAIL_PASSWORD,
      },
    });

    // 5. Send Notification Email to School Admin
    try {
      await transporter.sendMail({
        from: `"School Website" <${process.env.SCHOOL_EMAIL}>`,
        to: process.env.SCHOOL_EMAIL,
        subject: '📩 New School Enquiry Received',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #800000; border-bottom: 2px solid #C5A059; padding-bottom: 10px;">New Enquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; border-left: 5px solid #800000; padding: 15px; margin: 0;">
              ${message}
            </blockquote>
            <p style="font-size: 12px; color: #888; margin-top: 20px;">This enquiry was submitted via the official school website and saved to the database.</p>
          </div>
        `,
      });

      // 6. Send Auto-Reply Email to Parent (if email provided)
      if (email) {
        await transporter.sendMail({
          from: `"Ishwar International School" <${process.env.SCHOOL_EMAIL}>`,
          to: email,
          subject: 'Thank you for contacting Ishwar International School',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #800000;">Thank You for Reaching Out</h2>
              <p>Dear ${name},</p>
              <p>Thank you for your enquiry at <strong>Ishwar International School</strong>. We have received your details.</p>
              <p>Our admissions team will review your query and get back to you shortly.</p>
              <br/>
              <p style="font-weight: bold;">Regards,</p>
              <p>Admissions Team<br/>Ishwar International School</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #888;">For urgent queries, please call us at 9996390013, 9812531013.</p>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // We don't fail the request if email fails, because DB save was successful
    }

    return Response.json({ success: true, message: 'Enquiry submitted successfully!' });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ success: false, message: 'Failed to submit enquiry' }, { status: 500 });
  }
}
