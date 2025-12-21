import mongoose from 'mongoose';

const AdmissionSchema = new mongoose.Schema({
    startDate: String,
    endDate: String,
    isOpen: Boolean,
});

export default mongoose.models.Admission || mongoose.model('Admission', AdmissionSchema);
