import { Routes } from '@angular/router';
import { UserHistoryCreatorComponent } from './components/user-history-creator/user-history-creator.component';
import { QaAutomationComponent } from './components/qa-automation/qa-automation.component';

export const routes: Routes = [
  { path: 'user-history-creator', component: UserHistoryCreatorComponent },
  { path: 'qa-automation', component: QaAutomationComponent },
  { path: '', redirectTo: '/qa-automation', pathMatch: 'full' },
  { path: '**', redirectTo: '/qa-automation' }
];
