import { Component, OnInit, Input, EventEmitter, DoCheck, OnChanges, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Perfil } from '../../../models/perfil';
import { PagerService } from '../../shared/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../../../services/perfil.service';
import { MaterializeAction, toast } from 'angular2-materialize';
import { EventEmitterService } from '../../../services/emitter.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormPerfilComponent } from '../form-perfil.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-table-perfil',
  templateUrl: './table-perfil.component.html',
  styleUrls: ['./table-perfil.component.css']
})
export class TablePerfilComponent implements OnInit {

  @Input() public modalActions: EventEmitter<string | MaterializeAction>;
  @Input() public perfisData: Perfil[];
  perfis: Perfil[];
  perfil: Perfil;
  loading: boolean = false;
  failed: boolean = false;
  count: number = 0;
  offset: number = 0;
  limit: number = 5;
  profileForm: FormGroup;
  showModal: boolean = false;
  editing: boolean = false;
  constructor(
    private _service: PerfilService,
    private _router: Router,
    private _route: ActivatedRoute,
    private pagerService: PagerService,
    private fb: FormBuilder) {
      // EventEmitterService.get('modal').subscribe(data => this.openModal());
      this.profileForm = this.fb.group({
        nome: ['', Validators.required]
      })
      // console.log('construcotr')

      // console.log(this.modalActions)
  }

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit(): void {

    this.loading = true;
    this._service.httpMethod().subscribe(res => {
      this.perfis = res;
      this.setPage(1);
    });

    if (!this.modalActions) {
      this.modalActions = new EventEmitter<string | MaterializeAction>();
    }

    document.getElementById('modal2').style.display = 'none';
    this.loading = false;
  }

  update(perfil) {
    console.log(perfil.id)
    this._service.update(perfil.id, perfil).subscribe(res => {
      console.log(res);
      // this.usuarios = res;
    },
    (e) => {
      let error = JSON.parse(e._body.split(','));
      // console.log(m.message);
      toast(error.message, 4000); console.log(e._body.split(','))});
  }

  deletar(id) {
    this._service.deletar(id).subscribe(res => {
      console.log(res);
      // this.usuarios = res;
    });
  }

  salvar(perfil) {
    let p = new Perfil(
      this.perfil.id,
      this.profileForm.get('nome').value
    );
    this.update(p);
    this.modalActions.emit({ action: 'modal', params: ['close'] });
    this._router.navigate(['/list-perfil']);
    this.ngOnInit();
  }

  public ngOnDestroy() {
    this.close();
  }

  public close() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
    this.modalActions = null;
  }

  openModal(perfil) {
    this.perfil = perfil;
    this.profileForm.get('nome').setValue(perfil.nome);
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.perfis.length, page);
    console.log(this.pager)
    console.log(this.pager.pages);

    // get current page of items
    this.pagedItems = this.perfis.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
