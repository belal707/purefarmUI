import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss','../app.component.scss']
})
export class UserComponent implements OnInit {

  userList: User[];
  display:String;
  user = new User();
  errorMsg:String='';
  //providerId:String="1b68b0c3-3fd7-4612-9475-1cf041e7bc77";
  providerId:String ="cec9a5dc-01fe-4df0-aeb8-57514072f69d";
  title:String;
  isEdit:boolean=false;
  constructor(private userService: UserService) { }
  ngOnInit() {
      this.display="none";
      this.listUser();
  }
  listUser()
  {
    this.userService.getUserList(this.providerId).subscribe(data => {
      this.userList = <User[]>data;
      this.isEdit=false;
    },
    (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Error occured" + err.error.message);
        }
    });
  }
  addUser()
  {
    this.userService.addUser(this.user).subscribe(data=>{
      this.display="none";
      this.listUser();
    });
  }
  editUser(id:String)
  {
    this.user.id = id;
    this.userService.updateUser(this.user).subscribe(data=>{
      this.display="none";
      this.listUser();
    });

  }
  cancel()
  {
    this.display="none";
  }
  openWindow()
  {
    this.title="Add User";
    this.display="block";
  }
  deleteUser(id:String)
  {
    var val = confirm("Are you sure, you want to delete?")
    if(val == true)
    {
        this.userService.deleteUser(this.providerId, id,"DELETED").subscribe(data=>{
        this.listUser();
      },(err:HttpErrorResponse) =>
      {
        console.log(err.message);
      });
    }
  }
  getUser(id:String)
  {
    this.userService.getUser(this.providerId, id).subscribe(data=>{
    this.user=<User>data;  
    this.display="block"; 
    this.title="Edit User";
    this.isEdit=true;
    },(err:HttpErrorResponse) =>
    {
        console.log(err.message);
    }
  );
  }
}
