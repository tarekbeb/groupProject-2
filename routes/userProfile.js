let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');

router.get('/userProfile/:userID', ((req, res) => {
    let userData =  db.user.findByPk(req.params.userID);

    Promise
    .all([userData])
    .then(records => {
        res.render('userProfile', {
            users: records,
        })
        
        // console.log(records)

    })
    .catch((error) => {
    res.send(error)
    })




}))




module.exports = router;