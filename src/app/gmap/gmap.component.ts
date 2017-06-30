import { Component, OnInit } from '@angular/core';
import {Trip2017} from '../../Trip2017';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {

	trip: Trip2017;

  constructor() {
	  this.trip = new Trip2017();
	  window['trip'] = this.trip;
  }

  ngOnInit() {
  }

}
