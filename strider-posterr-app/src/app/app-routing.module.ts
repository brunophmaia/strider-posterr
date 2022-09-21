import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/components/home-page/home-page.component";
import { MasterPageComponent } from "./pages/master-page/components/master-page/master-page.component";
import { UserProfileComponent } from "./pages/user-profile-page/components/user-profile/user-profile.component";

const allPath = "All";
const followingPath = "Following";
const userProfilePath = "Profile";

const routes: Routes = [
  {
    path: "",
    component: MasterPageComponent,
    children: 
    [
      {
        path: "",
        pathMatch: "full",
        redirectTo: allPath,
      },
      {
        path: allPath, component: HomePageComponent,
      },
      {
        path: followingPath, component: HomePageComponent,
      },
      {
        path: userProfilePath,
        children: [
          {
            path: ":username", component: UserProfileComponent,
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'disabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }