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
        // item.id = sid;
        this.navCtrl.push('ListDetailPage', [{
            speaker: speaker,
            speakerItem: item
        }]);
    }

    addHeader(): void {
        let prompt = this.alertCtrl.create({
            title: 'Add Story Title',
            message: "Enter a story name below.",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Story Name'
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
                        this.dataService.addHeaderToDB(data);
                    }
                }
            ]
        });
        prompt.present();
    }

    addSpeakerToList(speaker): void {
        let prompt = this.alertCtrl.create({
            title: 'Add User Name',
            message: "Enter storyteller's name below.",
            inputs: [
                {
                    name: 'author',
                    placeholder: 'Storyteller Name'
                },
                {
                    name: 'storyName',
                    placeholder: 'Story Name'
                },
                {
                    name: 'story',
                    placeholder: 'Fill in story here...'
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
