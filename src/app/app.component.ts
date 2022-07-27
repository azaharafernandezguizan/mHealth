import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  acceptedLanguages = ['es', 'en'];
  constructor(private translate: TranslateService) {
    const userLang = navigator.language; 
    const defaultLang = this.acceptedLanguages.indexOf(userLang) > -1 ? userLang : 'es';
    translate.setDefaultLang(defaultLang);
    translate.use(defaultLang);
  }
}
