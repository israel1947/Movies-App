import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ResultMovies } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  recientMovies:ResultMovies[]=[];
  //options 
   slideOpts = {
    slidesPerView: 1.1,
    initialSlide: 1,
    speed: 400,
  };

  constructor( private movieServices:MoviesService) {}

  ngOnInit(): void {
      this.movieServices.getFeature()
        .subscribe(resp =>{
          console.log(resp);
          this.recientMovies = resp.results;
        })
  }

  

  
}
