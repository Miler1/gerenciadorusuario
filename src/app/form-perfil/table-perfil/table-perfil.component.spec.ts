import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePerfilComponent } from './table-perfil.component';

describe('TablePerfilComponent', () => {
  let component: TablePerfilComponent;
  let fixture: ComponentFixture<TablePerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
