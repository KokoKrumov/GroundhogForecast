import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

    historyList: string[] = [];

    constructor(
        private activeRoute: ActivatedRoute,
    ) {
    }


    ngOnInit() {
        this.activeRoute.queryParams.subscribe(queryParams => {
            if (!this.historyList.includes(queryParams.city) && queryParams.city !== undefined && queryParams.city !== '') {
                this.historyList.push(queryParams.city);
            }
            console.log(this.historyList);
        });
    }
}
