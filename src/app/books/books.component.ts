import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: any[] = []

  constructor(
    private booksSrv: BooksService
  ) {}

  ngOnInit() {
    this.booksSrv.loadBooks()
    this.loadBooks()
  }

  loadBooks() {
    this.booksSrv.filteredBooks.subscribe(books => {
      console.log("filteredBooks: ", books)
      this.books = books
    })
  }

  handleComplete(id: number) {
    this.booksSrv.addBookToCompleted(id)
  }

  handleWishlist(id: number) {
    console.log("Book move to wishlist: ", id);
    this.booksSrv.addBookToWishlist(id)
  }
}
