import { Component,
    OnInit,
    ViewChildren,
    QueryList,
    ChangeDetectorRef
} from '@angular/core';
import {VgPlayer, VgAPI, VgMedia} from 'videogular2/core';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';
import {MVPService} from '../mvp.service';

@Component({
    moduleId: module.id,
    selector: 'mvp-video-elements',
    templateUrl: 'video-elements.component.html',
    styleUrls: ['video-elements.component.css'],
    directives: [
        VgPlayer,
        VgMedia,
        MD_GRID_LIST_DIRECTIVES,
        MdIcon,
        MD_BUTTON_DIRECTIVES
    ],
    providers: [VgAPI, OVERLAY_PROVIDERS, MdIconRegistry],
})
export class VideoElementsComponent implements OnInit {

    @ViewChildren(VgMedia) videoElements: QueryList<VgMedia>;

    videosLoaded = false;
    mvpService: MVPService;
    videoSources: Array<Object>;
    isMediaReady: boolean;
    removeOldFilesOnDrop = true;

    ngAfterViewInit() {
        console.log(this.videoElements);
        this.videoElements.changes.subscribe((changes) =>{ 
            console.log('Change Detected: Video Elements', changes);
            
            this.mvpService.registerVideoElements(this.videoElements.toArray())
            });
    }

    constructor(mvpService: MVPService, public changeDetectionRef: ChangeDetectorRef) {

        this.mvpService = mvpService;
        this.videoSources = mvpService.videoSources;
        this.isMediaReady = false;
        mvpService.isMediaReady.subscribe(value => {
            console.log('MediaReady Event', value);
            this.isMediaReady = value;
            changeDetectionRef.detectChanges();
        });
    }


    ngOnInit() {
        
    }
    onPlayerReady(api: VgAPI) {
        console.log('Player ready');
        this.mvpService.registerAPI(api);
    }

    /**
     * Drag Drop Functions
     */
    dragOver = false;
    onDragEnter($event): void {
        // console.log('Dragged Enter', $event);
        this.dragOver = true;
    }
    onDragLeave($event): void {
        // console.log('Dragged Leave', $event);
        this.dragOver = false;
    }
    onDragOver($event): void {
        $event.preventDefault();
        // console.log('Dragged Over', $event);
        this.dragOver = true;
    }
    onDrop($event): any {
        // console.log('Dropped', $event);
        $event.stopPropagation();
        $event.preventDefault();
        let filesDropped = $event.dataTransfer.files;
        let files = [];
        //Convert the filesDropped object into Array
        for (var i = 0; i < filesDropped.length; i++) {
            files.push(filesDropped[i]);
        }
        console.log(files);


        files.forEach(file => {
            this.mvpService.addVideoSource(file);
        });
        this.videoSources = this.mvpService.getVideoSources();
        console.log('new video sources',this.videoSources);
        
        //TODO Implement correct event management
        this.changeDetectionRef.detectChanges();
        this.mvpService.isMediaReady.next(true);
        this.dragOver = false;
        console.log('Dropped', 'returning false');
        
        return true;
    }

    /**
     * Gets the file type from teh File object
     */
    getFileType(file): string {
        return file.type;
    }

        muteAll() {
        this.mvpService.muteAll();
    }
    unmuteAll() {
        this.mvpService.unmuteAll();
    }

    toggleMute(id:string): void {
        this.mvpService.toggleMute(id);
    }

}
