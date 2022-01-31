import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { AuthService } from "./auth.service"; 

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor (private authService: AuthService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.authService.currentUser
    }
}