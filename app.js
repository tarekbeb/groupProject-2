const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));










const port = 3000;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})