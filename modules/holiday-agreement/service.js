const mongoose = require('mongoose');
const HolidayAgreement = mongoose.model('HolidayAgreement');
const lodash = require('lodash');

class Service {

    addHolidayAgreement(params) {
        const holidayAgreement = new HolidayAgreement(params);

        return holidayAgreement.save();
    }

    getHolidayAgreementById(id) {
        const query = HolidayAgreement.findOne({id: id}).lean().select('-_id -__v');
        return query.exec();
    }

    getListOfHolidayAgreements(page, limit, fieldsString) {
        const fieldsArray = fieldsString.split(', ');
        const fieldsArrayWithId  =lodash.union(fieldsArray, ['id', '-_id']);
        const validFieldString = fieldsArrayWithId.join(' ');
        const skipNumber =(page - 1)*limit;
        const query = HolidayAgreement.find().skip(skipNumber).limit(limit).select(validFieldString);
        return query.exec();
    }

    updateHolidayAgreement(id, params) {
        const query = HolidayAgreement.where({id: id}).update(params);
        return query.exec();
    }
}

module.exports = Service;