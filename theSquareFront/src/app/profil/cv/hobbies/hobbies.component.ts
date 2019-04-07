import { Component, OnInit, Input } from "@angular/core";
import { Personne } from "src/app/shared/models/personne";
import { NgForm } from "@angular/forms";
import {
  faPlus,
  IconDefinition,
  faMinus,
  faHammer
} from "@fortawesome/free-solid-svg-icons";
import { NetworkService } from "../../../shared/services/network.service";

@Component({
  selector: "app-hobbies",
  templateUrl: "./hobbies.component.html",
  styleUrls: ["./hobbies.component.scss"]
})
export class HobbiesComponent implements OnInit {
  public iam: Personne;
  public faPlus: IconDefinition = faPlus;
  public faMinus: IconDefinition = faMinus;
  public faHammer: IconDefinition = faHammer;
  public showModify: boolean = false;
  public hobbies: string[] = [];
  public userHobbies: string[] = [];

  constructor(private networkService: NetworkService) {
    this.loadUserHobbies();
    this.loadHobbies();
  }

  ngOnInit() { }

  public removeHobby(index: number) {
    this.networkService.delete("hobby/" + this.userHobbies[index]).subscribe(() => {
      index === 0 ? this.userHobbies.shift() : this.userHobbies.splice(index, index);
    });
  }

  private loadUserHobbies() {
    this.networkService.get("hobby/person/" + localStorage.getItem('id')).subscribe(e => {
      this.userHobbies = e["data"].map(element => element["properties"]["entitled"]);
    });
  }

  private loadHobbies() {
    this.networkService.get("hobby").subscribe(e => {
      this.hobbies = e["data"].map(element => element["properties"]["entitled"]);
    });
  }

  public onSubmit(form: NgForm) {
    this.networkService.post("hobby", form.value).subscribe(() => {
      this.userHobbies.push(form.value.entitled);
    });
  }

  public show() {
    this.showModify = !this.showModify;
  }
}
