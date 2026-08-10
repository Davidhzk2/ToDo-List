import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonButton, IonIcon, IonList, IonCheckbox} from '@ionic/angular/standalone';

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
  ],
})
export class HomePage {
  public taskName: string = '';
  public taskList: Task[] = [];

  constructor() {
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
}


export interface Task {
  id:string,
  name: string;
  completed:boolean;

}
