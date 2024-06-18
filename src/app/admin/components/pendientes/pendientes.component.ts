import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getDate } from '../../help/getDate';
import { Sale } from '../../interfaces/sales.interface';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { getSalesResult } from '../../interfaces/response.interface';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pendientes.component.html',
  styleUrl: './pendientes.component.css'
})
export class PendientesComponent {

  public salesList = computed<getSalesResult>( () =>  this.salesService.sales());

  private fb = inject(FormBuilder);
  private date: boolean = true;

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.seachDate(getDate());
  }

  public saleForm: FormGroup = this.fb.group({
    date: ['', Validators.required],
  });

  seachDate(date?: string) {
    this.date = true;
    if( !date ) date = getDate(this.saleForm.controls['date'].value);
    this.salesService.getAllSaleDate( date , true).subscribe(
      data => {
        this.salesService.sales.set({...data})
      }
    )
  }

  getAllSale(perding: boolean){
    this.date = false;
    this.saleForm.controls['date'].setValue('');
    this.salesService.getAllSale( perding ).subscribe(
      data => {
        this.salesService.sales.set({...data});
      }
    )
  }

  markSaleAsFinished(index: number, all: boolean = false) {

    if (all) {
      const list_id: string[] = [];
      this.salesList().data.forEach(element => list_id.push(element._id ?? ''));
      this.salesService.markSaleAsFinished(list_id, true).subscribe();
    }
    else this.salesService.markSaleAsFinished(this.salesList().data[index]._id, false).subscribe();

    if( this.date ) this.seachDate();
    else this.getAllSale(false);
  }
}
