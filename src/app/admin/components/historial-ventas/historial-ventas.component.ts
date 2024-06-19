import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, computed, inject } from '@angular/core';

import { getSalesResult } from '../../interfaces/response.interface';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { getDate } from '../../help/getDate';

@Component({
  selector: 'app-historial-ventas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './historial-ventas.component.html'
})
export class HistorialVentasComponent {

  private fb = inject(FormBuilder);
  public salesList = computed<getSalesResult>
    (() => this.salesService.sales());

  constructor(public salesService: SalesService) { }

  ngOnInit(): void { this.seachDate(getDate()); }

  public saleForm: FormGroup = this.fb.group({
    date: ['', Validators.required] });

  seachDate(date?: string) {
    if( !date ) date = getDate(this.saleForm.controls['date'].value);
    this.salesService.getAllSaleDate( date , false).subscribe(
      data => { this.salesService.sales.set({...data}) }
    )
  }

  totalAmount() {
    return this.salesList().data.reduce(
      (acc, item) => acc + item.unities! * item.price!, 0);
  }

}
