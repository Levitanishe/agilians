const Service =  require('./service');
const service = new Service();
const mongoose = require('mongoose');
const LeaveRequest = mongoose.model('LeaveRequest');
const lodash = require('lodash');

 class Controller {

     actionGetLeaveRequest(req, res) {
        const id = req.params.id;
         service.getLeaveRequestById(id).then(data => {
             res.json(200, dropEmptyArraysFromObject(data));
         });

    }

    actionGetListOfLeaveRequest(req, res) {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const fieldsString = req.query.fields||'';

        if (!Number.isInteger(page)||page < 1) {
            res.send(422, 'page is not valid');
            return;
        }
        if (!Number.isInteger(limit)||limit < 1) {
            res.send(422, 'limit is not valid');
            return;
        }

        service.getListOfLeaveRequests(page, limit, fieldsString)
            .then(data => {
                res.json(200, data);
            });
    }

    actionAddLeaveRequest(req, res) {
         const params = req.body;

         service.addLeaveRequest(params)
             .then(() => {
                res.json(201, params);
         });
    }

    actionUpdateLeaveRequest(req, res) {
        const id = req.params.id;
        const params = req.body;

        service.updateLeaveRequest(id, params)
            .then(() => {
                return service.getLeaveRequestById(id);
            })
            .then(data => {
                res.json(200, params);
            });
    }
}

module.exports = Controller;

function dropEmptyArraysFromObject(object) {
    return lodash.pickBy(object, val => {
        if (!lodash.isArray(val) || val.length != 0) return true;
        return false;
    });
}

