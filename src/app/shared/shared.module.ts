import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { TooltipDescriptionComponent } from './tooltip-description/tooltip-description.component';
import { NotificationCenterModule } from '../common/common';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as angular2loaderscss from 'angular2-loaders-css';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Ng2Bs3ModalModule,
    angular2loaderscss.LoadersCssModule,
    NotificationCenterModule
  ],
  declarations: [NavbarComponent, TooltipDescriptionComponent],
  exports: [
    Ng2Bs3ModalModule,
    NavbarComponent,
    CommonModule,
    FormsModule,
    TooltipDescriptionComponent,
    angular2loaderscss.LoadersCssModule,
    NotificationCenterModule
    ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
