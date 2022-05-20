import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MoviesDetails, Cast, ResultVideoMovie } from '../../interfaces/interfaces';
import { ModalController, ToastController } from '@ionic/angular';
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
  iconPlay='play';

  //options 
  slideOpts = {
    slidesPerView: 2,
    initialSlide: 1,
    speed: 400,
  };

 

  constructor( private moviesService:MoviesService,
               private mdCtr:ModalController,
               private storage:StorageService,
               private youtube:YoutubeVideoPlayer,
               public toastController: ToastController ) { }

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
    
    async presentToast() {
      const toast = await this.toastController.create({
        message: `Sorry this movie dont't have a video`,
        color:'primary',
        duration: 2000,
        buttons:[
          {
            text: 'Ok',
            role: 'cancel',
          }
        ]
      });
      toast.present();
    }
    
    async onPlay(){
      try {
        this.video = await this.moviesService.VideoForMovie(this.id);
        this.youtube.openVideo(this.video[0].key);
        console.log('prueba youtube id',this.video[0].key);
      } catch (error) {
       this.presentToast();
      }
    }

   onFavorite(){
    const exist = this.storage.saveMovie(this.movies);
    this.favoriteIcons = (exist) ? 'bookmark' : 'bookmark-outline';
    }
  
}
