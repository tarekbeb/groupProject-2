const express = require('express');
const router = express.Router();
const db = require('../models');
// const bodyParser = require('body-parser');


router.get('/newProject', ((req, res) => {
    db.industry.findAll()
        .then(records => {
          res.render('newProject', {
              industry: records
          })
        })
        .catch((error) => {
          res.send("there was an error")
        })
}))


module.exports = router;