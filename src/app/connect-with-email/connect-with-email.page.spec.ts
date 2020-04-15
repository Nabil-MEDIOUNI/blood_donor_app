import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectWithEmailPage } from './connect-with-email.page';

describe('ConnectWithEmailPage', () => {
  let component: ConnectWithEmailPage;
  let fixture: ComponentFixture<ConnectWithEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectWithEmailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectWithEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
