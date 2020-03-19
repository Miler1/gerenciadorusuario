import { Component, OnInit, Input, EventEmitter, ElementRef, Inject, SimpleChanges, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterializeAction, toast } from 'angular2-materialize';
import { PagerService } from '../../shared/_services';

import * as $ from 'jquery';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { PerfilService } from '../../services/perfil.service';
import { CargoService } from '../../services/cargo.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { Cargo } from '../../models/cargo';
import { Perfil } from '../../models/perfil';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit, DoCheck, OnDestroy {

  @Input() public modalActions: EventEmitter<string | MaterializeAction>;
  form: FormGroup;
  elementRef: ElementRef;
  public mask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  private dateOptions = this.getDefaultPickaOption();
  userForm: FormGroup;
  selected: boolean = false;
  birthDate:string;
  birthTime:string;
  usuario: Usuario;
  date: Date;
  birthDateActions = new EventEmitter<string|MaterializeAction>();
  birthTimeActions = new EventEmitter<string|MaterializeAction>();
  constructor(
    @Inject(ElementRef) elementRef: ElementRef,
    private fb: FormBuilder,
    private _serviceCargo: CargoService,
    private _servicePerfil: PerfilService,
    private _service: UsuarioService,
    private _router: Router) {

    this.usuario = new Usuario();
    this.usuario.cargo = new Cargo();
    this.usuario.perfil = new Perfil();
    this.birthDate = "03/12/2017";
    this.birthTime = "12:36";
    this.form = this.fb.group({
        'fromDate': new FormControl('06/07/2017'),
        'fromTime': new FormControl('08:30')
    });

    this.elementRef = elementRef;
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

  ngDoCheck(): void {
    if (document.querySelectorAll('select')[2] !== undefined) {
      this.userForm.get('cargo').setValue(document.querySelectorAll('select')[2].value);
    }
  }

  ngOnInit(): void {
    if (!this.modalActions) {
      this.modalActions = new EventEmitter<string | MaterializeAction>();
    }

    document.getElementById('modal2').style.display = 'none';

    this._serviceCargo.httpMethod().subscribe(result => {
      result.map(data => $('select#cargo').append(`<option value=${data.id}>${data.nome}</option>`))
    });

    this._servicePerfil.httpMethod().subscribe(result => {
      result.map(data => $('select#perfil').append(`<option value=${data.id}>${data.nome}</option>`))
    });
  }

  public ngAfterViewInit() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  onSelectedCargo() {
    console.log( $('select#cargo option:selected').text());
    console.log(this.userForm.get('cargo').value);
    this.usuario.cargo.nome = $('select#cargo option:selected').text();
  }

  onSelectedPerfil() {
    console.log( $('select#perfil option:selected').text());
    this.usuario.perfil.nome = $('select#perfil option:selected').text();
  }

  salvar() {
    console.log(this.usuario)
    this.usuario.dataNascimento = this.dateFormat(this.usuario.dataNascimento);
    this.usuario.dataCadastro = new Date();
    this._service.salvar(this.usuario).subscribe(res => {
      console.log(res);
    },
    (e) => {
      let error = JSON.parse(e._body.split(','));
      // console.log(m.message);
      toast(error.message, 4000); console.log(e._body.split(','))});

    this.modalActions.emit({ action: 'modal', params: ['close'] });
    this._router.navigate(['/list-usuario']);
    this.ngOnInit();
  }

  dateFormat(date) {
    if (date != undefined) {
      let a = date.toString().split("/").toString().split("T").toString().split(",");;
      const year = parseInt(a[2]);
      const month = parseInt(a[1]);
      const day = parseInt(a[0]);
      return this.date = new Date(year, month-1, day, 0, 0, 0, 0);
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

  public ngOnDestroy() {
    this.close();
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

}
