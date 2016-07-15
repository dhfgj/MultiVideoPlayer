/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { MVPService } from './mvp.service';
import { DomSanitizationService }           from '@angular/platform-browser';

describe('MvpService Service', () => {
  
  let sanitizer; 

  beforeEachProviders(() => [MVPService]);

    
  beforeEach(inject([DomSanitizationService], sanitizer => {
    sanitizer = sanitizer;
  }));

  it('should ...',
      inject([MVPService], (service: MVPService) => {
    expect(service).toBeTruthy();
  }));
});
