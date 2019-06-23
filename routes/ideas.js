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
                industry: records[1]

            })
        })

        .catch((error) => {
        res.send(error)
        })
    })



// router.get('/ideas', (req, res) => {
//     db.industry.findAll()
//     .then(industryResult =>{
//         industryResult.forEach(e =>{
//             console.log(`${e.dataValues.industryName} and the id is ${e.dataValues.id}`)
//         })
//     })
//     db.project.findAll()
//         .then(projectRecords => {
//             projectRecords.forEach(element => {
//                 // console.log(element.dataValues.industryID)
//             })
//             })

//             // res.send('inside of findall')
//             // db.industry.findAll({
//             //     where : {industryID : element.industryID}
//             // })
//             .then(records =>{
//                 res.render('ideas', {
//                     project: projectRecords,
//                     industry: industryResult
//                 })
//             })
          
        
//         .catch((error) => {
//           res.send(error)
//         })
//     })
    


// router.get('/ideas', (req, res) => {
//     db.industry.findAll()
//         .then(records => {
//             records.forEach(element => {
//             })
//             // console.log(records.data)

//             // res.send('inside of findall')
//           res.render('ideas', {
//               industry: records
//           })
//         })
//         .catch((error) => {
//           res.send(error)
//         })})






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