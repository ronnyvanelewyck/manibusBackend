const mongoose = require('mongoose');
const { getAllWorkflows , getWorkflowByHeaderText, getWorkflowById, getTaskById, getTaskByUser, updateWorkflowById, updateTaskById, deleteTaskById } = require('../database/crud');


// connect to database
mongoose.connect('mongodb://localhost/manibus')
    .then(() => console.log('connected to manibus...'))
    .catch(err => console.log('not connected to manibus: ', err));




async function run(){
  // get workflow by Id
 
  try {
    const result = await getWorkflowById("61c844b84285230bc037132d");
    for (let i = 0; i < result.length; i++) {
      console.log(result[i].header);
    }
  } catch (ex) {
    console.log(ex.message);
  }

  // get workflow by header text1 case insensitive regex
  try {
    const result2 = await getWorkflowByHeaderText("spa");
    for (let i = 0; i < result2.length; i++) {
      console.log(result2[i].header);
    }
  } catch (ex) {
    console.log(ex.message);
  }

  // get task by Id
  try {
  const result3 = await getTaskById("61c844b84285230bc0371355");
  for (let i = 0; i < result3.length; i++) {
    console.log(result3[i].task.header);
  }
} catch (ex) {
  console.log(ex.message);
}
  // get task by user and date
  try {
  const result4 = await getTaskByUser("Foucart",'12/20/2021');
  for (let i = 0; i < result4.length; i++) {
    console.log(result4[i].task.user);
  }
} catch (ex) {
  console.log(ex.message);
}

try {
  const testId = "61c844b84285230bc037132d";
  const result5 = await getWorkflowById(testId);
  if (!result5 || result5[0] === undefined) {
    console.log(`workflow ${testId} document not found`);
  } else {
    // header update
    const header = result5[0].header;
    header.chdate = Date.now();
    header.text1 = "Updated Text van de header absoluut22";
    header.text2 = "text2 na de update22";
    // material update
    const material = result5[0].material;
    // ingredient update
    const ingredient = result5[0].ingredient;
    // step update
    const steps = result5[0].workflow;
    steps[0].steptitle = "WE do the update22";
    steps[0].textlines[5] = "ja watte datte";
    //const result2 = await updateWorkflowStep(testId, steps);
    try {
      const updateResult = await updateWorkflowById(
        testId,
        header,
        material,
        ingredient,
        steps
      );
      console.log(updateResult);
    } catch (ex) {
      console.log(ex.message);
    }
  }
} catch (ex) {
  console.log(ex.message);
}



try {
  const result6 = await getTaskByUser("Foucart", "12/24/2021");
  if (!result6 || result6[0] === undefined) {
    console.log(`workflow document not found`);
  } else {
    // task id
    const taskId = result6[0]._id;
    // header update
    const task = result6[0].task;
    task.header.isExecuted = true;
    task.header.execdate = Date.now();

    const updateResult2 = await updateTaskById(taskId, task);
    console.log(updateResult2);
  }

  const deleteResult = await deleteTaskById("61bf09be0e329920fb40d277");
  console.log(deleteResult);
} catch (ex) {
  console.log(ex.message);
}
}



run();