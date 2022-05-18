import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MoviesDetails } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  movies:MoviesDetails[]=[];

  constructor( private storage:Storage,
               public toastController: ToastController) { this.loadFvorites()}



 async presentToast(message) {
    const toast = await this.toastController.create({
     message,
     duration: 1000
    });
    toast.present();
  }

  async saveMovie(movie:MoviesDetails){
    let exist = false;
    let message='';
    for (const mov of this.movies) {
      if(mov.id === movie.id){
        exist = true;
        break;
      }
    }
    if(exist){
      //returns a new array with all movies except the existing one
      this.movies = this.movies.filter(mov=> mov.id !== movie.id);
      message='Removed of favorites';
    }else{
      this.movies.push(movie);
      message='Added to favorites';
    }
    this.presentToast(message);
    this.storage.set('movies',this.movies);
    return !exist;
  }

  async loadFvorites(){
    const storage = await this.storage.create(); 
    const favoritesMovies = await this.storage.get('movies');
    this.movies = favoritesMovies || [];
    return this.movies;
  }

  async movieExist(id){
    await this.loadFvorites();
    const exist=this.movies.find(mov=>mov.id === id)
    return (exist)?true:false;
  }
}
 