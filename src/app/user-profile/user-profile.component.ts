import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass'],
})
export class UserProfileComponent implements OnInit {
  userDetails: any = {
    full_name: '',
    email: '',
    designation: '',
    employee_code: '',
    company: 'SpringUp Labs Pvt Ltd. Baner, Pune Office',
    email_verified: '',
    intials: '',
    avatar: '',
  };

  constructor(private kc: KeycloakService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const loggedInUser: any = await this.kc.loadUserProfile();

      this.userDetails.full_name = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
      this.userDetails.email = loggedInUser.email;
      this.userDetails.designation = loggedInUser.attributes.designation[0];
      this.userDetails.employee_code = loggedInUser.attributes.empCode[0];
      this.userDetails.email_verified = loggedInUser.email_verified;

      this.userDetails.intials =
        loggedInUser.firstName.charAt(0) + loggedInUser.lastName.charAt(0);
    } catch (error) {
      console.error('Exception', error);
    }
  }
}
