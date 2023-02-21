import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';

import { SharedService } from '../shared.service';
import { RewardsService } from './rewards.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.sass'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.5, .5, .5)' }),
        animate(250),
      ]),
      transition('* => void', [
        animate(250, style({ transform: 'scale3d(.0, .0, .0)' })),
      ]),
    ]),
  ],
})
export class RewardsComponent implements OnInit {
  isAlreadyNominated = false;
  isNominationCreated = false;
  isFormSubmitted = false;
  nominations: any[] = [];
  currentUserEmpID: any;

  nominee1: any;
  reason1: any;
  nominee2: any;
  reason2: any;
  usersList: any[] = [
    {
      id: '',
      name: '',
    },
  ];
  displayStyle = 'none';

  constructor(
    private kc: KeycloakService,
    private _users: SharedService,
    private toastrService: ToastrService,
    private _rewards: RewardsService
  ) {}

  ngOnInit(): void {
    this.displayStyle = 'block';
    this.kc.loadUserProfile().then((user: any) => {
      this.currentUserEmpID = user.attributes.empCode[0];
      this.getNominationsByEmpID(this.currentUserEmpID);
    });
    this.getKcUsers();
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  getNominationsByEmpID(empID: any) {
    this._rewards.getNomination(empID).subscribe((res) => {
      this.isAlreadyNominated = res.length > 0 ? true : false;
    });
  }

  getKcUsers() {
    this.usersList = [];
    return this._users.getAllUsers().subscribe((data) =>
      data.forEach((user: any) => {
        this.usersList.push({
          id: user.attributes.empCode[0],
          name: `${user.firstName} ${user.lastName}`,
        });
      })
    );
  }

  onSubmit(e: any) {
    this.isFormSubmitted = true;
    if (this.nominee1 == undefined) {
      this.toastrService.error('Invalid Form', 'Please fill the form');
      this.isFormSubmitted = false;
      return;
    }
    if (this.nominee1 == this.nominee2) {
      this.isFormSubmitted = false;
      this.toastrService.error(
        'Duplicate Nominee!!!',
        'Nominee should be different'
      );
      return;
    } else {
      if (!this.isAlreadyNominated) {
        this.nominations.push(
          {
            nominee: this.nominee1,
            reason: this.reason1,
            nominated_by: this.currentUserEmpID,
          },
          {
            nominee: this.nominee2,
            reason: this.reason2,
            nominated_by: this.currentUserEmpID,
          }
        );
        this._rewards.createNomination(this.nominations).subscribe((res) => {
          if (res.success) {
            this.isNominationCreated = true;
            this.isFormSubmitted = false;
            this.toastrService.success('Nomination created..', 'Success');
          }
        });
      } else {
        this.isFormSubmitted = false;
        this.toastrService.error(
          'Conflict',
          'Your nomination already submitted'
        );
        return;
      }
    }
  }
}
