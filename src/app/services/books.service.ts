import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private books: any[] = [
    // {id: 1, name: "Book 1", image: "", isCompleted: false, isFav: false},
    // {id: 2, name: 'Book 2', image: "", isCompleted: false, isFav: false},
    // {id: 3, name: 'Book 3', image: "", isCompleted: false, isFav: false}
  ]
  filteredBooks = new BehaviorSubject<any[]>(this.getCopyOfObj(this.books))
  filter: string = 'all'

  jsonURl: string = 'http://localhost:4200/assets/data/books.json'

  constructor(
    private http: HttpClient
  ) { }

  loadBooks() {
    this.http.get(this.jsonURl)
    .subscribe((res: any) => {
      this.books = res.books.map((book: any) => ({...book, isCompleted: false, isFav: false}))
      this.filteredBooks.next(this.getCopyOfObj(this.books))
    }, err => console.log(err))
    // API Call
  }

  getCopyOfObj(obj: any) {
    return JSON.parse(JSON.stringify(obj))
  }

  getBooks() {
    return this.filteredBooks
  }

  addBookToCompleted(id: number) {
    this.books = this.books.map(book => {
      if(book.id !== id) return book
      return {
        ...book,
        isCompleted: true
      }
    })
    this.filteredBooks.next(this.getCopyOfObj(this.books))
  }

  addBookToWishlist(id: number) {
    this.books = this.books.map(book => {
      if(book.id !== id) return book
      return {
        ...book,
        isFav: true
      }
    })
    this.filteredBooks.next(this.getCopyOfObj(this.books))
  }

  setFilter(val: string) {
    this.filter = val
    const books = this.books.filter(book => {
      if(val === 'All') return true

      return val === 'Completed' ? book.isCompleted : book.isFav
    })
    this.filteredBooks.next(books)
  }
}
