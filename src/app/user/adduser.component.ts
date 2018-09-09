import {Component, ViewEncapsulation} from '@angular/core';
import {User} from './user.model'; 
import {UserService} from './user.service';
import {ResultResponse} from '../result.model'
import { Router } from '@angular/router';

@Component({
  selector: 'add-user',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AddUserComponent {
  closeResult: String;
  user = new User();
  result: ResultResponse;
  private loading: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

 
  addUser()
  {
    this.loading = true;
    console.log(this.user.fname);
    this.userService.addUser(this.user);
    this.router.navigate(['user']);
  }
}