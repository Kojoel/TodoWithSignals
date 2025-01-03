import { Component, computed, effect, signal } from '@angular/core';
import { SearchbarComponent } from '../components/shared/searchbar/searchbar.component';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

  isTodoItemHovered: boolean = false;
  isCheckboxChecked: boolean = false;

  searchValueReceived = computed(() => this.searchService.searchValue())

  constructor(
    private searchService: SearchService,
  ) {
    // effect(() => {
    //   console.log("searched item: ", this.searchValueReceived())
    // })
  }

  setToHovered() {
    this.isTodoItemHovered = true;

  }

  setToNotHovered() {
    this.isTodoItemHovered = false;
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.isCheckboxChecked = true;
    } else {
      this.isCheckboxChecked = false;
    }
  }


}
