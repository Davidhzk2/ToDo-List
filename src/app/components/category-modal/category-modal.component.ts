import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import{FormsModule} from '@angular/forms';
import {ModalController } from '@ionic/angular';
import {IonContent, IonTitle, IonHeader, IonIcon, IonToolbar, IonButtons, IonButton, IonItem, IonInput, IonLabel, IonList} from '@ionic/angular/standalone';
import { Category } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonTitle, IonHeader, IonIcon, IonToolbar, IonButtons, IonButton, IonItem, IonInput, IonLabel, IonList],
})
export class CategoryModalComponent implements OnInit {
  public newCategoryName: string = '';
  public categories: Category[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  addCategory() {
    if (this.newCategoryName.trim()) {
      this.categories.push({ id: Date.now().toString(), name: this.newCategoryName.trim() });
      this.newCategoryName = '';
    }
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
