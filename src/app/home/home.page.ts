import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonButton, IonIcon, IonList, IonCheckbox, IonLabel, IonListHeader } from '@ionic/angular/standalone';
import { Task } from '../core/models/todo.model';

import { CategoryModalComponent } from '../components/category-modal/category-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class HomePage {
  public taskName: string = '';
  public taskList: Task[] = [];

  constructor(private modalCtrl: ModalController) {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.taskList = JSON.parse(storedTasks);
    }
  }

  addTask() {
    const date = new Date();
    const newTask = {
      id: date.getTime().toString(),
      name: this.taskName,
      completed: false,
      createdAt: date.getTime().toString()
    };

    this.taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.taskList));

    this.taskName = '';
  }

  deleteTask(task: Task) {
    if (confirm('Seguro que deseas eliminar la terea')) {
      const index = this.taskList.indexOf(task);
      if (index > -1) {
        this.taskList.splice(index, 1);
      }
    }
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
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



