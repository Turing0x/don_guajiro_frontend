import { RouterModule, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../auth/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ CommonModule,RouterOutlet, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  private authService = inject(AuthService);

  logout() {
    Swal.fire({
      title: "Estás seguro?",
      text: "Ésta acción te va a desautenticar del Sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) this.authService.logout();
    });
  }
  navegareUrl(url: string) {
    localStorage.setItem('lastPath', url)
  }

}
