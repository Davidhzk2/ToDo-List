import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonButton, IonIcon, IonList, IonCheckbox, IonLabel, IonListHeader, IonChip, IonSelect, IonSelectOption} from '@ionic/angular/standalone';
import { Category, Task } from '../core/models/todo.model';

import { CategoryModalComponent } from '../components/category-modal/category-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonList,
    IonCheckbox,
    IonLabel,
    IonListHeader,
    IonChip,
    IonSelect, 
    IonSelectOption
  ],
})
export class HomePage {
  public taskName: string = '';
  public taskList: Task[] = [];
  public selectedCategory: string | null = null;
  public categories: Category[] = [];

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController) {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.taskList = JSON.parse(storedTasks);
    }
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    }
  }

  addTask() {
    const date = new Date();
    const newTask = {
      id: date.getTime().toString(),
      name: this.taskName,
      completed: false,
      createdAt: date.getTime().toString(),
      categoryId: this.selectedCategory || ""
    };

    this.taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.taskList));

    this.taskName = '';
  }

  deleteTask(task: Task) {

    const alert = this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            const index = this.taskList.indexOf(task);
            if (index > -1) {
              this.taskList.splice(index, 1);
              localStorage.setItem('tasks', JSON.stringify(this.taskList));
            }
          }
        }
      ]
    });

    alert.then(alertEl => alertEl.present());
  }

  toggleTaskCompletion(task: Task, event: any) {
    task.completed = event?.detail?.checked ?? !task.completed;
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  async openCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
    });

    await modal.present();
  }
}



