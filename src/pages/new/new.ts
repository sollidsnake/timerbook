import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ListPage } from '../list/list';
import { AlertController } from 'ionic-angular';

import { Book } from '../../models/book';

/**
 * Generated class for the NewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
  inputs: ['id'],
})
export class NewPage {
  book: Book;
  id: number = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage, private alertCtrl: AlertController) {
    this.book = {};
  }

  ngOnInit() {
    let id = this.navParams.get('id');

    if (id >= 0) {
      this.id = id;
      this.storage.get('books').then((books) => {
        this.book = books[id];
      });
    }
  }

  deleteMe(id, callbackAfter: () => any = null) {
    this.storage.get('books').then((books) => {
      books.splice(id, 1);
      this.storage.set('books', books);
      callbackAfter();
    });
  }

  confirmDelete() {
    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
      },
        {
        text: 'Delete',
        handler: () => {
          this.deleteMe(this.id, () => { this.navCtrl.push(ListPage); });
        }
      }
      ]
    });
    alert.present();
  }

  submit() {
    this.storage.get('books').then((books) => {
      if (books == null) {
        books = [];
      }

      let book = this.book;

      if (this.id === null) {
        book.id = books.length;
        books.push(book);
      }
      else {
        books.id = this.id;
        books[this.id] = book;
      }
      this.storage.set('books', books);

      this.navCtrl.setRoot(ListPage, {}, {animate: true});
    });
  }
}
