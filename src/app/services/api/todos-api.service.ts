import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todos } from '../../models/todos.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosApiService {

  todosUrl = "http://localhost:3000/todos";

  constructor(
    private http: HttpClient,
  ) { }

  getAllTodos() {
    return this.http.get<Todos[]>(this.todosUrl)
  }

  addTodoItem(newTodo: Todos) {
    return this.http.post<Todos>(this.todosUrl, newTodo)
  }

  deleteTodoItem(id: string) {
    return this.http.delete<Todos>(`${this.todosUrl}/${id}`)
  }

}
