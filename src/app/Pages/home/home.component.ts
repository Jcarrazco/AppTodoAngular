import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from './../../Models/task.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  itemText = signal('item left');

  tasks = signal<Task[]>([]);

  filter = signal<'All'|'Pending'|'Completed'>('All');
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if(filter === 'Pending'){
      return tasks.filter(task => !task.Completed);
    }
    if(filter === 'Completed'){
      return tasks.filter(task => task.Completed);
    }
    return tasks;
  })



newTaskControl = new FormControl('', {
  nonNullable: true,
  validators: [
    Validators.required,
    Validators.minLength(3)
  ]
}); 
classTaskControl = new FormControl();

injector = inject(Injector);

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }

    this.trackTask();
  }

  trackTask(){
    effect(() =>{
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector })
  }


  changeHandler(){
    if(this.newTaskControl.valid && ((this.newTaskControl.value).trim().length >= 3) ){
      const value = this.newTaskControl.value;
      this.addTask(value);

      this.newTaskControl.setValue('');
    }
  }

  completeHandler(task: Task){
    task.Completed = !task.Completed;
  }

  updateTask(index: number){
    this.tasks.update((tasks) => 
      {
        return tasks.map((task, position) => {
          if(position === index){
            return {
              ...task,
              Completed : !task.Completed
            }
          }
          return task;
        })
      })
  }

  addTask (title: string){
    const newTask = {
      Id: Date.now(),
      Title: title,
      Completed: false
    };

    this.tasks.update((tasks) => [...tasks, newTask]);
    this.ItemLeftFunc();
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position != index));
    this.ItemLeftFunc();
  }

  ItemLeftFunc(){
    const numItem = this.tasks().length;
    var result = '';

    if(numItem == 1){
      result = 'item left';
    }
    else if (numItem > 1){
      result = 'items left';
    }
    else{
      result = 'Error';
    }

    this.itemText.set(result);
  }

  updateTaskEditingMode(index:  number){
    this.tasks.update((tasks) => 
    {
      return tasks.map((task, position) => {
        if(position === index){
          return {
            ...task,
            Editing: true
          }
        }
        return {
          ...task,
          Editing: false
        };
      })
    })
  }

  updateTaskTitle(index:  number, event: Event){
    const newTitle = (event.target as HTMLInputElement).value;
    this.tasks.update((tasks) => 
    {
      return tasks.map((task, position) => {
        if(position === index){
          return {
            ...task,
            Title: newTitle,
            Editing: false
          }
        }
        return task;
      })
    })
  }

  changeFilter(filter: 'All'|'Pending'|'Completed'){
    this.filter.set(filter);
  }
}
