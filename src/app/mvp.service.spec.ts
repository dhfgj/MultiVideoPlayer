/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { MVPService } from './mvp.service';

describe('MvpService Service', () => {
  beforeEachProviders(() => [MVPService]);

  it('should ...',
      inject([MVPService], (service: MVPService) => {
    expect(service).toBeTruthy();
  }));
});
