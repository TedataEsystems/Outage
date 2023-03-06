import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { LayoutComponent } from '../../component/layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DeleteMsgComponent } from '../../component/delete-msg/delete-msg.component';
import { ChartsModule } from 'ng2-charts';
import { LoaderComponent } from '../../component/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from '../../interceptors/loading.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from '../../component/error-page/error-page.component';
import { LogsComponent } from 'src/app/component/logs/logs.component';
import { UserComponent } from 'src/app/component/settings/user/user.component';
import { AddUserComponent } from '../../../component/Forms/add-user/add-user.component';
import { RoleComponent } from '../../../component/settings/role/role.component';
import { ApproveStatusComponent } from '../../../component/settings/approve-status/approve-status.component';
import { SplitPipe } from 'src/app/pipes/split.pipe';
import { LoadingService } from '../../service/loading.service';
import { OutageComponent } from 'src/app/component/outage/outage.component';
import { AddTicketComponent } from '../../../component/Forms/add-ticket/add-ticket.component';
import { EditTicketComponent } from '../../../component/Forms/edit-ticket/edit-ticket.component';
import { ProblemTypeComponent } from '../../../component/settings/problem-type/problem-type.component';
import { ProblemPlaceComponent } from '../../../component/settings/problem-place/problem-place.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    DeleteMsgComponent,
    LoaderComponent,
    ErrorPageComponent,
    LogsComponent,
    UserComponent,
    AddUserComponent,
    RoleComponent,
    ApproveStatusComponent,
    SplitPipe,
    OutageComponent,
    AddTicketComponent,
    EditTicketComponent,
    ProblemTypeComponent,
    ProblemPlaceComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ChartsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

  ],


  providers:[LoadingService,{provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true}]
})
export class LayoutModule { }
