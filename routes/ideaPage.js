let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');


//THIS WORKS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const projectData =  db.project.findAll()
// const industryData =  db.industry.findAll()

// router.get('/ideaPage', (req, res) => {
//     Promise
//     .all([projectData, industryData])
//         .then(records => {
//             res.render('ideaPage', {
//                 project: records[0],
//                 industry: records[1]

//             })
//         })
//         .catch((error) => {
//         res.send(error)
//         })
//     })
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



const industryData =  db.industry.findAll();

router.get('/ideaPage/:ideaID', (req, res) => {
    let projectData =  db.project.findByPk(req.params.ideaID)
    Promise
    .all([projectData, industryData])
        .then(records => {
            res.render('ideaPage', {
                project: records,
                industry: records[1],

            })
        })
        .catch((error) => {
        res.send(error)
        })
    })









// router.use(bodyParser.urlencoded({ extended: false }))
// router.post('/', (req, res) => {

//     let firstName = req.body.firstName;
//     let lastName = req.body.lastName;
//     let bio = req.body.bio;
//     let imgURL = req.body.imgURL;
//     let contact = req.body.contact;

//     // console.log(req.body)

//     // res.send('debugging')

//     db.test2.create({firstName:firstName, lastName:lastName, bio:bio, imgURL:imgURL, contact:contact})
//     .then((result) => {

        
//         // db.dishes.findAll()
//         // .then((r) => {
//         //   console.log(r)
//         // })
//         db.test2.findAll()
//         .then(records => {

//             console.log(records)

//             // res.send('inside of findall')
//           res.render('index', {
//               test2s: records
//           })
//         })
//         .catch((error) => {
//           res.send("there was an error")
//         })
//     })
  
// })


module.exports = router;