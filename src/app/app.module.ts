import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { ListDetailTaskComponent } from './list-detail-task/list-detail-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
      AddNewTaskComponent,
      ListDetailTaskComponent
   ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
