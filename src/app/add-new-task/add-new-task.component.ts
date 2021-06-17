import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AppService } from '../app.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css'],
})
export class AddNewTaskComponent implements OnInit {
  form: FormGroup | any;
  minDate: any;
  isSubmitform = false;

  constructor(private fb: FormBuilder, private appService: AppService) {
    this.minDate = moment().format('YYYY-MM-DD');
    this.form = fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskDueDate: [moment().format('YYYY-MM-DD')],
      taskPiority: ['nomal'],
    });
  }

  ngOnInit() {}

  addTask() {
    this.isSubmitform = true;
    if (this.form.invalid) {
      return;
    }

    if ((localStorage.getItem('add-task') as any) === null) {
      const newTask = [];
      const body = this.form.value;
      body.id = uuidv4();
      newTask.push(body);
      localStorage.setItem('add-task', JSON.stringify(newTask));
    } else {
      const stored = JSON.parse(localStorage.getItem('add-task') as any);
      const body = this.form.value;
      body.id = uuidv4();
      stored.push(body);
      localStorage.setItem('add-task', JSON.stringify(stored));
    }
    const result = JSON.parse(localStorage.getItem('add-task') as any);
    this.appService.addTaskSubject.next(true);
    this.isSubmitform = false;
    this.form.controls.taskName.setValue('');
    this.form.controls.taskDescription.setValue('');
  }
}
