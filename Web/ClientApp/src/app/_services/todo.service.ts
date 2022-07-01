import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Constants
import { environment } from 'src/environments/environment';
import { apis } from '../_constants/apis';

// Models
import { TodoModel } from '../_models/todo.model';
import { TodoStatusModel } from '../_models/todo-status.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // ----------------------------
  //      Properties
  // ----------------------------
  private apiRootUrl = environment.apiUrl;
  private url = `${this.apiRootUrl}/${apis.todos}`;



  // ----------------------------
  //      Constructor
  // ----------------------------

  // when prefixed with keyword private the mothod parameters become available in the scope of the class.
  constructor(
    private http: HttpClient) {
  }

  // ----------------------------
  //      Methods
  // ----------------------------

  todosGetList() {
    return this.http.get<TodoModel[]>(this.url);
  }

  todosAdditem(model: TodoModel) {
    return this.http.post<TodoModel>(this.url, model);
  }

  todosUpdateStatus(model: TodoStatusModel) {
    const url = `${this.apiRootUrl}/${apis.getUpdateStatus(model.id)}`;
    return this.http.put(url, model);
  }

  todosDelete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
