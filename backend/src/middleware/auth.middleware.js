const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
      try {
            // Get token from cookies
            const token = req.cookies.token;

            if (!token) {
                  return res.status(401).json({
                        success: false,
                        message: "Not authorized. No token provided.",
                        data: {}
                  });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request
            req.user = {
                  id: decoded.id
            };

            next();

      } catch (error) {
            return res.status(401).json({
                  success: false,
                  message: "Invalid or expired token.",
                  data: {}
            });
      }
};

module.exports = protect;