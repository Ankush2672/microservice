const dbconfig = require('../../config').dbConfig;
const common_service = require('../../services/commonService');

module.exports = {
    addstudent: async(req,h) =>{
        try{

        const students = req.getDb(dbconfig.DB).getModel('students');
        req.payload.created_date = Date.now();

        await students.create(req.payload)
        return h.response({message: "successfully created"}).code(200);
        }catch(error)
        {
            console.log("add student error: ",error);
            return h.response({error: "internal server error",reason: error}).code(500);
        }
    },
    updatestudent: async(req,h) =>{
        try{
        const student_id = req.params.student_id

        const students = req.getDb(dbconfig.DB).getModel('students');
        let update_payload = {
            name : req.payload.name,
            class: req.payload.class,
            department: req.payload.department,
        }

        await students.update(update_payload,{where: {id: student_id}})

        return h.response({message: "successfully updated"}).code(200);
    }catch(error)
    {
        console.log("update student error: ",error);
        return h.response({error: "internal server error",reason: error}).code(500);
    }

    },
    getstudent : async(req,h)=>{
        try{
        const student_id = req.params.student_id

        const students = req.getDb(dbconfig.DB).getModel('students');

        let student_details = await students.findOne({
            where: {
                id : student_id
            }
        });

        student_details = JSON.parse(JSON.stringify(student_details));

        return h.response(student_details).code(200);
    }catch(error){
        console.log("get student error: ",error);
        return h.response({error: "internal server error",reason: error}).code(500);
    }

    },
    deletestudent: async(req,h)=>{
        try{
        const student_id = req.params.student_id

        const students = req.getDb(dbconfig.DB).getModel('students');
        
        await students.destroy({where: {id : student_id}});

        return h.response({message: "successfully deleted"}).code(200);
        }catch(error)
        {
            console.log("get student error: ",error);
            return h.response({error: "internal server error",reason: error}).code(500);
        }
    }
}