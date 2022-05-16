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
  popularity:ResultMovies[]=[];
  
  constructor( private movieServices:MoviesService) {}

  ngOnInit(): void {
      this.movieServices.getFeature()
        .subscribe(resp =>{
          this.recientMovies = resp.results;
        })
        this.getPopularity();
       
  }

  loadMore(){
    this.getPopularity();
  }

  getPopularity(){
    this.movieServices.getMovieByPoularity()
    .subscribe(re =>{
      const arrTemp = [...this.popularity,...re.results]
      this.popularity= arrTemp;
      //this.popularity = re.results
    })
  }

  

  
}
