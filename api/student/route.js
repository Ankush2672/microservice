const controller = require('./controller');
const common_service = require('../../services/commonService');

module.exports = [
    {
        path: '/student',
        method: 'post',
        config: {
            handler: controller.addstudent,
            cors: common_service.corsSettings,

        }
    },
    {
        path: '/student/{student_id}',
        method: 'put',
        config: {
            handler: controller.updatestudent,
            cors: common_service.corsSettings,
        }
    },
    {
        path: '/student',
        method: 'get',
        config: {
            handler: controller.getstudent,
            cors: common_service.corsSettings,
        }
    },
    {
        path: '/student/{student_id}',
        method: 'get',
        config: {
            handler: controller.getstudentbyid,
            cors: common_service.corsSettings,
        }
    },
    {
        path: '/student/{student_id}',
        method: 'delete',
        config: {
            handler: controller.deletestudent,
            cors: common_service.corsSettings,
        }
    },

]