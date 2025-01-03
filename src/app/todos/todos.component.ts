import { Component } from '@angular/core';
import { SearchbarComponent } from '../components/shared/searchbar/searchbar.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

}
