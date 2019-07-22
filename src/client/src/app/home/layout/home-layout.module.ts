import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HomeRoutingModule } from "../home-routing.module";
import { FooterComponent } from "../shared/footer/footer.component";
import { HeaderComponent } from "../shared/header/header.component";
import { HomeLayoutComponent } from "./home-layout.component";

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeLayoutComponent, HeaderComponent, FooterComponent],
  exports: [HomeLayoutComponent],
  providers: []
})
export class HomeLayoutModule {}
