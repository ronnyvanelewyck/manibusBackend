//
// Purpose: MANIBUS all CRUD operations
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const dbDebug = require("debug")("app:db");
const dateMath = require("date-arithmetic");
const { Workflow, Task } = require("../models/models");

// getters
async function getAllWorkflows() {
  return (workflow = await Workflow.find().select().sort('header.text1'));
}

async function getWorkflowByHeaderText(searchText) {
  return (workflow = await Workflow.find({
    "header.text1": {
      $regex: ".*" + searchText + ".*",
      $options: "i",
    },
  }).select());
}

async function getWorkflowById(id) {
  return (workflow = await Workflow.find({
    _id: id,
  }).select());
}

async function getAllTasks() {
  return (task = await Task.find().select().sort('header.text1'));


}

async function getTaskById(id) {
  return (task = await Task.find({
    _id: id,
  }).select());
}

async function getTaskByUser(lastname, searchDate) {
  return (task = await Task.find({
    "task.header.isExecuted": false,
    "task.user.lastname": lastname,
    "task.header.plandate": {
      $gte: new Date(searchDate),
      $lt: dateMath.add(new Date(searchDate), 1, "day"),
    },
  }).select());
}

// updaters
async function updateWorkflowById(id, header, material, ingredient, workflow) {
  return Workflow.findByIdAndUpdate(
    id,
    {
      header: header,
      material: material,
      ingredient: ingredient,
      workflow: workflow,
    },
    {
      new: true,
    }
  );
}

async function updateTaskById(id, task) {
dbDebug(task);
  return Task.findByIdAndUpdate(
    id,
    {
      task: task,
    },
    {
      new: true,
    }
  );
}

// Deleters
async function deleteTaskById(id) {
  return Task.findByIdAndRemove(id, {
    rawResult: true,
  });
}

module.exports = {
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  updateWorkflowById,
  getAllWorkflows,
  getWorkflowByHeaderText,
  getWorkflowById,
  getTaskByUser,
};
