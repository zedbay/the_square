import { Component, OnInit, Input } from "@angular/core";
import { NetworkService } from "../../../shared/services/network.service";

@Component({
  selector: "app-presentation",
  templateUrl: "./presentation.component.html",
  styleUrls: ["./presentation.component.scss"]
})
export class PresentationComponent implements OnInit {
  public iam = {
    name: "",
    firstName: ""
  };
  public entreprise = [];
  public activity = [];

  constructor(private networkService: NetworkService) {
    this.networkService.get("entity").subscribe(e => {
      this.iam = e["data"]["properties"];
    });
    this.networkService.get('entreprise/person/' + localStorage.getItem('id')).subscribe(entreprise => {
      this.entreprise = entreprise["data"];
    });
    this.networkService.get('activity/' + localStorage.getItem('type') + '/' + localStorage.getItem('id')).subscribe(activity => {
      this.activity = activity['data'];
    });
  }

  ngOnInit() { }
}
