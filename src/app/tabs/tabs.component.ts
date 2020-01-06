import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

    historyList;

    constructor() {
    }

    ngOnInit() {
    }

    addInHistoryList(city) {
        this.historyList = city;
    }

}
