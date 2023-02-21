import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  isAdmin: any;
  isUser: any;
  @ViewChild('rewardsModal', { static: true }) rewardsModal: ElementRef;

  constructor(private kc: KeycloakService) {}

  ngOnInit(): void {
    this.isAdmin = this.getAdminRoles();
    this.isUser = this.getUserRoles();
  }

  getAdminRoles() {
    return this.kc
      .getUserRoles()
      .find((role) => (role == 'admin' ? true : false));
  }

  getUserRoles() {
    return this.kc
      .getUserRoles()
      .find((role) => (role == 'user' ? true : false));
  }
}
