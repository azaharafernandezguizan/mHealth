import { Component, OnInit } from '@angular/core';
import { GHOOption } from 'src/app/models/source_data';
import { MhealthService } from 'src/app/services/mhealth.service';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.scss']
})
export class OptionsListComponent implements OnInit {
  optionsList: GHOOption[] = [];

  constructor(private mhealthService: MhealthService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.mhealthService.getOptionsList().subscribe(
      data => {
        this.optionsList = data;
      }
    )
  }

  optionChanged(option: GHOOption): void {
    const optionsChecked = this.optionsList.filter(x=> x && x.checked);
    this.mhealthService.setOptionsSelected(optionsChecked);
  }

}
