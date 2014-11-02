/*
    Starter App
*/

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

// ///////////////////////////////////////////////////////////////////// 
// Globals & Configuration
// //////

.constant('globals', { 
    baseDbUrl: 'https://on-the-house.firebaseio.com/',
    uniqueId: 'f4rtT65KHg3457'
})

// /////////////////////////////////////////////////////////////////////
// Document Ready
// //////

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard)
    {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar)
    {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// //////////////////////////////////////////////////////////////////////
// State Provider & Routing
// //////

.config(function($stateProvider, $urlRouterProvider) {

  // /////////////////
  // ROUTING
  // //////

  $stateProvider

    // ////////////////////////////////////////////////////////////////////////////
    // Abstract State - Authentication
    // //////
    .state('sec', {
      url: "/sec",
      abstract: true,
      templateUrl: "templates/auth/tabauth.html"
    })
        .state('sec.auth', {
          url: '/auth',
          views: {
            'sec-auth': {
              templateUrl: 'templates/auth/auth.html',
              controller: 'AuthCtrl'
            }
          }
        })
            .state('sec.register', {
              url: '/register',
              views: {
                'sec-auth': {
                  templateUrl: 'templates/auth/register.html',
                  controller: 'RegisterCtrl'
                }
              }
            })

        .state('sec.recover', {
          url: '/recover',
          views: {
            'sec-recover': {
              templateUrl: 'templates/auth/recover.html',
              controller: 'RecoverCtrl'
            }
          }
        })



    // ////////////////////////////////////////////////////////////////////////////
    // Abstract State - Users
    // //////
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/main/tab.html"
    })

        // Home Tab
        .state('tab.homepage', {
          url: '/homepage',
          views: {
            'tab-homepage': {
              templateUrl: 'templates/main/tab-homepage.html',
              controller: 'HomepageCtrl'
            }
          }
        })

        // Available Tab
        .state('tab.available', {
          url: '/available',
          views: {
            'tab-available': {
              templateUrl: 'templates/main/tab-available.html',
              controller: 'AvailableCtrl'
            }
          }
        }) 

            .state('tab.voucher', {
              url: '/voucher/:voucherId',
              views: {
                'tab-available': {
                  templateUrl: 'templates/main/voucher.html',
                  controller: 'VoucherDetailCtrl'
                }
              }
            }) 

                .state('tab.googlemap', {
                  url: '/googlemap/:lat/:lng',
                  views: {
                    'tab-available': {
                      templateUrl: 'templates/google/googlemap.html',
                      controller: 'GoogleMapCtrl'
                    }
                  }
                })

        // Reserved Tab
        .state('tab.reserved', {
          url: '/reserved',
          views: {
            'tab-reserved': {
              templateUrl: 'templates/main/tab-reserved.html',
              controller: 'ReservedCtrl'
            }
          }
        }) 

          .state('tab.googlemap2', {
            url: '/googlemap2/:lat/:lng',
            views: {
              'tab-reserved': {
                templateUrl: 'templates/google/googlemap.html',
                controller: 'GoogleMapCtrl'
              }
            }
          })



    // ////////////////////////////////////////////////////////////////////////////
    // Abstract State - Proprietor
    // //////
    .state('tabp', {
      url: "/tabp",
      abstract: true,
      templateUrl: "templates/proprietor/tabp.html"
    })

        // 
        .state('tabp.offers', {
          url: '/offers',
          views: {
            'tabp-offers': {
              templateUrl: 'templates/proprietor/tabp-offers.html',
              controller: 'OffersCtrl'
            }
          }
        })

        // 
        .state('tabp.create', {
          url: '/create',
          views: {
            'tabp-create': {
              templateUrl: 'templates/proprietor/tabp-create.html',
              controller: 'CreateCtrl'
            }
          }
        })

        // 
        .state('tabp.history', {
          url: '/history',
          views: {
            'tabp-history': {
              templateUrl: 'templates/proprietor/tabp-history.html',
              controller: 'HistoryCtrl'
            }
          }
        })

        // 
        .state('tabp.patrons', {
          url: '/patrons',
          views: {
            'tabp-patrons': {
              templateUrl: 'templates/proprietor/tabp-patrons.html',
              controller: 'PatronsCtrl'
            }
          }
        });

  // ////////////////////////////////////////////////////////////////////////////
  // END STATES
  // /////////////////////
  ;

  // Fallback State
  $urlRouterProvider.otherwise('/tab/homepage');

})

// ////////////////////////////////////////////////////////////////////////////
// DIRECTIVES
// /////////////////////

/*.directive('ngFocus', [function() {

    var FOCUS_CLASS = "ng-focused";

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function(evt) {
                element.addClass(FOCUS_CLASS);
                // If optional attribute 'has-blurred' is true, don't add the focus class so error displays until fixed
                if(attrs.hasBlurred === true ) return;
                scope.$apply(function() {ctrl.$focused = true;});
            }).bind('blur', function(evt) {
                // If optional attribute 'has-blurred' exists, set it to true.
                if( attrs.hasBlurred !== undefined ) attrs.hasBlurred = true;
                element.removeClass(FOCUS_CLASS);
                scope.$apply(function() {ctrl.$focused = false;});
            });
        }
    };
}])*/

// ////////////////////////////////////////////////////////////////////////////
// END
// /////////////////////

;
