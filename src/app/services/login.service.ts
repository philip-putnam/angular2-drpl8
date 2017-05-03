import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable()
export class LoginService {

  constructor(private appService: AppService) { }

  // Initialize the Drupal JSON object and run the bootstrap, if necessary.
  Drupal = {};
  drupal_init();

  drupal_init() {
    try {
      if (!this.Drupal) { this.Drupal = {}; }

      // General properties.
      this.Drupal['csrf_token'] = false;
      this.Drupal['sessid'] = null;
      this.Drupal['user'] = this.drupal_user_defaults();
      console.log("hello");

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

  system_connect(options) {
    try {

      // Build a system connect object.
      system_connect = {
        service: 'system',
        resource: 'connect',
        method: 'POST',
        path: 'system/connect.json',
        success: function(data) {
          try {
            this.Drupal.user = data.user;
            if (options.success) { options.success(data); }
          }
          catch (error) { console.log('system_connect - success - ' + error); }
        },
        error: function(xhr, status, message) {
          try {
            if (options.error) { options.error(xhr, status, message); }
          }
          catch (error) { console.log('system_connect - error - ' + error); }
        }
      };

      // If we don't have a token, grab one first.
      if (!this.Drupal.csrf_token) {
        services_get_csrf_token({
            success: function(token) {
              try {
                if (options.debug) { console.log('Grabbed new token.'); }
                // Now that we have a token, make the system connect call.
                this.Drupal.csrf_token = true;
                this.Drupal.services.call(system_connect);
              }
              catch (error) {
                console.log(
                  'system_connect - services_csrf_token - success - ' + message
                );
              }
            },
            error: function(xhr, status, message) {
              try {
                if (options.error) { options.error(xhr, status, message); }
              }
              catch (error) {
                console.log(
                  'system_connect - services_csrf_token - error - ' + message
                );
              }
            }
        });
      }
      else {
        // We already have a token, make the system connect call.
        if (options.debug) { console.log('Token already available.'); }
        this.Drupal.services.call(system_connect);
      }
    }
    catch (error) {
      console.log('system_connect - ' + error);
    }
  }




}
