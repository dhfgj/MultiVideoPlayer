/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement, ChangeDetectorRef } from '@angular/core';
import { MVPService } from '../mvp.service';


import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { VideoControlsComponent } from './video-controls.component';

describe('Component: VideoControls', () => {


  let changeDetectionRef;
let mvpService;

  beforeEach(inject([MVPService], mvpService => {
    mvpService = mvpService;
  }));
  beforeEach(inject([ChangeDetectorRef], changeDetectionRef => {
    changeDetectionRef = changeDetectionRef;
  }));

  it('should create an instance', () => {
    let component = new VideoControlsComponent(mvpService);
    expect(component).toBeTruthy();
  });
});
