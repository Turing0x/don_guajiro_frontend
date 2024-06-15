import { User } from '../../interfaces/user.interface';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    username: ['admin', [Validators.required]],
    password: ['0000', [Validators.required]],
  });

  login() {

    const { username, password } = this.myForm.value;

    this.authService.login(username, password).subscribe(
      async data => {
        if (data['user'].role === 'admin') {
          this.authService.setAuthentication(data['user'], data['token']);
          await Swal.fire('Satisfactorio', 'Usted se ha autenticado en la plataforma', 'success')
          this.router.navigateByUrl('/admin/operaciones')
        }
        else {
          await Swal.fire('Error', 'Usted no es Administrador', 'error');
          this.router.navigateByUrl('/login')
        }
      }
    )

  }
}
