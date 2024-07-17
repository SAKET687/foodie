import jwt from "jsonwebtoken";

const authMiddleware = async (request, response, next) => {
    const { token } = request.headers;
        // console.log(request.headers.token);
    if (!token) {
        return response.json({ success: false, message: "Token not found, try again. Error in signup. Login Again." })
    }
    // console.log(request.headers);
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        request.body.userId = token_decoded.id;
        next();
    } catch (error) {
        console.error(error);
        console.log(error);
        response.json({ success: false, message: "try again, bro, problem in backend/auth.js" })
    }
};

export default authMiddleware;













// import jwt from "jsonwebtoken";

// const authMiddleware = async (request, response, next) => {
//     const { token } = request.headers;
    

//     if (!token) {
//         return response.status(401).json({ success: false, message: "Token not found. Please log in again." });
//     }

//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         request.body.userId = decodedToken.id;
//         next();
//     } catch (error) {
//         console.error("Token verification failed:", error);
//         return response.status(403).json({ success: false, message: "Invalid or expired token. Please log in again." });
//     }
// };

// export default authMiddleware;
