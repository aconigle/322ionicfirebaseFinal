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

    // editSong(spk, data): void {
    //
    //     let prompt = this.alertCtrl.create({
    //         title: 'Edit Song',
    //         message: "Edit Song Info Below",
    //         inputs: [
    //             {
    //
    //                 name: 'Song',
    //                 placeholder: 'Edit Song',
    //                 value: this.speakerDetails.speakerInfo
    //             },
    //         ],
    //         buttons: [
    //             {
    //                 text: 'Cancel',
    //                 handler: data => {
    //                     console.log('Cancel clicked');
    //                 }
    //             },
    //             {
    //                 text: 'Save',
    //                 handler: data => {
    //                     this.speakerDetails.song = data.speakerInfo;
    //
    //                     let idx = this.speaker.speakerInfo.indexOf(this.speakerDetails);
    //                     if (idx >= 0) {
    //                         this.speaker.speakerInfo[idx] = this.speakerDetails;
    //                     }
    //                     this.dataService.editSongInDB(spk.id, data);
    //
    //                 }
    //             }
    //         ]
    //     });
    //     prompt.present();
    // }

    editSong(): void {

        let prompt = this.alertCtrl.create({
            title: 'Add another song',
            message: "Add more songs by this artist",
            inputs: [
                {
                    name: 'song',
                    placeholder: 'Song Title',
                    value: this.speakerDetails.songTitle
                },
                {
                    name: 'album',
                    placeholder: 'Album Title',
                    value: this.speakerDetails.album
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

                        this.speakerDetails.songTitle = data.songTitle;
                        this.speakerDetails.album = data.album;

                        let idx = this.speaker.speakerInfo.indexOf(this.speakerDetails);

                        if (idx >= 0) {
                            this.speaker.speakerInfo[idx] = this.speakerDetails;
                        }
                        this.dataService.editSongInDB(this.speaker);
                    }
                }
            ]
        });
        prompt.present();
    }
}
