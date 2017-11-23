import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

import { EmployeesComponent } from './components/app.component';
import { LogoComponent } from './index/logo.component';
import { ReportsDetailAccessRejectedComponent } from './reports/reports.access.rejected.component';
import { ReportsDetailAccessEnterTodayComponent } from './reports/reports.access.enter.today.component';
import { ApiComponent } from './Api Service/Api.component';
import { AboutComponent } from './about/about.component';
import { EmployeeModalComponent } from './components/employee/edit-view.component';
import { ConfirmationComponent } from './components/employee/confirmation-dialog/confirmation.component';
import { ApiService } from './shared';
import { MyFilterPipe } from '../app/components/filter';
import { routing } from './app.routing';
import { IndexComponent } from './index/index.component';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    DataTableModule,
  ],
  declarations: [
    EmployeesComponent,
    ApiComponent,
    AboutComponent,
    EmployeeModalComponent,
    ConfirmationComponent,
    MyFilterPipe,
    IndexComponent,
    LogoComponent,
    ReportsDetailAccessRejectedComponent,
    ReportsDetailAccessEnterTodayComponent,
  ],
  providers: [
    ApiService
  ],
  bootstrap: [IndexComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
