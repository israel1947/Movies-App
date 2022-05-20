import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MoviesResponse, MoviesDetails, ResultMovies, Genre, VideoMovie, ResultVideoMovie,} from '../interfaces/interfaces';


//call the api key defined in the enviroment
const api_key = environment.api_key;
const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularityPage:number=0;
  private _historial:string[]= [];
  public resultado:ResultMovies[]=[]
  public genre:Genre[]=[]
  public video:ResultVideoMovie[]=[]
  
  get historial(){
    return [...this._historial];
  }

  constructor( private hppt:HttpClient) {

    if( localStorage.getItem('historial') ){
      this._historial=JSON.parse( localStorage.getItem('historial')!);
    }

    if(localStorage.getItem('resultado') ){
      this.resultado=JSON.parse( localStorage.getItem('resultado')!);
    }

   }

  private ejectQuery<T>(query:string){
    query =  URL + query;
    query += `&language=es&api_key=${api_key}`;
    console.log(query)
    return this.hppt.get<T>(query);
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

    return this.ejectQuery<MoviesResponse>(`/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`)
  }


  //get movies by popularity
  getMovieByPoularity(){
    this.popularityPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularityPage}`
    return this.ejectQuery<MoviesResponse>(query);
  }

  getDetailOfMovie(id){
    return this.ejectQuery<MoviesDetails>(`/movie/${id}?a=1`);
  }

  //https://api.themoviedb.org/3/movie/628900?api_key=d0dfa05a65b3a18bd432149a75bb9f84
  getActorsMovies(id){
    return this.ejectQuery<MoviesDetails>(`/movie/${id}/credits?a=1`);
  }

  //search movie
  getSearchMovie(textSearch){
    textSearch = textSearch.trim().toLowerCase();

    if(!this._historial.includes(textSearch)){
      this._historial.unshift(textSearch);
      this._historial = this._historial.splice(0,10)
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    localStorage.setItem('historial', JSON.stringify(this._historial));
    return this.ejectQuery(`/search/movie?query=${textSearch}`);
  }

  //load generos
  loadGenero():Promise<Genre[]>{
    return new Promise(resol=>{
      this.ejectQuery(`/genre/movie/list?a=1`)
        .subscribe(resp=>{
          this.genre=resp['genres'];
          //console.log(this.genre);
          resol(this.genre);
        });
    });
  }

  //get video  movie
  VideoForMovie(movie_id):Promise<ResultVideoMovie[]>{
    return new Promise(resol=>{
      return this.ejectQuery(`/movie/${movie_id}/videos?a=1`)
      .subscribe(resp=>{
        this.video= resp['results'];
        console.log(this.video);
        resol(this.video);
      })
    })
  }

}



