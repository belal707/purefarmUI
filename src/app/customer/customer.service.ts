import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Customer } from './model/customer.model';
import { User } from '../user/user.model';
import { Observable } from 'rxjs/Observable';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" })
};
@Injectable()
export class CustomerService {
  constructor(private httpClient: Http) { }
  providerId:String="1b68b0c3-3fd7-4612-9475-1cf041e7bc77";
  getCustomerList() :Observable<Customer[]> {
    return this.httpClient.get("http://localhost:9001/api/customers/"+this.providerId).map(response => response.json());
  }

  getCustomerById(id:String) :Observable<Customer> {
    return this.httpClient.get("http://localhost:9001/api/customers/"+id+"/provider/"+this.providerId) .map(response => response.json());
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post("http://localhost:9001/api/customers/", customer) .map(response => response.json());
  }
  getUserListByRole(role: String, provider: String): Observable<User[]>{
    return this.httpClient.get("http://localhost:9003/api/users/provider/" + provider + "/role/" + role).map(response => response.json());
  }
}
