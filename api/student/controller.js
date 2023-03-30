const dbconfig = require('../../config').dbConfig;
const common_service = require('../../services/commonService');

const url = "";

module.exports = {
    addstudent: async(req,h) =>{
        try{

            let access_token = req.headers.authorization;
            if(!access_token)
            {
                return h.response({message: "authorization header missisng"}).code(403);
            }

            let token_data = await common_service.jwt_verify_token(access_token);

            if(!token_data)
            {
                return h.response({message: "invalid crediantls"}).code(403);
            }

        const students = req.getDb(dbconfig.DB).getModel('students');
        const customers = req.getDb(dbconfig.DB).getModel('customers');

        let customer_details = await customers.findOne({where:{
            user_id : token_data.id
        }});


        if(!customer_details)
        {
            let token = await common_service.jwt_Sign_token({id : "myself"});
            let customer_data = await common_service.fetch_request("GET",token,url,null);
            if(customer_data.status === 200)
            {
                customer_data = customer_data.json();
                let create_payload = {
                    user_id : customer_data.id,
                    name : customer_data.name,
                    email: customer_data.email
                };
                customer_details =  await customers.create(create_payload);
                customer_details = JSON.parse(JSON.stringify(customer_details));
            }else
            {
                return h.response({message: "customer_detail not found"}).code(400);
            }
        }

        let create_check = await students.findOne({
            where: {
                roll_no: req.payload.roll_no,
                created_by: customer_details.id 
            }
        });

        if(create_check)
        {
            return h.response({message: "user already exists"}).code(400);
        }
       

                 let create_student = {
                    name : req.payload.name,
                    class: req.payload.class,
                    department: req.payload.department,
                    roll_no: req.payload.roll_no,
                    gender : req.payload.gender,
                    created_by: customer_details.id,
                    created_date: Date.now()  
                 }

        let response = await students.create(create_student);
        response = JSON.parse(JSON.stringify(response));
        return h.response(response).code(200);
        }catch(error)
        {
            console.log("add student error: ",error);
            return h.response({error: "internal server error",reason: error}).code(500);
        }
    },
    updatestudent: async(req,h) =>{
        try{

            let access_token = req.headers.authorization;
            if(!access_token)
            {
                return h.response({message: "authorization header missisng"}).code(403);
            }

            let token_data = await common_service.jwt_verify_token(access_token);

            if(!token_data)
            {
                return h.response({message: "invalid crediantls"}).code(403);
            }

        const student_id = req.params.student_id

        const students = req.getDb(dbconfig.DB).getModel('students');
        const customers = req.getDb(dbconfig.DB).getModel('customers');

        let customer_details = await customers.findOne({where:{
            user_id : token_data.id
        }});

        if(!customer_details)
        {
            return h.response({message: "customer_detail not found"}).code(400);
        }

        let update_check = await students.findOne({where:{
            id: student_id,
            created_by: customer_details.id
        }});

        if(!update_check)
        {
            return h.response({message: "You cannot update  this customer"}).code(400);
        }

        let update_payload = {
            name : req.payload.name,
            roll_no: req.payload.roll_no,
            department: req.payload.department,
            gender : req.payload.gender
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
            let access_token = req.headers.authorization;
            if(!access_token)
            {
                return h.response({message: "authorization header missisng"}).code(403);
            }

            let token_data = await common_service.jwt_verify_token(access_token);

            if(!token_data)
            {
                return h.response({message: "invalid crediantls"}).code(403);
            }
       // const student_id = req.params.student_id

        const students = req.getDb(dbconfig.DB).getModel('students');
        const customers = req.getDb(dbconfig.DB).getModel('customers');

        let customer_details = await customers.findOne({where:{
            user_id : token_data.id
        }});

        if(!customer_details)
        {
            return h.response({message: "customer_detail not found"}).code(400);
        }

        let student_details = await students.findAll({
            where: {
                created_by : customer_details.id
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
            let access_token = req.headers.authorization;
            if(!access_token)
            {
                return h.response({message: "authorization header missisng"}).code(403);
            }

            let token_data = await common_service.jwt_verify_token(access_token);

            if(!token_data)
            {
                return h.response({message: "invalid crediantls"}).code(403);
            }

        const student_id = req.params.student_id

        const students = req.getDb(dbconfig.DB).getModel('students');
        const customers = req.getDb(dbconfig.DB).getModel('customers');

        let customer_details = await customers.findOne({where:{
            user_id : token_data.id
        }});

        if(!customer_details)
        {
            return h.response({message: "customer_detail not found"}).code(400);
        }

        let delete_check = await students.findOne({where:{
            id: student_id,
            created_by: customer_details.id
        }});

        if(!delete_check)
        {
            return h.response({message: "You can not delete this customer"}).code(400);
        }
        
        await students.destroy({where: {id : student_id}});

        return h.response({message: "successfully deleted"}).code(200);
        }catch(error)
        {
            console.log("get student error: ",error);
            return h.response({error: "internal server error",reason: error}).code(500);
        }
    },
    getstudentbyid : async (req,h)=>{
        try{
            let access_token = req.headers.authorization;
            if(!access_token)
            {
                return h.response({message: "authorization header missisng"}).code(403);
            }

            let token_data = await common_service.jwt_verify_token(access_token);

            if(!token_data)
            {
                return h.response({message: "invalid crediantls"}).code(403);
            }
        const student_id = req.params.student_id

        const students = req.getDb(dbconfig.DB).getModel('students');
        const customers = req.getDb(dbconfig.DB).getModel('customers');

        let customer_details = await customers.findOne({where:{
            user_id : token_data.id
        }});

        if(!customer_details)
        {
            return h.response({message: "customer_detail not found"}).code(400);
        }

        let student_details = await students.findOne({
            where: {
                id : student_id,
                created_by : customer_details.id
            }
        });

        if(!student_details)
        {
            return h.response({error : "no such user exists"}).code(400);
        }

        student_details = JSON.parse(JSON.stringify(student_details));

        return h.response(student_details).code(200);
    }catch(error){
        console.log("get student error: ",error);
        return h.response({error: "internal server error",reason: error}).code(500);
    }

    }
}