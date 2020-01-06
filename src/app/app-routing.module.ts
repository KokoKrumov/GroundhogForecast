import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forRoot([
                {
                    path: '',
                    component: HomeComponent
                },
                {
                    path: '**',
                    component: NotFoundComponent
                }
            ]
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
