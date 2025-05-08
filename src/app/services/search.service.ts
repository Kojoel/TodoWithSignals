import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    searchValue = signal('');
    
    constructor() { }
}
