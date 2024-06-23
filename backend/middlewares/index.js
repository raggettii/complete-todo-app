const JWT_SECRET = require("../JWT_SECRET");
const jwt = require("jsonwebtoken");
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

const middleware = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({
            msg: "JWT not found"
        });
    }
    // console.log(authToken);
    const tokenParts = authToken.split(' ');
    const token = tokenParts[1];
    // console.log(token);

    try {
        // const token = authToken;
        
        if (!token) {
            return res.status(401).json({
                msg: "Invalid JWT format"
            });
        }

        const decodedValue = jwt.verify(token, JWT_SECRET ,(err,res)=>{
            if(err){
                return "Token Expired";
            }
            else return res;
        });
        console.log(decodedValue);
        if(decodedValue=="Token Expired"){
            console.log("Halooo")
            return res.status(401).json({
                decodedValue
            })
        }
        console.log("Decoded Token:", decodedValue);

        if (decodedValue && decodedValue.username) {
            req.username = decodedValue.username;
            next();
        } else {
            return res.status(403).json({
                msg: "You are not authenticated"
            });
        }
    } catch (error) {
        console.error("Error in middleware", error);
        return res.status(500).json({
            msg: "Internal server error middleware"
        });
    }
};

module.exports = middleware;
