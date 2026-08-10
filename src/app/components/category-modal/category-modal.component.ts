import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import{FormsModule} from '@angular/forms';
import {ModalController, AlertController } from '@ionic/angular';
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

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {}

  addCategory() {
    if (this.newCategoryName.trim()) {
      this.categories.push({ id: Date.now().toString(), name: this.newCategoryName.trim() });
      localStorage.setItem('categories', JSON.stringify(this.categories));
      this.newCategoryName = '';
    }
  }

  async editCategory(category: Category) {
    const alert = this.alertCtrl.create({
      header: 'Editar Categoría',
      inputs: [
        {
          name: 'categoryName',
          type: 'text',
          value: category.name, 
          placeholder: 'Nombre de la categoría'
        }
      ],
      buttons: [
        {
          text: 'Cancelar', role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.categoryName.trim()) {
              category.name = data.categoryName.trim();
              localStorage.setItem('categories', JSON.stringify(this.categories));
            }
          }
        }
      ]
    });
    await alert.then(alertEl => alertEl.present());
  }

  deleteCategory(category: Category) {
    const index = this.categories.indexOf(category);
    if (index > -1) {
      this.categories.splice(index, 1);
    }
  }

  saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
    this.modalCtrl.dismiss();
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
