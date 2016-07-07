import { Component, ViewChild, OnInit } from '@angular/core';
import { VideoControlsComponent } from './video-controls'
import { VideoElementsComponent } from './video-elements'
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_RADIO_DIRECTIVES } from '@angular2-material/radio';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core/coordination/unique-selection-dispatcher';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [VideoControlsComponent, VideoElementsComponent, MD_GRID_LIST_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MdIcon, MD_RADIO_DIRECTIVES, MD_LIST_DIRECTIVES],
  providers: [MdIconRegistry, MdUniqueSelectionDispatcher],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works yay!';
  @ViewChild('mvpSidenav') sidenav;
  @ViewChild('videoElements') videoElements;
  @ViewChild('videoControls') videoControls;

  currentTime = null;

  playbackSpeed = 1;

  playbackSpeedOptions = [
    { value: 1, label: "1x" },
    { value: 1.5, label: "1.5x" },
    { value: 2, label: "2x" }
  ];

  folders =[
    {
      name:"Projects",
      updated:Date.now()
    },
    {
      name:"Later",
      updated:Date.now()-200
    }

  ];
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
