import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MoviesDetails, Cast, ResultVideoMovie } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { YoutubeVideoPlayer } from '@awesome-cordova-plugins/youtube-video-player/ngx';


@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss'],
})
export class ModalDetailsComponent implements OnInit {

  
  @Input() id;
  movies:MoviesDetails={};
  actors:Cast[]=[];
  video:ResultVideoMovie[]=[];
  videos:any[]=[];
  isHiden=150;
  noImage:String='/assets/no-avatar.jpg';
  favoriteIcons='bookmark-outline';

  //options 
  slideOpts = {
    slidesPerView: 2,
    initialSlide: 1,
    speed: 400,
  };

 

  constructor( private moviesService:MoviesService,
               private mdCtr:ModalController,
               private storage:StorageService,
               private youtube:YoutubeVideoPlayer ) { }

   ngOnInit() {
     
    //verifi if that movie exist
     this.storage.movieExist(this.id)
      .then(exist=> this.favoriteIcons = (exist) ? 'bookmark' : 'bookmark-outline');

      //get detail of movies
    this.moviesService.getDetailOfMovie(this.id)
      .subscribe(resp =>{
        //console.log('detalles',resp);
        this.movies = resp;
      });

      //get cast of movies
    this.moviesService.getActorsMovies(this.id)
      .subscribe(resp =>{
        this.actors = resp.cast;
      });

     
    }
    
    
    onModalClose(){
      this.mdCtr.dismiss();
    }
    async onPlay(){
     this.video = await this.moviesService.VideoForMovie(this.id);
     this.videoPeli(this.video);
     this.youtube.openVideo(this.video[1].key.toString());
     //console.log('prueba const',this.video);
     console.log('prueba youtube',this.video[1].key.toString());
    }

  videoPeli(video:ResultVideoMovie[]){
    this.videos=[];
    video.forEach(vide=>{
      this.video.push({
        key:vide.key
      })
      console.log(vide.key);
      return vide;
     })
    }

   onFavorite(){
    const exist = this.storage.saveMovie(this.movies);
    this.favoriteIcons = (exist) ? 'bookmark' : 'bookmark-outline';
    }
  
}
