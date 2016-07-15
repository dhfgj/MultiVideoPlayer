import {
  Component,
  ViewChild,
  OnInit,
  HostListener 
} from '@angular/core';
import { VideoControlsComponent } from './video-controls'
import { VideoElementsComponent } from './video-elements'
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_RADIO_DIRECTIVES } from '@angular2-material/radio';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core/coordination/unique-selection-dispatcher';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import {MVPService } from './mvp.service';

const KeyboardKeyCodes = {
  KEY_C: 99,
  SPACE: 32
};

@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [
    VideoControlsComponent,
    VideoElementsComponent,
    MD_GRID_LIST_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MdIcon,
    MD_RADIO_DIRECTIVES,
    MD_LIST_DIRECTIVES
  ],
  providers: [MdIconRegistry, MdUniqueSelectionDispatcher],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app works yay!';
  currentTime = null;
  mvpService: MVPService;
  playbackSpeed = 1;

  playbackSpeedOptions = [
    { value: 1, label: '1x' },
    { value: 1.5, label: '1.5x' },
    { value: 2, label: '2x' }
  ];

  @ViewChild('mvpSidenav') sidenav;
  @ViewChild('videoElements') videoElements;
  @ViewChild('videoControls') videoControls;


  @HostListener('document:keypress', ['$event'])
  keyPressHandler(event: KeyboardEvent): void {
    // this.key = event.key;
    switch (event.keyCode) {
      case KeyboardKeyCodes.SPACE:
        this.mvpService.togglePlayPause();
        break;

    }

  }

  constructor(mvpService: MVPService) {
    this.mvpService = mvpService;
  }

  ngOnInit() {
    this.currentTime = this.videoElements.currentTime;
  }

  toggleSidenav($event): void {
    console.log($event);
    if ($event.value) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }

}
