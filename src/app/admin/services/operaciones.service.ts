import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { Debts, DebtsType } from "../interfaces/debts.interface";
import Swal from "sweetalert2";
import { DebtsTypeResult, DeleteDebtsTypeResult, getDebtsResult, getDebtsTypeResult, getSalesResult } from "../interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class OperacionesService  {

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/api`

  getAllSaveDebtsType(): Observable<DebtsType[]> {
    return this.http.get<getDebtsTypeResult>(`${this.url}/debtsType`,{
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

  saveDebtsType(name: string): Observable<DebtsTypeResult>{
    return this.http.post<DebtsTypeResult>(`${this.url}/debtsType`, {
      headers: this.httpHeaders , name
    }).pipe(
        map(response => response),
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

  deleteDebtsType(_id: string): Observable<DebtsTypeResult>{
    return this.http.delete<DeleteDebtsTypeResult>(`${this.url}/debtsType/${_id}`, {
      headers: this.httpHeaders ,
    }).pipe(
        map(response => response),
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

  saveDebts(debts: Debts): Observable<any> {
    return this.http.post<any>(`${this.url}/debts/${debts.owner}`,{
      headers: this.httpHeaders , ...debts
    }).pipe(
        map(response => response),
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


  getAllDebtsDate(date: string , all : boolean = true): Observable<Debts[]> {

    if ( all ) {
      return this.http.get<getDebtsResult>(`${this.url}/debts`,{
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
    else
    return this.http.get<getDebtsResult>(`${this.url}/debts?date=${date}`,{
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



}
