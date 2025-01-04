import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosApiService {

  todosUrl = "http://localhost:3000/todos";

  constructor(
    private http: HttpClient,
  ) { }

  getAllTodos() {
    return this.http.get<any>(this.todosUrl)
  }

}
