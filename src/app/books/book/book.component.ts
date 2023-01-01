import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit{
  @Input() book: any
  @Output() onComplete = new EventEmitter<number>();
  @Output() onWishlist = new EventEmitter<number>();

  ngOnInit() {}

  handleComplete() {
    console.log("handle complete: ", this.book.id)
    this.onComplete.emit(this.book.id)
  }

  handleWishlist() {
    console.log("handle wishlist:: ", this.book.id)
    this.onWishlist.emit(this.book.id)
  }
}
