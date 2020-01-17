// src/app/components/task-list.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';
// initial code
/*
@Component({
  selector: 'app-task-list',
  template: `
    <div class="list-items">
      <div *ngIf="loading">loading</div>
      <div *ngIf="!loading && tasks.length === 0">empty</div>
      <app-task
        *ngFor="let task of tasks"
        [task]="task"
        (onArchiveTask)="onArchiveTask.emit($event)"
        (onPinTask)="onPinTask.emit($event)"
      >
      </app-task>
    </div>
  `,
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Input() loading = false;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPinTask: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onArchiveTask: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
} */

// updated code
/*
@Component({
    selector: 'app-task-list',
    template: `
      <div class="list-items">
        <app-task
          *ngFor="let task of tasksInOrder"
          [task]="task"
          (onArchiveTask)="onArchiveTask.emit($event)"
          (onPinTask)="onPinTask.emit($event)"
        >
        </app-task>

        <div *ngIf="tasksInOrder.length === 0 && !loading" class="wrapper-message">
          <span class="icon-check"></span>
          <div class="title-message">You have no tasks</div>
          <div class="subtitle-message">Sit back and relax</div>
        </div>

        <div *ngIf="loading">
          <div *ngFor="let i of [1, 2, 3, 4, 5, 6]" class="loading-item">
            <span class="glow-checkbox"></span>
            <span class="glow-text"> <span>Loading</span> <span>cool</span> <span>state</span> </span>
          </div>
        </div>
      </div>
    `,
  })
  export class TaskListComponent implements OnInit {
    tasksInOrder: Task[] = [];
    @Input() loading = false;

    // tslint:disable-next-line: no-output-on-prefix
    @Output() onPinTask: EventEmitter<any> = new EventEmitter();

    // tslint:disable-next-line: no-output-on-prefix
    @Output() onArchiveTask: EventEmitter<any> = new EventEmitter();

    @Input()
    set tasks(arr: Task[]) {
      this.tasksInOrder = [
        ...arr.filter(t => t.state === 'TASK_PINNED'),
        ...arr.filter(t => t.state !== 'TASK_PINNED'),
      ];
    }

    constructor() {}

    ngOnInit() {}
  } */

// updated code for data section

import { Select, Store } from '@ngxs/store';
import { TasksState, ArchiveTask, PinTask } from '../state/task.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  template: `
    <app-pure-task-list
      [tasks]="tasks$ | async"
      (onArchiveTask)="archiveTask($event)"
      (onPinTask)="pinTask($event)"
    ></app-pure-task-list>
  `
})
export class TaskListComponent implements OnInit {
  @Select(TasksState.getAllTasks) tasks$: Observable<Task[]>;

  constructor(private store: Store) {}

  ngOnInit() {}
  archiveTask(id: string) {
    this.store.dispatch(new ArchiveTask(id));
  }

  pinTask(id: string) {
    this.store.dispatch(new PinTask(id));
  }
}
