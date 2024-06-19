import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

import { getDebtsTypeResult, getSalesResult } from "../interfaces/response.interface";
import { environment } from "../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private http = inject(HttpClient);
  private url: string = `${environment.baseUrl}/api/sales`;

  public sales = signal<getSalesResult>({
    success: false,
    api_message: "",
    data: []
  })

  getAllSaleDate(date: string, pending: boolean) {
    this.resetSiganalSales();
    return this.http.get<getDebtsTypeResult>
      (`${this.url}?date=${date}&pending=${pending}`);
  }

  autorizar(): Observable<getSalesResult> {
    return this.http.get<getSalesResult>(`${this.url}`,);
  }

  getAllSale(pending: boolean): Observable<getSalesResult> {
    return this.http.get<getSalesResult>
      (`${this.url}/pendingAll/${pending}`);
  }

  markSaleAsFinished(id: any, all: boolean = false) {
    if (all) {
      return this.http.put<getSalesResult>
        (`${this.url}/${id[0]}`, { list_id: id });
    }
    else{ return this.http.put<getSalesResult>(`${this.url}/${id}`, {}); }
  }

  resetSiganalSales() {
    this.sales.set({
      success: false,
      api_message: "",
      data: []
    })
  }
}
