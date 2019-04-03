import { Component, OnInit, Input } from "@angular/core";
import { Personne } from "../../../shared/models/personne";
import { NetworkService } from "../../../shared/services/network.service";
import {
  faPlus,
  IconDefinition,
  faMinus,
  faHammer
} from "@fortawesome/free-solid-svg-icons";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-formations",
  templateUrl: "./formations.component.html",
  styleUrls: ["./formations.component.scss"]
})
export class FormationsComponent implements OnInit {
  @Input() iam: Personne;
  public faPlus: IconDefinition = faPlus;
  public faMinus: IconDefinition = faMinus;
  public faHammer: IconDefinition = faHammer;
  public showModify: boolean = false;
  public schools: string[] = [];

  constructor(private networkService: NetworkService) {
    this.loadSchools();
  }

  ngOnInit() {}

  private loadSchools() {
    this.networkService.get("/school").subscribe(school => {
      for (let i = 0; i < school["data"].length; i++) {
        this.schools.push(school["data"][i]["properties"]["name"]);
      }
    });
  }

  public onDeleteFormation(index: number) {
    console.log(index);
  }

  public show() {
    this.showModify = !this.showModify;
  }

  public onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
