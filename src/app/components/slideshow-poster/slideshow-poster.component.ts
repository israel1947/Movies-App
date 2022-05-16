import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResultMovies } from 'src/app/interfaces/interfaces';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() recientMovies:ResultMovies[]=[]

  slideOpts = {
    slidesPerView: 3,
    initialSlide: 1,
    speed: 400,
  };
  
  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

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
