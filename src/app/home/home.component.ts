import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Customer } from '../customer/model/customer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderSchedule } from '../customer/model/orderSchedule.model';
import { OrderList } from './orderlist.model';
import { Milk} from '../customer/model/milk.model'; 
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const OrderStatus = ["LEAVE", "ABSENT","SCHEDULED","DELEVERED"]
const MilkTiming = ["morning","evening"]
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','../app.component.scss']
})
export class HomeComponent implements OnInit {

 // providerId="1b68b0c3-3fd7-4612-9475-1cf041e7bc77";
    providerId="cec9a5dc-01fe-4df0-aeb8-57514072f69d";
  status = OrderStatus;
  date = new Date();
  customerList : Customer[];
  customerOrder=new Customer();
  firstWeek = new Array<OrderList>() 
  secondWeek=new Array<OrderList>() 
  thirdWeek=new Array<OrderList>() 
  fourthWeek=new Array<OrderList>() 
  fifthWeek=new Array<OrderList>() 
  sixthWeek=new Array<OrderList>() 
  monthName:String
  cowOrderList = new Array<OrderSchedule>();
  buffaloOrderList = new Array<OrderSchedule>();
  todayDayNum:number=0;
  responseResult:String;
  errorMsg:String='';
  searchBy:String='today';
  displaySchedule:String;
  editSchedulePopup:String;
  constructor(private homeService : HomeService) {}
  ngOnInit() {
    this.responseResult = "";
    this.errorMsg = '';
    this.displaySchedule='none';
    this.editSchedulePopup='none';
    this.getOrderList();
  }
  schedule(id : String)
  {
      this.homeService.scheduleOrder(this.providerId, id).subscribe(data=>{
      this.responseResult= "Successfully scheduled !!!";
      this.getOrderList();
    },(err:HttpErrorResponse)=>{
      this.errorMsg = err.message;
    });
  }
  getBy()
  {
    if(this.searchBy == 'tomorrow')
    {
      this.date.setDate(this.date.getDate() + 1);
    }
    else{
      this.date = new Date();
    }
    this.getOrderList();
  }

  getOrderList()
  {  
      this.homeService.getOrderList(this.providerId, this.date).subscribe( data =>
      {
          this.customerList = <Customer[]> data;
          console.log(this.customerList);
          for(let customer of this.customerList)
          {
            this.findTotalMilkbyQty(customer.orderScheduleList);
          }
      },
      (err:HttpErrorResponse)=>
      {
          this.responseResult = err.message;
          console.log(err.message)
      }
    );
  }
  closeSchedule()
  {
    this.displaySchedule='none';
    this.customerOrder.orderScheduleList = null;
    this.firstWeek = null;
    this.secondWeek=null;
    this.thirdWeek=null;
    this.fourthWeek=null;
    this.fifthWeek=null;
    this.sixthWeek=null;
   
  }
  getOrderScheduleCustomer(id:String)
  {
    if(this.searchBy == 'tomorrow')
    {
      this.date.setDate(this.date.getDate() + 1);
    }
    else
    {
      this.date = new Date();
    }
    if(id !=null && id !='')
    {
      this.displaySchedule='block';
      this.homeService.getCustomerOrderByProviderAndId(this.providerId, id, this.date).subscribe(data =>
      {
            this.customerOrder = <Customer> data;
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var dayNum = firstDay.getDay();
            this.monthName = monthNames[date.getMonth()];
            this.todayDayNum=date.getDate();
            console.log(this.customerOrder)
            this.getCoWAndBuffalowList(dayNum, this.customerOrder);
      },
      (err:HttpErrorResponse)=>
      {
            this.responseResult = err.message;
      }
      );
    }
  }
 /**
  * 
  * @param dayNum 
  * @param customer 
  */
  getCoWAndBuffalowList(dayNum:any, customer:Customer)
  {
    var startDayNum = dayNum-1;
    var endDayNum = 7;
    this.getCowOrderList(customer.orderScheduleList);
    this.firstWeek = new Array<OrderList>() 
    this.secondWeek=new Array<OrderList>() 
    this.thirdWeek=new Array<OrderList>() 
    this.fourthWeek=new Array<OrderList>() 
    this.fifthWeek=new Array<OrderList>() 
    this.sixthWeek=new Array<OrderList>() 
    if(this.buffaloOrderList != null && this.buffaloOrderList.length > 0)
    {
      var count = 0;
      var dateCount =1;
      for(let order of this.buffaloOrderList)
      {
        var flag=0;
        while(flag==0 && count<=35)
        {
          if(count>=startDayNum && count<endDayNum)
          {
            var list = new OrderList();
            list.date= dateCount
            list.id=customer.id;
            list.setOrderScheduleList(order);
            this.firstWeek.push(list);
            flag=1;
            dateCount++;
          }else
          if(count>=7 && count<14)
          {
            var list = new OrderList();
            list.date= dateCount;
            list.id=customer.id;
            list.setOrderScheduleList(order);
            this.secondWeek.push(list);
            flag =1;
            dateCount++;
          }else
          if(count>=14 && count<21)
          {
            var list = new OrderList();
            list.date= dateCount;
            list.id=customer.id;
            list.setOrderScheduleList(order);
            this.thirdWeek.push(list);
            flag =1;
            dateCount++;
          }else
          if(count>=21 && count<28)
          {
            var list = new OrderList();
            list.date= dateCount;
            list.id=customer.id;
            list.setOrderScheduleList(order);
            this.fourthWeek.push(list);
            flag =1;
            dateCount++;
          }else
          if(count>=28 && count<35)
          {
            var list = new OrderList();
            list.date= dateCount;
            list.id=customer.id;
            list.setOrderScheduleList(order);
            this.fifthWeek.push(list);
            flag =1;
            dateCount++
          }else if(count>=35 && count<42)
          {
            var list = new OrderList();
            list.date= dateCount;
            list.id=customer.id;
            list.setOrderScheduleList(order);
            this.sixthWeek.push(list);
            flag =1;
            dateCount++
          }
          else if(count>=0 && count< 7)
          {
            var orderBlank = new OrderSchedule();
            var list = new OrderList();
            list.id=customer.id;
            list.setOrderScheduleList(orderBlank);
            this.firstWeek.push(list);
          }
          count++;
        }
      }
    }
    if(this.cowOrderList != null && this.cowOrderList.length > 0)
    {
      var count = 0;
      var dateCount =1;
      for(let order of this.cowOrderList)
      {
        var flag=0;
        while(flag==0 && count<=35)
        {
          if(count>=startDayNum && count<endDayNum)
          {
            
            if(this.firstWeek.length >=7)
            {
              var orderList = this.firstWeek[count];
              orderList.id=customer.id;
              orderList.date = dateCount;
              orderList.setOrderScheduleList(order);
              this.firstWeek[count] = orderList;
            }
            else
            {
              var list = new OrderList();
              list.date = dateCount;
              list.id=customer.id;
              list.setOrderScheduleList(order);
              this.firstWeek.push(list);
            }
            flag=1;
            dateCount++;
          }
          else
          if(count>=7 && count<14)
          {
           
            if(this.secondWeek.length >=7)
            {
              var orderList = this.secondWeek[count-7];
              orderList.date = dateCount;
              orderList.id=customer.id;
              orderList.setOrderScheduleList(order);
              this.secondWeek[count-7] = orderList;
            }
            else
            {
              var list = new OrderList();
              list.date = dateCount;
              list.id=customer.id;
              list.setOrderScheduleList(order);
              this.secondWeek.push(list);
            }
            flag =1;
            dateCount++;
          }
          else
          if(count>=14 && count<21)
          {
            if(this.thirdWeek.length >=7)
            {
              var orderList = this.thirdWeek[count-14];
              orderList.id=customer.id;
              orderList.date = dateCount;
              orderList.setOrderScheduleList(order);
              this.thirdWeek[count-14] = orderList;
            }
            else
            {
              var list = new OrderList();
              list.date = dateCount;
              list.id=customer.id;
              list.setOrderScheduleList(order);
              this.thirdWeek.push(list);
            }
            flag =1;
            dateCount++;
          }else
          if(count>=21 && count<28)
          {
            if(this.fourthWeek.length >=7)
            {
              var orderList = this.fourthWeek[count-21];
              orderList.date = dateCount;
              orderList.id=customer.id;
              orderList.setOrderScheduleList(order);
              this.fourthWeek[count-21] = orderList;
            }
            else
            {
              var list = new OrderList();
              list.date = dateCount;
              list.id=customer.id;
              list.setOrderScheduleList(order);
              this.fourthWeek.push(list);
            }
            flag =1;
            dateCount++;
          }else
          if(count>=28 && count<35)
          {
            if(this.fifthWeek.length >=7)
            {
              var orderList = this.fifthWeek[count-28];
              orderList.date = dateCount;
              orderList.id=customer.id;
              orderList.setOrderScheduleList(order);
              this.fifthWeek[count-28] = orderList;
            }
            else
            {
              var list = new OrderList();
              list.date = dateCount;
              list.id=customer.id;
              list.setOrderScheduleList(order);
              this.fifthWeek.push(list);
            }
            dateCount++;
            flag =1;
          }
          else if(count>=35 && count<42)
          {
            if(this.sixthWeek.length >=7)
            {
              var orderList = this.sixthWeek[count-35];
              orderList.date = dateCount;
              orderList.id=customer.id;
              orderList.setOrderScheduleList(order);
              this.sixthWeek[count-28] = orderList;
            }
            else
            {
              var list = new OrderList();
              list.date= dateCount;
              list.id=customer.id;
              list.setOrderScheduleList(order);
              this.sixthWeek.push(list);
            }
            flag =1;
            dateCount++
          }
          else if(count>=0 && count< 7)
          {
            var orderBlank = new OrderSchedule();
            if(this.firstWeek.length >=6 )
            {
              var orderList = this.firstWeek[count];
              orderList.id=customer.id;
              orderList.setOrderScheduleList(orderBlank);
              this.firstWeek[count] = orderList;
            }
            else
            {
              var list = new OrderList();
              list.id=customer.id;
              list.setOrderScheduleList(orderBlank);
              this.firstWeek.push(list);
            }
          }
          count++;
        }
      }
    }
    console.log("six:  "+this.sixthWeek)
  }

  /**
   * 
   * Get list of cow and buffelo order list  
   * 
   */
  cowOneLiterQtyMor:number=0;
  cowHalfLiterQtyMor:number=0;
  cowOneLiterQtyEnv:number=0;
  cowHalfLiterQtyEnv:number=0;
  bufOneLiterQtyMor:number=0;
  bufHalfLiterQtyMor:number=0;
  bufOneLiterQtyEnv:number=0;
  bufHalfLiterQtyEnv:number=0;
  /**
   * 
   * @param listSchedule Get milk Quantity for all bott wise;
   */
  findTotalMilkbyQty(listSchedule:Array<OrderSchedule>)
  {
    this.cowOneLiterQtyMor=0;
    this.cowHalfLiterQtyMor=0;
    this.cowOneLiterQtyEnv=0;
    this.cowHalfLiterQtyEnv=0;   
    this.bufOneLiterQtyMor=0;
    this.bufHalfLiterQtyMor=0;
    this.bufOneLiterQtyEnv=0;
    this.bufHalfLiterQtyEnv=0;
    for(let order of listSchedule)
    {
      var qty = order.milkQty;
      var f = qty - Math.floor(qty);
      var h = Math.floor(qty);
      if(order.milkType=='cow')
      {
        if(order.deleveryTime==MilkTiming[0])
        {
          if(h>0)
          {
            this.cowOneLiterQtyMor = this.cowOneLiterQtyMor+h;
          }
          if(f>0)
          {
            this.cowHalfLiterQtyMor ++;
          }
        }
        else // for evening
        {
          if(h>0)
          {
            this.cowOneLiterQtyEnv = this.cowOneLiterQtyEnv + h;
          }
          if(f>0)
          {
            this.cowHalfLiterQtyEnv ++;
          }
        }
      }
      else
      {
           // for morning
       // alert(" buffello H:"+h+"--f:"+f)
        if(order.deleveryTime==MilkTiming[0])
        {
         // alert("buff morning")
          if(h>0)
          {
            this.bufOneLiterQtyMor = this.bufOneLiterQtyMor+h;
           // alert("buff morning 1lt")
          }
          if(f>0)
          {
            this.bufHalfLiterQtyMor++;
           // alert("buff morning 0.5 lt")
          }
        }
        else // for evening
        {
          if(h>0)
          {
            this.bufOneLiterQtyEnv = this.bufOneLiterQtyEnv+h;
          }
          if(f>0)
          {
            this.bufHalfLiterQtyEnv++;
          }
        }
      }
    }
    
  }
  /**
   * 
   * @param listSchedule 
   */
  getCowOrderList(listSchedule:Array<OrderSchedule>)
  {
    this.cowOrderList = new Array<OrderSchedule>(); 
    this.buffaloOrderList = new Array<OrderSchedule>(); 
    for(let order of listSchedule)
    {
      if(order.milkType=='cow')
      {
          this.cowOrderList.push(order);
      }
      else
      {
          this.buffaloOrderList.push(order);
      }
    }
  }
  /**
   * Edit schedule popup
   * @param custId 
   */
  cowCheckBox='false';
  buffCheckBox='false';
  enableDisable(flagc:boolean, flagb:boolean)
  {
    if(flagc)
    {
      this.cowCheckBox='true';
    }else
    {
      this.cowCheckBox='false';
    }
    if(flagb)
    {
      this.buffCheckBox='true';
    }else
    {
      this.buffCheckBox='false';
    }
    
  }
  editSchedule(custId:String, dateNum:number)
  {
    this.orderObjectForEdit= new Array<OrderSchedule>();
    for(let ord of this.customerOrder.orderScheduleList)
    {
      if(ord.dd==dateNum)
      {
        this.schDayNum = dateNum;
        if(ord.milkType=='cow')
        {
          this.cow.milkType=ord.milkType;
          this.cow.milkQty=ord.milkQty;
          this.cow.delevery=ord.deleveryTime;
          this.cow.checked = true;
          if(ord.deleveryStatus==OrderStatus[2])
          {
            this.cow.checked = true;
            this.cowCheckBox='false';
          }
          else
          {
            this.cow.checked = false;
            this.cowCheckBox='true';
          }
          this.cow.status = ord.deleveryStatus;
          this.orderObjectForEdit.push(ord);
        }
        else
        {
          this.buffalow.milkType=ord.milkType;
          this.buffalow.milkQty=ord.milkQty;
          this.buffalow.delevery=ord.deleveryTime;
          if(ord.deleveryStatus==OrderStatus[2])
          {
            this.buffalow.checked = true;
            this.buffCheckBox='false';
          }
          else
          {
            this.buffalow.checked = false;
            this.buffCheckBox='true';
          }
          this.buffalow.status = ord.deleveryStatus;
          this.orderObjectForEdit.push(ord);
        }
      }
    }
    this.addMilkQty();
    this.customerIfForEditSch = custId;
    this.editSchedulePopup="block";
  }
  closeEditMilkSchedule()
  {
    this.editSchedulePopup="none";
    this.cow = new Milk();
    this.buffalow = new Milk();
    this.schDayNum=0;
  }
  milkQty:String [];
  cow = new Milk();
  buffalow = new Milk();
  schDayNum:Number=0;
  customerIfForEditSch:String='';
  orderObjectForEdit= new Array<OrderSchedule>();
  addMilkQty()
  {
    this.milkQty = ["NA","0.5","1","1.5","2","2.5","3","3.5","4","4.5","5"];
  }
  editOrderSchedule()
  {
    for(let editOrder of this.orderObjectForEdit)
    {
      if(editOrder.milkType=='cow')
      {
        editOrder.milkQty = this.cow.milkQty;
        editOrder.deleveryTime=this.cow.delevery;
        // if cow option is not selected
        if(this.cow.checked)
        {
          editOrder.deleveryStatus=this.cow.status;
        }
        else
        {
          editOrder.deleveryStatus=OrderStatus[0];
        }
      }
      else
      {
        editOrder.milkQty = this.buffalow.milkQty;
        editOrder.deleveryTime=this.buffalow.delevery;
        if(this.buffalow.checked)
        {
          editOrder.deleveryStatus=this.buffalow.status;
        }
        else
        {
          editOrder.deleveryStatus=OrderStatus[0];
        }
      }
    }
    this.homeService.editOrder(this.providerId, this.customerIfForEditSch, this.orderObjectForEdit).subscribe(
      data=>{
        alert("updated successfully !!!");
        this.editSchedulePopup="none";
      },
      (err:HttpErrorResponse)=>{
        alert("update failed !!!");
        this.editSchedulePopup="none";
      }
    );
  }
}