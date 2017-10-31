import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { TaskComponent }  from './task.component';
import { TaskService } from './task.service';

@NgModule({
  imports: [     
        BrowserModule,
		HttpModule,
		ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
		TaskComponent
  ],
  providers: [
        TaskService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
