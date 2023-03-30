const controller = require('./controller');
const common_service = require('../../services/commonService');

module.exports = [
    {
        path: '/customers',
        method: 'post',
        config: {
            handler: controller.addcustomer,
            cors: common_service.corsSettings, 
        }
    }
]