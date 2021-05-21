import { Component, OnInit } from '@angular/core';
import { OwnerEntity } from '../owner-configuration/owner-entity';
import { ICarOwnerService } from '../services/car-owner.service';


@Component({
  selector: 'app-owners',
  templateUrl: './owners-cars.component.html',
  styleUrls: ['./owners-cars.component.scss']
})
export class OwnersCars implements OnInit {
  constructor( private ownersService: ICarOwnerService) {}
  disabled = true;
  ownerId: string;
  owners: OwnerEntity[] = [];

  ngOnInit() {
    this.getOwners()
  }

  getOwners() {
    this.ownersService.getOwners().subscribe((owners) => {this.owners = owners.filter((m) => m.id !== "resetDb")})
  }

  clickTableRow(currentIndex: number) {
    this.disabled = false
    this.ownerId = this.owners[currentIndex].id
  }

  deleteOwner() {
    this.ownersService.deletOwner(this.ownerId)
    this.ownerId = ''
    this.getOwners()
  }

}
