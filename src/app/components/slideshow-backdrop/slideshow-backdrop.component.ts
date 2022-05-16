import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResultMovies } from '../../interfaces/interfaces';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() recientMovies:ResultMovies[]=[]

  //options 
  slideOpts = {
    slidesPerView: 1.1,
    initialSlide: 1,
    speed: 400,
  };
  
  constructor( private modalCtrl:ModalController ) { }

  ngOnInit() {}

 async onShowModal(id){
   const modal=  await this.modalCtrl.create({
      component:ModalDetailsComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }


}
