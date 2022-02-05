//
// Purpose: MANIBUS BACKEND SERVICES - workflow model
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const mongoose = require("mongoose");
const Joi = require("joi");

// don't pluralise name of db
mongoose.pluralize(null);

// workflow
const workflowSchema = new mongoose.Schema({
    header: {
        isActive: {
            type: Boolean,
            default: true
        },
        tasktype: {
            type: String,
            required: true,
            enum: ['standard1','standard2','standard3']
        },
        text1: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 40,
            match: /^[A-Z]/,
            trim: true
        },
        text2: {
            type: String,
            trim: true
        },
        chdate: { 
            type: Date, 
            default: Date.now 
        }
    },
    material: [
        {
            order: {
                type: Number,
                required: true
            },        
            text: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 512,
                trim: true
            },
            amount: {
                type: Number,
                required: true
            },
            uom: {
                type: String
            }
        }
    ],
    ingredient: [
        {
            order: {
                type: Number,
                required: true
            },        
            text: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 512,
                trim: true
            },
            amount: {
                type: Number
            },
            uom: {
                type: String,
                required: true
            },
            allergen: 
            [            
                {
                    type: String,
                    minlength: 2,
                    maxlength: 512,
                    trim: true
                }
            ],        
            nutriscore: {
                type: String,
                trim: true
            },
            price: {
                type: Number
            }
        }
    ], 
    workflow: [
        {
            order: {
                type: Number,
                required: true
            },
            screenformat: {
                type: String,
                required: true,
                enum: ['C0','C1','C2','C3','C4','C5','C6','C7','C8','C9','C10','C11','C12','C13','C14','C15']                
            },
            steptext: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 20,
                trim: true
            },
            steptitle: {
                type: String,
                maxlength: 256,
                trim: true
            },
            textlines: [
                {
                    type: String,
                    maxlength: 256,
                    trim: true
                }
            ]  
        }
    ]
});


// workflow model
const Workflow = mongoose.model('workflow', workflowSchema);


// validations
function validateWorkflow(workflow) {


  }

module.exports = 
{
  Workflow,
  validateWorkflow,
  workflowSchema
} 

//exports.Task = Task;
//exports.validateTask = validate;
