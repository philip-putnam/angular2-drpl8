import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './services/app.service';
import { BlogService } from './services/blog.service';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AppService, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
