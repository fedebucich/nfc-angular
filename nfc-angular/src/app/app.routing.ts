import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from './Api Service/Api.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'components', component: ApiComponent },
  { path: 'about', component: AboutComponent }
];

export const routing = RouterModule.forRoot(routes);
