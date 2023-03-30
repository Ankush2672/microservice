const dbconfig = require('../../config').dbConfig;
const common_service = require('../../services/commonService');

module.exports = {
    addcustomer: async(req,h) =>{
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

        const customers = req.getDb(dbconfig.DB).getModel('customers');

        let check_user = await customers.findOne({
            where: {
                user_id : req.payload.id
            }
        });
        if(check_user)
        {
            return h.response({message: "user already exists"}).code(400);
        }

        let create_payload = {
            user_id : req.payload.id,
            name : req.payload.name,
            email: req.payload.email
        };

        await customers.create(create_payload);

        return h.response({message : "successfully created"}).code(200);
        }catch(error)
        {
            console.log("add customer error: ",error);
            return h.response({error: "internal server error",reason: error}).code(500);
        }
    },
}