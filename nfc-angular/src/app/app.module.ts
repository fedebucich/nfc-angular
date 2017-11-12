import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

import { AppComponent } from './components/app.component';
import { ApiComponent } from './Api Service/Api.component';
import { AboutComponent } from './about/about.component';
import { EmployeeModalComponent } from './components/employee/edit-view.component';
import { ConfirmationComponent } from './components/employee/confirmation-dialog/confirmation.component';
import { ApiService } from './shared';
import { MyFilterPipe } from '../app/components/filter';
import { routing } from './app.routing';

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
    AppComponent,
    ApiComponent,
    AboutComponent,
    EmployeeModalComponent,
    ConfirmationComponent,
    MyFilterPipe
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
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
