import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { signal } from '@angular/core';
import { Person } from './../../Models/person.model';
import { ReactiveFormsModule } from '@angular/forms'; '@angular/forms'

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [RouterOutlet, 
            CommonModule,
            FormsModule,
            ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido';
  tasks = signal([
    'instalar el angular cli',
    'crear proyecto',
    'crear componentes',
    'crear servicio'
  ]);
  name = signal('Jorge');
  age = 30;
  disabled = true;
  imgsrc = 'https://w3schools.com/howto/img_avatar.png';
  person = signal<Person>({
    name: 'Jorge',
    age: 12,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  colorCTLR = new FormControl();
  widthCtrl = new FormControl(50,{
    nonNullable: true
  });
  nameCtrl = new FormControl('Ingrese Nombre',{
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });
  constructor (){
    this.colorCTLR.valueChanges.subscribe(value =>{
      console.log(value);
    });
  }

  clickHandler(){
    alert('Hola')
  }

  changeHandler(event: Event){
    console.log(event);
  }

  changeTextHan(event: Event){
    const input = event.target as HTMLInputElement;
    const newVal = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newVal
      }
    });
  }

  changeHandlerSignal(event: Event){
    const input = event.target as HTMLInputElement;
    const newVal = input.value;
    this.name.set(newVal);
  }

  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newVal = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newVal, 10)
      }
    });
  }

  KeyDownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}
