import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs";

/*
 Generated class for the DataProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
export interface Speaker {
    id?: string;
    listHeader: string;
    speakerInfo: Array<any>;
}

@Injectable()
export class DataProvider {

    speakersListRef: AngularFirestoreCollection<Speaker>;
    speakerList: Observable<Speaker[]>;

    constructor(private afs: AngularFirestore) {
        this.speakersListRef = this.afs.collection<Speaker>(`Speakers`);
        this.speakerList = this.speakersListRef.snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data() as Speaker;
                const id = action.payload.doc.id;
                return {id, ...data};
            });
        });
    }

    addNewTitleToDB(header): void {
        if (header) {
            this.speakersListRef.add({listHeader: header.title, speakerInfo: []});
        }
    }

    addSongToDB(speaker, speakerData): void {
        speaker.speakerInfo.push(speakerData);
        this.speakersListRef.doc(speaker.id).update({speakerInfo: speaker.speakerInfo});
    }

    removeSpeakerToDB(speaker, currentSpeaker): void {
        let index = speaker.speakerInfo.indexOf(currentSpeaker);
        if (index > -1) {
            speaker.speakerInfo.splice(index, 1);
            this.speakersListRef.doc(speaker.id).update({speakerInfo: speaker.speakerInfo});
        }
    }

    removeGenreFromDB(speaker, currentGenre): void {
        let index = speaker.speaker.indexOf(currentGenre);
        if (index > -1) {
            speaker.speaker.splice(index, 1);
            this.speakersListRef.doc(speaker.id).update({speakerInfo: speaker.speakerInfo});
        }
    }
}
