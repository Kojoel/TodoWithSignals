import { Component, computed, effect, signal } from '@angular/core';
import { SearchbarComponent } from '../components/shared/searchbar/searchbar.component';
import { SearchService } from '../services/search.service';
import { NgIf } from '@angular/common';
import { TodosApiService } from '../services/api/todos-api.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [SearchbarComponent, NgIf],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

  isTodoItemHovered: boolean = false;
  isCheckboxChecked: boolean = false;
  selectedItemId!: number;

  allTodos = signal([]);

  searchValueReceived = computed(() => this.searchService.searchValue())

  constructor(
    private searchService: SearchService,
    private todoApiService: TodosApiService,
  ) {
    // effect(() => {
    //   console.log("searched item: ", this.searchValueReceived())
    // })
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.todoApiService.getAllTodos().subscribe({
      next: (res) => {
        this.allTodos.set(res);
        console.log("all todos: ", this.allTodos())
      }
    })
  }

  setToHovered(id: number) {
    this.selectedItemId = id;

    if(id === this.selectedItemId) {
      this.isTodoItemHovered = true;
    }
  }

  setToNotHovered(id: number) {
    this.selectedItemId = id;

    if(id === this.selectedItemId) {
      this.isTodoItemHovered = false;
    }
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.isCheckboxChecked = true;
    }
    else {
      this.isCheckboxChecked = false;
    }
  }


}
