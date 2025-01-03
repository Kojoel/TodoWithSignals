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
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
  ) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe(value => {
      this.searchService.searchValue.set(value)
    })
  }

  setInputValue(event: Event) {
    const value = event.target as HTMLInputElement;
    this.inputValue = value.value;
    this.searchSubject.next(this.inputValue);
  }

  updateSearchValue() {
    this.searchService.searchValue.set(this.inputValue);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
