import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrbIcons } from './crb-lib-icons';

describe('CrbIcons', () => {
  let component: CrbIcons;
  let fixture: ComponentFixture<CrbIcons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrbIcons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrbIcons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
