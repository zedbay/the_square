import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.scss']
})
export class FormPostComponent implements OnInit {

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
  }

  public onSubmit() {
    
  }

}
