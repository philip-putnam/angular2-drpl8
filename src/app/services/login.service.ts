import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable()
export class LoginService {

  constructor(private appService: AppService) { }

  // Initialize the this.Drupal JSON object and run the bootstrap, if necessary.
  Drupal = {};
  drupal_init();

  drupal_init() {
    try {
      if (!this.Drupal) { this.Drupal = {}; }

      // General properties.
      this.Drupal['csrf_token'] = false;
      this.Drupal['sessid'] = null;
      this.Drupal['user'] = this.drupal_user_defaults();

      // Settings.
      this.Drupal['settings'] = {
        app_directory: 'app',
        base_path: '/',
        cache: {
          entity: {
            enabled: false,
            expiration: 3600
          },
          views: {
            enabled: false,
            expiration: 3600
          }
        },
        debug: false,
        endpoint: '',
        file_public_path: 'sites/default/files',
        language_default: 'und',
        site_path: ''
      };

      this.Drupal['includes'] = {'module': new Array()};

      this.Drupal['modules'] = {
        core: {},
        contrib: {},
        custom: {}
      };

      this.Drupal['services_queue'] = {
        comment: {
          retrieve: {}
        },
        file: {
          retrieve: {}
        },
        node: {
          retrieve: {}
        },
        taxonomy_term: {
          retrieve: {}
        },
        taxonomy_vocabulary: {
          retrieve: {}
        },
        user: {
          retrieve: {}
        }
      };

      this.Drupal['cache_expiration'] = window.localStorage.getItem('cache_expiration');
      if (!this.Drupal['cache_expiration']) {

        this.Drupal['cache_expiration'] = {


          entities: {}

        };
      }
      else { this.Drupal['cache_expiration'] = JSON.parse(this.Drupal['cache_expiration']); }

    }
    catch (error) { console.log('drupal_init - ' + error); }
  }

  /**
   * Returns a default JSON object representing an anonymous Drupal user account.
   * @return {Object}
   */

  drupal_user_defaults() {
    try {
      return {
        uid: '0',
        roles: {'1': 'anonymous user'},
        permissions: []
      };
    }
    catch (error) { console.log('drupal_user_defaults - ' + error); }
  }

}
