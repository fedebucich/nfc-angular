import { RouterModule, Routes } from '@angular/router';

import { LogoComponent } from './index/logo.component';
import { IndexComponent } from './index/index.component';
import { EmployeesComponent } from './components/app.component';
import { ReportsDetailAccessRejectedComponent } from './reports/reports.access.rejected.component';
import { ReportsDetailAccessEnterTodayComponent } from './reports/reports.access.enter.today.component';

const routes: Routes = [
  { path: '', component: LogoComponent },
  { path: 'index', component: IndexComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'reports/byRejectedSubeTag', component: ReportsDetailAccessRejectedComponent },
  { path: 'reports/byEmployeeEnterToday', component: ReportsDetailAccessEnterTodayComponent }
];

export const routing = RouterModule.forRoot(routes);
