import { Component, Input, OnInit } from '@angular/core';
import { ResultMovies } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() recientMovies:ResultMovies[]=[]

  slideOpts = {
    slidesPerView: 3,
    initialSlide: 1,
    speed: 400,
    spaceBetween:-20,
  };

  constructor() { }

  ngOnInit() {}

}
