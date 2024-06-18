import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { environment } from "../../../environments/environments";
import { Sale } from "../interfaces/sales.interface";
import { Observable, map, catchError, throwError } from "rxjs";
import Swal from "sweetalert2";
import { getDebtsTypeResult, getSalesResult } from "../interfaces/response.interface";
import { SignalsResponseResult } from "../interfaces/signalsResponseResult.interface";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private http = inject(HttpClient)
  private url: string = `${environment.baseUrl}/api/sales`

  public sales = signal<getSalesResult>({
    success: false,
    api_message: "",
    data: []
  })

  getAllSaleDate(date: string, pending: boolean) {

    this.resetSiganalSales()
    return this.http.get<getDebtsTypeResult>(`${this.url}?date=${date}&pending=${pending}`)
      .pipe(
        map(response => response)
      )
  }

  autorizar(id: string, pending: boolean): Observable<getSalesResult> {
    return this.http.get<getSalesResult>(`${this.url}`,)
      .pipe(
        map(response => response),
      );
  }

  getAllSale(pending: boolean): Observable<getSalesResult> {
    return this.http.get<getSalesResult>(`${this.url}/pendingAll/${pending}`,)
      .pipe(
        map(response => response),
      );
  }

  markSaleAsFinished(id: any, all: boolean = false) {
    if (all)
      return this.http.put<getSalesResult>(`${this.url}/${id[0]}`, {
        list_id: id
      }).pipe(
        map(response => response),
      );
    else
      return this.http.put<getSalesResult>(`${this.url}/${id}`, {}).pipe(
        map(response => response),
      );
  }

  resetSiganalSales() {
    this.sales.set({
      success: false,
      api_message: "",
      data: []
    })
  }
}
