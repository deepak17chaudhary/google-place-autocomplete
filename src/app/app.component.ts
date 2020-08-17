import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
// import {} from 'googlemaps';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "Googleplaceautocomplete";
  marker;
  map;

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 17,
    });
    this.marker = new google.maps.Marker({
      map: this.map,
      anchorPoint: new google.maps.Point(0, -29),
    });
  }

  ngAfterViewInit() {
    this.setCurrentPosition();
  }

  public handleAddressChange(address: Address) {
    console.log("address", address);
    console.log("longitude", address.geometry.location.lng());
    console.log("latitude", address.geometry.location.lat());
    if (address.geometry.viewport) {
      this.map.fitBounds(address.geometry.viewport);
    } else {
      this.map.setcenter(address.geometry.location);
      this.map.setzoom(17);
    }
    this.marker.setPosition(address.geometry.location);
    // this.marker.setposition(address.geometry.location);
    this.marker.setvisible(true);
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        new google.maps.Marker({
          position: pos,
          map: this.map,
        });
        this.map.setCenter(pos);
        this.map.zoom = 17;
      });
    }
  }
}
