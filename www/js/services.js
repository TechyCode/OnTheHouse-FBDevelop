/*
    Services
*/

angular.module('starter.services', [])

// ///////////////////////////////////////////////////////////////////////////
// CRUD Service
// v1.0 Beta
// //////////////////////////

.factory('CRUDService', ['globals', '$q', '$firebase', function(globals, $q, $firebase) {

  // /////////////////
  // RESOURCE
  // //////

  var rootRef = new Firebase(globals.baseDbUrl);
  var estRef  = rootRef.child("establishments");
  var offRef  = rootRef.child("offers");

  // /////////////////
  // LOGIC
  // //////

  return {

    // ///////////////////////// 
    // FUNCTIONS
    // ///////

    // Establishments

    addEstablishment: function(recordSet) {
      if (recordSet) {
        estRef.push(recordSet);
      };
    },
    deleteEstablishment: function(id) {
      if (id) {
        estRef.child(id).remove();
      };
    },
    updateEstablishment: function(id, recordSet) {
      if (id && recordSet) {
        estRef.child(id).update( recordSet );
      };
    },

    // Offers

    addOffer: function(recordSet) {
      if (recordSet) {
        var deferred = $q.defer();
        offRef.push(recordSet);
        deferred.resolve();
      };
      
      return deferred.promise;

    },
    deleteOffer: function(id) {
      if (id) {
        offRef.child(id).remove();
      };
    },
    updateOffer: function(id, recordSet) {
      if (id && recordSet) {
        offRef.child(id).update( recordSet );
      };
    }

    // /////////////////////////
    // Reserved
    // ///////

  }

}])

// ///////////////////////////////////////////////////////////////////////////
// Authorization & Authentication Service
// v1.0 Beta
// //////////////////////////

.factory('AuthService', ['globals', '$q', '$firebase', '$state', function(globals, $q, $firebase, $state) {

  // /////////////////
  // RESOURCE
  // //////

  

  var account             = { };
  var logedIn             = false;
  var proprietorState     = false;

  var recordSetup = {
      "filters"     : { "agegroup": "18-24", "esttype": " ", "geo": "5" },
      "settings"    : { "facebook": false, "twitter": false, "share": false },
      "proprietor"  : false
  };

  // /////////////////
  // AUTHENTICATION MONITOR
  // //////

  var rootRef = new Firebase(globals.baseDbUrl);
  debugger;
  rootRef.onAuth(function(authData) {

    if (authData) {

      // Set Vars
      globals.uniqueId = authData.uid;
      logedIn = true;

      // Import Account Dataset
      rootRef.child("users/" + globals.uniqueId).once('value', function(snapshot) {
        account = snapshot.val();
        proprietorState = account.proprietor;
      });

      // Final Routing
      $state.go("tab.available");

    } else {

      // Set Vars & Final Routing
      logedIn = false;
      $state.go("sec.auth");

    };

  });

  // /////////////////
  // LOGIC
  // //////

  return {

    // ///////////////////////// 
    // DATA BINDING
    // ///////

    getAccount: function() {
      return account;
    },

    getState: function() {
      return proprietorState;
    },

    getStatus: function() {
      return logedIn;
    },

    // ///////////////////////// 
    // FUNCTIONS
    // ///////

    // Account Setup & Authentication

    createAccount: function(email, password) {

		  var deferred = $q.defer();

      // Create Account
      rootRef.createUser({
        email    : email,
        password : password
      }, function(error) {

        // Check for Errors
        if (error === null) {

          // SUCCESS - Log User In
          rootRef.authWithPassword({
            email    : email,
            password : password
          }, function(error, authData) {

            // Check for Errors
            if (error === null) {

              // SUCCESS - Create Account Record
              rootRef.child('users').child(authData.uid).set( authData );
              rootRef.child('users').child(authData.uid).update( recordSetup );
              deferred.resolve(authData);

            } else {
              deferred.reject(error);
            }
          });
        } else {
          deferred.reject(error);
        }
      });
	    return deferred.promise;
    },

    loginAccount: function(email, password) {

      var deferred = $q.defer();

      rootRef.authWithPassword({
        email    : email,
        password : password
      }, function(error, authData) {

        // Check for Errors
        if (error === null) {

          // SUCCESS - Set Loged In Status & Return
          logedIn = true;
          deferred.resolve(authData);

        } else {
          deferred.reject(error);
        }
      });
      return deferred.promise;
    },

    logoutAccount: function() {

      var deferred = $q.defer();

      // Log Out of Firebase - No return code
      rootRef.unauth();

      // Handle promise and return
      deferred.resolve();
      return deferred.promise;

    }
  }
}])

// ////////////////////////////////////////////////////////////////////////////
// END
// /////////////////////

;