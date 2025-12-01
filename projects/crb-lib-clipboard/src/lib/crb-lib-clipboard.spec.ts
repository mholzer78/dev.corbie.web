import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrbLibClipboard } from './crb-lib-clipboard';

describe('CrbLibClipboard', () => {
  let component: CrbLibClipboard;
  let fixture: ComponentFixture<CrbLibClipboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrbLibClipboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrbLibClipboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
