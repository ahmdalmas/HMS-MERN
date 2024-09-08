const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cms_id: {
        type: Number,
        required: true,
        unique: true
    },
    room_no: {
        type: Number,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    father_name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    hostel: {
        type: Schema.Types.ObjectId,
        ref: 'hostel'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

StudentSchema.pre('save', function (next) {
    if (this.dob) {
        const dateObj = new Date(this.dob);
        if (!isNaN(dateObj.getTime())) { // Check if it's a valid date
            const day = dateObj.getDate().toString().padStart(2, '0');
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
            const year = dateObj.getFullYear();
            this.dob = `${day}/${month}/${year}`;
        }
    }

    next();
});

module.exports = Student = mongoose.model('student', StudentSchema);