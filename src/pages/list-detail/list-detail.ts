import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController} from "ionic-angular";
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the ListDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-list-detail',
    templateUrl: 'list-detail.html',
})
export class ListDetailPage {

    speakerDetails: any;
    speaker: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public dataService: DataProvider) {
        console.log(this.navParams.data);
        this.speakerDetails = this.navParams.data[0].speakerItem;
        this.speaker = this.navParams.data[0].speaker;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ListDetailPage');
    }
}
