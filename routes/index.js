let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('home page');
});

module.exports = router;