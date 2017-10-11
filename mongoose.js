const Bluebird = require("bluebird");
const mongoose = require('mongoose');

mongoose.Promise = Bluebird;
mongoose.connect('mongodb://localhost:27017/agilians');

require('./modules/leave-request/model');
require('./modules/holiday-agreement/model');