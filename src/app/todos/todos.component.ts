import { Component, computed, effect, signal } from '@angular/core';
import { SearchbarComponent } from '../components/shared/searchbar/searchbar.component';
import { SearchService } from '../services/search.service';
import { NgFor, NgIf } from '@angular/common';
import { TodosApiService } from '../services/api/todos-api.service';
import { Todos } from '../models/todos.interface';
import { v4 as uuidv4 } from 'uuid';

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
  filteredTodos = computed(() => {
    const searchValue = this.searchService.searchValue().toLowerCase(); // Get search value and make it lowercase
    return this.allTodos().filter((todo) =>
      todo.text.toLowerCase().includes(searchValue) // Filter todos by text
    );
  });

  searchValueReceived = computed(() => this.searchService.searchValue())

  constructor(
    private searchService: SearchService,
    private todoApiService: TodosApiService,
  ) {
    effect(()=> {
      console.log(this.allTodos())
      console.log(this.filteredTodos())
    })
  }

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
      id: uuidv4(),
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
