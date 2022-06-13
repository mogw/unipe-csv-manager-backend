const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/csv', require('./csv'))

module.exports = router