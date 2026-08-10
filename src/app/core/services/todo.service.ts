import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Task, Category } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _storage: Storage | null = null;

  public tasks$ = new BehaviorSubject<Task[]>([]);
  public categories$ = new BehaviorSubject<Category[]>([]);
  public selectedCategory$ = new BehaviorSubject<string>('ALL');

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const tasks = (await this._storage.get('tasks')) || [];
    const categories = (await this._storage.get('categories')) || [];
    this.tasks$.next(tasks);
    this.categories$.next(categories);
  }

  async addCategory(name: string) {
    const categories = [
      ...this.categories$.value,
      { id: Date.now().toString(), name },
    ];
    this.categories$.next(categories);
    await this._storage?.set('categories', categories);
  }

  async updateCategory(id: string, name: string) {
    const categories = this.categories$.value.map((category) =>
      category.id === id ? { ...category, name } : category,
    );
    this.categories$.next(categories);
    await this._storage?.set('categories', categories);
  }

  async deleteCategory(id: string) {
    const categories = this.categories$.value.filter((category) => category.id !== id);
    const tasks = this.tasks$.value.map((task) =>
      task.categoryId === id ? { ...task, categoryId: '' } : task,
    );
    this.categories$.next(categories);
    this.tasks$.next(tasks);
    await this._storage?.set('categories', categories);
    await this._storage?.set('tasks', tasks);
  }

  async addTask(title: string, categoryId: string) {
    const task: Task = {
      id: Date.now().toString(),
      name: title,
      completed: false,
      categoryId,
      createdAt: Date.now().toString(),
    };
    const tasks = [...this.tasks$.value, task];
    this.tasks$.next(tasks);
    await this._storage?.set('tasks', tasks);
  }

  async toggleTask(id: string) {
    const tasks = this.tasks$.value.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    this.tasks$.next(tasks);
    await this._storage?.set('tasks', tasks);
  }

  async deleteTask(id: string) {
    const tasks = this.tasks$.value.filter((task) => task.id !== id);
    this.tasks$.next(tasks);
    await this._storage?.set('tasks', tasks);
  }

  setFilter(categoryId: string) {
    this.selectedCategory$.next(categoryId);
  }
}
