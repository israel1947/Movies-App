import { Component, OnInit, Input } from '@angular/core';
import { MoviesResponse, ResultMovies } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() recientMovies:ResultMovies[]=[]

  //options 
  slideOpts = {
    slidesPerView: 1.1,
    initialSlide: 1,
    speed: 400,
  };
  
  constructor() { }

  ngOnInit() {}

}
