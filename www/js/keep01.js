var recordSet = {
          "userid"    	: globals.uniqueId,
          "name"      	: "Chili's Grill & Bar",
          "estimage"  	: "image.jpg",
          "estavatar" 	: "icon.jpg",
          "type"      	: "restaurant",
          "phone"     	: "800-462-7421",
          "address"   	: "10111 Ventura Blvd.",
          "country"   	: "USA",
          "state"     	: "CA",
          "city"      	: "Sherman Oaks",
          "zip"       	: "91423",
          "lng"       	: "-118.076851",
          "lat"       	: "34.150651",
          "status"    	: "active"
     	};

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

     	console.log("test");

     	//CRUDService.addOffer(recordSet2);

      	//CRUDService.updateEstablishment("-J_UUXws7ae41wiUDvet", recordSet);



          data: {
                mytitle: "AUTHENTICATION"
              }





          console.log("State: " + $state.current.name);


          //$scope.data.currentStateArray = $state.current.name.split(".");
          //$scope.data.currentAbstract = $scope.data.currentStateArray[0];
          //console.log($scope.data.currentAbstract);



          var uniqid = globals.uniqueId;
                         var curcnt = null;
                         var inccnt = null;
                         var deccnt = null;
                         var vchrid = null;
                         var nresrv = {};

                         // Get Voucher Counter and Set Tmp Vars
                         var resUrl = 'interactive/vouchers/available/' + vid + '/counter.json';
                    Restangular.one(resUrl).get().then(function(data) {
                         curcnt = parseInt(data);
                         inccnt = curcnt + 1;
                         deccnt = curcnt - 1;

                         // Check for existing reserved voucher and set vars
                         var resUrl = 'interactive/vouchers/reserved/' + uniqid + '.json';
                         Restangular.one(resUrl).get().then(function(data) {

                              vchrid = data.vchid;

                              // No Voucher Reserved
                                 if (! data.address) {

                                        // Decrement New Voucher Counter
                                   var newCounter = { "counter": deccnt };
                                        var resUrl = Restangular.all('interactive/vouchers/available/' + vid + '.json');
                                        resUrl.patch(newCounter).then(function(data) {

                                             // Reserve New Voucher                                           
                                             nresrv[uniqid] = recordData;
                                        var resUrl = Restangular.all('interactive/vouchers/reserved.json');
                                        resUrl.patch(nresrv).then(function(data) {  });

                                        });

                                   // Voucher Already Reserved
                                 } else {

                                        var confirmPopup = $ionicPopup.confirm({
                                             title:         'Warning!',
                                             template:      'You already have a voucher reserved... do you want to replace?'
                                   });
                                   confirmPopup.then(function(res)    {
                                        if (res) {

                                             // Check if the new reserved voucher doesnt match the old
                                             if ( vchrid != vid ) {

                                                  // Remove Reserved Voucher
                                                  var resUrl = Restangular.all('interactive/vouchers/reserved/' + uniqid + '.json');
                                                  resUrl.remove().then(function() {

                                                       // Increment Removed Voucher Counter
                                                       var newCounter = { "counter": inccnt };
                                                            var resUrl = Restangular.all('interactive/vouchers/available/' + vchrid + '.json');
                                                       resUrl.patch(newCounter).then(function(data) {

                                                            // Decrement New Voucher Counter
                                                            var newCounter = { "counter": deccnt };
                                                                 var resUrl = Restangular.all('interactive/vouchers/available/' + vid + '.json');
                                                            resUrl.patch(newCounter).then(function(data) {

                                                                 // Reserve New Voucher                                           
                                                                      nresrv[uniqid] = recordData;
                                                                 var resUrl = Restangular.all('interactive/vouchers/reserved.json');
                                                                 resUrl.patch(nresrv).then(function(data) {  });

                                                            });

                                                       });

                                                  }); 

                                             } else {
                                                  return;
                                             }

                                        } else {
                                             return;
                                        }

                                   });

                              }

                             });

                        }, function(error) {
                         return;
                        });