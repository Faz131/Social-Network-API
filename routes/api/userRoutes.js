const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
    deleteUser
} = require('../../controllers/usersController');

// /api/users
router.route('/').get(getUsers).post(createUser);
// /api/users/:userId
router.route('/:userId').get(getSingleUser).post(createUser).delete(deleteUser);

// router.route('/users/:usersId/friends/:friendId').post(createUser)

module.exports = router;
