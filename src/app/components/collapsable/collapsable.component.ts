import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss']
})
export class CollapsableComponent implements OnInit {
  @Input() title: string = '';

  isCollapse: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

}
