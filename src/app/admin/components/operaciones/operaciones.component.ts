import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getDebtsTypeResult } from '../../interfaces/response.interface';
import { OperacionesService } from '../../services/operaciones.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { getDate } from '../../help/getDate';
import { alertLoading } from '../../help/alert-loading';

@Component({
  selector: 'app-operaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operaciones.component.html'
})
export class OperacionesComponent {

  private fb = inject(FormBuilder);

  public debtsTypeList = computed<getDebtsTypeResult>
    (() => this.operacionesService.debtsType());


  constructor(private operacionesService: OperacionesService) { }

  async ngOnInit(){
    alertLoading();
    this.operacionesService.getAllSaveDebtsType().subscribe(
      data => {
        this.operacionesService.debtsType.set({...data})
        Swal.close();
    })
  }

  public debtsForm: FormGroup = this.fb.group({
    type: ['', Validators.required],
    money: [, Validators.required],
    date: [''],
    description: ['', Validators.required],
    owner: ['']
  });

  public debtsTypeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    side: [true, Validators.required]
  });

  saveDebts() {
    const date = getDate();
    const owner = localStorage.getItem('access-token');
    this.debtsForm.controls['owner'].setValue(owner);
    this.debtsForm.controls['date'].setValue(date);

    if (!this.debtsForm.valid) this.ShowMessage('Complete todos los campos', 'error');
    else
      Swal.fire({
        title: "Estás seguro?",
        text: "Esta acción guardará la operación.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if (result.isConfirmed) {
          alertLoading();
          this.operacionesService.saveDebts(this.debtsForm.value)
            .subscribe(
              response => {
                Swal.close();
                if (!response.success)
                  this.ShowMessage(response.api_message, 'error');
              }
            )
        }
      });
  }

  SaveDebtsType() {

    Swal.fire({
      title: "Estás seguro?",
      text: "Esta acción guardará el tipo de operación.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        alertLoading();
        this.operacionesService.saveDebtsType(this.debtsTypeForm.controls['name'].value, this.debtsTypeForm.controls['side'].value)
          .subscribe(
            response => {
              Swal.close();
              if (response.success) {
                this.operacionesService.debtsType.set({ ...response })
                this.debtsTypeForm.controls['name'].setValue('')
              }
              else this.ShowMessage(response.api_message, 'error');
            }
          )
      }
    });
  }

  deleteDebtsType(index: number) {
    Swal.fire({
      title: "Estás seguro?",
      text: "Ésta acción eliminará por completo el tipo de operación del sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        alertLoading();
        this.operacionesService.deleteDebtsType(this.debtsTypeList().data[index]._id ?? '')
          .subscribe(
            response => {
              Swal.close();
              if (response.success) {
                this.operacionesService.debtsType.set({...response})
              }
              else this.ShowMessage(response.api_message, 'error');
            }
          )
      }
    });
  }

  async ShowMessage(message: string, icon: SweetAlertIcon) {
    let title: string = 'Satisfactorio'
    if (icon === 'error') title = 'Error'
    await Swal.fire(title, message, icon)
  }

}
