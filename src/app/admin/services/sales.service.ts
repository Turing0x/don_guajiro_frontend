import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environments";
import { Sale } from "../interfaces/sales.interface";
import { Observable, map, catchError, throwError } from "rxjs";
import Swal from "sweetalert2";
import { getDebtsTypeResult, getSalesResult } from "../interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/api/sales`

  getAllSaleDate(date: string , pending:boolean): Observable<Sale[]> {
    return this.http.get<getSalesResult>(`${this.url}?date=${date}&pending=${pending}`,{
      headers: this.httpHeaders
    }).pipe(
        map(response => response.data),
        catchError(e => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          )
          return throwError(() => e)
        })
      );
  }

  autorizar(id: string , pending:boolean): Observable<Sale[]> {
    return this.http.get<getSalesResult>(`${this.url}`,{
      headers: this.httpHeaders
    }).pipe(
        map(response => response.data),
        catchError(e => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          )
          return throwError(() => e)
        })
      );
  }

  getAllSale( pending:boolean): Observable<Sale[]> {
    return this.http.get<getSalesResult>(`${this.url}/pendingAll/${pending}`,{
      headers: this.httpHeaders
    }).pipe(
        map(response => response.data),
        catchError(e => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          )
          return throwError(() => e)
        })
      );
  }

  markSaleAsFinished(id:any , all: boolean = false){
    if( all )
      return this.http.put<getSalesResult>(`${this.url}/${id[0]}`,{
        headers: this.httpHeaders ,list_id: id
      }).pipe(
          map(response => response.data),
          catchError(e => {
            Swal.fire(
              'Error Interno',
              'Ha ocurrido algo grave. Contacte a soporte por favor',
              'error'
            )
            return throwError(() => e)
          })
        );
    else
    return this.http.put<getSalesResult>(`${this.url}/${id}`,{
      headers: this.httpHeaders ,
    }).pipe(
        map(response => response.data),
        catchError(e => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          )
          return throwError(() => e)
        })
      );
  }




}
