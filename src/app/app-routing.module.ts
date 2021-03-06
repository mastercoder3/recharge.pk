import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from './agents/agents/agents.component';
import { AdminComponent } from './admin/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./start/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./start/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'agent',
    component: AgentsComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./agents/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'recharge',
        loadChildren: () => import('./agents/recharge/recharge.module').then( m => m.RechargePageModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./agents/transactions/transactions.module').then( m => m.TransactionsPageModule)
      },
      {
        path: 'top-up',
        loadChildren: () => import('./agents/top-up/top-up.module').then( m => m.TopUpPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./agents/profile/profile.module').then( m => m.ProfilePageModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children:[
      {
        path: 'home',
        loadChildren: () => import('./admin/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./admin/users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./admin/transactions/transactions.module').then( m => m.TransactionsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./admin/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./admin/settings/settings.module').then( m => m.SettingsPageModule)
      }
    ]
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
