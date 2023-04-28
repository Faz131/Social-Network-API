const { Users, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const getThoughts = await Thought.findOne({ _id: req.params.thoughtsId })
                .select('-__v');

            if (!getThoughts) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(getThoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const createThought = await Thought.create(req.body);
            res.json(createThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const deleteThought = await Course.findOneAndDelete({ _id: req.params.courseId });

            if (!deleteThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            // await Student.deleteMany({ _id: { $in: course.students } });
            // res.json({ message: 'Course and students deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a course
    async updateCourse(req, res) {
        try {
            const course = await Course.findOneAndUpdate(
                { _id: req.params.courseId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!course) {
                return res.status(404).json({ message: 'No course with this id!' });
            }

            res.json(course);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
