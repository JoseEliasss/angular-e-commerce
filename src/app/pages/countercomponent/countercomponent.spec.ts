import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Countercomponent } from './countercomponent';

describe('Countercomponent', () => {
  let component: Countercomponent;
  let fixture: ComponentFixture<Countercomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Countercomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Countercomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
