import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionGeneratorComponent } from './permission-generator.component';

describe('PermissionGeneratorComponent', () => {
  let component: PermissionGeneratorComponent;
  let fixture: ComponentFixture<PermissionGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
