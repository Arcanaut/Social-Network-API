const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addResponse,
  deleteResponse
} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getAllThoughts);

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:userId')
  .post(createThought);

router
  .route('/:thoughtId/responses')
  .post(addResponse);

router
  .route('/:thoughtId/:responseId')
  .delete(deleteResponse);

module.exports = router;