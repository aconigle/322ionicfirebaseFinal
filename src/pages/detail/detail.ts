import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

@IonicPage()
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})
export class DetailPage {

    speakers: any;

    constructor(public navCtrl: NavController, public dataService: DataProvider, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        this.speakers = this.dataService.speakerList;
    }

    itemClicked(speaker, item): void {
        this.navCtrl.push('ListDetailPage', [{
            speaker: speaker,
            speakerItem: item
        }]);
    }

    addHeader(): void {
        let prompt = this.alertCtrl.create({
            title: 'Add Song Genre',
            message: "Enter new favorite song genre.",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'song classification'
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
                        this.dataService.addNewTitleToDB(data);
                    }
                }
            ]
        });
        prompt.present();
    }

    addSpeakerToList(speaker): void {
        let prompt = this.alertCtrl.create({
            title: 'Add Artist Name',
            message: "Enter song artists name below.",
            inputs: [
                {
                    name: 'artist',
                    placeholder: 'Artists Name'
                },
                {
                    name: 'songTitle',
                    placeholder: 'Song Name'
                },
                {
                    name: 'album',
                    placeholder: 'Album song was released on'
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
                        this.dataService.addSpeakerToDB(speaker, data);
                    }
                }
            ]
        });
        prompt.present();
    }

    deleteSpeaker(speaker, currentSpeaker): void {
        this.dataService.removeSpeakerToDB(speaker, currentSpeaker);
    }

}
