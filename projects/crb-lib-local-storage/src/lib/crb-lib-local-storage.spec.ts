import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrbLocalStorage } from './crb-lib-local-storage';

describe('CrbLocalStorage', () => {
  let component: CrbLocalStorage;
  let fixture: ComponentFixture<CrbLocalStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrbLocalStorage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrbLocalStorage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
