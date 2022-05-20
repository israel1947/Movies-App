import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MoviesDetails, Cast, ResultVideoMovie, ResultMovies, MoviesResponse} from '../../interfaces/interfaces';
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
  similar:ResultMovies[]=[];
  simObjt:any[]=[];
  isHiden=150;
  noImage:String='/assets/no-avatar.jpg';
  npImageMovi:string='/assets/no-image-movie.png'
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
               public toastController: ToastController,
               private modalCtrl:ModalController
  ) { }

    ngOnInit() {
     
      //verifi if that movie exist
      this.storage.movieExist(this.id)
      .then(exist=> this.favoriteIcons = (exist) ? 'bookmark' : 'bookmark-outline');

      //get detail of movies
      this.moviesService.getDetailOfMovie(this.id)
      .subscribe(resp =>{
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
      try {
        this.video = await this.moviesService.VideoForMovie(this.id);
        this.youtube.openVideo(this.video[0].key);
      } catch (error) {
       this.presentToast();
      }
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

   onFavorite(){
    const exist = this.storage.saveMovie(this.movies);
    this.favoriteIcons = (exist) ? 'bookmark' : 'bookmark-outline';
    }
    
  async onShowModal(id){
      const modal=  await this.modalCtrl.create({
         component:ModalDetailsComponent,
         componentProps:{
           id
         }
       });
       modal.present();
   }

  async ionViewWillEnter(){
      this.similar = await this.moviesService.similarMovies(this.id)

      this.similarMoviesObj(this.similar,this.movies[0]);
    }

  similarMoviesObj(similar:ResultMovies[], movies:MoviesDetails[]){
      this.simObjt=[];
      similar.forEach(simi=>{
        this.simObjt.push({
            moviImg:simi.backdrop_path,
            nbre:simi.title,
            idee:simi.id,
            movi:movies
          })
        })
    }

  
}
