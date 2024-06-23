import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl:'./product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  private fb = inject(FormBuilder);
  public debtsForm: FormGroup = this.fb.group({
    entity: ['', Validators.required],
    name: [, Validators.required],
    money: [''],
    cantToBuy: ['', Validators.required],
  });

 }
