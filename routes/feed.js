const express = require('express');
const router = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');
const passport = require('passport')
require('../config/passport')



router.get('/feed', (req, res)=>{
    let userproj = db.userProject.findAll()
    let projectData = db.project.findAll()
    Promise 
    .all([projectData, userproj])
    .then(records =>{
        res.render('feed', {
            project: records[0],
            userproject: records[1]
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
    // let userID = passport.deserializeUser(function(id, done) {
    //     db.user.findByPk(id, function(err, user) {
    //       done(err, user);
    //     });
    // });
    let userID = req.session.passport.user.id;
    console.log(userID)

    db.project.create({pName:pName, description:description, summary:summary, industryID:industryId})
    
    .then((result) =>{
        
        db.project.findAll({
            where : {pName : pName}
        })
        .then((result)=>{
            db.userProject.create({userID:userID, projectID:result[0].dataValues.id})
        })
        })
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