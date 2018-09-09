
import { Contract } from '../shared/model/contract.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user.model';
import { environment } from './../../environments/environment.prod';
import { UserComponent } from '../user/user.component';

@Injectable()
export class DefaultService {

  constructor(private http:Http) { }

  public getContracts(providerId:String, date:Date): Observable<String> {

     const url = "http://localhost:9003/api/users/provider/"+providerId;
     // const url = "http://localhost:9001/api/orders/provider/"+providerId+"/getAllScheduleOrder/"+date
     //const url = "http://localhost:9003/api/contracts";
      return this.http.get(url).map(response => response.json());
  }

}
