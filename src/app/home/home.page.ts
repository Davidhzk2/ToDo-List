import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonButton, IonIcon, IonList, IonCheckbox, IonLabel,  IonChip, IonSelect, IonSelectOption} from '@ionic/angular/standalone';
import { Category, Task } from '../core/models/todo.model';
import { combineLatest, map } from 'rxjs';

import { CategoryModalComponent } from '../components/category-modal/category-modal.component';
import {TodoService} from '../core/services/todo.service';

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
    IonChip,
    IonSelect,
    IonSelectOption,
  ],
})
export class HomePage {
  public taskName: string = '';
  public taskList: Task[] = [];
  public selectedCategory: string | null = null;
  public categories$ = this.todoService.categories$;
  selectedCategory$ = this.todoService.selectedCategory$;

  filteredTasks$ = combineLatest([
    this.todoService.tasks$,
    this.todoService.categories$,
    this.todoService.selectedCategory$,
  ]).pipe(
    map(([tasks, categories, selectedCatId]) => {
      const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

      const filtered =
        selectedCatId === 'ALL'
          ? tasks
          : tasks.filter((t) => t.categoryId === selectedCatId);

      // Adjuntar el nombre de la categoría a cada tarea
      return filtered.map((task) => ({
        ...task,
        categoryName:
          categoryMap.get(task.categoryId ? task.categoryId : '') ||
          'Sin Categoría',
      }));
    }),
  );

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public todoService: TodoService,
  ) {}

  onFilterChange(ev: any) {
    this.todoService.setFilter(ev.detail.value);
  }

  async addTask() {
    if (!this.taskName.trim()) return;
    await this.todoService.addTask(
      this.taskName.trim(),
      this.selectedCategory || '',
    );
    this.taskName = '';
    this.selectedCategory = null;
  }

  async deleteTask(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            // Llama al servicio delegando la eliminación y persistencia reactiva
            await this.todoService.deleteTask(task.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async toggleTaskCompletion(task: Task, event: any) {
    task.completed = event?.detail?.checked ?? !task.completed;
    await this.todoService.toggleTask(task.id);
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  async openCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
    });

    await modal.present();
  }

  async changeTaskCategory(task: Task){

    const cateories = this.todoService.categories$.value;
    const inputs = cateories.map((category:Category)=>({
        type:'radio' as const,
        label:category.name,
        value:category.id,
        cheched: task.categoryId ===category.id
    }));

    const alert = await this.alertCtrl.create({
      header:'Cambiar Categoria',
      subHeader:`Tarea: ${task.name}`,
      inputs:inputs,
      buttons:[
        {text:'Cancelar', 
          role:'cancel'},
        {
          text:'Guardar',
          handler:async(selectedCategoryId:string)=>{
            if (selectedCategoryId === task.categoryId) return;

            await this.todoService.updateTaskCategory(task.id, selectedCategoryId);
          }
        } ],

    })

    await alert.present();
  }
}



