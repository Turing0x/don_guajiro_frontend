import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-operaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operaciones.component.html',
  styleUrl: './operaciones.component.css'
})
export class OperacionesComponent {

  private fb = inject(FormBuilder);


  public salesForm: FormGroup = this.fb.group({
    Id: ['', Validators.required],
    Fecha: [Date.now(), Validators.required],
    Mesa: ['', Validators.required],
  });
}
