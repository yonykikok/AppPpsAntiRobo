import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiRoboPage } from './anti-robo.page';

describe('AntiRoboPage', () => {
  let component: AntiRoboPage;
  let fixture: ComponentFixture<AntiRoboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiRoboPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiRoboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
