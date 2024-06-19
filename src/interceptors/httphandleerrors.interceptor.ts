import type { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const httphandlerrorsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(e => {
      Swal.fire(
        'Error Interno',
        'Ha ocurrido algo grave. Contacte a soporte por favor',
        'error'
      )
      return throwError(() => e)
    })
  );
};
