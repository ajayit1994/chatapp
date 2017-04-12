import { Routes } from '@angular/router';

import { AppHomeComponent } from './pages/app-home/app-home.component';
//import { UserListComponent } from './pages/user-list/user-list.component';
import { ChatUserListComponent } from './pages/chat-user-list/chat-user-list.component'
//import { AppCartComponent } from './pages/app-cart/app-cart.component';
//import { AppCheckoutComponent } from './pages/app-checkout/app-checkout.component';
//import { AppCheckoutSuccessComponent } from './pages/app-checkout-success/app-checkout-success.component';
//import { ComIntractionComponent } from './pages/com-intraction/com-intraction.component';

export const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'userList', component: ChatUserListComponent }
//   { path: 'checkout', component: AppCheckoutComponent },
//   { path: 'checkout/success', component: AppCheckoutSuccessComponent },
//   { path : 'test', component : ComIntractionComponent},
//   { path: '**', component: AppNotFoundComponent }
  
];