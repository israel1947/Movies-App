import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MoviesResponse } from '../interfaces/interfaces';


//call the api key defined in the enviroment
const api_key = environment.api_key;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private hppt:HttpClient) { }


  //get recient movies 
  getFeature(){
    return this.hppt.get<MoviesResponse>(`https://api.themoviedb.org/4/discover/movie?api_key=d0dfa05a65b3a18bd432149a75bb9f84&primary_release_date.gte=2022-05-01&primary_release_date.lte=2022-05-13&language=es`)
  }


}
