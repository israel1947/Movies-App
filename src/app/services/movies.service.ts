import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MoviesResponse, MoviesDetails } from '../interfaces/interfaces';


//call the api key defined in the enviroment
const api_key = environment.api_key;
const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularityPage:number=0;

  constructor( private hppt:HttpClient) { }

  private ejectQuery<T>(query:string){
    query =  URL + query;
    query += `&language=es&api_key=${api_key}`;
    return this.hppt.get<MoviesResponse>(query);
  } 

  //get recient movies 
  getFeature(){
    // obtain date of present day
    const today = new Date();
    //obtain complet date(+1 carry over to the next month)
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0 ).getDate()
    //obtain present mont
    const month = today.getMonth()+1;
    let monthString;

    if(month < 10){//if before the months with two digits add 0 before the number(05)
      monthString = '0' + month
    }else{
      monthString = month
    }
    //the 01 is to have on the first day of the month example(2022-05-01)
    const start =`${today.getFullYear()}-${monthString}-01`;

    //obtain the last day of present month
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`

    return this.ejectQuery(`/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`)
  }


  //get movies by popularity
  getMovieByPoularity(){
    this.popularityPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularityPage}`
    return this.ejectQuery(query);
  }

  getDetailOfMovie(id){
    return this.ejectQuery<MoviesDetails>(`/movie/${id}?a=1`);
  }

  getActorsMovies(id){
    return this.ejectQuery<MoviesDetails>(`/movie/${id}?a=1credits?a=1`);
  }

}



