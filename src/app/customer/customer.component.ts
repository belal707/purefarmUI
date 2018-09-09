import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from './model/customer.model';
import { Milk} from './model/milk.model'; 
import { User } from '../user/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss','../app.component.scss']
})
export class CustomerComponent implements OnInit {
  
  constructor(private custService : CustomerService) { }
  customer: Customer [];
  responseResult:String='';
  errorMsg:String;
  display:String;
  cow = new Milk();
  buffalow = new Milk();
  customer2 = new Customer();
  users:User [];
  title:String;
  milkQty:String [];
  ngOnInit() {
    this.display ="none";
    this.errorMsg="";
    this.getList();
    this.title="Add Customer";
    this.addMilkQty();
  }
  addMilkQty()
  {
    this.milkQty = ["NA","0.5","1","1.5","2","2.5", "3","3.5","4","4.5","5"];
  }
  getList()
  {
    this.custService.getCustomerList().subscribe(data=>{
      console.log(data);
      this.customer= <Customer[]> data;
    });
  }
  openWindow()
  {
    this.getDeleveryBoy();
    this.errorMsg="";
    this.display = "block";
    this.title="Add Customer"
    this.customer2 = new Customer();
  }
  editCust(id:String)
  {
    this.getCustomerById(id);
    this.getDeleveryBoy();
    this.errorMsg="";
    this.display = "block";
    this.title = "Edit Customer";
  }
  getCustomerById(id:String)
  {
      this.custService.getCustomerById(id).subscribe(data=>{
        this.customer2 = <Customer>data;
        for(let milk of this.customer2.milks)
        {
          if(milk.milkType=='cow')
          {
            this.cow = milk;
            this.cow.checked = true;
          }else
          {
            this.buffalow = milk;
            this.buffalow.checked = true;
          }
        }
       
        console.log(this.customer2)
      })
  }
  closeWindow()
  {
      this.display = "none";
  }
  addCustomer()
  {
    if(this.cow.checked === true)
    {
        this.cow.milkType = "cow";
        this.customer2.milks.push(this.cow);
    }
    if(this.buffalow.checked === true)
    {
       this.buffalow.milkType = "buffalo";
       this.customer2.milks.push(this.buffalow);
       console.log(this.buffalow.milkType)
    }
    this.customer2.providerId = "1b68b0c3-3fd7-4612-9475-1cf041e7bc77";
    var resp = this.custService.addCustomer(this.customer2).subscribe(data=>{
        console.log(data);
        this.customer2 = new Customer();
        this.cow = new Milk();
        this.buffalow = new Milk();
        this.display ='none';
        this.responseResult = "Successfully added !!!"
        this.getList();
      },
      (err : HttpErrorResponse) =>{
          console.log("error log"+err.error.message);
          this.errorMsg = err.error.message;
      }
    );
  }
  getDeleveryBoy()
  {
    var provider = "1b68b0c3-3fd7-4612-9475-1cf041e7bc77";
    this.custService.getUserListByRole("delevery", provider).subscribe(data=>{
      return this.users = <User[]> data;
    }
  );
  }
}
