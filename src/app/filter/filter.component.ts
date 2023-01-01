import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  selectedFilter: string = 'All';
  filters: string[] = ['All', 'Completed', 'Wishlist'];

  constructor(
    private booksSrv: BooksService
  ) {}

  handleFilterChange(val: string) {
    this.selectedFilter = val;
    this.booksSrv.setFilter(val);
  }
}
