import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { IStore } from "../interfaces/stores.interface";
import { IDetailsOrder, IOrder } from "../interfaces/order.interface";

@
Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


  getStores(): Observable<IStore[]> {
    return this.http.get<IStore[]>(`${this.apiURL}/stores`)
  }

  saveOrder(order: IOrder):Observable<any>{
    return this.http.post<any>(`${this.apiURL}/orders`, order)
  }

  saveDetailsOrder(details:IDetailsOrder): Observable<IDetailsOrder>{
    return this.http.post<IDetailsOrder>(`${this.apiURL}/detailsOrders`, details);
  }
}
