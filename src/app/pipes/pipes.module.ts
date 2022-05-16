import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { SlideParesPipe } from './slide-pares.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    SlideParesPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImagenPipe,
    SlideParesPipe
  ]
})
export class PipesModule { }
