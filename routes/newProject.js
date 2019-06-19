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

// router.use(bodyParser.urlencoded({ extended: false }))

// router.post('/newProject', ((req, res) => {
//     let pName = req.body.pName;
//     let industryName = req.body.industry
//     let description = req.body.description
//     let summary = req.body.summary;

//     db.industry.findAll().then(()=>{

//     })
//     industryID = 
//     if (industryName == industry){
//         industry = industryId
//     }



    
//     db.project.create({pName: pName, industry:industry, description:description, summary:summary})
//     .then((result) => {
//         // res.redirect('/')
//         console.log(`${pName}, ${industryName}, ${summary}`);
//     })
//     .catch((error) => {
//         res.send(error)
//     })
//     res.send('new project post afterwards')    
// }))


module.exports = router;