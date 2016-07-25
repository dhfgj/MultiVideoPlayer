import { Component, OnInit, Output, EventEmitter, Input, ViewChild, QueryList} from '@angular/core';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {FORM_DIRECTIVES} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MVPService} from '../mvp.service'
import {MD_MENU_DIRECTIVES} from '@angular2-material/menu';

 export const PlaybackSpeedValues:[number] =[
        1,
        1.5,
        2
    ];

  export interface playbackSpeed  {
        index:number,
        value:number,
        text:string
    }
   
@Component({
    moduleId: module.id,
    selector: 'mvp-video-controls',
    templateUrl: 'video-controls.component.html',
    styleUrls: ['video-controls.component.css'],
    directives: [MdIcon, MD_BUTTON_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, MD_INPUT_DIRECTIVES, MD_MENU_DIRECTIVES],
    providers: [MdIconRegistry],
})
export class VideoControlsComponent implements OnInit {
    mvpService: MVPService;

    isPlaying = false;

    volumeStatus: any = {};
    videoSources: any = [];

    isMediaReady = false;
    sidenavOpen = false;
    currentTime: Date = this.getNewDate(0, 0, 0);
    totalDuration: Date = this.getNewDate(0, 0, 0);
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
    SEEK_VALUES = {
        "TEN" : 10
    }
  
    playbackSpeeds:[playbackSpeed];
    currentPlaybackSpeed:playbackSpeed;
    // playbackSpeeds = [
    //     {
    //         index:1,
    //         value:1,
    //         text:'1x'
    //     },
    //     {
    //         index:2,
    //         value:1.5,
    //         text:'1.5x'
    //     },
    //     {
    //         index:3,
    //         value:2,
    //         text:'2x'
    //     },
    // ]
    //   dialogRef: MdDialogRef<JazzDialog>;

    constructor(mvpService: MVPService) {
        this.mvpService = mvpService;
        mvpService.isPlaying.subscribe(value => {
            this.isPlaying = value;
        });
        mvpService.volumeStatus.subscribe(volumeStatus => {
            this.volumeStatus[volumeStatus.id] = volumeStatus.value;
            console.log(this.volumeStatus);

        });
        mvpService.isMediaReady.subscribe(value => {
            this.isMediaReady = value;
        });

        mvpService.currentTime.subscribe(value => {
            // console.log('set seconds', value);
            this.currentTime = this.getNewDate(0, 0, value);
            // console.log('Current Time', this.currentTime);
            // this.currentTime.setSeconds(value); 
        });
        mvpService.totalDuration.subscribe(value => {
            // console.log('set totalDuration', value);
            this.totalDuration = this.getNewDate(0, 0, value);
            console.log('Total Duration', this.totalDuration);

            // this.totalDuration.setSeconds(value);

            //Set the constraints on the input elements so selections cannot be made beyond video duration 
            this.constraints.max.hh = this.totalDuration.getHours();
            this.constraints.max.mm = this.totalDuration.getMinutes();
            this.constraints.max.ss = this.totalDuration.getSeconds();

            //set the new video sources
            this.videoSources = this.mvpService.getVideoSources();
            console.log('totalProgress videosources', this.videoSources);

        });
    }
    getVolumeStatus(): string {

        if (this.videoSources.length !== Object.keys(this.volumeStatus).length) {

            this.videoSources.forEach(source => {
                this.volumeStatus[source.id] = false;
            });
        }
        var total = Object.keys(this.volumeStatus).length;
        var totalMute = 0;
        // var keys = Object.keys(this.volumeStatus);
        for (var index = 0; index < total; index++) {
            var key = Object.keys(this.volumeStatus)[index];
            if (this.volumeStatus[key]) {
                totalMute++;
            }


        }
        //  console.log(index,totalMute);
        if (totalMute === total) {
            return 'volume_off';
        } else if (totalMute < total && totalMute > 0) {
            return 'volume_down';
        } else if (totalMute === 0) {
            return 'volume_up';
        }
    }

    ngOnInit() {
    }

    @Output() playStatusChanged = new EventEmitter();
    @Output() volumeStatusChanged = new EventEmitter();
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

    muteAll() {
        this.mvpService.muteAll();
    }
    unmuteAll() {
        this.mvpService.unmuteAll();
    }

    toggleMuteAll(): void {
        var status = this.getVolumeStatus();
        if (status === 'volume_off') {
            this.unmuteAll();
        } else {
            this.muteAll();
        }
    }
    rewind(seconds: number) {
        this.mvpService.seek('rewind', seconds);
    }
    forward(seconds: number) {
        this.mvpService.seek('forward', seconds);
    }
    stop(): void {
        this.mvpService.seek('absolute', 0);
        this.pause();
    }
    seekTo(seekType: string, seconds: any) {
        console.log('Seeking ', seekType, ' by:', seconds);
        this.mvpService.seek('absolute', seconds);
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

    

    getTimeInSeconds(time: Date): number {
        //Init new time object 
        let initTime = this.getNewDate(0, 0, 0);
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
    getNewDate(hh: number, mm: number, ss: number): Date {
        return new Date(new Date().setHours(hh, mm, ss, 0));
    }

    getCurrentPlaybackSpeed():playbackSpeed {
        return this.currentPlaybackSpeed;
    }
    setCurrentPlaybackSpeed(playbackSpeed:playbackSpeed):void{
        this.currentPlaybackSpeed = playbackSpeed;
    }
openMenu():void{
    console.log('Menu not yet implemented');
  }
getItems():void{
    console.log(this.mvpService.getItems());
    
}
}

@Component({
  selector: 'demo-jazz-dialog',
  template: `<p>It's Jazz!</p>`
})
export class JazzDialog { }

