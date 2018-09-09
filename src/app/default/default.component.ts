import { Component, OnInit } from '@angular/core';
import { ContractService } from '../shared/service/contract.service';
import {DefaultService} from './default.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  providerId:String='1b68b0c3-3fd7-4612-9475-1cf041e7bc77';

  date = new Date();
  responseResult:String='';
  constructor(private defaultService:DefaultService) { }

  ngOnInit() {
    this.getOrderList();
  }
  getOrderList()
  {  
    this.defaultService.getContracts(this.providerId, this.date).subscribe(data=>{console.log(data)});
  }
}
