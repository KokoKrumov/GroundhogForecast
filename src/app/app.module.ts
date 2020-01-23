import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {FormsModule} from '@angular/forms';
import {CurrentComponent} from './current/current.component';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './config.service';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {TabsComponent} from './tabs/tabs.component';
import {HistoryComponent} from './history/history.component';
import {DaysComponent} from './days/days.component';
import { SplitPipe } from './split.pipe';

@NgModule({
    declarations: [
        AppComponent,
        SearchBarComponent,
        CurrentComponent,
        NotFoundComponent,
        HomeComponent,
        TabsComponent,
        HistoryComponent,
        DaysComponent,
        SplitPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTabsModule,
        MatAutocompleteModule
    ],
    providers: [
        ConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
