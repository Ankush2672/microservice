
const jwt = require('jsonwebtoken');

module.exports = {
    jwt_Sign_token : async(payload)=>{

        return jwt.sign(payload,"asderloopion",{expiresIn : "72000s"});
    },
    jwt_verify_token: async(token)=>{
            try{
                    return jwt.verify(token.split(" ")[1],"asderloopion");
            }catch(error)
            {
                return null
            }
    },
    corsSettings: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
        headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'refresh_token'],
      }
}