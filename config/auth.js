module.exports = {
    ensureAuthenticated: function(req, res, next) {
        console.log(req.isAuthenticated());
        if(req.isAuthenticated()){
            return next();
        } else {
            req.flash('error_msg', 'Please log in to view this page');
            res.redirect('/login');
        }
    },
    forwardAuthenticated: function(req, res, next) {
        console.log(req.isAuthenticated());
        if(!req.isAuthenticated()){
            return next();
        } else {
            res.redirect('/newProject');
        }
    }
};