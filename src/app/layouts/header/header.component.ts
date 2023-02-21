import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  userDetails: any = {
    full_name: '',
    designation: '',
    intials: '',
  };
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private kc: KeycloakService
  ) {}

  ngOnInit(): void {
    try {
      const user: any = this.kc.getKeycloakInstance().idTokenParsed;

      this.userDetails.full_name = user.name;
      this.userDetails.designation = user.designation;

      this.userDetails.intials =
        user.given_name.charAt(0) + user.family_name.charAt(0);
    } catch (error) {
      console.error('Exception', error);
    }
  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout(): void {
    this.kc.logout(window.location.origin);
  }
}
