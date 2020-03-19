import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCargoComponent } from './table-cargo.component';

describe('TableCargoComponent', () => {
  let component: TableCargoComponent;
  let fixture: ComponentFixture<TableCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
