import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getDate } from '../../help/getDate';
import { Sale } from '../../interfaces/sales.interface';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-historial-ventas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './historial-ventas.component.html',
  styleUrl: './historial-ventas.component.css'
})
export class HistorialVentasComponent {

  private fb = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);

  public salesList: Sale[] = [];

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.salesService.getAllSale(true).subscribe(
      data => {
        this.salesList = data
        this.cdRef.detectChanges();
      }
    )
    this.cdRef.detectChanges();
  }

  public saleForm: FormGroup = this.fb.group({
    date: ['', Validators.required],
  });

  seachDate() {
    this.salesService.getAllSaleDate(getDate(this.saleForm.controls['date'].value), false).subscribe(
      data => {
        this.salesList = data
        this.cdRef.detectChanges();
      }
    )
    this.cdRef.detectChanges();
  }

  markSaleAsFinished(index: number, all: boolean = false) {

    if (all) {
      const list_id: string[] = [];
      this.salesList.forEach(element => list_id.push(element._id ?? ''));
      this.salesService.markSaleAsFinished(list_id, true).subscribe()
    }
    else
      this.salesService.markSaleAsFinished(this.salesList[index]._id, false).subscribe()
    this.ngOnInit();
    this.cdRef.detectChanges();

  }

}
