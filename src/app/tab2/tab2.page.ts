import { Component, OnInit } from '@angular/core';
import { ResultMovies, MoviesResponse } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { ModalDetailsComponent } from '../components/modal-details/modal-details.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  popularity:ResultMovies[]=[];
  movies:ResultMovies[]=[];
  textSearch='';
  isHiden=100;
  public load:boolean=false;

  constructor( private movieServices:MoviesService,
               private modalCtrl:ModalController ) {}

  ngOnInit(): void {
    this.movieServices.getMovieByPoularity()
    .subscribe(re =>{
      this.popularity = re.results
    })
  }
  onSearchChange(event){
    const valueSearch = event.detail.value
    if(valueSearch.length ===0 ){
      this.load = false;
      this.movies = [];
      return;
    }
    this.load = true;
      this.movieServices.getSearchMovie(valueSearch)
      .subscribe(resp=>{
        this.movies = resp['results'];
        this.load = false;
      })
  }

  get historial(){
    return this.movieServices.historial;
  }

   async onShowModal(id){
    const modal = await this.modalCtrl.create({
      component:ModalDetailsComponent,
      componentProps:{
        id,
      }
    })
    modal.present();
  }

}
