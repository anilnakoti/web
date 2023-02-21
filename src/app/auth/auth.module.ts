import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthGuard } from './auth.guard';
import { kcInit } from './kc.init';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: kcInit,
      multi: true,
      deps: [KeycloakService],
    },
    AuthGuard,
  ],
  imports: [KeycloakAngularModule],
})
export class AuthModule {}
