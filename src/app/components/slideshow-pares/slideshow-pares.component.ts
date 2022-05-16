import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResultMovies } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() recientMovies:ResultMovies[]=[];
  @Output() loadMore = new EventEmitter();

  slideOpts = {
    slidesPerView: 3,
    initialSlide: 1,
    speed: 400,
    spaceBetween:-20,
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

  onShowMore(){
    this.loadMore.emit();
  }

}
