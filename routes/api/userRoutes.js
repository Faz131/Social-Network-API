const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
} = require('../../controllers/usersController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/users/:usersId/friends/:friendId').post(createUser)

module.exports = router;
