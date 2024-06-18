import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OperacionesService } from '../../services/operaciones.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { getDate } from '../../help/getDate';
import { DebtsType } from '../../interfaces/debts.interface';
import { DeleteDebtsTypeResult, getDebtsTypeResult } from '../../interfaces/response.interface';

@Component({
  selector: 'app-operaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operaciones.component.html',
  styleUrl: './operaciones.component.css'
})
export class OperacionesComponent  {

  private fb = inject(FormBuilder);

  public debtsTypeList = computed<getDebtsTypeResult>( () =>  this.operacionesService.debtsType());

  constructor(private operacionesService: OperacionesService) { }

  async ngOnInit(){
     this.operacionesService.getAllSaveDebtsType().subscribe(
      data => {
        this.operacionesService.debtsType.set({...data})
      }
      )
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
        text: "Ésta acción eliminará por completo al usuario del sistema.",
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
                if (response.success) this.ShowMessage('Registro completado', 'success');
                else this.ShowMessage(response.api_message, 'error');
              }
            )
        }
      });
  }

  SaveDebtsType() {
    Swal.fire({
      title: "Estás seguro?",
      text: "Ésta acción eliminará por completo al usuario del sistema.",
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
                this.ShowMessage('Registro completado', 'success');
                this.operacionesService.debtsType.set({...response})
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
                this.ShowMessage('Eliminar completado', 'success');
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
