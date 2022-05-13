import { Component, Input, OnInit } from '@angular/core';
import { ResultMovies } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() recientMovies:ResultMovies[]=[]

  slideOpts = {
    slidesPerView: 3,
    initialSlide: 1,
    speed: 400,
  };
  
  constructor() { }

  ngOnInit() {}

}
