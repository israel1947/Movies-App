import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MoviesDetails, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss'],
})
export class ModalDetailsComponent implements OnInit {

  @Input() id;
  
  movies:MoviesDetails={};
  actors:Cast[]=[];
  isHiden=150;
  noImage:String='/assets/no-avatar.jpg';

  //options 
  slideOpts = {
    slidesPerView: 2,
    initialSlide: 1,
    speed: 400,
  };

  constructor( private moviesService:MoviesService,
               private mdCtr:ModalController ) { }

  ngOnInit() {
    this.moviesService.getDetailOfMovie(this.id)
      .subscribe(resp =>{
        console.log('detalles',resp);
        this.movies = resp;
        
      
      });

    this.moviesService.getActorsMovies(this.id)
      .subscribe(resp =>{
        this.actors = resp.cast;
      });
  }

  onModalClose(){
    this.mdCtr.dismiss();
  }

  onFavorite(){

  }

  
  
}
