import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/home.component").then((m) => m.HomeComponent)
  },
  {
    path: "board/:id",
    loadComponent: () => import("./features/board/board.component").then((m) => m.BoardComponent)
  },
  {
    path: "signin",
    loadComponent: () => import("./core/auth/signin/signin.component").then((m) => m.SigninComponent)
  },
  {
    path: "signup",
    loadComponent: () => import("./core/auth/signup/signup.component").then((m) => m.SignupComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
