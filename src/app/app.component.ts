/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  EventEmitter,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import * as M from 'materialize-css';
import * as $ from 'jquery';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  ngAfterViewInit(): void {
    // throw new Error("Method not implemented.");
  }
  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }
  @Input() public modalActions: EventEmitter<string | MaterializeAction>;

  options = {
    menuWidth: 250, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  };

  public ngOnInit() {

    // SIDEBAR
    $(document).ready(function(){
      $('.button-collapse').sideNav(this.options);
      // $(this.el.nativeElement).find('.side-nav').css({'left':'300px', 'transition':'.5s'});
      // START OPEN
      // $('.button-collapse').sideNav('show');
    });
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
