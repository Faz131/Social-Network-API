const { Users, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const getUser = await Users.find({});
            res.json(getUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const getSingleUser = await Users.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!getSingleUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(getSingleUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const createUser = await Users.create(req.body);
            res.json(createUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user and associated thought
    async deleteUser(req, res) {
        try {
            const deleteUser = await Users.findOneAndDelete({ _id: req.params.userId });

            if (!deleteUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: Users.thoughts } });
            res.json({ message: 'User and thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

