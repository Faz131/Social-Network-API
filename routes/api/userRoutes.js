const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
} = require('../../controllers/usersController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

module.exports = router;
