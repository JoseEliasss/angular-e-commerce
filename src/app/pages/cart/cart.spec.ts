import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cart } from './cart';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import this
import { AuthService } from '../../core/authentication/auth';

// Mock Header Component
@Component({
  selector: 'app-header',
  template: '',
  standalone: true,
})
class MockHeader {}

// Mock Footer Component
@Component({
  selector: 'app-footer',
  template: '',
  standalone: true,
})
class MockFooter {}

// Mock AuthService
@Injectable()
class MockAuthService {
  getToken() {
    return null; // simulates not logged in
  }
}

describe('Cart', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useClass: MockAuthService },
        { provide: ActivatedRoute, useValue: {} },
      ],
    })
      .overrideComponent(Cart, {
        set: {
          // ✅ Add CommonModule here so async pipe and *ngIf work
          imports: [CommonModule, MockHeader, MockFooter],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login if not logged in', () => {
    localStorage.removeItem('authState');
    component.goToCheckout();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: '/checkout' },
    });
  });
});
