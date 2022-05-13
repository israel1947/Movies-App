import { Pipe, PipeTransform } from '@angular/core';

const URL ='https://image.tmdb.org/t/p';
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  //https://image.tmdb.org/t/p/w500/y22kargXqjLyPrtWOATshqwnQDL.jpg
  transform(img:String , size="w500"):string {

    if(!img ){
      return `./assets/no-image-banner.jpg`;
    }
    const imgUrl = `${URL}/${size}${img}`;
    return imgUrl;
  }

}
