/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HireComponent } from './hire.component';

describe('HireComponent', () => {
  let component: HireComponent;
  let fixture: ComponentFixture<HireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
