const router = require('express').Router();
const thoughtRoutes = require('./courseRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
