import { ChangeDetectorRef, Component, OnInit, computed, inject } from '@angular/core';
import { Sale } from '../../interfaces/sales.interface';
import { SalesService } from '../../services/sales.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getDate } from '../../help/getDate';
import { OperacionesService } from '../../services/operaciones.service';
import { Debts } from '../../interfaces/debts.interface';
import { getDebtsResult, getDebtsTypeResult, getSalesResult } from '../../interfaces/response.interface';

@Component({
  selector: 'app-historial-operaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './historial-operaciones.component.html',
  styleUrl: './historial-operaciones.component.css'
})
export class HistorialOperacionesComponent implements OnInit {

  private fb = inject(FormBuilder);

  public debtsList = computed<getDebtsResult>(() => this.operacionesService.debts());

  constructor(private operacionesService: OperacionesService) { }

  ngOnInit(): void {
    this.operacionesService.getAllDebtsDate(getDate(), false).subscribe(

      data => {
        this.operacionesService.debts.set({ ...data })
      }
    )
  }

  public saleForm: FormGroup = this.fb.group({
    date: ['', Validators.required],
  });

  seachDate(all: boolean = true) {
    this.operacionesService.getAllDebtsDate(getDate(this.saleForm.controls['date'].value), all).subscribe(
      data => {
        this.operacionesService.debts.set({ ...data });
      }
    )
  }
}
