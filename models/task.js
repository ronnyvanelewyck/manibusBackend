//
// Purpose: MANIBUS BACKEND SERVICES - task model
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const mongoose = require("mongoose");
const Joi = require("joi");


// don't pluralise name of db
mongoose.pluralize(null);

// task
const taskSchema = new mongoose.Schema({
  isExecuted: {
    type: Boolean,
    default: false,
  },
  planDate: {
    type: Date,
    default: Date.now,
  },
  execDate: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: Number,
    required: true
  },
  course: {
    type: String,
    minlength: 2,
    maxlength: 80
  },
  portion: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  workflow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workflow'
  },
});


// task model
const Task = mongoose.model('task', taskSchema);

// validations
function validateTask(task) {

  const schema = Joi.object({
    isExecuted: Joi.boolean(),
    planDate: Joi.date(),
    execDate: Joi.date(),
    order: Joi.number().required(),
    course: Joi.string(),
    portion: Joi.number(),
    userId: Joi.ObjectId().required(),
    teacherId: Joi.ObjectId().required(),
    workflowId: Joi.ObjectId().required()
  });
  return schema.validate(task);
}

module.exports =
{
  Task,
  validateTask
}

