import { Component, OnInit } from '@angular/core';
import { RewardsService } from '../rewards/rewards.service';

@Component({
  selector: 'app-nomination-reports',
  templateUrl: './nomination-reports.component.html',
  styleUrls: ['./nomination-reports.component.sass'],
})
export class NominationReportsComponent implements OnInit {
  selectedDate: any;

  filteredNomination: any[] = [
    {
      id: '',
      empCode: '',
      votes: '',
    },
  ];

  constructor(private _rewards: RewardsService) {}

  ngOnInit(): void {
    this.getFilterNominationwithVotes();
  }

  getFilterNominationwithVotes() {
    this.filteredNomination = [];
    this._rewards.getAllNomination().subscribe((nominations: any) => {
      // Create an empty object to store the vote count for each nominee
      let voteCount: any = {};

      // Loop through the array of votes and increment the vote count for each nominee
      for (let i = 0; i < nominations.length; i++) {
        let nominee: any = nominations[i].nominee;
        if (voteCount[nominee]) {
          voteCount[nominee]++;
        } else {
          voteCount[nominee] = 1;
        }
      }

      // Print the vote count for each nominee
      for (let nominee in voteCount) {
        this.filteredNomination.push({
          id: this.filteredNomination.length + 1,
          empCode: nominee,
          votes: voteCount[nominee],
        });
      }
    });
  }

  onDateChange(newDate: any) {
    console.log(this.selectedDate);

    console.log(newDate);
  }
}
