const projectMiddleware = async (req, res, next) => {
    try {
        console.log(req.user);
        const teacher = req.user.isFaculty;
        if(!teacher){
            return res.status(200).json({message: "You have not access to this page"});
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = projectMiddleware;