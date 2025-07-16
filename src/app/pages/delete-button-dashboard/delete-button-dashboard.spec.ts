import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonDashboard } from './delete-button-dashboard';

describe('DeleteButtonDashboard', () => {
  let component: DeleteButtonDashboard;
  let fixture: ComponentFixture<DeleteButtonDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteButtonDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteButtonDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
