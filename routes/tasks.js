//
// Purpose: MANIBUS tasks APIs (router)
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const validateObjectId = require('../middleware/validateObjectId')
const auth = require('../middleware/auth');
const express = require("express");
//const mongoose = require("mongoose");
const router = express.Router();
const dateMath = require("date-arithmetic");
const { Task, validateTask } = require('../models/task');
const { User } = require('../models/user');
const { Workflow } = require('../models/workflow');


// C(REATE) APIs
router.post("/", auth, async (req, res) => {
  // check valid body
  const { error } = validateTask(req.body);
  if (error) return res.status(400).json({ code: '001', error: error.details[0].message });
  // check valid userId
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).json({ code: '003', error: `userId ${req.body.userId} invalid ` });
  // check valid teacherId
  const teacher = await User.findById(req.body.teacherId);
  if (!teacher) return res.status(400).json({ code: '005', error: `teacherId ${req.body.teacherId} invalid ` });
  // check valid workflowId
  const workflow = await Workflow.findById(req.body.workflowId);
  if (!workflow) return res.status(400).json({ code: '007', error: `workflowId ${req.body.workflowId} invalid ` });
  // create mongoose object
  let task = new Task({
    isExecuted: req.body.isExecuted,
    planDate: req.body.planDate,
    execDate: req.body.execDate,
    order: req.body.order,
    course: req.body.course,
    portion: req.body.portion,
    user: req.body.userId,
    teacher: req.body.teacherId,
    workflow: req.body.workflowId
  });
  // save to db, check result and send 
  task = await task.save()
    .then(() => {
      res.send(task);
    })
    .catch((ex) => {
      res.status(400).send(ex);
    });
});

// R(EAD) APIs
// get all tasks
router.get("/", async (req, res) => {
  // find all tasks document
  await Task.find()
    .populate('user', '-__v')
    .populate('teacher', '-__v')
    .populate('workflow', '-__v')
    .select('-__v')
    .then((task) => {
      res.send(task);
    })
    .catch((ex) => {
      res.status(404).send(ex);
    });
});
// get task by id
router.get("/:id", validateObjectId, async (req, res) => {


  // find task document
  await Task.find({ _id: req.params.id })
    .populate('user', '-__v')
    .populate('teacher', '-__v')
    .populate('workflow', '-__v')
    .select('-__v')
    .then((task) => {
      if (task[0] === undefined)
        return res
          .status(404)
          .json({ code: '009', error: `taskid: ${req.params.id} not found` });
      res.send(task);
    })
    .catch((ex) => {
      res.status(404).send(ex);
    });
});
// get non executed tasks by name for one date
router.get("/find/:param1", async (req, res) => {
  if (req.query.lastname === undefined)
    return res.status(400).json({ code: '010', error: 'lastname is invalid' });
  if (req.query.date === undefined)
    return res.status(400).json({ code: '011', error: 'date is invalid' });
  // find all active tasks for user on a day
  await Task.find({
    isExecuted: false,
    planDate: {
      $gte: new Date(req.query.date),
      $lt: dateMath.add(new Date(req.query.date), 1, "day"),
    },
    lastname: req.query.lastname,
    group: {
      $in: ['Tester']
    }
  })
    .populate('user', '-__v')
    .populate('teacher', '-__v')
    .populate('workflow', '-__v')
    .select('-__v')
    .then((task) => {
      if (task[0] === undefined)
        return res
          .status(404)
          .json({ code: '012', error: `no tasks: ${req.query.lastname} on ${req.query.date}` });
      res.send(task);
    })
    .catch((ex) => {
      res.status(404).send(ex);
    });
});

// U(PDATE) APIs
router.put('/:id', auth, validateObjectId, async (req, res) => {
  // check valid body
  const { error } = validateTask(req.body);
  if (error) return res.status(400).json({ code: '013', error: error.details[0].message });
  // check valid userId
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).json({ code: '015', error: `userId ${req.body.userId} invalid ` });
  // check valid teacherId
  const teacher = await User.findById(req.body.teacherId);
  if (!teacher) return res.status(400).json({ code: '017', error: `teacherId ${req.body.teacherId} invalid ` });
  // check valid workflowId
  const workflow = await Workflow.findById(req.body.workflowId);
  if (!workflow) return res.status(400).json({ code: '019', error: `workflowId ${req.body.workflowId} invalid ` });
  // find task and update only task part
  await Task.findByIdAndUpdate(
    req.params.id,
    {
      isExecuted: req.body.isExecuted,
      planDate: req.body.planDate,
      execDate: req.body.execDate,
      order: req.body.order,
      course: req.body.course,
      portion: req.body.portion,
      user: req.body.userId,
      teacher: req.body.teacherId,
      workflow: req.body.workflowId
    },
    {
      new: true,
    }
  ).then(() => {
    res.send(req.body);
  })
    .catch((ex) => {
      res.status(404).send(ex);
    });
});

// D(ELETE) APIs
router.delete('/:id', validateObjectId, async (req, res) => {
  // find task by id and remove
  Task.findByIdAndRemove(req.params.id, {
    rawResult: true,
  }).then((result) => {
    res.send(result);
  })
    .catch((ex) => {
      res.status(404).send(ex);
    });
});


module.exports = router;
