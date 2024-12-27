const router = require('express').Router();

router.use('/blog', require('./blog_routes'));

module.exports = router;