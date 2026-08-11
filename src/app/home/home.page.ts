import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import {
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
} from '@ionic/angular/standalone';
import { Category, Task } from '../core/models/todo.model';
import { combineLatest, map } from 'rxjs';

import { CategoryModalComponent } from '../components/category-modal/category-modal.component';
import { TodoService } from '../core/services/todo.service';

import { RemoteConfigService } from '../core/services/remote-config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
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
  public selectedCategory: string | null = null;

  public todoService = inject(TodoService);
  private remoteConfigService = inject(RemoteConfigService);
  private modalCtrl = inject(ModalController);
  private alertCtrl = inject(AlertController);

  public categories$ = this.todoService.categories$;
  public selectedCategory$ = this.todoService.selectedCategory$;

  isCategoriesEnabled$ = this.remoteConfigService.categoriesEnabled$;

  public filteredTasks$ = combineLatest([
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

      return filtered.map((task) => ({
        ...task,
        categoryName: categoryMap.get(task.categoryId || '') || 'Sin Categoría',
      }));
    }),
  );

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
            await this.todoService.deleteTask(task.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async toggleTaskCompletion(task: Task) {
    await this.todoService.toggleTask(task.id);
  }

  async openCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
    });

    await modal.present();
  }

  async changeTaskCategory(task: Task) {
    const categories = this.todoService.categories$.value;
    const inputs = categories.map((category: Category) => ({
      type: 'radio' as const,
      label: category.name,
      value: category.id,
      checked: task.categoryId === category.id,
    }));

    const alert = await this.alertCtrl.create({
      header: 'Cambiar Categoría',
      subHeader: `Tarea: ${task.name}`,
      inputs: inputs,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: async (selectedCategoryId: string) => {
            if (!selectedCategoryId || selectedCategoryId === task.categoryId)
              return;
            await this.todoService.updateTaskCategory(
              task.id,
              selectedCategoryId,
            );
          },
        },
      ],
    });

    await alert.present();
  }
}
