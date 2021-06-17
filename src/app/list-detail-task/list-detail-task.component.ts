import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-list-detail-task',
  templateUrl: './list-detail-task.component.html',
  styleUrls: ['./list-detail-task.component.css'],
})
export class ListDetailTaskComponent implements OnInit, AfterViewInit {
  dataSource = [] as any;
  dataSourceDetail = [] as any;
  listChecked = [] as any;
  keySearch = '';
  form: FormGroup | any;
  minDate: any;
  isUpdate = false;

  constructor(private appService: AppService, private fb: FormBuilder) {
    this.minDate = moment().format('YYYY-MM-DD');
    this.form = fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskDueDate: [moment().format('YYYY-MM-DD')],
      taskPiority: ['nomal'],
    });
  }

  ngOnInit() {
    if ((localStorage.getItem('add-task') as any) !== null) {
      this.dataSource = JSON.parse(localStorage.getItem('add-task') as any);
    }
  }

  valuechange(newValue: any) {
    this.dataSource = JSON.parse(localStorage.getItem('add-task') as any);
    this.keySearch = newValue;
    if (newValue === '') {
      return;
    }
    this.dataSource = this.dataSource.filter(
      (f: any) => f.taskName === newValue
    );
  }

  handleDetail(id: any) {
    this.dataSourceDetail = [];
    this.dataSourceDetail = this.dataSource.filter((f: any) => f.id === id);
    this.form.patchValue({ ...this.dataSourceDetail[0] });
  }

  handleRemove(id: any) {
    const currentArray = JSON.parse(localStorage.getItem('add-task') as any);
    for (let i = 0; i < currentArray.length; ++i) {
      if (currentArray[i].id === id) {
        currentArray.splice(i, 1);
      }
    }
    localStorage.setItem('add-task', JSON.stringify(currentArray));
    this.dataSource = currentArray;
  }

  handleChecked(id: any) {
    const idx = this.listChecked.indexOf(id);
    if (idx === -1) {
      this.listChecked.push(id);
    } else {
      this.listChecked.splice(idx, 1);
    }
  }

  handleUpdate(id: any) {
    this.isUpdate = true;
    if (this.form.invalid) {
      return;
    }

    const currentArray = JSON.parse(localStorage.getItem('add-task') as any);
    const index = currentArray.findIndex((ind: any) => ind.id === id);
    const body = this.form.value;
    body.id = currentArray[index].id;
    currentArray[index] = body;
    localStorage.setItem('add-task', JSON.stringify(currentArray));
    this.dataSource = currentArray;
  }

  handleRemoveMutil() {
    const currentArray = JSON.parse(localStorage.getItem('add-task') as any);

    for (let i = 0; i < this.listChecked.length; ++i) {
      for (let j = 0; j < currentArray.length; ++j) {
        if (currentArray[j].id === this.listChecked[i]) {
          currentArray.splice(j, 1);
        }
      }
      localStorage.setItem('add-task', JSON.stringify(currentArray));
      this.dataSource = currentArray;
    }
    this.listChecked = [];
  }

  ngAfterViewInit() {
    this.appService.addTaskSubject$.subscribe((flag) => {
      if (flag) {
        this.dataSource = JSON.parse(localStorage.getItem('add-task') as any);
        console.log(this.dataSource);
      }
    });
  }
}
