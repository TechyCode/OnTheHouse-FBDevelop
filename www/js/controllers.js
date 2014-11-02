/*
    Controllers
*/

angular.module('starter.controllers', [])

	// ////////////////////////////////////////////////////////////////////////////
	// Main Controller
	// //////
	.controller('MainCtrl', function($scope, $state, $stateParams, $firebase, $ionicPopup, $timeout, AuthService, CRUDService, globals ) {

		// /////////////////
		// Resource Data & Bindings
		// //////

		// Firebase Reference
		var rootRef 				= new Firebase(globals.baseDbUrl);

		$scope.account             	= AuthService.getAccount;
  		$scope.logedIn             	= AuthService.getStatus;
  		$scope.proprietorState     	= AuthService.getState;

  		$scope.views     			= { };

  		$scope.proprietorMode     	= false;
  		$scope.adminMode	       	= false;

		$scope.userOptions 			= { };

		$scope.currentState 		= "tab";
		$scope.abstractState 		= "tab";

		$scope.tmpRegister 			= { };
		$scope.tmpAccount 			= { };


		$scope.data = { };


		// ////////////////////////////////////////////////////////////////////////////
		// DYNAMIC DIALOGUE - Dynamic Dialogue Confirmations & Alerts 
		// //////

		var rootRef = new Firebase(globals.baseDbUrl);
		rootRef.child("views").once('value', function(snapshot) {
		    $timeout(function() {
		       $scope.views = snapshot.val();
		    });
		}); 

		// ////////////////////////////////////////////////////////////////////////////
		// POPUPS -  
		// //////

		$scope.reservePopup = function(vid, recordData) {
	    	var confirmPopup = $ionicPopup.confirm({
	      		title: 		'Reserve This Voucher?',
	      		template: 	'There are a limited number of vouchers within any offer... please do your best to honor this reservation.'
	    	});

	    	confirmPopup.then(function(res) {

	    		if (res) {

			       	

				} else {
					return;
				}

	    		return;

	    	});
	  	}; 

	  	$scope.redeemPopup = function(estId) {
	    	var confirmPopup = $ionicPopup.confirm({
	      		title: 		'Redeem This Voucher?',
	      		template: 	'Make sure a server, from the proper establishment, is present and watching when you redeem this voucher.'
	    	});
	    	confirmPopup.then(function(res)	{
	    		var newStatus = { status: "redeemed" };
	    		var stat = Restangular.all('interactive/vouchers/reserved/' + estId + '.json');
	    		stat.patch(newStatus);
	    	});
	  	};

	  	$scope.removePopup = function(estId) {
	    	var confirmPopup = $ionicPopup.confirm({
	      		title: 		'Remove Current Voucher?',
	      		template: 	'Make sure you want to remove this voucher.'
	    	});
	    	confirmPopup.then(function(res)	{
	    		var stat = Restangular.all('interactive/vouchers/reserved/' + globals.uniqueId + '.json');
	    		stat.remove();
	    		Reserved.getReserved(globals.uniqueId).get(function(response) {
      				$scope.data.estReserved = response;
      				$scope.data.reservedId = { id: response.estid };
      				$state.go($state.current, {}, {reload: true});
    			});
	    	});
	  	};

	  	// /////////////////
		// CRUD & AUTHENTICATION
		// //////

		$scope.createAccount = function (email, password) {
			AuthService.createAccount(email, password).then(function(authData) {

				var alertPopup = $ionicPopup.alert({
			     	title: 'AUTHORIZATION',
			     	template: 'SUCCESS!'
			   	});

			   	alertPopup.then(function(res) {
			     	console.log('Login Success!');
			   	});

			}, function(error) {

				var alertPopup = $ionicPopup.alert({
			     	title: 'AUTHORIZATION',
			     	template: 'FAILED! - ' + error
			   	});

			   	alertPopup.then(function(res) {
			     	console.log('Login Failed');
			   	});

			});
		};

		$scope.loginAccount = function (email, password) {
			AuthService.loginAccount(email, password).then(function(authData) {

				var alertPopup = $ionicPopup.alert({
			     	title: 'AUTHORIZATION',
			     	template: 'SUCCESS!'
			   	});

			   	alertPopup.then(function(res) {
			     	$state.go("tab.available");
			   	});

	          	
			}, function(error) {

				var alertPopup = $ionicPopup.alert({
			     	title: 'AUTHORIZATION',
			     	template: 'FAILED! - ' + error
			   	});

			   	alertPopup.then(function(res) {
			   	});

			});
		};

		$scope.logoutAccount = function () {
			AuthService.logoutAccount().then(function(authData) {

				var alertPopup = $ionicPopup.alert({
			     	title: 'AUTHORIZATION',
			     	template: 'LOGED OUT!'
			   	});

			   	alertPopup.then(function(res) {
			     	$state.go("sec.auth");
			   	});

			}, function(error) {

				var alertPopup = $ionicPopup.alert({
			     	title: 'AUTHORIZATION',
			     	template: 'ERROR LOGING OUT!'
			   	});

			   	alertPopup.then(function(res) {
			   	});

			});	
		};

	})

	// ////////////////////////////////////////////////////////////////////////////
	// Proprietor State Controllers
	// //////

	.controller('OffersCtrl', function($scope, $state, $timeout, globals) {

		var rootRef = new Firebase(globals.baseDbUrl);
		rootRef.child("offers").on('value', function(snapshot) {
			$timeout(function() {
				$scope.availableOffers = snapshot.val();
			});
		});
	})

	.controller('CreateCtrl', function($scope, $state, globals, CRUDService, $ionicPopup) {

		var recordSet2 = {
          "estid"    	: "-J_VgE8rfa5h11wSwA2g",
          "name"      	: "Marias Italian Kitchen",
          "type"      	: "restaurant",
          "phone"     	: "800-462-7421",
          "address"   	: "13353 Ventura Blvd.",
          "country"   	: "USA",
          "state"     	: "CA",
          "city"      	: "Sherman Oaks",
          "zip"       	: "91423",
          "lng"       	: "-118.076851",
          "lat"       	: "34.150651",
          "status"    	: "active",
          "title"		: "Free Spaghetti",
          "details"		: "Spaghetti with meat balls... Marias signature dish is Delicioso!",
          "date"		: "11/11/2014",
          "timefrom"	: "8:00 PM",
          "timeto"		: "11:00 PM",
          "value"		: "$10.99.00",
          "counter"		: 24,
          "timestamp"	: Firebase.ServerValue.TIMESTAMP
     	};

		$scope.postOffer = function () {
			CRUDService.addOffer(recordSet2).then(function(authData) {

				var alertPopup = $ionicPopup.alert({
			     	title: 'MANAGE OFFERS',
			     	template: 'NEW OFFER CREATED'
			   	});

			   	alertPopup.then(function(res) {
			   	});

			}, function(error) {

				var alertPopup = $ionicPopup.alert({
			     	title: 'MANAGE OFFERS',
			     	template: 'NEW OFFER FAILED'
			   	});

			   	alertPopup.then(function(res) {
			   	});

			});	
		};

	})

	.controller('HistoryCtrl', function($scope, $state) {


	})

	.controller('PatronsCtrl', function($scope, $state) {


	})
	

	// ////////////////////////////////////////////////////////////////////////////
	// User State Controllers
	// //////
	.controller('HomepageCtrl', function($scope, $state, globals, $timeout) {
		//console.log($scope.views.homepage.dialogue.title);

		

	})

	.controller('ReservedCtrl', function($scope, $state, globals) {

		
	})

	.controller('AvailableCtrl', function($scope, $state, $timeout, globals) {

		var rootRef = new Firebase(globals.baseDbUrl);
		rootRef.child("offers").on('value', function(snapshot) {
			$timeout(function() {
				$scope.availableOffers = snapshot.val();
			});
		});

	})

	.controller('VoucherDetailCtrl', function($scope, $state, $stateParams, globals) {

		var rootRef = new Firebase(globals.baseDbUrl);
		var voucherId = $stateParams.voucherId;
		rootRef.child("offers/" + voucherId).on('value', function(snapshot) {
			$scope.currentOffer = snapshot.val();
		});
	})

	// ////////////////////////////////////////////////////////////////////////////
	// Google Map Controller
	// //////

	.controller('GoogleMapCtrl', function($scope, $state, $log, $stateParams) {
	})

	// ////////////////////////////////////////////////////////////////////////////
	// Side Nav View Controller
	// //////

	.controller('sideNavCtrl', function($scope, $state, $ionicSideMenuDelegate, $state, $firebase, globals, AuthService) {

		// /////////////////
		// RESOURCES
		// //////

		// Firebase Reference
		var rootRef = new Firebase(globals.baseDbUrl);

		// Load Filters 
		rootRef.child("general/options").once('value', function(snapshot) {
			$scope.userOptions = snapshot.val();
		});

		// /////////////////
		// FUNCTIONALITY
		// //////

		$scope.updateFilters = function () {
			rootRef.child('users').child(globals.uniqueId + "/filters").update( account.filters );
		};

		// Toggle Proprietor Mode
		$scope.toggleProprietorMode = function () {
			if ($scope.proprietorMode == false ) {
				$scope.proprietorMode = true;
			} else {
				$scope.proprietorMode = false;
			}
		};


	})

	// ////////////////////////////////////////////////////////////////////////////
	// Authentication View Controllers
	// //////

	.controller('AuthCtrl', function($scope, $state, globals) {


	})

	.controller('RegisterCtrl', function($scope, $state, globals) {


	})

	.controller('RecoverCtrl', function($scope, $state, globals) {


	})

// ////////////////////////////////////////////////////////////////////////////
// END
// /////////////////////

;