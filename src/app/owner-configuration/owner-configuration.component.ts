import { CarEntity } from './car-entity';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICarOwnerService } from '../services/car-owner.service';
import { Uuid } from '../services/uuid.service';
import { OwnerEntity } from './owner-entity';

@Component({
  selector: 'app-owner-configuration',
  templateUrl: './owner-configuration.component.html',
  styleUrls: ['./owner-configuration.component.scss']
})
export class OwnerConfiguration implements OnInit {
  constructor(private ownerService: ICarOwnerService, private uuid: Uuid, private router: Router, private getRouterParam: ActivatedRoute) {}
form: FormGroup;
owners: OwnerEntity[] = [];
owner: OwnerEntity = {} as OwnerEntity;
warning: boolean = false;
disabled: boolean = false
arrGosNumbers: string[] = [];
ownerId: string;
param: string = '';

ngOnInit() {
  this.getRouterParam.queryParams.subscribe((param) => this.param = param['param'] )
  this.getRouterParam.params.subscribe((param) => this.ownerId = param['id'])
  this.getOwners().subscribe((owners) => this.owners = owners)
  if(this.ownerId) {
    this.ownerService.getOwnerById(this.ownerId).subscribe((owner) => {
      this.owner = owner
    } )
  }
  if(this.param == 'view' || this.param == 'edit') {
        this.disabled = true;
  }
  this.form = new FormGroup({
    aLastName: new FormControl( {value : this.param == 'view' || 'edit' ? this.owner.aLastName : '', disabled: this.disabled}, [Validators.required, Validators.minLength(2)]),
    aFirstName: new FormControl({value : this.param == 'view' || 'edit' ? this.owner.aFirstName : '' , disabled: this.disabled}, [Validators.minLength(2), Validators.required]),
    aMiddleName: new FormControl({value : this.param == 'view' || 'edit' ? this.owner.aMiddleName : '', disabled: this.disabled}, [Validators.required, Validators.minLength(2)]),
    gosNumber: new FormControl({value: this.param == 'view' ? this.owner.aCars[0].gosNumber :'', disabled: this.param == 'view' ? true : false}, [Validators.required, Validators.pattern('([A-Z][A-Z][0-9][0-9][0-9][0-9][A-Z][A-Z])')] ),
    nameManufacturer: new FormControl({value:this.param == 'view' ? this.owner.aCars[0].nameManufacturer : '', disabled: this.param == 'view' ? true : false}, [Validators.required]),
    nameModel: new FormControl({value: this.param == 'view' ? this.owner.aCars[0].nameModel : '', disabled: this.param == 'view' ? true : false}, [Validators.required] ),
    yearProduction: new FormControl({value: this.param == 'view' ? this.owner.aCars[0].yearProduction : '', disabled: this.param == 'view' ? true : false}, [Validators.required, Validators.maxLength(4), Validators.pattern('(199[0-9]|200[0-9]|201[0-9]|2010|2020|202[0-1]|2021)')]),
  })
}


createOwner() {
  if(this.param == 'create') {
  this.getOwners().subscribe((owners) => {
  this.owners = owners
  for(let owner of this.owners ) {
    if(owner.id !== "resetDb" ) {
      for(let carValue of Object.values(owner.aCars)) {
        this.arrGosNumbers.push(carValue.gosNumber)
      }
    }
  }
    if(!this.arrGosNumbers.includes(this.form.get('gosNumber').value)) {
      this.ownerService.addNewOwner(
        {
        id: this.uuid.uuid(),
        aLastName: this.form.get('aLastName').value,
        aFirstName: this.form.get('aFirstName').value,
        aMiddleName: this.form.get('aMiddleName').value, aCars: [
             {
            gosNumber: this.form.get('gosNumber').value,
            nameManufacturer: this.form.get('nameManufacturer').value,
             nameModel: this.form.get('nameModel').value,
             yearProduction: this.form.get('yearProduction').value,
             id: this.uuid.uuid()
              }
           ]
          }).subscribe()
      this.router.navigate(['/'])
        }
    this.warning = true;
    })
  }

}

deleteCar(currentCarIndex: number) {
  let newOwners: OwnerEntity[] = []
  this.owner.aCars.splice(currentCarIndex, 1)
  newOwners = this.owners.filter((m) => {return m.id !== this.ownerId})
  newOwners.push(this.owner)
  this.ownerService.reeditOwner(this.owner).subscribe()
}

addCar() {
  let newOwners: OwnerEntity[] = []
  this.arrGosNumbers = []
  this.ownerService.getOwners().subscribe((owners) => this.owners = owners)
  if(this.param == 'edit' && !this.form.invalid) {
    for(let owner of this.owners) {
      for(let carValue of owner.aCars) {
        this.arrGosNumbers.push(carValue.gosNumber)
      }
    }
        if(!this.arrGosNumbers.includes(this.form.get('gosNumber').value)) {
          this.owner.aCars.push(<CarEntity>{
            gosNumber: this.form.get('gosNumber').value,
            nameManufacturer: this.form.get('nameManufacturer').value,
             nameModel: this.form.get('nameModel').value,
             yearProduction: this.form.get('yearProduction').value,
             id: this.uuid.uuid()
        })
        newOwners = this.owners.filter((m) => {return m.id !== this.ownerId})
        newOwners.push(this.owner)
        this.ownerService.reeditOwner(this.owner).subscribe()
        this.form.reset()
        this.warning = false;
    } else {
      this.warning = true;
    }
  }
}

private getOwners() {
 return this.ownerService.getOwners()
  }

}
