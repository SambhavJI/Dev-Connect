const adminAuth = (req, res, next) => {
    const adminAuthToken = req.headers["authorization"];
    const expectedToken = "xyz";

    if (adminAuthToken === expectedToken) {
        console.log("Admin Verified");
        next();
    } else {
        res.status(403).send("Not an admin");
    }
};

module.exports = {
    adminAuth,
};
