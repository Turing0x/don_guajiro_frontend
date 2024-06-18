import { Injectable, inject, signal } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { Debts, DebtsType } from "../interfaces/debts.interface";
import Swal from "sweetalert2";
import { DebtsTypeResult, DeleteDebtsTypeResult, getDebtsResult, getDebtsTypeResult, getSalesResult } from "../interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  public debtsType = signal<getDebtsTypeResult>({
    success: false,
    api_message: "",
    data: []
  })

  public debts = signal<getDebtsResult>({
    success: false,
    api_message: "",
    data: []
  })

  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/api`

  getAllSaveDebtsType(): Observable<getDebtsTypeResult> {
    return this.http.get<getDebtsTypeResult>(`${this.url}/debtsType`)
      .pipe(
        map(response => response),
      );
  }

  saveDebtsType(name: string): Observable<getDebtsTypeResult> {
    return this.http.post<getDebtsTypeResult>(`${this.url}/debtsType`, { name })
      .pipe(
        map(response => response),
      );
  }

  deleteDebtsType(_id: string): Observable<getDebtsTypeResult> {
    return this.http.delete<getDebtsTypeResult>(`${this.url}/debtsType/${_id}`).pipe(
      map(response => response),
    );
  }

  saveDebts(debts: Debts): Observable<getDebtsTypeResult> {
    return this.http.post<any>(`${this.url}/debts`, debts).pipe(
      map(response => response),
    );
  }

  getAllDebtsDate(date: string, all: boolean = true): Observable<getDebtsResult> {

    if (all) {
      return this.http.get<getDebtsResult>(`${this.url}/debts`).pipe(
        map(response => response),
      );
    }
    else
      return this.http.get<getDebtsResult>(`${this.url}/debts?date=${date}`).pipe(
        map(response => response),
      );
  }
}
