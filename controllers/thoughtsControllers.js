const { Users, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thoughts = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought from a user
    async createThought(req, res) {

        try {
            const thoughts = await Thought.create(req.body);
            const user = await Users.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thought: Thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                })
            }

            res.json('Created a thought');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            const user = await Users.findOneAndUpdate(
                { thought: req.params.thoughtId },
                { $pull: { thought: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought deleted but no user with this id!',
                });
            }

            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a reaction
    // createReaction(req, res) {
    //     Thought.findOneAndUpdate(
    //         { _id: req.params.thoughtId },
    //         { $addToSet: { reactions: req.body } },
    //         { runValidators: true, new: true }
    //     )
    //         .then((thought) =>
    //             !thought
    //                 ? res.status(404).json({ message: 'No thought found with this ID' })
    //                 : res.json(thought)
    //         )
    //         .catch((err) => res.status(500).json(err));
    // },
};
