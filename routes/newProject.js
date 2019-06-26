const express = require('express');
const router = express.Router();
const db = require('../models');
require('../config/passport')
var { ensureAuthenticated } = require('../config/auth')
const bodyParser = require('body-parser');


router.get('/newProject', ensureAuthenticated, ((req, res) => {
    db.industry.findAll()
        .then(records => {
          res.render('newProject', {
              industry: records,
              user: req.user
          })
        })
        .catch((error) => {
          res.send("there was an error")
        })
}))




module.exports = router;