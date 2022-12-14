import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { MasterPageComponent } from './pages/master-page/components/master-page/master-page.component';
import { HomePageComponent } from './pages/home-page/components/home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileComponent } from './pages/user-profile-page/components/user-profile/user-profile.component';
import { UserProfileModalComponent } from './pages/user-profile-page/components/user-profile-modal/user-profile-modal.component';
import { PostComponent } from './common/components/post/post.component';
import { PostMakerComponent } from './common/components/post-maker/post-maker.component';
import { RepostComponent } from './common/components/repost/repost.component';
import { SearchComponent } from './common/components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterPageComponent,
    HomePageComponent,
    UserProfileComponent,
    UserProfileModalComponent,
    PostComponent,
    PostMakerComponent,
    RepostComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
