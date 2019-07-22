import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeLayoutComponent } from "./layout/home-layout.component";

const routes: Routes = [
  {
    path: "",
    component: HomeLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./pages/home/home.module#PageHomeModule"
      },
      {
        path: "trang-chu",
        loadChildren: "./pages/home/home.module#PageHomeModule"
      },
      {
        path: "tim-kiem",
        loadChildren: "./pages/search/search.module#PageSearchModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
