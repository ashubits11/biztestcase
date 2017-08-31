import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip-description',
  templateUrl: './tooltip-description.component.html',
  styleUrls: ['./tooltip-description.component.css']
})
export class TooltipDescriptionComponent implements OnInit {
  @Input() value: string;
  constructor() { }
  ngOnInit() {
  }

}
