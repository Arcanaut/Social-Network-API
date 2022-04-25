//used outline of Pizza-Hunt controller and modified as needed
const User = require('./User');
const Thought = require('./Thought');

const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },



  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'responses',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: `No thought found with ID: ${params.id}` });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },



  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id }},
          { new: true, runValidators: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: `No thought found with ID: ${params.id}` });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
      .populate({
        path: 'responses',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: `No thought found with ID: ${params.id}` });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        // was curious about err codes, my general understanding for RESTful API is 400 is client side error, 500 is server side
        res.status(500).json(err);
      });
  },



  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: `No thought found with ID: ${params.id}` });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },


  addResponse({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { Responses: body }},
      { new: true, runValidators: true }
    )
      .populate({
        path: 'responses',
        select: '-__v'
      })
      .select('-__v')
      .then(dbResponseData => {
        if (!dbResponseData) {
          res.status(404).json({ message: `Cannot react. No thought found with ID: ${params.thoughtID}` });
          return;
        }
        res.json(dbResponseData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteResponse({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { Responses: { ResponseId: params.ResponseId } }},
      { new: true }
    )
    .then(dbResponseData => {
      if (!dbResponseData) {
        res.status(404).json({ message: `No Response found with ID: ${params.ResponseID}` });
        return;
      }
      res.json(dbResponseData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
}








module.exports = thoughtController;