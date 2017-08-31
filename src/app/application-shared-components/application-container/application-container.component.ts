import { Component, OnInit, Input, ViewChild, ElementRef, Renderer, NgZone, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from './application-container.interface';
import { Subject } from 'rxjs/Subject';



@Component({
  selector: 'app-application-container',
  templateUrl: './application-container.component.html',
  styleUrls: ['./application-container.component.css']
})
export class ApplicationContainerComponent implements OnInit {

  @Input() application: Application;
  @Input() applicationIndex: number;
  disableTool: any;
  tileColorClass: string;
  showMore: boolean;
  firtCharacter: string;
  colorClass: Array<string> = [
    'brownApp',
    'greyApp',
    'watergreenApp',
    'yellowApp',
    'navyBlueApp',
    'darkGreenApp',
    'darkBrownApp'
  ];
  constructor(private route: ActivatedRoute, private router: Router, private render: Renderer) {
    this.tileColorClass = 'brownApp';
    this.disableTool = {};
    this.disableTool.status = true;
    this.showMore = false;
    this.firtCharacter = 'U';
  }
  ngOnInit() {
    this.tileColorClass = this.getColor();
    if (this.application.display) {
      this.firtCharacter = this.application.display.charAt(0).toUpperCase();
    }
  }
  getColor() {
   return  this.colorClass[(this.applicationIndex % this.colorClass.length)];
  }
  goToDetail() {
    const link = `${this.application.name}/allUserGroups`;
    localStorage.setItem('headerColor', this.tileColorClass);
    this.router.navigate([link], { relativeTo: this.route });
  }
}
