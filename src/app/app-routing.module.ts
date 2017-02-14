import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { HireComponent } from './hire/hire.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SamplesComponent } from './samples/samples.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '/home',          component: HomeComponent},
  { path: '/about',         component: AboutComponent },
  { path: '/blog',          component: BlogComponent },
  { path: '/contact',       component: ContactComponent },
  { path: '/hire',          component: HireComponent },
  { path: '/portfolio',     component: PortfolioComponent },
  { path: '/samples',       component: SamplesComponent },
  { path: '/testimonials',  component: TestimonialsComponent },
  { path: '/*',             component: HomeComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
