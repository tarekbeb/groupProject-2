let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');



const projectData =  db.project.findAll()
const industryData =  db.industry.findAll()


router.get('/ideas', (req, res) => {
    Promise
    .all([projectData, industryData])
        .then(records => {
            res.render('ideas', {
                project: records[0],
                industry: records[1],
                user: req.user

            })
        })

        .catch((error) => {
        res.send(error)
        })
    })



router.use(bodyParser.urlencoded({ extended: false }))

router.post('/ideas', ((req, res) => {
    let pName = req.body.pName;
    let industryId = req.body.industry
    let description = req.body.description
    let summary = req.body.summary;
    let userData =  db.user.findByPk(req.params.userID);

    db.project.create({pName:pName, description:description, summary:summary, industryID:industryId,})
    .then(result =>{
    Promise
    .all([projectData, industryData, userData])
        .then(records => {
            res.render('ideas', {
                project: records[0],
                industry: records[1],
                user: req.user
            })
        })

        .catch((error) => {
        res.send(error)
        })
})}))


module.exports = router;