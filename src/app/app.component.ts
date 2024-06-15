import { AuthService } from './auth/services/auth-service.service';
import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStatus } from './auth/interfaces';
import { UserRole } from './auth/interfaces/roles-users.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Don Guajiro';

  private authService = inject(AuthService);
  private router = inject(Router);

  public authStatusChangedEffect = effect(() => {

    switch (this.authService.authStatus()) {

      case AuthStatus.checking:

      break;

      case AuthStatus.authenticated:
        console.log('autenticado');
        const lastPath = localStorage.getItem('lastPath');
        if ( lastPath ) this.router.navigate([lastPath]);
        else {
          localStorage.setItem( 'lastPath','admin/operaciones')
          this.router.navigate(['/admin']);
        }

      break;

      case AuthStatus.notAuthenticated:
        console.log('no autenticado');
        this.router.navigate(['login']);
        break;
    }
  })


  //navegacion por roles
  navigateByUrl(): string {
    const current = this.authService.currentUser();

    if (!current) {
      this.router.navigate(['login']);
      return '';
    };

    const roles: UserRole = {
      admin: '/admin',
      guest: '/guest',
      commodity: '/commodity',
      seller: '/seller'
    };

    return roles[current!.role! as keyof UserRole];
  }
}
