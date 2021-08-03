import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from "jquery";
import 'slick-slider';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: []
})
export class HomepageComponent implements  AfterViewInit {

  constructor() {
  }
  
  ngAfterViewInit() {
    // HOME SLICK
    $('#home-slick').slick({
      autoplay: true,
      infinite: true,
      speed: 300,
      arrows: true,
    });
  }

}
