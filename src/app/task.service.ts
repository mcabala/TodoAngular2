import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Task } from './task';

@Injectable()
export class TaskService {
    //URLs for CRUD operations
    allTaskUrl = "http://localhost:9000/task-all";
	taskUrl = "http://localhost:9000/task";
	//Create constructor to get Http instance
	constructor(private http:Http) { 
	}
	//Fetch all Task
    getAllTask(): Observable<Task[]> {
        return this.http.get(this.allTaskUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }
	//Create Task
    createTask(task: Task):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.taskUrl, task, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch task by id
    getTaskById(id: string): Observable<Task> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', id);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.taskUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	//Update task
    updateTask(task: Task):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.taskUrl, task, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete task	
    deleteTaskById(id: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', id);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.delete(this.taskUrl, options)
			   .map(success => success.status)
			   .catch(this.handleError);
    }		
	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}