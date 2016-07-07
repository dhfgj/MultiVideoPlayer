/* tslint:disable:no-unused-variable */

import { By, DomSanitizationService }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { VideoElementsComponent } from './video-elements.component';

 

describe('Component: VideoElements, sanitizer: DomSanitizationService', () => {

let sanitizer;

 beforeEachProviders(() => [
    DomSanitizationService
  ]);

  beforeEach(inject([DomSanitizationService], sanitizer => {
    sanitizer = sanitizer;
  }));
  

  it('should create an instance', () => {
    let component = new VideoElementsComponent(sanitizer);
    expect(component).toBeTruthy();
  });
});
