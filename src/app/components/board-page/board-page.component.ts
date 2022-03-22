import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board';

@Component({
  selector: 'board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {

  @Input() board : Board;

  constructor() { }

  ngOnInit(): void {
  }

}
