const JWT_SECRET = require("../JWT_SECRET");
const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            msg: "JWT not found"
        });
    }

    try {
        const tokenParts = authToken.split(' ');
        const token = tokenParts[1];
        
        if (!token) {
            return res.status(401).json({
                msg: "Invalid JWT format"
            });
        }

        const decodedValue = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token:", decodedValue);

        if (decodedValue && decodedValue.username) {
            // Attach decoded token data to the request object for further use if needed
            req.user = decodedValue;
            next();
        } else {
            return res.status(403).json({
                msg: "You are not authenticated"
            });
        }
    } catch (error) {
        console.error("Error in middleware", error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};

module.exports = middleware;
