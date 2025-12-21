import mongoose from 'mongoose';

const StudentAdmissionSchema = new mongoose.Schema({
    // Student Info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },

    // Academic Info
    classApplyingFor: { type: String, required: true },
    previousSchool: String,
    lastGradePercentage: String,

    // Parent Info
    fatherName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: String,
    address: String,

    // Meta
    status: {
        type: String,
        enum: ['New', 'Under Review', 'Accepted', 'Rejected'],
        default: 'New'
    }
}, { timestamps: true });

export default mongoose.models.StudentAdmission || mongoose.model('StudentAdmission', StudentAdmissionSchema);
