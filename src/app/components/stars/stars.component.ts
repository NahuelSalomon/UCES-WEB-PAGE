import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit  {
  @Input() value;
  stars: string[] = [];

  ngOnInit() {

    this.value = parseFloat(this.value.toFixed(2));
    const fullStars = Math.floor(this.value);
    const halfStar = this.value - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        this.stars.push('full');
      } else if (i === fullStars && halfStar) {
        this.stars.push('half');
      } else {
        this.stars.push('empty');
      }
    }
  }
}