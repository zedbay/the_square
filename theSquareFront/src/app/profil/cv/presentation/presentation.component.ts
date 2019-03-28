import { Component, OnInit, Input } from '@angular/core';
import { Personne } from 'src/app/shared/models/personne';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  @Input() iam: Personne;

  constructor() { }

  ngOnInit() {
  }

}
