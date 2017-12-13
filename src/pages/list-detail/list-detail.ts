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
        console.log('spaker ', this.speakerDetails);
        this.speaker = this.navParams.data[0].speaker;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ListDetailPage');
        // this.speakerDetails = this.dataService.speakerList;

    }

    editStory(): void {

        let prompt = this.alertCtrl.create({
            title: 'Add To This Story',
            message: "Add more story aspects onto this story.",
            inputs: [
                {

                    name: 'story',
                    placeholder: 'Fill in story here...',
                    value: this.speakerDetails.story
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.speakerDetails.story = data.story;

                        let idx = this.speaker.speakerInfo.indexOf(this.speakerDetails);
                        if (idx >= 0) {
                            this.speaker.speakerInfo[idx] = this.speakerDetails;
                        }

                        // this.dataService.addStoryToDB(, data);
                        this.dataService.addStoryToDB(this.speaker);

                    }
                }
            ]
        });
        prompt.present();
    }

}
