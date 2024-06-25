import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterViewInit, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getDebtsTypeResult } from '../../interfaces/response.interface';
import { OperacionesService } from '../../services/operaciones.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { getDate } from '../../help/getDate';

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
  // ngAfterViewInit(): void {
  //   const saveButton = document.getElementById("save-button-debts");

  //   saveButton?.addEventListener("keydown", (event) => {
  //     if (event.key === "Enter") {
  //       // Llama a la función que deseas ejecutar aquí
  //       console.log('siiii');

  //     }
  //   });
  // }

  async ngOnInit(){
    this.operacionesService.getAllSaveDebtsType().subscribe(
    data => { this.operacionesService.debtsType.set({...data})})
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
          this.operacionesService.saveDebts(this.debtsForm.value)
            .subscribe(
              response => {
                console.log(response);
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
        this.operacionesService.saveDebtsType(this.debtsTypeForm.controls['name'].value)
          .subscribe(
            response => {
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
        this.operacionesService.deleteDebtsType(this.debtsTypeList().data[index]._id ?? '')
          .subscribe(
            response => {
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
