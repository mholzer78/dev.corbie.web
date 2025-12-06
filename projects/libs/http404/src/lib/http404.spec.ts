import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Http404 } from './http404';

describe('Http404', () => {
  let component: Http404;
  let fixture: ComponentFixture<Http404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Http404]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Http404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
