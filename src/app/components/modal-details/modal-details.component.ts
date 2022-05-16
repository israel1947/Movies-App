import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss'],
})
export class ModalDetailsComponent implements OnInit {

  @Input() id;

  constructor( private moviesService:MoviesService) { }

  ngOnInit() {
    this.moviesService.getDetailOfMovie(this.id)
      .subscribe(resp =>{
        console.log('detalles',resp)
      });

    this.moviesService.getActorsMovies(this.id)
      .subscribe(resp =>{
        console.log('actores',resp);
      });
  }

}
