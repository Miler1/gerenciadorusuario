import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cargo',
  templateUrl: './form-cargo.component.html',
  styleUrls: ['./form-cargo.component.css']
})
export class FormCargoComponent implements OnInit {
  @Input() public modalActions: EventEmitter<string | MaterializeAction>;
  roleForm: FormGroup;
  constructor(private fb: FormBuilder, private _service: CargoService, private _router: Router) {
    this.roleForm = this.fb.group({
      nome: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (!this.modalActions) {
      this.modalActions = new EventEmitter<string | MaterializeAction>();
    }
  }

  public ngAfterViewInit() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  public ngOnDestroy() {
    this.close();
  }

  public close() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

  salvar() {
    let u = new Cargo(
      null,
      this.roleForm.get('nome').value
    );

    console.log(this.roleForm.get('nome').value);

    this._service.salvar(u).subscribe(res => {
      console.log(res);
    });

    this.modalActions.emit({ action: 'modal', params: ['close'] });
    this._router.navigate(['/list-perfil']);
    this.ngOnInit();
  }

}
