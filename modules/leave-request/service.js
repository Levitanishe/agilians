const mongoose = require('mongoose');
const LeaveRequest = mongoose.model('LeaveRequest');
const lodash = require('lodash');

class Service {

    addLeaveRequest(params) {
        const leaveRequest = new LeaveRequest(params);

        return leaveRequest.save();
    }

    getLeaveRequestById(id) {
        const query = LeaveRequest.findOne({id: id}).lean().select('-_id -__v');
        return query.exec();
    }

    getListOfLeaveRequests(page, limit, fieldsString) {
        const fieldsArray = fieldsString.split(', ');
        const fieldsArrayWithId  =lodash.union(fieldsArray, ['id', '-_id']);
        const validFieldString = fieldsArrayWithId.join(' ');
        const skipNumber =(page - 1)*limit;
        const query = LeaveRequest.find().skip(skipNumber).limit(limit).select(validFieldString);
        return query.exec();
    }

    updateLeaveRequest(id, params) {
       const query = LeaveRequest.where({id: id}).update(params);
       return query.exec();
    }



}

module.exports = Service;