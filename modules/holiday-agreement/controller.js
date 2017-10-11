const Service =  require('./service');
const service = new Service();
const mongoose = require('mongoose');
const HolidayAgreement = mongoose.model('HolidayAgreement');
const lodash = require('lodash');

class Controller {

    actionGetHolidayAgreement(req, res) {
        const id = req.params.id;
        service.getLeaveRequestById(id).then(data => {
            res.json(200, dropEmptyArraysFromObject(data));
        });
    }

    actionGetListOfHolidayAgreement(req, res) {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const fieldsString = req.query.fields || '';

        if (!Number.isInteger(page) || page < 1) {
            res.send(422, 'page is not valid');
            return;
        }
        if (!Number.isInteger(limit) || limit < 1) {
            res.send(422, 'limit is not valid');
            return;
        }

        service.getListOfHolidayAgreements(page, limit, fieldsString)
            .then(data => {
                res.json(200, data);
            });
    }

    actionAddHolidayAgreement(req, res) {
        const params = req.body;

        service.addHolidayAgreement(params)
            .then(() => {
                res.json(201, params);
            });
    }

    actionUpdateHolidayAgreement(req, res) {
        const id = req.params.id;
        const params = req.body;

        service.updateHolidayAgreement(id, params)
            .then(() => {
                return service.getHolidayAgreementById(id);
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