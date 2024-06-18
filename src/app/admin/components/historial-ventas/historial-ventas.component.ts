import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getDate } from '../../help/getDate';
import { Sale } from '../../interfaces/sales.interface';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { getSalesResult } from '../../interfaces/response.interface';

@Component({
  selector: 'app-historial-ventas',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './historial-ventas.component.html',
  styleUrl: './historial-ventas.component.css'
})
export class HistorialVentasComponent {

  private fb = inject(FormBuilder);
  public salesList = computed<getSalesResult>( () =>  this.salesService.sales())

  constructor(public salesService: SalesService) { }

  ngOnInit(): void {
    this.seachDate(getDate());
  }

  public saleForm: FormGroup = this.fb.group({
    date: ['', Validators.required],
  });

  seachDate(date?: string) {
    if( !date ) date = getDate(this.saleForm.controls['date'].value);
    this.salesService.getAllSaleDate( date , false).subscribe(
      data => {
        this.salesService.sales.set({...data})
      }
    )
  }

  // markSaleAsFinished(index: number, all: boolean = false) {

  //   if (all) {
  //     const list_id: string[] = [];
  //     this.salesList.forEach(element => list_id.push(element._id ?? ''));
  //     this.salesService.markSaleAsFinished(list_id, true).subscribe()
  //   }
  //   else
  //     this.salesService.markSaleAsFinished(this.salesList[index]._id, false).subscribe()
  //   this.ngOnInit();
  //   this.cdRef.detectChanges();

  // }

}
