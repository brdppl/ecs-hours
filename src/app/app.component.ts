import { Component, OnInit } from '@angular/core';
import { UtilsService } from './services/utils.service';
import { Storage } from 'src/app/enums/storage.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ECS Hours';

  constructor(
    private util: UtilsService
  ) { }

  ngOnInit(): void {
    if(this.util.getStorage(Storage.DARK_MODE)) {  
      document.getElementsByTagName('body')[0].classList.add('dark-theme')
    } else {
      document.getElementsByTagName('body')[0].classList.remove('dark-theme')
    }
  }
}
