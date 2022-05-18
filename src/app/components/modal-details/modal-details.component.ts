import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MoviesDetails, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

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
  favoriteIcons;

  //options 
  slideOpts = {
    slidesPerView: 2,
    initialSlide: 1,
    speed: 400,
  };

 

  constructor( private moviesService:MoviesService,
               private mdCtr:ModalController,
               private storage:StorageService ) { }

   ngOnInit() {
    //verifi if that movie exist
     this.storage.movieExist(this.id)
      .then(exist=> this.favoriteIcons = (exist) ? 'bookmark' : 'bookmark-outline')
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
    const exist = this.storage.saveMovie(this.movies);
    this.favoriteIcons = (exist) ? 'bookmark' : 'bookmark-outline';
  }
  
}
