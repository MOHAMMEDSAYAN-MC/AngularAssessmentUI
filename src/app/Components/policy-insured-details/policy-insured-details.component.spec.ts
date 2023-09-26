import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyInsuredDetailsComponent } from './policy-insured-details.component';

describe('PolicyInsuredDetailsComponent', () => {
  let component: PolicyInsuredDetailsComponent;
  let fixture: ComponentFixture<PolicyInsuredDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyInsuredDetailsComponent]
    });
    fixture = TestBed.createComponent(PolicyInsuredDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
