import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarEntity } from '../owner-configuration/car-entity';
import { OwnerEntity } from '../owner-configuration/owner-entity';

@Injectable({
  providedIn: 'root',
})
export class ICarOwnerService {
   constructor(private http: HttpClient) { }

   pathUrl = 'api/owners/'

   getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.pathUrl)
   }

   getOwnerById(aId: string): Observable<OwnerEntity> {
     return this.http.get<OwnerEntity>(this.pathUrl + aId)
   }

   createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[], id?: string): Observable<OwnerEntity> {
     return this.http.post<OwnerEntity>(this.pathUrl, <OwnerEntity>{id, aLastName, aFirstName, aMiddleName, aCars})
   }

   reeditOwner(owner: OwnerEntity): Observable<OwnerEntity> {
     return this.http.put<OwnerEntity>(this.pathUrl, owner)
   }

   addNewOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
     return this.http.put<OwnerEntity>(this.pathUrl, aOwner)
   }

   deletOwner(aOwnerId: string) {
     return this.http.delete<OwnerEntity>(this.pathUrl + aOwnerId).subscribe(() => this.http.post('api/owners/resetDb', { clear: true }))
   }


}
