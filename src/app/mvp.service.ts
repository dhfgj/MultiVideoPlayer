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
  videoSources: Array<Object>;
  sanitizer: DomSanitizationService;


  isPlaying: Subject<boolean>;
  isMute: Subject<boolean>;
  isMediaReady: Subject<boolean>;

  constructor(sanitizer: DomSanitizationService) {
    this.sanitizer = sanitizer;
    this.videoSources = [];
    this.isPlaying = new Subject();
    this.isMute = new Subject();
    this.isMediaReady = new Subject();
  }

  currentTime = 0;
  registerAPI(api: VgAPI): void {
    this.api = api;
  }

  play(): void {
    console.log("MVP Service: Playing");
    this.api.play();
  }
  pause(): void {
    console.log("MVP Service: Plausing");
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
  mute(): void {
    this.api.$$setAllProperties('volume', 0);
  }
  unmute(): void {
    console.log(this.api);
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

    this.api.subscriptions[0].play.subscribe(event => { this.isPlaying.next(true) });
    this.api.subscriptions[0].pause.subscribe(event => { this.isPlaying.next(false) });

    this.api.subscriptions[0].volumeChange.subscribe(event => {
      let volume = event.target.volume;
      if (volume === 0) {
        this.isMute.next(true);
      } else {
        this.isMute.next(false);
      }
      console.log('VolumeChanged', event.target.volume)
    });
    this.api.subscriptions[0].timeUpdate.subscribe(event => this.currentTime = event.target.currentTime);
    console.log('Subscribed to timeUpdate');
  }

  addVideoSource(file): void {
    //get current length so we can add ids to newly added files
    let currentFileIndex = this.videoSources.length + 1;

    if (file.type === "video/mp4") {
      this.videoSources.push({
        src: this.getObjectURL(file),
        type: file.type,
        id: currentFileIndex
      });

      console.log('Added File', file.name);
    }
    else {
      console.log('Skipping File', file.name);

    }

  }

  /** 
  * Gets the blob url of the file so we can handle it without knowing the actual location
  * */
  getObjectURL(file): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }
  getCurrentTime(): number {
    return this.api.currentTime[0];
  }

}
