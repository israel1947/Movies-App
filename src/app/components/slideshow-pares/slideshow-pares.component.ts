import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResultMovies } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() recientMovies:ResultMovies[]=[];
  @Output() loadMore = new EventEmitter();

  slideOpts = {
    slidesPerView: 3,
    initialSlide: 1,
    speed: 400,
    spaceBetween:-20,
  };

  constructor() { }

  ngOnInit() {}

  onShowMore(){
    this.loadMore.emit();
  }

}
