const mongoose = require('mongoose');

const dayOfAbsenceLimitSchema = mongoose.Schema({
    typeOfAbsence: {
        type: String,
        required: true
    },
    maximumCount: {
        type: Number,
        required: true
    }
});

const holidayAgreementSchema =mongoose.Schema({
    id: {
        type: String,
        unique:true,
        isId: true
    },
    employeeId: {
        type: String,
        required: true
    },
    createdOn: [Number],
    createdBy: String,
    modifiedOn: [Number],
    modifiedBy: String,
    dayOfAbsenceLimits: [dayOfAbsenceLimitSchema],
    validFrom: {
        type: [Number],
        required:true
    },
    validUntil: {
        type: [Number],
        required:true
    },
    agreedOn: {
        type: [Number],
        required: true
    },
    agreedBy: {
        type: String,
        required: true
    }
});

const holidayAgreementModel = mongoose.model('HolidayAgreement',
    holidayAgreementSchema);