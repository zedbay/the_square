import { Component, OnInit, Input } from '@angular/core';
import { Personne } from '../../../shared/models/personne';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent implements OnInit {

  @Input() iam: Personne;

  constructor() { }

  ngOnInit() {
  }

}
