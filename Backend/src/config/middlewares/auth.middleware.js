
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist_model");

async function authUser(req, res, next) {
    console.log("🔥 AUTH MIDDLEWARE HIT");

    try {
        console.log("STEP 1: Checking token");

        const token = req.cookies?.token;

        if (!token) {
            console.log("❌ Token missing");
            return res.status(401).json({ error: "Unauthorized" });
        }

        console.log("STEP 2: Checking blacklist");

        const isBlackListed = await blacklistModel.findOne({ token });

        console.log("STEP 3: Blacklist check completed");

        if (isBlackListed) {
            console.log("❌ Token is blacklisted");
            return res.status(401).json({ error: "Token is invalid" });
        }

        console.log("STEP 4: Verifying JWT");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        console.log("STEP 5: Authentication successful");

        return next();

    } catch (err) {
        console.error("❌ AUTH MIDDLEWARE ERROR:", err);

        if (err.name === "JsonWebTokenError" ||
            err.name === "TokenExpiredError") {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        return res.status(500).json({
            error: "Authentication failed"
        });
    }
}

module.exports = { authUser };
