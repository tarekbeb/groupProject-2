let express = require('express');
let router = express.Router();
let db = require('../models');
let bodyParser = require('body-parser');





// router.get('/ideaPage/:ideaID', (req, res) => {
//     let industryData =  db.industry.findAll();
//     let projectData =  db.project.findByPk(req.params.ideaID);
//     let userProjectData = db.userProject.findAll({where: {projectID: req.params.ideaID}})
//     let userData = db.user.findAll()

//     //projectData._rejectionHandler0.dataValues >>> an object that contains one record from Project Table (from req.params.ideaID)
//     //industryData >>> an array of objects that contain records from Industry Table


//     Promise
//     .all([projectData, industryData, userProjectData, userData])
//         .then(records => {
//             console.log(userProjectData);

//             res.render('ideaPage', {
//                 project: records,
//                 industry: records[1],
//                 userProj: records[2],
//                 user: records[3],
//             })
            
//             // console.log(records)

//         })
//         .catch((error) => {
//         res.send(error)
//         })
//     })


// router.get('/ideaPage/:ideaID', (req, res) =>{
//     db.project.findAll({include: [{
//         model: db.user,
//         through: {
//             attrubutes: ['id']
//         }
//     }], where: {id: req.params.ideaID}})
//     .then((results)=>{
//         results.forEach(project => {
//             console.log(project.pName)
//             project.users.forEach(user =>{
//                 console.log(user.fName)
//             })
//         });
//     })
//     res.render('ideaPage', {

//     }

//     )
// })

// router.get('/ideaPage/:ideaID', (req, res) =>{
//     let industryData =  db.industry.findAll();
//     let projectData =  db.project.findByPk(req.params.ideaID);
//     let userProjectData = db.userProject.findAll({where: {projectID: req.params.ideaID}})
//     let userData = db.user.findAll()
//     let thing = db.project.findAll({include: [{
//         model: db.user,
//         through: {
//             attrubutes: ['id']
//         }
//     }], where: {id: req.params.ideaID}})
    
    
// })


router.get('/ideaPage/:ideaID', (req, res) => {
    let industryData =  db.industry.findAll();
    let projectData =  db.project.findByPk(req.params.ideaID);
    let userData = db.user.findAll()
    let userNames = []
    let userIds = []
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Grabbing user names through the join table (userProject) using user id and project id
    db.project.findAll({include: [{model: db.user, through: {attrubutes: ['id']}}], where: {id: req.params.ideaID}})
        .then((results)=>{
            results.forEach(project => {
                project.users.forEach(user =>{
                    userNames.push(user.fName)
                    // userIds.push(user.id)
                })
            });
        })
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Promise
    .all([industryData, userNames, projectData, userIds])
    .then((records)=>{
        res.render('ideaPage', {
            industryData: records[0],
            userNames: records[1],
            project : records[2],
            userIds : records[3]
        })
    })
})





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//POSTING
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


module.exports = router;