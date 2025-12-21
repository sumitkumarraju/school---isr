const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/school';

const StudentAdmissionSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    classApplyingFor: { type: String, required: true },
    previousSchool: String,
    lastGradePercentage: String,
    fatherName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: String,
    address: String,
    status: { type: String, default: 'New' }
}, { timestamps: true });

const StudentAdmission = mongoose.models.StudentAdmission || mongoose.model('StudentAdmission', StudentAdmissionSchema);

async function testSubmission() {
    try {
        console.log('Connecting to MongoDB...', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        console.log('Creating test admission...');
        const newAdmission = await StudentAdmission.create({
            firstName: 'Test',
            lastName: 'Student',
            dob: '2015-01-01',
            gender: 'Male',
            classApplyingFor: 'Class 1',
            fatherName: 'Test Father',
            mobile: '1234567890',
            email: 'test@example.com',
            address: '123 Test St'
        });

        console.log('Admission created:', newAdmission);
        console.log('Test PASSED');
    } catch (error) {
        console.error('Test FAILED:', error);
    } finally {
        await mongoose.disconnect();
    }
}

testSubmission();
