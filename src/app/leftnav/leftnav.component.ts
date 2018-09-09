import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../shared/service/keycloak.service';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LeftnavComponent implements OnInit {
  profile:User;
  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.profile = this.keycloakService.getUser();
  }

}
export class User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}