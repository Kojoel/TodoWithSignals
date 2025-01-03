import { Component } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

  inputValue!: string;

  constructor(
    private searchService: SearchService,
  ) {}

  setInputValue(event: Event) {
    const value = event.target as HTMLInputElement;
    this.inputValue = value.value;
  }

  updateSearchValue() {
    this.searchService.searchValue.set(this.inputValue);
  }

}
