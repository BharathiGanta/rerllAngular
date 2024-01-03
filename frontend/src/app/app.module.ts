import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UserloginComponent } from './pages/userlogin/userlogin.component';
import { UserregistrationComponent } from './pages/userregistration/userregistration.component';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';
import { UserresetpasswordComponent } from './pages/userresetpassword/userresetpassword.component';
import { BookVaccineSlotComponent } from './Userpages/bookvaccineslot/bookvaccineslot.component';
import { UpdatevaccinesComponent } from './Adminpages/updatevaccines/updatevaccines.component';
import { PostedvaccinesComponent } from './Adminpages/postedvaccines/postedvaccines.component';
import { AvailableVaccineComponent } from './Userpages/available-vaccine/available-vaccine.component';
import { AdmindashboardComponent } from './Adminpages/admindashboard/admindashboard.component';
import { UserbookedslotComponent } from './Userpages/userbookedslot/userbookedslot.component';
import { UserprofileComponent } from './Userpages/userprofile/userprofile.component';
import { FamilyMembersBookingComponent } from './Userpages/familymembersbooking/familymembersbooking.component';
import { FamilybookedslotComponent } from './Userpages/familybookedslot/familybookedslot.component';

import { UservaccinehistoryComponent } from './Userpages/uservaccinehistory/uservaccinehistory.component';
import { VaccinationCertificateComponent } from './Userpages/vaccination-certificate/vaccination-certificate.component';
import { UsernavbarComponent } from './sharepage/usernavbar/usernavbar.component';
import { AllUserVaccineHistoryComponent } from './Adminpages/all-user-vaccine-history/all-user-vaccine-history.component';


const appRoutes: Routes = [
  { path: 'userregistration', component: UserregistrationComponent },
  { path: 'userlogin', component: UserloginComponent },
  { path: 'userresetpass', component: UserresetpasswordComponent },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'Bookvaccineslot', component: BookVaccineSlotComponent },
  { path: 'userbookedslot', component: UserbookedslotComponent },
  { path: 'Updatevaccines', component: UpdatevaccinesComponent },
  { path: 'vaccine-posted', component: PostedvaccinesComponent },
  { path: 'available-vaccine', component: AvailableVaccineComponent },
  { path: 'dashboard', component: AdmindashboardComponent },
  { path: 'familybooking', component: FamilyMembersBookingComponent },
  { path: 'familybookedslot', component: FamilybookedslotComponent },
  {path: 'vaccineadministration', component:AllUserVaccineHistoryComponent},
  { path: 'vaccinehistory', component: UservaccinehistoryComponent },
  { path: 'certificate', component: VaccinationCertificateComponent },
  { path: 'userprofile', component: UserprofileComponent },
  {path: 'usernavbar', component:UsernavbarComponent},
  
  {path: 'home', component:HomeComponent},

]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    UserloginComponent,
    UserregistrationComponent,
    AdminloginComponent,
    UserresetpasswordComponent,
    BookVaccineSlotComponent,
    UpdatevaccinesComponent,
    PostedvaccinesComponent,
    AvailableVaccineComponent,
    AdmindashboardComponent,
    UserbookedslotComponent,
    UserprofileComponent,
    FamilyMembersBookingComponent,
    FamilybookedslotComponent,
   
    UservaccinehistoryComponent,
    VaccinationCertificateComponent,
    UsernavbarComponent,
    AllUserVaccineHistoryComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
