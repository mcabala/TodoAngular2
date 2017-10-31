import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskService } from './task.service';
import { Task } from './task';

@Component({
   selector: 'app-task',
   templateUrl: './task.component.html',
   styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit { 
   //Component properties
   allTask: Task[];
   statusCode: number;
   requestProcessing = false;
   idToUpdate = null;
   processValidation = false;
   //Create form
   taskForm = new FormGroup({
       title: new FormControl('', Validators.required),
       status: new FormControl('', Validators.required)	   
   });
   //Create constructor to get service instance
   constructor(private taskService: TaskService) {
   }
   //Create ngOnInit() and and load tasks
   ngOnInit(): void {
	   this.getAllTask();
   }   
   //Fetch all tasks
   getAllTask() {
        this.taskService.getAllTask()
		  .subscribe(
                data => this.allTask = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update task
   onTaskFormSubmit() {
	  this.processValidation = true;   
	  if (this.taskForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
	  let title = this.taskForm.get('title').value.trim();
      let status = this.taskForm.get('status').value.trim();	  
	  if (this.idToUpdate === null) {  
	    //Handle create task
	    let task= new Task(null, title, status);	  
	    this.taskService.createTask(task)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllTask();	
					this.backToCreateTask();
			    },
		        errorCode => this.statusCode = errorCode);
	  } else {  
   	    //Handle update task
	    let task= new Task(this.idToUpdate, title, status);	  
	    this.taskService.updateTask(task)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllTask();	
					this.backToCreateTask();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load task by id to edit
   loadTaskToEdit(id: string) {
      this.preProcessConfigurations();
      this.taskService.getTaskById(id)
	      .subscribe(task => {
		            this.idToUpdate = task.id;   
		            this.taskForm.setValue({ title: task.title, status: task.status });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete task
   deleteTask(id: string) {
      this.preProcessConfigurations();
      this.taskService.deleteTaskById(id)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllTask();	
				    this.backToCreateTask();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateTask() {
      this.idToUpdate = null;
      this.taskForm.reset();	  
	  this.processValidation = false;
   }
}
    