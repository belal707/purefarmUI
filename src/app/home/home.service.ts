import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderSchedule } from '../customer/model/orderSchedule.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../customer/model/customer.model';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"})
};
@Injectable()
export class HomeService {

  constructor(private httpClient: Http) { }

  getOrderList(providerId : String, date:Date): Observable<Customer[]>
  {
     return this.httpClient.get("http://localhost:9001/api/orders/provider/"+providerId+"/getAllScheduleOrder/"+date)
     .map(response => response.json());
  }
  getCustomerOrderByProviderAndId(providerId : String, id:String, date:Date) : Observable<Customer>
  {
      return this.httpClient.get("http://localhost:9001/api/orders/customer/"+id+"/provider/"+providerId+"/scheduleDate/"+date).map(response => response.json());
  }

  scheduleOrder(providerId : String, customerId : String) :Observable<Customer[]>
  {
      return this.httpClient.post("http://localhost:9001/api/orders/provider/"+providerId+"/customer/"+customerId+"/scheduleOrder","").map(response => response.json());
  }
  editOrder(providerId : String, customerId : String, orderList:OrderSchedule[]) : Observable<String>
  {
    return this.httpClient.put("http://localhost:9001/api/orders/provider/"+providerId+"/customer/"+customerId,orderList).map(response => response.json());
  }
}
