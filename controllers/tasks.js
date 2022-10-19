
//const express = require('express')
const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const createCustomError = require('../errors/custom-error')

//res.send('All Items Improved (get all tasks)')


const getAllTasks = asyncWrapper(async (req,res) =>{
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
        //res.status(200).json({ tasks, amount: tasks.length })
        //res.status(200).json({ status:'success', data:{tasks,nbHits:tasks.length} })
})
//create task 
const createTask = asyncWrapper(async (req,res) => {
    
    const task = await Task.create(req.body)
    res.status(201).json({ task })
    
})
//get single task 
const getTask = asyncWrapper(async (req, res, next) => {
    const { id:taskID } = req.params
    const task = await Task.findOne({_id:taskID});
    if(!task){
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
})
//update task 
const updateTask = asyncWrapper(async (req, res) => {
    const { id:taskID } = req.params;
    
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, { 
        new:true, 
        runValidators: true
    })
    
    if(!task){
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({task})
})
//put task
//delete dask 
const deleteTask = asyncWrapper(async (req,res) => {
    const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID});
    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({ task })
        
})

module.exports = {
    getAllTasks, getTask, createTask, updateTask, deleteTask, 
}

