/* tslint:disable:no-unused-variable */

import { By, DomSanitizationService }           from '@angular/platform-browser';
import { DebugElement, ChangeDetectorRef } from '@angular/core';
import { MVPService } from '../mvp.service';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { VideoElementsComponent } from './video-elements.component';

 

describe('Component: VideoElements, sanitizer: DomSanitizationService', () => {

let changeDetectionRef;
let mvpService;

  beforeEach(inject([MVPService], mvpService => {
    mvpService = mvpService;
  }));
  beforeEach(inject([ChangeDetectorRef], changeDetectionRef => {
    changeDetectionRef = changeDetectionRef;
  }));
  

  it('should create an instance', () => {
    let component = new VideoElementsComponent(mvpService, changeDetectionRef);
    expect(component).toBeTruthy();
  });
});
