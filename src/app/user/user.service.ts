import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { ResultResponse} from '../result.model';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"})
};
@Injectable()
export class UserService {
  userResp: User;
  status:ResultResponse;
  constructor(private http:Http) {}
  addUser(user:User)
  {
    return this.http.post("http://localhost:9003/api/users/", user).map(response => response.json());
  }
  updateUser(user:User)
  {
    return this.http.put("http://localhost:9003/api/users/", user).map(response => response.json());
  }
  getUserList(providerId): Observable<User[]>
  {
     return this.http.get("http://localhost:9003/api/users/provider/"+providerId).map(response => response.json());
  }
  deleteUser(providerId:String, id:String, status:String)
  {
    return this.http.put("http://localhost:9003/api/users/"+id+"/provider/"+providerId+"/status/"+status,"").map(response => response.json());
  }
  getUser(providerId:String, id:String)
  {
    return this.http.get("http://localhost:9003/api/users/"+id+"/provider/"+providerId).map(response => response.json());
  }
}
