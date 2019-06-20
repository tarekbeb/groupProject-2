# sequelize model:generate --name profile --attributes fName:string,lName:string,email:string,username:string,password:string,skills:string,imgURL:string,bio:string
# sequelize model:generate --name categories --attributes field:string

# sequelize model:generate --name project --attributes pName:string,description:string,summary:string,collaborators:string,userID:integer,skillsID:integer


# sequelize model:generate --name skills --attributes skillName:string,userID:integer
# sequelize model:generate --name user --attributes fName:string,lName:string,email:string,username:string,password:string,imgURL:string,bio:string


# sequelize model:generate --name project --attributes pName:string,description:string,summary:string,industryID:integer


# sequelize model:generate --name userSkills --attributes userID:integer,skillsID:integer