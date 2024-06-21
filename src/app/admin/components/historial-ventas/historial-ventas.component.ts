import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';

import { getSalesResult } from '../../interfaces/response.interface';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { getDate } from '../../help/getDate';
import { CreatePdfService } from '../../services/create.pdf.service';
import pdfMake from 'pdfmake/build/pdfmake';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-ventas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './historial-ventas.component.html'
})
export class HistorialVentasComponent {

  private fb = inject(FormBuilder);
  private createPdfService = inject(CreatePdfService);
  public salesList = computed<getSalesResult>
    (() => this.salesService.sales());

  public amountTotal = computed<{total:number}>(() =>  this.salesService.amountTotal());

  constructor(public salesService: SalesService  , private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { this.seachDate(getDate()); }

  public saleForm: FormGroup = this.fb.group({
    date: ['', Validators.required]
  });

  seachDate(date?: string) {

    if (!date) date = getDate(this.saleForm.controls['date'].value);
    this.salesService.getAllSaleDate(date, false).subscribe(
      data => {
        this.salesService.sales.set({ ...data })
        this.salesService.amountTotal.set({total: this.totalAmountcalc()});
      }
    )
  }
  totalAmountcalc():number {
    let valor = 0;
    this.salesList().data.forEach(item => {
      valor += item.cantToBuy! * item.price!;
    });
    return valor;
  }

  clickPDF() {
    if(this.salesList().data.length === 0){
      Swal.fire('No hay datos', 'No hay datos para generar el Informe(.pdf)', 'warning');
    }
    else {
      let date: string = '';
    (!this.saleForm.controls['date'].value) ? date = getDate(): date = getDate(this.saleForm.controls['date'].value);
    const pdf = pdfMake.createPdf(this.createPdfService.downloadPdf(date,  this.salesList().data));
    pdf.download(`Informe-${date}.pdf`);
    }
  }
}
