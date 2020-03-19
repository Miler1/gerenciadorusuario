import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Cargo } from '../../../models/cargo';
import { CargoService } from '../../../services/cargo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitterService } from '../../../services/emitter.service';
import { PagerService } from './../../shared/_services/pager.service'
import { MaterializeAction, toast } from 'angular2-materialize';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-cargo',
  templateUrl: './table-cargo.component.html',
  styleUrls: ['./table-cargo.component.css']
})
export class TableCargoComponent implements OnInit {
  @Input() public modalActions: EventEmitter<string | MaterializeAction>;
  cargos: Cargo[];
  cargo: Cargo;
  loading: boolean = false;
  failed: boolean = false;
  count: number = 0;
  offset: number = 0;
  limit: number = 5;
  roleForm: FormGroup;

  constructor(
    private _service: CargoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private pagerService: PagerService,
    private fb: FormBuilder) {
    // EventEmitterService.get('paginate').subscribe(data => this.onPageChange(data));
    this.roleForm = this.fb.group({
      nome: ['', Validators.required]
    })
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
      console.log(res);
      this.cargos = res;
      this.setPage(1);
    });

    if (!this.modalActions) {
      this.modalActions = new EventEmitter<string | MaterializeAction>();
    }
    document.getElementById('modal2').style.display = 'none';
    this.loading = false;
  }

  update(cargo) {
    console.log(cargo.id)
    this._service.update(cargo.id, cargo).subscribe(res => {
      console.log(res);
      // this.usuarios = res;
    },
    (e) => {
      let error = JSON.parse(e._body.split(','));
      // console.log(m.message);
      toast(error.message, 4000); console.log(e._body.split(','))});
  }

  salvar(cargo) {
    console.log(cargo)
    let c = new Cargo(
      this.cargo.id,
      this.roleForm.get('nome').value
    );
    this.update(c);

    this.modalActions.emit({ action: 'modal', params: ['close'] });
    this._router.navigate(['/list-cargo']);
    this.ngOnInit();
  }

  deletar(id) {
    this._service.deletar(id).subscribe(res => {
      console.log(res);
      // this.usuarios = res;
    });
  }

  openModal(cargo) {
    this.cargo = cargo;
    this.roleForm.get('nome').setValue(cargo.nome);
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.cargos.length, page);
    console.log(this.pager)
    console.log(this.pager.pages);

    // get current page of items
    this.pagedItems = this.cargos.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
