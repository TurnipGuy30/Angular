import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../_models/todo.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

// Constants
import { icons } from '../_constants/icons';

// Services
import { TodoService } from '../_services/todo.service';
import { TodoStatusModel } from '../_models/todo-status.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  // ----------------------------
  //      Properties
  // ----------------------------
  icons = icons;

  todos: TodoModel[];
  error = '';


  formAddItem = this.fb.group({
    name: ['']
  });



  // ----------------------------
  //      Constructor
  // ----------------------------

  constructor(
    private fb: FormBuilder,
    private todoSvc: TodoService) { }


  // ----------------------------
  //      Methods
  // ----------------------------

  // ----------------------------
  //      Event Handlers

  ngOnInit() {
    this.loadTodoList();
  }

  onClick_toggleItem(event, id: number) {
    const checked = event.target.checked;
    this.updateItemStatus(new TodoStatusModel({ id: id, isDone: checked }));
  }

  onClick_deleteItem(id: number) {
    this.deleteItem(id);
  }


  onSubmit() {
    this.addItem();
  }

  // ----------------------------
  //      Other


  addItem() {
    const model = (this.formAddItem.value);
    this.todoSvc.todosAdditem(model).subscribe(
      // on success
      (r) => {
        this.formAddItem.reset();
        this.loadTodoList();
      },
      // on error
      (error) => {
        this.error = error;
      });
  }

  updateItemStatus(model: TodoStatusModel) {

    this.todoSvc.todosUpdateStatus(model).subscribe(
      // on success
      (r) => {
        this.loadTodoList();
      },
      // on error
      (error) => {
        this.error = error;
      });
  }

  deleteItem(id: number) {
    this.todoSvc.todosDelete(id).subscribe(
      // on success
      (r) => {
        this.loadTodoList();
      },
      // on error
      (error) => {
        this.error = error;
      });
  }

  loadTodoList() {
    this.todoSvc.todosGetList().subscribe(
      // on success
      (r) => {
        this.todos = r;
      },
      // on error
      (error) => {
        this.error = error;
      });
  }

}
