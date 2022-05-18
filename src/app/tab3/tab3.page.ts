import { Component, OnInit } from '@angular/core';
import { Genre, MoviesDetails } from '../interfaces/interfaces';
import { StorageService } from '../services/storage.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {

  movies:MoviesDetails[]=[];
  generos:Genre[]=[];
  favoriteByGenero:any[]=[];

  constructor( private storage:StorageService,
               private movieService:MoviesService,
  ) {}

  
  async ionViewWillEnter(){
    this.movies = await this.storage.loadFvorites();
    this.generos = await this.movieService.loadGenero();
  
    this.moviesByGenero(this.generos, this.movies);
  }

  moviesByGenero(generos:Genre[], movies:MoviesDetails[]){
    this.favoriteByGenero=[];
      generos.forEach(genero =>{
        this.favoriteByGenero.push({
          genero:genero.name,
          movies:movies.filter(movie =>{
            return movie.genres.find(genr => genr.id === genero.id);
           })
        });
      });
  }

 
}
