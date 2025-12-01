import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrbNav } from './crb-lib-nav';

describe('CrbNav', () => {
  let component: CrbNav;
  let fixture: ComponentFixture<CrbNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrbNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrbNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
