import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { MovieItemComponent } from "../../shared/movie-item/movie-item.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  declarations: [HomeComponent, MovieItemComponent],
  exports: [HomeComponent],
  providers: []
})
export class PageHomeModule {}
