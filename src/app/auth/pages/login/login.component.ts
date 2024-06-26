import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  public gettingData = false;

  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    this.gettingData = true;
    const { username, password } = this.myForm.value;

    this.authService.login(username, password).subscribe(
      resp => {
        this.gettingData = false;
        if (!resp.success) Swal.fire('Error', 'Credenciales Incorrectas', 'error');
        else
          if (resp.data.role === 'admin') {
            this.authService.setAuthentication({
              _id: resp.data.userID,
              username: resp.data.username,
              role: resp.data.role,
            }, resp.data.token);
            this.router.navigateByUrl('/admin/operaciones')
          }
          else {
            this.router.navigateByUrl('/login')
            Swal.fire('Error', 'Usted no es Administrador', 'error');
          }
      }
    )

  }
}
