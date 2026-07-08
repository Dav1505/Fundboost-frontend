import { Routes } from '@angular/router';
import { onboardingGuard } from './model/guards/onboardingGuard';
import { alreadyOnboardedGuard } from './model/guards/alreadyOnboardedGuard';
import { userRoleGuard } from './model/guards/roleGuard';
import {MainLayout} from './components/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'onboarding',
        loadComponent: () =>
          import('./components/onboarding/onboarding').then(m => m.OnboardingComponent),
        canActivate: [alreadyOnboardedGuard]
      },

      // --- Projects ---
      { path: '', pathMatch: 'full', redirectTo: 'projects' },
      {
        path: 'projects',
        loadComponent: () =>
          import('./components/projects/project-list/project-list').then(m => m.ProjectListComponent),
        canActivate: [onboardingGuard, userRoleGuard]
      },
      {
        path: 'projects/create',
        loadComponent: () =>
          import('./components/projects/project-create/project-create').then(m => m.ProjectCreateComponent),
        canActivate: [onboardingGuard, userRoleGuard]
      },
      {
        path: 'projects/my-projects',
        loadComponent: () =>
          import('./components/projects/my-projects/my-projects').then(m => m.MyProjectsComponent),
        canActivate: [onboardingGuard, userRoleGuard]
      },
      {
        path: 'projects/:id',
        loadComponent: () =>
          import('./components/projects/project-detail/project-detail').then(m => m.ProjectDetailComponent),
        canActivate: [onboardingGuard, userRoleGuard]
      },

      // --- Wallet ---
      {
        path: 'wallet',
        loadComponent: () =>
          import('./components/wallet/wallet').then(m => m.WalletComponent),
        canActivate: [onboardingGuard, userRoleGuard]
      },
    ]
  },

  // --- Default / fallback ---
  { path: '**', redirectTo: 'projects' }
];
