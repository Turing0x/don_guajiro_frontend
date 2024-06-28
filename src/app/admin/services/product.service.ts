import { Injectable, inject, signal } from "@angular/core";
import { getProductsResult } from "../interfaces/response.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environments";
import { Product } from "../interfaces/product.interface";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class  ProductService {

  private obj = {success: false, api_message: "", data: [] }
  private http = inject(HttpClient);
  private url: string = `${environment.baseUrl}/api/products`;

  public product = signal<getProductsResult>(this.obj);

  getAllProducts(): Observable<getProductsResult>{
    return this.http.get<getProductsResult>(this.url);
  }

  saveProduct(product : Product): Observable<getProductsResult> {
    return this.http.post<getProductsResult>
      (this.url, { ...product });
  }

  updateProduct(product : Product): Observable<getProductsResult> {
    return this.http.put<getProductsResult>
      (this.url, { ...product });
  }

  deleteProduct(productId : string): Observable<getProductsResult> {
    return this.http.delete<getProductsResult>
      (`${this.url}/${productId}`);
  }
}
