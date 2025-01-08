import { Component, computed, effect, signal } from '@angular/core';
import { SearchbarComponent } from '../components/shared/searchbar/searchbar.component';
import { SearchService } from '../services/search.service';
import { NgFor, NgIf } from '@angular/common';
import { TodosApiService } from '../services/api/todos-api.service';
import { Todos } from '../models/todos.interface';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [SearchbarComponent, NgIf, NgFor],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

  isTodoItemHovered: boolean = false;
  isCheckboxChecked: boolean = false;
  selectedItemId!: string | null;
  clearTextArea: boolean = false;

  addedTodoItem = signal('');

  allTodos = signal<Todos[]>([]);

  searchValueReceived = computed(() => this.searchService.searchValue())

  constructor(
    private searchService: SearchService,
    private todoApiService: TodosApiService,
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.todoApiService.getAllTodos().subscribe({
      next: (res) => {
        this.allTodos.set(res);
      }
    })
  }

  setToHovered(id: string) {
    this.selectedItemId = id;
    this.isTodoItemHovered = true;
  }

  setToNotHovered(id: string) {
    this.selectedItemId = null;
    this.isTodoItemHovered = false;
  }

  onCheckboxChange(event: Event, todo: Todos) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      todo.completed = true;
      this.isCheckboxChecked = true;
    }
    else if(!checkbox.checked) {
      todo.completed = false;
      this.isCheckboxChecked = false;
    }
  }

  getTodoItem(event: Event) {
    const todoItem = event.target as HTMLInputElement;
    this.addedTodoItem.set(todoItem.value)
  }

  addItem (textarea: HTMLTextAreaElement) {
    const newTodo = {
      completed: false,
      dateCreated: new Date(),
      id: `${this.allTodos.length + 1}`,
      text: this.addedTodoItem()
    };

    this.todoApiService.addTodoItem(newTodo).subscribe({
      next: (res) => {
        this.refreshTodos();
        textarea.value = '';
      },
      error: (err) => {
        alert(err)
      }
    })
  }

  deleteItem(id: string) {
    this.todoApiService.deleteTodoItem(id).subscribe({
      next: (res) => {
        this.refreshTodos();
      }
    })
  }


  refreshTodos() {
    this.todoApiService.getAllTodos().subscribe({
      next: (res) => {
        this.allTodos.set(res);
      }
    });
  }


}
