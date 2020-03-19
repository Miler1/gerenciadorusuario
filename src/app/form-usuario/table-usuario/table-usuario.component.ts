import { Component, OnInit, Input, EventEmitter, DoCheck, AfterContentInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from '../../shared/_services';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MaterializeAction } from 'angular2-materialize';
import * as $ from 'jquery';
import { Cargo } from '../../../models/cargo';
import { Perfil } from '../../../models/perfil';
import { CargoList } from '../../../models/cargoList';
import { CargoService } from '../../../services/cargo.service';
import { PerfilService } from '../../../services/perfil.service';

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
  styleUrls: ['./table-usuario.component.css']
})
export class TableUsuarioComponent implements OnInit, DoCheck, AfterContentInit, OnDestroy{
  @Input() public modalActions: EventEmitter<string | MaterializeAction>;
  usuarios: Usuario[];
  usuario: Usuario;
  loading: boolean = false;
  failed: boolean = false;
  count: number = 0;
  offset: number = 0;
  limit: number = 5;
  userForm: FormGroup;
  birthDate:string;
  birthTime:string;
  form: FormGroup;
  cargos: Cargo[] = [];
  cargo: Cargo;
  perfis: Perfil[] = [];
  date: Date;
  public mask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  private dateOptions = this.getDefaultPickaOption();
  birthDateActions = new EventEmitter<string|MaterializeAction>();
  birthTimeActions = new EventEmitter<string|MaterializeAction>();
  constructor(
    private _serviceCargo: CargoService,
    private _servicePerfil: PerfilService,
    private _service: UsuarioService,
    private _router: Router,
    private _route: ActivatedRoute,
    private pagerService: PagerService,
    private fb: FormBuilder) {
    this.usuario = new Usuario();
    this.usuario.cargo = new Cargo();
    this.usuario.perfil = new Perfil();
    this.birthDate = "03/12/2017";
    this.birthTime = "12:36";
    this.form = this.fb.group({
        'fromDate': new FormControl('06/07/2017'),
        'fromTime': new FormControl('08:30')
    });
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: [''],
      sexo: [''],
      cargo: ['', Validators.required],
      perfil: ['']
      // fromDate: ['', Validators.required],
      // toDate: ['', Validators.required]
    });
    this.userForm.controls['cargo'].setValue(1);
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
      this.usuarios = res;
      this.setPage(1);
    });

    if (!this.modalActions) {
      this.modalActions = new EventEmitter<string | MaterializeAction>();
    }

    document.getElementById('modal2').style.display = 'none';

    this._serviceCargo.httpMethod().subscribe(result => {
      result.map(data => {
        this.cargos = data;
        $('select#cargo').append(`<option value=${data.id}>${data.nome}</option>`)
      })
    });

    this._servicePerfil.httpMethod().subscribe(result => {
      result.map(data => {
        this.perfis = data;
        $('select#perfil').append(`<option value=${data.id}>${data.nome}</option>`)
      })
    });
    this.loading = false;
  }

  public ngOnDestroy() {
    this.close();
  }

  ngAfterContentInit(): void {
  //     $('select').material_select();
  }

  openModal(usuario) {
    // this.usuario = new Usuario(usuario.nome, usuario.cpf, usuario.dataNascimento, usuario.sexo, usuario.cargo, usuario.perfil, usuario.dataNascimento);
    this.usuario = usuario;
    this.userForm.get('sexo').setValue(this.usuario.sexo);
    // $('select#perfil').append(`<option value=${usuario.id}>${usuario.perfil.nome}</option>`);
    // // this.userForm.get('perfil').setValue(usuario.perfil.nome);
    console.log(this.usuario.cargo.id);
    console.log(this.usuario.cargo.nome);

    console.log(this.usuario);
    console.log(this.usuario.cargo);
    console.log(this.usuario.perfil);
    this.modalActions.emit({ action: 'modal', params: ['open'] });
    // $('select#cargo').append(`<option value=${1}>${this.usuario.cargo.nome}</option>`);
  }

  onSelectedCargo() {
    console.log( $('select#cargo option:selected').text());
    this.usuario.cargo.nome = $('select#cargo option:selected').text();
  }

  onSelectedPerfil() {
    console.log( $('select#perfil option:selected').text());
    this.usuario.perfil.nome = $('select#perfil option:selected').text();
  }

  deletar(id) {
    this._service.deletar(id).subscribe(res => {
      console.log(res);
      // this.usuarios = res;
    });
  }

  update(usuario) {
    console.log(usuario)
    console.log(this.userForm.get('cargo'));
    console.log(this.userForm.get('perfil'));
    this._service.update(usuario.id, usuario).subscribe(res => {
      console.log(res);
      // this.usuarios = res;
    });

    this.modalActions.emit({ action: 'modal', params: ['close'] });
    this._router.navigate(['/list-usuario']);
    this.ngOnInit();
  }

  salvar() {
    // console.log(this.birthDate);
    this.usuario.dataNascimento = this.dateFormat(this.usuario.dataNascimento);
    this.update(this.usuario);
  }

  dateFormat(date) {
    console.log(date)
    let a = date.toString().split("/").toString().split("T").toString().split(",");
    console.log(a)
    const year = parseInt(a[2]);
    const month = parseInt(a[1]);
    const day = parseInt(a[0]);
    return this.date = new Date(year, month-1, day, 0, 0, 0, 0);
  }

  public close() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

  public hasError (controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  openDatePicker() {
      //actions are open or close
      this.birthDateActions.emit({action: "pickadate", params: ["open"]});
  }

  setTime(time) {
      this.birthTime = time;
  }

  openTimePicker() {
    //actions are show or hide
    this.birthTimeActions.emit({action: "pickatime", params: ["show"]});
  }

  // onPageChange(offset) {
  //   this.offset = offset;
  //   this._router.navigate(['/list-cargo', (offset / this.limit) + 1]);
  // }

  ngDoCheck(): void {
    if (document.querySelectorAll('select')[2] !== undefined) {
      this.userForm.get('cargo').setValue(document.querySelectorAll('select')[2].value);
    }
  }

  private getDefaultPickaOption(): any {
    return {
      monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
      weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      today: 'Hoje',
      clear: 'Limpar',
      close: 'Pronto',
      labelMonthNext: 'Próximo mês',
      labelMonthPrev: 'Mês anterior',
      labelMonthSelect: 'Selecione um mês',
      labelYearSelect: 'Selecione um ano',
      format: 'dd/mm/yyyy',
      editable: false,
      closeOnSelect: true,
      selectYears: 100,
      selectMonths: true
    };
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.usuarios.length, page);
    // console.log(this.pager)
    // console.log(this.pager.pages);

    // get current page of items
    this.pagedItems = this.usuarios.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
