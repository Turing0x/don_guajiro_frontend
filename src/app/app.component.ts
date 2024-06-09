import { AuthService } from './auth/services/auth-service.service';
import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStatus } from './interfaces';
import { UserRole } from './interfaces/roles-users.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'don_guajiro_frontend';

  private authService = inject(AuthService);
  private router = inject(Router);


  public authStatusChangedEffect = effect(() => {

    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        console.log('autenticado');
        this.router.navigateByUrl('/admin');
        return;

      case AuthStatus.notAuthenticated:
        console.log('no autenticado');
        this.router.navigate(['login']);
        return;
    }
  })


  //navegacion por roles
  navigateByUrl(): string {
    const current = this.authService.currentUser();

    if(!current) {
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
