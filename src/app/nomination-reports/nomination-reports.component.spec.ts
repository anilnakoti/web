import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationReportsComponent } from './nomination-reports.component';

describe('NominationReportsComponent', () => {
  let component: NominationReportsComponent;
  let fixture: ComponentFixture<NominationReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
