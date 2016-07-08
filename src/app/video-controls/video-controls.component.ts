import { Component, OnInit, Output, EventEmitter, Input, ViewChild, QueryList} from '@angular/core';
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
    mvpService: MVPService;

    isPlaying = false;
    isMute = false;
    isMediaReady = false;
    sidenavOpen = false;
    currentTime: Date = this.getNewDate(0,0,0);
    totalDuration: Date = this.getNewDate(0,0,0);
    timeHH = 24;
    timeMM = 59;
    timeSS = 59;
    constraints = {
        min: {
            'hh': 0,
            'mm': 0,
            'ss': 0
        },
        max: {
            'hh': 24,
            'mm': 59,
            'ss': 59
        }
    };

    constructor(mvpService: MVPService) {
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

        mvpService.currentTime.subscribe(value => {
            // console.log('set seconds', value);
            this.currentTime = this.getNewDate(0,0,0);
            this.currentTime.setSeconds(value);
        });
        mvpService.totalDuration.subscribe(value => {
            // console.log('set totalDuration', value);
            this.totalDuration = this.getNewDate(0,0,0);
            this.totalDuration.setSeconds(value);
            
            //Set the constraints on the input elements so selections cannot be made beyond video duration 
            this.constraints.max.hh = this.totalDuration.getHours();
            this.constraints.max.mm = this.totalDuration.getMinutes();
            this.constraints.max.ss = this.totalDuration.getSeconds();
        });
    }

    ngOnInit() {
    }





    @Output() playStatusChanged = new EventEmitter();
    @Output() muteStatusChanged = new EventEmitter();
    @Output() seekStatusChanged = new EventEmitter();
    @Output() sidenavStatusChanged = new EventEmitter();


    play() {
        console.log('Controls Playing');
        //Check currentTime, if present start from that time
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
        this.seekTo('rewind', seconds);
    }
    forward(seconds: number) {
        this.seekTo('forward', seconds);
    }
    stop(): void {
        this.seekTo('absolute', 0);
        this.pause();
    }

    updateCurrentTime(type: string, $event): void {
        //First pause the player, otherwise the updates get erratic
        this.pause();
        //Then set the newTime to currentTime
        let newTime = new Date(this.currentTime.toString());

        //Get the newValue fromthe event
        let newValue = $event.target.value;

        //Depending upon event type, set the newValue to newTime
        switch (type) {
            case 'hh':
                console.log('hh', newValue);
                newTime.setHours(newValue);
                break;
            case 'mm':
                console.log('mm', newValue);
                newTime.setMinutes(newValue);
                break;
            case 'ss':
                console.log('ss', newValue);
                newTime.setSeconds(newValue);
                break;
        }
        /** 
         * Date.getTime() gives us seconds since 1 Jan, 1970
         * */
        let totalSeconds = this.getTimeInSeconds(newTime);
        // console.log(totalSeconds);
        this.seekTo('absolute', totalSeconds);
    };

    seekTo(seekType: string, seconds: any) {
        console.log('Seeking ', seekType, ' by:', seconds);
        this.mvpService.seek(seekType, seconds);
    }

    getTimeInSeconds(time: Date): number {
        //Init new time object 
        let initTime = this.getNewDate(0,0,0);
        return time.getTime() / 1000 - initTime.getTime() / 1000
    }

    toggleSidenav(): void {
        this.sidenavStatusChanged.emit({
            value: true
        });
    }
    copyTimeToClipboard(): void {
        try {

            // if (document.queryCommandSupported('copy')){
            let itc: any = document.querySelector('.inputToCopy');
            // console.log(itc);
            itc.select();
            document.execCommand('copy');
            itc.blur();
            console.log('Copied');
            // }else{
            //     console.log('Copy Command not supported');

            // }
        } catch (e) {
            console.error("Cannot Perform Copy", e);
        }
    }
    getNewDate(hh:number,mm:number,ss:number):Date{
        return new Date(new Date().setHours(hh,mm,ss,0));
    }
}