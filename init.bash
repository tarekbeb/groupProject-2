# sequelize model:generate --name profile --attributes fName:string,lName:string,email:string,username:string,password:string,skills:string,imgURL:string,bio:string
# sequelize model:generate --name categories --attributes field:string

sequelize model:generate --name project --attributes pName:string,description:string,summary:string,collaborators:string,userID:integer,skillsID:integer
