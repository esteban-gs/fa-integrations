import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAuthMeComponent } from './client-auth-me.component';

describe('ClientAuthMeComponent', () => {
  let component: ClientAuthMeComponent;
  let fixture: ComponentFixture<ClientAuthMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAuthMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAuthMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
