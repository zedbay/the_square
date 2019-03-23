import { Component, OnInit, Input } from '@angular/core';
import { Personne } from '../../../shared/models/personne';

@Component({
  selector: 'app-whoami',
  templateUrl: './whoami.component.html',
  styleUrls: ['./whoami.component.scss']
})
export class WhoamiComponent implements OnInit {

  @Input() iam: Personne;

  constructor() { }

  ngOnInit() {
  }

}
