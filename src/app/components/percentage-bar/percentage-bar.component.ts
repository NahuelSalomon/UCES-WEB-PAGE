import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-percentage-bar',
  templateUrl: './percentage-bar.component.html',
  styleUrls: ['./percentage-bar.component.css']
})
export class PercentageBarComponent implements OnInit {

  @Input() yesCount: number; // Cantidad de respuestas "sí"
  @Input() noCount: number;// Cantidad de respuestas "no"
  totalCount: number;
  percentageYes: number;
  percentageNo: number;

  constructor() { }

  ngOnInit(): void {
    this.totalCount = this.yesCount + this.noCount;
    this.percentageYes  = this.totalCount > 0 ? parseFloat(((this.yesCount / this.totalCount) * 100).toFixed(2)) : 0;
    this.percentageNo = this.totalCount > 0 ? parseFloat(((this.noCount / this.totalCount) * 100).toFixed(2)) : 100;
  }

}
