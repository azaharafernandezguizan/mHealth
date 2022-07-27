import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  explanationTitle: string = '';
  explanationMessage: string = '';

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translateTexts();
  }

  translateTexts(): void {
    this.explanationTitle = this.translate.instant("main_page.explanation_title");
    this.explanationMessage = this.translate.instant("main_page.explanation_message");
  }
}
