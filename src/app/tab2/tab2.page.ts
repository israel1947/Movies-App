import { Component, OnInit } from '@angular/core';
import {  ResultMovies } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  popularity:ResultMovies[]=[];
  textSearch='';
  isHiden=100;
  constructor( private movieServices:MoviesService ) {}

  ngOnInit(): void {
    this.movieServices.getMovieByPoularity()
    .subscribe(re =>{
      this.popularity = re.results
    })
  }


  onSearchChange(event){
    const valueSearch = event.detail.value
    this.movieServices.getSearchMovie(valueSearch)
      .subscribe(resp=>{
        console.log(resp);
      })
    console.log(valueSearch);
  }

}
