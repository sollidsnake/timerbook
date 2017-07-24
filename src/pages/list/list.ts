import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NewPage } from '../new/new';
import { Book } from '../../models/book';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  books: Array<Book>;
  newPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              storage: Storage) {
    this.newPage = NewPage;

    storage.get('books').then((books) => {
      this.books = books;
    });
  }

  itemTapped(event, item: Book, id) {
    this.navCtrl.push(NewPage, {id: this.books.indexOf(item)});
  }

  openNew() {
    this.navCtrl.push(NewPage);
  }
}
