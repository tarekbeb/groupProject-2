const express = require('express');
const router = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');



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

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/newProject', ((req, res) => {
    let pName = req.body.pName;
    let industryId = req.body.industry
    let description = req.body.description
    let summary = req.body.summary;
    
    db.project.create({pName: pName, industryID:industryId, description:description, summary:summary})
    .then((result) => {
        db.project.findAll({order: [['updatedAt', 'ASC']]})
    })
    .then((records)=>{
        res.render('feed', {
            projects: records
        })
    })
    .catch((error) => {
        res.send(error)
    })  
}));


module.exports = router;