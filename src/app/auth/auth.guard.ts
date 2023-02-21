import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override router: Router,
    protected kc: KeycloakService
  ) {
    super(router, kc);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.kc.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // get user roles
    const requiredRoles = route.data['roles'];

    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    if (!requiredRoles.every((role) => this.roles.includes(role))) {
      this.router.navigate(['/']);
    }

    return requiredRoles.every((role) => this.roles.includes(role));
  }
}
