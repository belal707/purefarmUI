import { OrderSchedule } from "../customer/model/orderSchedule.model";

export class OrderList 
{
    public id:String;
    public date:Number;
    orderScheduleList = new Array<OrderSchedule>();
    public setOrderScheduleList(order:OrderSchedule)
    {
        this.orderScheduleList.push(order);
    }
    public getOrderScheduleList()
    {
        return this.orderScheduleList.pop();
    }
}