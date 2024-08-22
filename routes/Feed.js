const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const auth = require('../config/token').verifyToken;

function validateFeed(payload) {
  const errors = {};
  let isFormValid = true;

  if (
    !payload ||
    !payload.date ||
    !new Date(payload.date).getMonth ||
    typeof new Date(payload.date).getMonth !== 'function'
  ) {
    (isFormValid = false), (errors.date = 'Invalid date');
  }

  if (!payload || typeof String(payload.priority) !== 'string') {
    (isFormValid = false), (errors.priority = 'Invalid priority');
  }

  if (!payload || typeof String(payload.title) !== 'string') {
    (isFormValid = false), (errors.title = 'Invalid title');
  }

  if (
    !payload ||
    typeof String(payload.description) !== 'string' ||
    payload.description.trim().length < 4 ||
    payload.description.trim().length > 250
  ) {
    (isFormValid = false), (errors.description = 'Invalid description');
  }

  return { success: isFormValid, errors };
}

function validateEditFeed(payload) {
  const errors = {};
  let isFormValid = true;
  if (
    !payload ||
    typeof String(payload.description) !== 'string' ||
    payload.description.trim().length < 4 ||
    payload.description.trim().length > 250
  ) {
    (isFormValid = false), (errors.description = 'Invalid description');
  }

  return { success: isFormValid, errors };
}

function getTasks(req, res, next) {
  let year = req.params.year;
  let month = req.params.month;
  let day = req.params.day;

  let fromDate = new Date(`${year}-${month}-${day}`);
  let copy = new Date(fromDate.getTime());
  let toDate = new Date(copy.setDate(copy.getDate() + 1));

  Task.find({
    $and: [
      {
        date: {
          $gte: fromDate.toISOString(),
          $lt: toDate.toISOString(),
        },
      },
      {
        author: req.user.username,
      },
    ],
  })
    .then((tasks) => {
      res.status(200).json({
        message: 'Fetched tasks successfully.',
        tasks,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
}

function createTask(req, res) {
  const validationResult = validateFeed(req.body);
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      errors: validationResult.errors,
    });
  }
  const task = new Task({
    description: req.body.description,
    date: req.body.date,
    priority: req.body.priority,
    title: req.body.title,
    author: req.user.username,
  }).save();

  return res.status(200).json({
    success: true,
    message: 'Task created.',
    task: task,
  });
}

function editTask(req, res, next) {
  const validationResult = validateEditFeed(req.body);
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      errors: validationResult.errors,
    });
  }

  Task.findByIdAndUpdate(req.params.id, {
    description: req.body.description,
  })
    .exec()
    .then((task) => {
      res.status(200).json({
        success: true,
        message: 'Edited task successfully.',
        task,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
}

function deleteTask(req, res, next) {
  Task.findByIdAndRemove(req.params.id)
    .exec()
    .then((task) => {
      res.status(200).json({
        success: true,
        message: 'Deleted task successfully.',
        task,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
}

router.post('/tasks/get/:year/:month/:day', auth, getTasks);
router.post('/tasks/create', auth, createTask);
router.post('/tasks/edit/:id', auth, editTask);
router.post('/tasks/delete/:id', auth, deleteTask);

module.exports = router;
