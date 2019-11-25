import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'agent/home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./start/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./start/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'agent/home',
    loadChildren: () => import('./agents/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'agent/top-up',
    loadChildren: () => import('./agents/top-up/top-up.module').then( m => m.TopUpPageModule)
  },
  {
    path: 'admin/home',
    loadChildren: () => import('./admin/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'agents/recharge',
    loadChildren: () => import('./agents/recharge/recharge.module').then( m => m.RechargePageModule)
  },
  {
    path: 'agent/transactions',
    loadChildren: () => import('./agents/transactions/transactions.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'admin/users',
    loadChildren: () => import('./admin/users/users.module').then( m => m.UsersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
