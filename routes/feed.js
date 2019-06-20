const express = require('express');
const router = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');


router.get('/feed', (req, res)=>{
    db.project.findAll()
    .then(records =>{
        res.render('feed', {
            project: records
        })
      })
      .catch((error) => {
        res.send("there was an error")
      })
})

router.use(bodyParser.urlencoded({ extended: false }))
router.post('/feed', ((req, res) => {
    let pName = req.body.pName;
    let industryId = req.body.industry
    let description = req.body.description
    let summary = req.body.summary;
    
    db.project.create({pName:pName, description:description, summary:summary, industryID:industryId,})
    .then(result =>{
        db.project.findAll()
        .then((records)=>{
            res.render('feed', {
                project: records
            })   
        })
        .catch((error) => {
            res.send(error)
        }) 
    }) 
}))


module.exports = router;