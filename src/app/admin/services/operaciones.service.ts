import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { getDebtsResult, getDebtsTypeResult } from "../interfaces/response.interface";
import { environment } from "../../../environments/environments";
import { Debts } from "../interfaces/debts.interface";

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  private obj = {success: false, api_message: "", data: [] }

  public debtsType = signal<getDebtsTypeResult>(this.obj);
  public debts = signal<getDebtsResult>(this.obj);

  private http = inject(HttpClient);
  private url: string = `${environment.baseUrl}/api`;

  getAllSaveDebtsType(): Observable<getDebtsTypeResult> {
    return this.http.get<getDebtsTypeResult>
      (`${this.url}/debtsType`);
  }

  saveDebtsType(name: string): Observable<getDebtsTypeResult> {
    return this.http.post<getDebtsTypeResult>
      (`${this.url}/debtsType`, { name });
  }

  deleteDebtsType(_id: string): Observable<getDebtsTypeResult> {
    return this.http.delete<getDebtsTypeResult>
      (`${this.url}/debtsType/${_id}`);
  }

  saveDebts(debts: Debts): Observable<getDebtsTypeResult> {
    return this.http.post<any>
      (`${this.url}/debts`, debts);
  }

  getAllDebtsDate(date: string, all: boolean = true): Observable<getDebtsResult> {
    return this.http.get<getDebtsResult>
      (`${this.url}/debts${!all ? `?date=${date}` : ''}`);
  }
}
