import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {VgAPI, VgMedia} from 'videogular2/core';
import { DomSanitizationService, SafeUrl} from '@angular/platform-browser';

@Injectable()
export class MVPService {

  /**
   * Variables
   */
  api: VgAPI;
  videoSources: Array<any>;
  firstElement: any;
  sanitizer: DomSanitizationService;


  isPlaying: Subject<boolean>;
  volumeStatus: Subject<any>;
  isMediaReady: Subject<boolean>;
  currentTime: Subject<number>;
  totalDuration: Subject<number>;

  constructor(sanitizer: DomSanitizationService) {
    this.sanitizer = sanitizer;
    this.videoSources = [];
    this.isPlaying = new Subject();
    this.volumeStatus = new Subject();
    this.isMediaReady = new Subject();
    this.currentTime = new Subject();
    this.totalDuration = new Subject();
  }

  registerAPI(api: VgAPI): void {
    this.api = api;
  }

  togglePlayPause(): void {
    typeof (this.firstElement) === 'undefined' ? this.firstElement = this.videoSources[0] : this.firstElement;
    console.log(this.api.state);

    if (this.api.state[this.firstElement.id] === "pause" || this.api.state === "pause") {
      this.play();
    } else {
      this.pause();
    }
  }
  play(): void {
    console.log("MVP Service: Playing");
    this.api.play();
  }
  pause(): void {
    console.log("MVP Service: Pausing");
    this.api.pause();
  }
  seekTo(seconds: number): void {
    this.api.seekTime(seconds, false);
  }
  seek(type: string, seconds: number): void {

    let currentTime = this.getCurrentTime();
    console.log('currentTime/seekval', currentTime, '/', seconds);

    let newTime = 0;

    switch (type) {
      case 'absolute':
        newTime = seconds;
        this.seekTo(newTime);
        break;
      case 'forward':
        newTime = currentTime + seconds;
        console.log("Forward : New Time", newTime);
        this.seekTo(newTime);
        break;
      case 'rewind':
        newTime = currentTime - seconds;
        if (newTime < 0) {
          console.log("Rewind : New Time", 0);
          this.seekTo(0);
        } else {
          console.log("Rewind : New Time", newTime);
          this.seekTo(newTime);
        }
        break;
    }
  }
  mute(id: string): void {
    this.api.medias[id].elem.volume = 1;
  }
  unmute(id: string): void {
    this.api.medias[id].elem.volume = 0;
  }
  toggleMute(id: string): void {
    var media = this.api.getMediaById(id);
    console.log(typeof (media.elem.volume));

    if (media.elem.volume === '0' || media.elem.volume === 0) {
      this.mute(id);
    } else {
      this.unmute(id);
    }
  }
  muteAll(): void {
    this.api.$$setAllProperties('volume', 0);
  }
  unmuteAll(): void {
    this.api.$$setAllProperties('volume', 1);
  }

  /**
 * Adds the video to the player
 */
  registerVideoElements(elements: Array<VgMedia>): void {
    let count = 0;
    elements.forEach(element => {
      this.api.registerMedia(element);
      count++;
    });
    console.log(`Registered Elements`, count);
    this.subscribeToEvents();
    this.isMediaReady.next(true);
  }
  subscribeToEvents(): void {
    /**
     * canPlay
     * canPlayThrough
     * ended
     * error
     * loadedMetadata
     * mutation
     * pause
     * play
     * playing
     * progress
     * timeUpdate
     * volumeChange
     * waiting
     */
    // this.api.subscriptions.
    console.log(this.api.subscriptions);
    typeof (this.firstElement) === 'undefined' ? this.firstElement = this.videoSources[0] : this.firstElement;

    //Subscribe to play event
    this.api.subscriptions[this.firstElement.id].play.subscribe(event => {
      this.isPlaying.next(true)
    });
    //Subscribe to pause event
    this.api.subscriptions[this.firstElement.id].pause.subscribe(event => {
      this.isPlaying.next(false)
    });
    //Subscribe to volume change event
    this.videoSources.forEach(element => {
      this.api.subscriptions[element.id].volumeChange.subscribe(event => {
        let volume = event.target.volume;
        if (volume === 0) {
          this.volumeStatus.next({
              id: event.target.id,
              value:true
            });
        } else {
          this.volumeStatus.next({
              id: event.target.id,
              value:false
            });;
        }
        console.log('VolumeChanged',event.target.id, event.target.volume);
      });
    });
    //Subscribe to timeupdate event
    this.api.subscriptions[this.firstElement.id].timeUpdate.subscribe(event => {
      this.currentTime.next(event.target.currentTime);
    });
    
    

    //progress
    this.api.subscriptions[this.firstElement.id].progress.subscribe(event => {
      // this.currentTime.next(event.target.currentTime);
      console.log(event);
      this.totalDuration.next(event.target.duration);
    });

    console.log('Subscriptions done');
  }

  addVideoSource(file): void {
    //get current length so we can add ids to newly added files
    let currentFileIndex = this.videoSources.length + 1;

    if (file.type === "video/mp4") {
      this.videoSources.push({
        src: this.getObjectURL(file),
        type: file.type,
        id: 'video' + currentFileIndex
      });

      console.log('Added File', file.name);
    }
    else {
      console.log('Skipping File', file.name);

    }

  }

  getVideoSources():Array<any>{
    return this.videoSources;
  }

  /** 
  * Gets the blob url of the file so we can handle it without knowing the actual location
  * */
  getObjectURL(file): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }
  getCurrentTime(): number {
    // let {  } = this.api.currentTime;
    // console.log('CurrentTime', currTime, this.api.currentTime);
    console.log('CurrentTime', this.api.currentTime);
    
    return this.api.currentTime[this.firstElement.id];
    // return currTime;
  }

}
