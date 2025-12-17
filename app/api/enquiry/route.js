import nodemailer from 'nodemailer';
import connectDB from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function POST(req) {
    try {
        const { name, email, phone, message } = await req.json();

        // 1. Connect to Database
        await connectDB();

        // 2. Save to Database
        await Enquiry.create({ name, email, phone, message });

        // 3. Configure Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SCHOOL_EMAIL,
                pass: process.env.SCHOOL_EMAIL_PASSWORD,
            },
        });

        // 4. Send Notification Email to School Admin
        await transporter.sendMail({
            from: `"School Website" <${process.env.SCHOOL_EMAIL}>`,
            to: process.env.SCHOOL_EMAIL,
            subject: '📩 New School Enquiry Received',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #800000; border-bottom: 2px solid #C5A059; padding-bottom: 10px;">New Enquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; border-left: 5px solid #800000; padding: 15px; margin: 0;">
            ${message}
          </blockquote>
          <p style="font-size: 12px; color: #888; margin-top: 20px;">This enquiry was submitted via the official school website.</p>
        </div>
      `,
        });

        // 5. Send Auto-Reply Email to Parent
        await transporter.sendMail({
            from: `"Ishwar International School" <${process.env.SCHOOL_EMAIL}>`,
            to: email, // Send to the user who filled the form
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

        return Response.json({ success: true, message: 'Enquiry submitted successfully!' });
    } catch (error) {
        console.error('API Error:', error);
        return Response.json({ success: false, message: 'Failed to submit enquiry' }, { status: 500 });
    }
}
