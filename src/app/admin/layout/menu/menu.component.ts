import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ CommonModule,RouterOutlet, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  private authService = inject(AuthService);


  async logout() {
    await Swal.fire({
      title: "Estás seguro?",
      text: "Ésta acción te va a desautenticar del Sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then(async (result) => {
      if (result.isConfirmed) this.authService.logout();
    });
  }




  navegareUrl(url: string) {
    const pat = localStorage.setItem('lastPath', url)

    // this.router.navigateByUrl(url);
  }


}
