
const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,

} = require('../../controllers/thoughtsControllers');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtsId').get(getSingleThought).put(updateThought).delete(deleteThought);

// // /api/thoughts/:thoughtId/reactions
// router.route('/:thougtsId/reactions').post(createReaction);


module.exports = router;