import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MaterializeAction, toast } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Perfil } from '../../models/perfil';
import { PerfilService } from '../../services/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.css']
})
export class FormPerfilComponent implements OnInit {
  @Input() public modalActions: EventEmitter<string | MaterializeAction>;
  profileForm: FormGroup;
  constructor(private fb: FormBuilder, private _service: PerfilService, private _router: Router) {
    this.profileForm = this.fb.group({
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
    let u = new Perfil(
      null,
      this.profileForm.get('nome').value
    );

    console.log(this.profileForm.get('nome').value);

    this._service.salvar(u).subscribe(res => {
      console.log(res);
    },
    (e) => {
      let error = JSON.parse(e._body.split(','));
      // console.log(m.message);
      toast(error.message, 4000); console.log(e._body.split(','))});

    this.modalActions.emit({ action: 'modal', params: ['close'] });
    this._router.navigate(['/list-perfil']);
    this.ngOnInit();
  }

}
