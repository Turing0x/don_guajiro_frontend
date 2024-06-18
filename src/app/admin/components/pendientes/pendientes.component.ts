import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, computed, inject } from '@angular/core';

import { SalesService } from '../../services/sales.service';
import { getSalesResult } from '../../interfaces/response.interface';
import { CommonModule } from '@angular/common';
import { getDate } from '../../help/getDate';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pendientes.component.html'
})
export class PendientesComponent {

  public salesList = computed<getSalesResult>(
    () => this.salesService.sales());

  private fb = inject(FormBuilder);

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.seachDate(getDate());
  }

  public saleForm: FormGroup = this.fb.group({
    date: ['', Validators.required],
  });

  seachDate(date?: string) {
    if( !date ) date = getDate(this.saleForm.controls['date'].value);
    this.salesService.getAllSaleDate( date , true).subscribe(
      data => {
        this.salesService.sales.set({...data})
      }
    )
  }

  getAllSale(perding: boolean){
    this.saleForm.controls['date'].setValue('');
    this.salesService.getAllSale( perding ).subscribe(
      data => {
        this.salesService.sales.set({...data});
      }
    )
  }

  markSaleAsFinished(id: string, all: boolean = false) {

    if (all) {
      const list_id: string[] = [];
      this.salesList().data.forEach(element => list_id.push(element._id ?? ''));
      this.salesService.markSaleAsFinished(list_id, true).subscribe();

      this.salesService.sales().data = [];
    }
    else {
      this.salesService.markSaleAsFinished(
        id, false).subscribe();
    
      this.salesService.sales().data =
        this.salesService.sales().data.filter(
          element => element._id !== id);
    }

  }
}
