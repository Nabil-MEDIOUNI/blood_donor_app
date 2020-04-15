import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideListPage } from './inside-list.page';

describe('InsideListPage', () => {
  let component: InsideListPage;
  let fixture: ComponentFixture<InsideListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
