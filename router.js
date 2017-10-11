const LeaveRequestController =  require('./modules/leave-request/controller');
const leaveRequestController = new LeaveRequestController();

const HolidayAgreementController = require('./modules/holiday-agreement/controller');
const holidayAgreementController = new HolidayAgreementController();

class Router {
     makeRoutes(server) {
         server.get('leave-requests', leaveRequestController.actionGetListOfLeaveRequest);
         server.get('leave-requests/:id', leaveRequestController.actionGetLeaveRequest);
         server.put('leave-requests/:id', leaveRequestController.actionUpdateLeaveRequest);
         server.post('leave-requests', leaveRequestController.actionAddLeaveRequest);

         server.get('holiday-agreements',
             holidayAgreementController.actionGetListOfHolidayAgreement);
         server.get('holiday-agreements/:id',
             holidayAgreementController.actionGetHolidayAgreement);
         server.put('holiday-agreements/:id',
             holidayAgreementController.actionUpdateHolidayAgreement);
         server.post('holiday-agreements',
             holidayAgreementController.actionAddHolidayAgreement);
    }
}

module.exports =  Router;