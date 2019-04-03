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

  constructor(private networkService: NetworkService) {
    this.networkService
      .get("/entity/" + localStorage.getItem("token"))
      .subscribe(e => {
        this.iam = e["data"]["properties"];
      });
  }

  ngOnInit() {}
}
