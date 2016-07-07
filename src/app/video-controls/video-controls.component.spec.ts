/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { VideoControlsComponent } from './video-controls.component';

describe('Component: VideoControls', () => {
  it('should create an instance', () => {
    let component = new VideoControlsComponent();
    expect(component).toBeTruthy();
  });
});
