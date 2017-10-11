const mongoose = require('mongoose');

const dayOfAbsenceShema = mongoose.Schema({
    date: {
        type:[Number],
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const aprovalShema = mongoose.Schema({
    approvedBy: {
        type:String,
        required: true
    },
    approvedOn : {
        type:[Number],
        required: true
    },
    remarks: String,
    outcome : {
        type: String,
        required: true
    }
    });

const leaveRequestShema = mongoose.Schema({
    id : {
        type: String,
        unique:true,
        isId: true
    },
    createdOn: [Number],
    createdBy: String,
    modifiedOn: [Number],
    modifiedBy: String,
    submittedOn: {
        type: [Number],
        required: true
    },
    submittedBy: {
        type: String,
        required: true
    },
    attachments: [String],
    notes :String,
    status: {
        type: String,
        required: true
    },
    dayOfAbsences: [dayOfAbsenceShema],
    approvals: [aprovalShema]
});

const leaveRequestModel = mongoose.model('LeaveRequest',
                                        leaveRequestShema);




