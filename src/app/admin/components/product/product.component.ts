import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { alertLoading } from '../../help/alert-loading';
import { entity } from '../../help/entity';
import { ProductService } from '../../services/product.service';
import { getProductsResult } from '../../interfaces/response.interface';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {

  private fb = inject(FormBuilder);
  public entity = entity;
  editing: boolean = false;

  public productList = computed<getProductsResult>(
    () => this.productService.product()
  );

  constructor(private productService: ProductService) { this.getAllProduct() }

  getAllProduct() {
    alertLoading();
    this.productService.getAllProducts().subscribe(
      data => {
        this.productService.product.set({
          success: true,
          api_message: 'ok',
          data: data.data.filter(value => value.entity === this.productForm.controls['entity'].value)
        })
        Swal.close();
      }
    )
  }

  public productForm: FormGroup = this.fb.group({
    _id: [],
    entity: [this.entity.entity_01.id],
    name: ['', Validators.required],
    price: [Validators.required],
    inStock: [Validators.required],
    cantToBuy: [1]
  });

  async onSubmit() {
    if (this.productForm.invalid || this.productForm.controls['inStock'].value === null || this.productForm.controls['price'].value === null)
      await Swal.fire('Error', 'Complete todos los campos', 'error')
    else
      Swal.fire({
        title: "Estás seguro?",
        text:
          (!this.editing) ?
            'Desea crear un Producto con la información antes brindada?' :
            'Desea editar el Producto con la información antes brindada?',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if (result.isConfirmed) {
          alertLoading()
          if (!this.editing) {
            this.productService.saveProduct({ ...this.productForm.value, _id: undefined })
              .subscribe(data => {
                Swal.close();
                if (!data.success) {
                  Swal.fire({
                    title: "Error",
                    text: "El producto no ha sido creado",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                  });
                }
                else this.getAllProduct();
              });
          } else {
            this.productService.updateProduct(this.productForm.value)
              .subscribe(data => {
                Swal.close();
                if (!data.success) {
                  Swal.fire({
                    title: "Error",
                    text: "El producto no ha sido actualizado",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                  });
                }
                else this.getAllProduct();
              }
              );
          }
        }
      });
  }

  putTuEdit(product: Product, edit = false) {
    if (!edit) {
      this.editing = false;
      Object.entries(product).forEach(value => {
        if (this.productForm.contains(value[0])) {
          this.productForm.controls[value[0]]
            .setValue(value[1])
        }
      })
      this.productForm.disable()
    } else {
      this.editing = true;
      this.productForm.enable()
      Object.entries(product).forEach(value => {
        if (this.productForm.contains(value[0])) {
          this.productForm.controls[value[0]]
            .setValue(value[1])
        }
      })
    }
  }

  deleteProduct(id: string) {
    Swal.fire({
      title: "Estás seguro?",
      text: "Ésta acción eliminará por completo al producto  del sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        alertLoading()
        this.productService.deleteProduct(id)
          .subscribe(data => {
            Swal.close();
            if (!data.success) {
              Swal.fire({
                title: "Error",
                text: "El producto no ha sido creado",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
            }
            else this.getAllProduct();
          });
      }
    });
  }


  resetForm() {
    this.editing = false;
    this.productForm.reset();
    this.productForm.enable();
    this.productForm.controls['entity'].setValue(this.entity.entity_01.id);
  }

}
