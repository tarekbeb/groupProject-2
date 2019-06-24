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

router.get('/ideaPage/:ideaID', (req, res) =>{
    let industryData =  db.industry.findAll();
    let projectData =  db.project.findByPk(req.params.ideaID);
    let userProjectData = db.userProject.findAll({where: {projectID: req.params.ideaID}})
    let userData = db.user.findAll()
    let thing = db.project.findAll({include: [{
        model: db.user,
        through: {
            attrubutes: ['id']
        }
    }], where: {id: req.params.ideaID}})
    .then((results)=>{
        results.forEach(project => {
            console.log(project.pName)
            project.users.forEach(user =>{
                console.log(user.fName)

            })
            
        });
    })
    res.render('ideaPage', {
        users: results,
        
    }


    )
})









// const industryData =  db.industry.findAll();
// const userProjectData = db.userProject.findAll();


// router.get('/ideaPage/:ideaID', (req, res) => {
//     let projectData =  db.project.findByPk(req.params.ideaID);
//     let userProjectData = db.userProject.findAll({where: {projectID: req.params.ideaID}})
//         .then((projectResult) => {
//             let userIdd = projectResult[0].dataValues.userID
//             console.log(userIdd)//returns 2
//             let userData = db.user.findAll()
//             // db.user.findAll()
//             .then(userRecord =>{
//                 console.log(userRecord[0])
//                 for (let i=0; i<userRecord.length; i++){
//                     // console.log(userRecord[i]) // returns all users
//                     console.log(projectResult.userID);
//                     if (userIdd == userRecord[i].dataValues.id){
//                         // console.log(userProjectData.userID)
//                         console.log('inside for loop')
//                         console.log(userRecord[i].dataValues.fName)
//                         break;
//                         // compare userID of project with userID of user's table and retrieving name of user 
//                     }
                    
//                 }
//             })
//         })
//     })


    // let userProjectData = db.user.findAll({
    //     include: [{
    //     model: db.userProject}]
    // })


//     Promise
//     .all([projectData, industryData, userProjectData, userData])
//     //userData is an array of objects, each object is a record in the User Table
//     //projectData is 
//         .then(records => {

//             // ideaPageId = req.params.ideaID;
//             // arrayOfUsers = []
//             // userData.forEach(user => {
//             //     if (user.id == ideaPageID){
//             //         arrayOfUsers.push(user.fName);
//             //     }
//             // });




//             // let userData = records[3]
//             // console.log(userProjectData);
//             // // console.log(userData);
//             // let projectResult = records[2]
//             // // console.log(userDat.length)
//             // let userIdd = ()=>{
//             //     for (data in userProjectData){
                    
//             //     }
//             // }
//             // projectResult[0]
//             // console.log(userIdd)
//             // let userList = []
//             // // for (let i=0; i<userDat.length; i++){
//             // //     if (userIdd == userDat[i].dataValues.id){
//             // //         console.log(userDat[i].dataValues.fName)
//             // //         // userList.push(userDat[i].dataValues.fName)
//             // //     }
//             // // }
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




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TAREK'S
// const industryData =  db.industry.findAll();

// router.get('/ideaPage/:ideaID', (req, res) => {
//     let projectData =  db.project.findByPk(req.params.ideaID)
//     // let test = db.userProject.findAll({include: [{model: db.user}]})
//     let userproject = db.userProject.findAll({
//         where : {projectID : req.params.ideaID}
//     })

//     Promise
//     .all([projectData, industryData, userproject])
//         .then(records => {
//             res.render('ideaPage', {
//                 project: records,
//                 industry: records[1],
//                 userproject: records[2]
//                 // userProject: records[2]

//             })
//             // console.log(records)
//         })
//         .catch((error) => {
//         res.send(error)
//         })
//     })
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~







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