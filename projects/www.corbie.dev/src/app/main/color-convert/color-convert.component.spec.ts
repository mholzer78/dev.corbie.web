import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorConvertComponent } from './color-convert.component';

describe('ColorConvertComponent', () => {
  let component: ColorConvertComponent;
  let fixture: ComponentFixture<ColorConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorConvertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
