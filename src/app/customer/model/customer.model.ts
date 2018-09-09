import {Milk} from './milk.model'; 
import { OrderSchedule } from './orderSchedule.model';
export class Customer
{
    id:String;
    fname:String;
    lname:String;
    primaryMob:String;
    secondryMob:String;
    sAddress:String;
    address:String;
    emailId:String;
    status:string;
    postalCode:String;
    providerId:String;
    deleveryBoy:String;
    milks: Array<Milk> = [];
    orderScheduleList:OrderSchedule[];
}