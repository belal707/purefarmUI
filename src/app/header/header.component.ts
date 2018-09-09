import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../shared/service/keycloak.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private keycloakService:KeycloakService) { }

  ngOnInit() {
  }
  public logout() {
    this.keycloakService.logout();
  }
}
