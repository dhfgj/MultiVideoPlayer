import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {FORM_DIRECTIVES} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MVPService} from '../mvp.service'




@Component({
    moduleId: module.id,
    selector: 'mvp-video-controls',
    templateUrl: 'video-controls.component.html',
    styleUrls: ['video-controls.component.css'],
    directives: [MdIcon, MD_BUTTON_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_INPUT_DIRECTIVES],
    providers: [MdIconRegistry],
})
export class VideoControlsComponent implements OnInit {
    mvpService:MVPService;

    isPlaying = false;
    isMute = false;
    isMediaReady = false;
    sidenavOpen = false;

    constructor(mvpService:MVPService) {
        this.mvpService = mvpService;
        mvpService.isPlaying.subscribe(value => {
            this.isPlaying = value;
        });
        mvpService.isMute.subscribe(value => {
            this.isMute = value;
        });
        mvpService.isMediaReady.subscribe(value => {
            this.isMediaReady = value;
        });
     }

    ngOnInit() {
    }

    timeHH = 24;
    timeMM = 59;
    timeSS = 59;
    @Input() currenTime; 
    

    


    @Output() playStatusChanged = new EventEmitter();
    @Output() muteStatusChanged = new EventEmitter();
    @Output() seekStatusChanged = new EventEmitter();
    @Output() sidenavStatusChanged = new EventEmitter();


    play() {
        console.log('Controls Playing');
        this.mvpService.play();
    }
    pause() {
        console.log('Controls Pausing');
        this.mvpService.pause();
    }

    togglePlay(): void {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    mute() {
        this.mvpService.mute();
    }
    unmute() {
        this.mvpService.unmute();
    }

    toggleMute(): void {
        if (this.isMute) {
            this.unmute();
        } else {
            this.mute();
        }
    }
    rewind(seconds: number) {
        this.seekTo('rewind',seconds);
    }
    forward(seconds: number) {
        this.seekTo('forward',seconds);
    }
    stop():void{
        this.seekTo('absolute',0);
        this.pause();
    }
    seekTo(seekType:string,seconds: any) {
        console.log('Seeking ',seekType,' by:', seconds);
        this.mvpService.seek(seekType,seconds);
    }

    toggleSidenav(): void {
        this.sidenavStatusChanged.emit({
            value: true
        });
    }

}
