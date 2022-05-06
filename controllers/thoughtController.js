const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: 'reactions', select: '-__v' })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log("updating user with new thought");
        console.log(req.body);
        return User.findOneAndUpdate(
          { userName: req.body.userName },
          { $addToSet: { thoughts: thought } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought failed to create' })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a thought and its reactions
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Thought.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() => res.json({ message: 'Thought and reactions deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
    // Add a reaction to a thought
    addReaction(req, res) {
      console.log('You are adding a reaction');
      console.log(req.body);
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: '404' })
            : res.json("Reaction successfully created!")
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove a reaction from a thought
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((reaction) =>
          !reaction
            ? res
                .status(404)
                .json({ message: 'No reaction found with that ID :(' })
            : res.json(reaction)
        )
        .catch((err) => res.status(500).json(err));
    },
  
};
