const { Thought, User } = require('../models');

module.exports = {
//GET to get all thoughts
async getThoughts (req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
//GET to get a single thought by its _id
async getSingleThought (req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
async createThought (req, res) {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
//PUT to update a thought by its _id
async updateThought (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
//DELETE to remove a thought by its _id
async deleteThought (req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json({ message: 'Thought deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
//POST to create a reaction stored in a single thought's reactions array field
async createReaction (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
//DELETE to pull and remove a reaction by the reaction's reactionId value
async deleteReaction (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

    if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }   
}
};