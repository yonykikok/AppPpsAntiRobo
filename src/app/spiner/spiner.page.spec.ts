import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinerPage } from './spiner.page';

describe('SpinerPage', () => {
  let component: SpinerPage;
  let fixture: ComponentFixture<SpinerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
