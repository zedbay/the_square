import { Component, OnInit, Input } from '@angular/core';
import { Personne } from '../../shared/models/personne';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  @Input() iam: Personne;

  constructor() { }

  ngOnInit() {
    
  }

}
