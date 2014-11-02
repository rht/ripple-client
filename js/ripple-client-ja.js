/*!
 * Ripple Client v1.0.12-105-g3c02490-dirty
 * Copyright (c) 2014 Ripple Labs, Inc.
 * Licensed under the ISC license.
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var types = __webpack_require__(1);

	// Load app modules
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);

	__webpack_require__(33);
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);
	__webpack_require__(37);
	__webpack_require__(38);

	// Angular module dependencies
	var appDependencies = [
	  'ng',
	  'ngRoute',
	  // Controllers
	  'app',
	  'navbar',
	  // Services
	  'id',
	  'tracker',
	  'appManager',
	  // Directives
	  'charts',
	  'effects',
	  'events',
	  'fields',
	  'formatters',
	  'directives',
	  'validators',
	  'datalinks',
	  'errors',
	  // Filters
	  'filters',
	  'ui.bootstrap'
	];

	// Load tabs
	var tabdefs = [
	  __webpack_require__(39),
	  __webpack_require__(40),
	  __webpack_require__(41),
	  __webpack_require__(42),
	  __webpack_require__(43),
	  __webpack_require__(44),
	  __webpack_require__(45),
	  __webpack_require__(46),
	  __webpack_require__(47),
	  __webpack_require__(48),
	  __webpack_require__(49),
	  __webpack_require__(50),
	  __webpack_require__(51),
	  __webpack_require__(52),
	  __webpack_require__(53),
	  __webpack_require__(54),
	  __webpack_require__(55),
	  __webpack_require__(56),  
	  __webpack_require__(57),
	  // require('../tabs/usd'),
	  __webpack_require__(58),
	  __webpack_require__(59),
	  __webpack_require__(60),
	  __webpack_require__(61),
	  __webpack_require__(62),

	  // Hidden tabs
	  __webpack_require__(63),
	  __webpack_require__(64)
	];

	// Prepare tab modules
	var tabs = tabdefs.map(function (Tab) {
	  var tab = new Tab();

	  if (tab.angular) {
	    var module = angular.module(tab.tabName, tab.angularDeps);
	    tab.angular(module);
	    appDependencies.push(tab.tabName);
	  }

	  return tab;
	});

	var app = angular.module('rp', appDependencies);

	// Global reference for debugging only (!)
	var rippleclient = window.rippleclient = {};
	rippleclient.app = app;
	rippleclient.types = types;

	// Install basic page template
	angular.element('body').prepend(__webpack_require__(68)());

	app.config(['$routeProvider', '$injector', function ($routeProvider, $injector) {
	  // Set up routing for tabs
	  _.each(tabs, function (tab) {
	    if ("function" === typeof tab.generateHtml) {
	      var template = tab.generateHtml();

	      var config = {
	        tabName: tab.tabName,
	        tabClass: 't-'+tab.tabName,
	        pageMode: 'pm-'+tab.pageMode,
	        mainMenu: tab.mainMenu,
	        template: template
	      };

	      $routeProvider.when('/'+tab.tabName, config);

	      if (tab.extraRoutes) {
	        _.each(tab.extraRoutes, function(route) {
	          $.extend({}, config, route.config);
	          $routeProvider.when(route.name, config);
	        });
	      }

	      _.each(tab.aliases, function (alias) {
	        $routeProvider.when('/'+alias, config);
	      });
	    }
	  });

	  // Language switcher
	  $routeProvider.when('/lang/:language', {
	    redirectTo: function(routeParams, path, search){
	      lang = routeParams.language;

	      if (!store.disabled) {
	        store.set('ripple_language',lang ? lang : '');
	      }

	      // problem?
	      // reload will not work, as some pages are also available for guests.
	      // Logout will show the same page instead of showing login page.
	      // This line redirects user to root (login) page
	      var port = location.port.length > 0 ? ":" + location.port : "";
	      location.href = location.protocol + '//' + location.hostname  + port + location.pathname;
	    }
	  });
	  $routeProvider.when('/',{
	    redirectTo: '/balance'
	  });

	  $routeProvider.otherwise({redirectTo: '/404'});
	}]);

	app.run(['$rootScope', '$injector', '$compile', '$route', '$routeParams', '$location',
	         function ($rootScope, $injector, $compile, $route, $routeParams, $location)
	{
	  // This is the web client
	  $rootScope.client = 'web';
	  $rootScope.productName = 'Ripple Trade';

	  // Global reference for debugging only (!)
	  if ("object" === typeof rippleclient) {
	    rippleclient.$scope = $rootScope;
	    rippleclient.version = $rootScope.version =
	      angular.element('#version').text();
	  }

	  // Helper for detecting empty object enumerations
	  $rootScope.isEmpty = function (obj) {
	    return angular.equals({},obj);
	  };

	  // if url has a + or %2b then replace with %20 and redirect
	  if (_.isArray($location.$$absUrl.match(/%2B|\+/gi)))
	    window.location = $location.$$absUrl.replace(/%2B|\+/gi, '%20');

	  var scope = $rootScope;
	  $rootScope.$route = $route;
	  $rootScope.$routeParams = $routeParams;
	  $('#main').data('$scope', scope);

	  // If using the old "amnt" parameter rename it "amount"
	  var amnt = $location.search().amnt;
	  if (amnt) {
	    $location.search("amnt", null);
	    $location.search("amount", amnt);
	  }

	  // Once the app controller has been instantiated
	  // XXX ST: I think this should be an event instead of a watch
	  scope.$watch("app_loaded", function on_app_loaded(oldval, newval) {
	    $('nav a').click(function() {
	      if (location.hash == this.hash) {
	        scope.$apply(function () {
	          $route.reload();
	        });
	      }
	    });
	  });
	}]);

	// Some backwards compatibility
	if (!Options.blobvault) {
	  Options.blobvault = Options.BLOBVAULT_SERVER;
	}

	if ("function" === typeof angular.resumeBootstrap) {
	  angular.resumeBootstrap();

	  angular.resumeBootstrap = function() {
	    return false;
	  };
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Base58Utils = __webpack_require__(65);

	var RippleAddress = (function () {
	  function append_int(a, i) {
	    return [].concat(a, i >> 24, (i >> 16) & 0xff, (i >> 8) & 0xff, i & 0xff);
	  }

	  function firstHalfOfSHA512(bytes) {
	    return sjcl.bitArray.bitSlice(
	      sjcl.hash.sha512.hash(sjcl.codec.bytes.toBits(bytes)),
	      0, 256
	    );
	  }

	  function SHA256_RIPEMD160(bits) {
	    return sjcl.hash.ripemd160.hash(sjcl.hash.sha256.hash(bits));
	  }

	  return function (seed) {
	    this.seed = Base58Utils.decode_base_check(33, seed);

	    if (!this.seed) {
	      throw "Invalid seed.";
	    }

	    this.getAddress = function (seq) {
	      seq = seq || 0;

	      var private_gen, public_gen, i = 0;
	      do {
	        private_gen = sjcl.bn.fromBits(firstHalfOfSHA512(append_int(this.seed, i)));
	        i++;
	      } while (!sjcl.ecc.curves.c256.r.greaterEquals(private_gen));

	      public_gen = sjcl.ecc.curves.c256.G.mult(private_gen);

	      var sec;
	      i = 0;
	      do {
	        sec = sjcl.bn.fromBits(firstHalfOfSHA512(append_int(append_int(public_gen.toBytesCompressed(), seq), i)));
	        i++;
	      } while (!sjcl.ecc.curves.c256.r.greaterEquals(sec));

	      var pubKey = sjcl.ecc.curves.c256.G.mult(sec).toJac().add(public_gen).toAffine();

	      return Base58Utils.encode_base_check(0, sjcl.codec.bytes.fromBits(SHA256_RIPEMD160(sjcl.codec.bytes.toBits(pubKey.toBytesCompressed()))));
	    };
	  };
	})();

	exports.RippleAddress = RippleAddress;



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * APP
	 *
	 * The app controller manages the global scope.
	 */

	var util = __webpack_require__(102),
	    events = __webpack_require__(103),
	    rewriter = __webpack_require__(69),
	    genericUtils = __webpack_require__(70),
	    Amount = ripple.Amount;

	var module = angular.module('app', []);

	module.controller('AppCtrl', ['$rootScope', '$compile', 'rpId', 'rpNetwork',
	                              'rpKeychain', 'rpTxQueue', 'rpAppManager', 'rpTracker',
	                              '$location', '$timeout',
	                              function ($scope, $compile, $id, $net,
	                                        keychain, txQueue, appManager, rpTracker,
	                                        $location, $timeout)
	{
	  reset();

	  var account;

	  // For announcement banner

	  $scope.showAnnouncement = store.get('announcement');

	  if('undefined' === typeof $scope.showAnnouncement) $scope.showAnnouncement = true;

	  $scope.dismissBanner = function() {
	    store.set('announcement', false);
	    $scope.showAnnouncement = store.get('announcement');
	  };

	  // Global reference for debugging only (!)
	  if ("object" === typeof rippleclient) {
	    rippleclient.id = $id;
	    rippleclient.net = $net;
	    rippleclient.keychain = keychain;
	  }

	  function reset()
	  {
	    $scope.apps = [];
	    $scope.account = {};
	    $scope.lines = {};
	    $scope.offers = {};
	    $scope.events = [];
	    $scope.history = [];
	    $scope.balances = {};
	    $scope.loadState = [];
	    $scope.unseenNotifications = {
	      count: 0
	    };
	  }

	  // Load notification modal
	  $scope.load_notification = function(status) {
	    if (typeof status !== 'string') {
	      console.log("You must pass in a string for the status");
	      return;
	    }

	    $scope.notif = status;

	    $timeout(function() {
	      $scope.notif = "clear";
	    }, 7000);
	  }

	  // TODO fix this
	  $scope.reset = function(){
	    reset();
	  };

	  var myHandleAccountEvent;
	  var myHandleAccountEntry;

	  function handleAccountLoad(e, data)
	  {
	    var remote = $net.remote;

	    account = data.account;

	    reset();

	    var accountObj = remote.account(data.account);

	    // We need a reference to these functions after they're bound, so we can
	    // unregister them if the account is unloaded.
	    myHandleAccountEvent = handleAccountEvent;
	    myHandleAccountEntry = handleAccountEntry;
	    $scope.loadingAccount = true;

	    accountObj.on('transaction', myHandleAccountEvent);
	    accountObj.on('entry', function(data){
	      $scope.$apply(function () {
	        $scope.loadingAccount = false;
	        myHandleAccountEntry(data);
	      });
	    });

	    accountObj.entry(function (err, entry) {
	      if (err) {
	        $scope.loadingAccount = false;
	        $scope.loadState.account = true;
	      }
	    });

	    // Ripple credit lines
	    remote.request_account_lines(data.account)
	      .on('success', handleRippleLines)
	      .on('error', handleRippleLinesError).request();

	    // Transactions
	    remote.request_account_tx({
	      'account': data.account,
	      'ledger_index_min': -1,
	      'descending': true,
	      'limit': Options.transactions_per_page
	    })
	      .on('success', handleAccountTx)
	      .on('error', handleAccountTxError).request();

	    // Outstanding offers
	    remote.request_account_offers(data.account)
	      .on('success', handleOffers)
	      .on('error', handleOffersError).request();

	    loadB2r();
	  }

	  function handleAccountUnload(e, data)
	  {
	    if (myHandleAccountEvent && myHandleAccountEntry) {
	      var remote = $net.remote;
	      var accountObj = remote.account(data.account);
	      accountObj.removeListener('transaction', myHandleAccountEvent);
	      accountObj.removeListener('entry', myHandleAccountEntry);
	    }
	  }

	  function handleRippleLines(data)
	  {
	    $scope.$apply(function () {
	      $scope.lines = {};

	      for (var n=0, l=data.lines.length; n<l; n++) {
	        var line = data.lines[n];

	        // XXX: This reinterpretation of the server response should be in the
	        //      library upstream.
	        line = $.extend({}, line, {
	          limit: ripple.Amount.from_json({value: line.limit, currency: line.currency, issuer: line.account}),
	          limit_peer: ripple.Amount.from_json({value: line.limit_peer, currency: line.currency, issuer: account}),
	          balance: ripple.Amount.from_json({value: line.balance, currency: line.currency, issuer: account})
	        });

	        $scope.lines[line.account+line.currency] = line;
	        updateRippleBalance(line.currency, line.account, line.balance);
	        if(line.account == "rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67"){
	          store.set('gbi_connected', true);
	        }
	      }
	      console.log('lines updated:', $scope.lines);

	      $scope.$broadcast('$balancesUpdate');

	      $scope.loadState.lines = true;
	    });
	  }

	  function handleRippleLinesError(data)
	  {
	    $scope.$apply(function () {
	      $scope.loadState['lines'] = true;
	    });
	  }

	  function handleOffers(data)
	  {
	    $scope.$apply(function () {
	      data.offers.forEach(function (offerData) {
	        var offer = {
	          seq: +offerData.seq,
	          gets: ripple.Amount.from_json(offerData.taker_gets),
	          pays: ripple.Amount.from_json(offerData.taker_pays),
	          flags: offerData.flags
	        };

	        updateOffer(offer);
	      });
	      console.log('offers updated:', $scope.offers);
	      $scope.$broadcast('$offersUpdate');

	      $scope.loadState.offers = true;
	    });
	  }

	  function handleOffersError(data)
	  {
	    $scope.$apply(function () {
	      $scope.loadState.offers = true;
	    });
	  }

	  function handleAccountEntry(data)
	  {
	    var remote = $net.remote;
	    $scope.account = data;

	    // XXX Shouldn't be using private methods
	    var server = remote._getServer();

	    // As per json wire format convention, real ledger entries are CamelCase,
	    // e.g. OwnerCount, additional convenience fields are lower case, e.g.
	    // reserve, max_spend.
	    var ownerCount  = $scope.account.OwnerCount || 0;
	    $scope.account.reserve_base = server._reserve(0);
	    $scope.account.reserve = server._reserve(ownerCount);
	    $scope.account.reserve_to_add_trust = server._reserve(ownerCount+1);
	    $scope.account.reserve_low_balance = $scope.account.reserve.product_human(2);

	    // Maximum amount user can spend
	    var bal = Amount.from_json(data.Balance);
	    $scope.account.max_spend = bal.subtract($scope.account.reserve);

	    $scope.loadState.account = true;

	    // Transaction queue
	    txQueue.checkQueue();
	  }

	  function handleAccountTx(data)
	  {
	    $scope.$apply(function () {
	      $scope.tx_marker = data.marker;

	      if (data.transactions) {
	        data.transactions.reverse().forEach(function (e, key) {
	          processTxn(e.tx, e.meta, true);
	        });

	        $scope.$broadcast('$eventsUpdate');
	      }

	      $scope.loadState.transactions = true;
	    });
	  }

	  function handleAccountTxError(data)
	  {
	    $scope.$apply(function () {
	      $scope.loadState.transactions = true;
	    });
	  }

	  function handleAccountEvent(e)
	  {
	    $scope.$apply(function () {
	      processTxn(e.transaction, e.meta);
	      $scope.$broadcast('$eventsUpdate');
	    });
	  }

	  /**
	   * Process a transaction and add it to the history table.
	   */
	  function processTxn(tx, meta, is_historic)
	  {
	    var processedTxn = rewriter.processTxn(tx, meta, account);

	    if (processedTxn && processedTxn.error) {
	      var err = processedTxn.error;
	      rpTracker.trackError('JsonRewriter Error', err, {
	        'Transaction Hash': processedTxn.transaction.hash,
	        'Source': is_historic ? 'app controller historic' : 'app controller event'
	      });
	      console.error('Error processing transaction '+processedTxn.transaction.hash+'\n',
	                    err && 'object' === typeof err && err.stack ? err.stack : err);

	      // Add to history only
	      $scope.history.unshift(processedTxn);
	    } else if (processedTxn) {
	      var transaction = processedTxn.transaction;

	      // Update account
	      if (processedTxn.accountRoot) {
	        handleAccountEntry(processedTxn.accountRoot);
	      }

	      // Show status notification
	      if (processedTxn.tx_result === "tesSUCCESS" &&
	          transaction &&
	          !is_historic) {

	        $scope.$broadcast('$appTxNotification', {
	          hash:tx.hash,
	          tx: transaction
	        });
	      }

	      // Add to recent notifications
	      if (processedTxn.tx_result === "tesSUCCESS" &&
	          transaction) {

	        var effects = [];
	        // Only show specific transactions
	        switch (transaction.type) {
	          case 'offernew':
	          case 'exchange':
	            var funded = false;
	            processedTxn.effects.some(function(effect) {
	              if (_.contains(['offer_bought','offer_funded','offer_partially_funded'], effect.type)) {
	                funded = true;
	                effects.push(effect);
	                return true;
	              }
	            });

	            // Only show trades/exchanges which are at least partially funded
	            if (!funded) {
	              break;
	            }
	            /* falls through */
	          case 'received':

	            // Is it unseen?
	            if (processedTxn.date > ($scope.userBlob.data.lastSeenTxDate || 0)) {
	              processedTxn.unseen = true;
	              $scope.unseenNotifications.count++;
	            }

	            processedTxn.showEffects = effects;
	            $scope.events.unshift(processedTxn);
	        }
	      }

	      // TODO Switch to txmemo field
	      appManager.getAllApps(function(apps){
	        _.each(apps, function(app){
	          var historyProfile;
	          if (historyProfile = app.findProfile('history')) {
	            historyProfile.getTransactions($scope.address, function(err, history){
	              history.forEach(function(tx){
	                tx.app = app;
	                if (processedTxn.hash === tx.hash) {
	                  processedTxn.details = tx;
	                }
	              });
	            });
	          }
	        });
	      });

	      // Add to history
	      $scope.history.unshift(processedTxn);

	      // Update Ripple lines
	      if (processedTxn.effects && !is_historic) {
	        updateLines(processedTxn.effects);
	      }

	      // Update my offers
	      if (processedTxn.effects && !is_historic) {
	        // Iterate on each effect to find offers
	        processedTxn.effects.forEach(function (effect) {
	          // Only these types are offers
	          if (_.contains([
	            'offer_created',
	            'offer_funded',
	            'offer_partially_funded',
	            'offer_cancelled'], effect.type))
	          {
	            var offer = {
	              seq: +effect.seq,
	              gets: effect.gets,
	              pays: effect.pays,
	              deleted: effect.deleted,
	              flags: effect.flags
	            };

	            updateOffer(offer);
	          }
	        });

	        $scope.$broadcast('$offersUpdate');
	      }
	    }
	  }

	  function updateOffer(offer)
	  {
	    if (offer.flags && offer.flags === ripple.Remote.flags.offer.Sell) {
	      offer.type = 'sell';
	      offer.first = offer.gets;
	      offer.second = offer.pays;
	    } else {
	      offer.type = 'buy';
	      offer.first = offer.pays;
	      offer.second = offer.gets;
	    }

	    if (!offer.deleted) {
	      $scope.offers[""+offer.seq] = offer;
	    } else {
	      delete $scope.offers[""+offer.seq];
	    }
	  }

	  function updateLines(effects)
	  {
	    if (!$.isArray(effects)) return;

	    var balancesUpdated;

	    $.each(effects, function () {
	      if (_.contains([
	        'trust_create_local',
	        'trust_create_remote',
	        'trust_change_local',
	        'trust_change_remote',
	        'trust_change_balance',
	        'trust_change_no_ripple'], this.type))
	      {
	        var effect = this,
	            line = {},
	            index = effect.counterparty + effect.currency;

	        line.currency = effect.currency;
	        line.account = effect.counterparty;
	        line.flags = effect.flags;
	        line.no_ripple = !!effect.noRipple; // Force Boolean

	        if (effect.balance) {
	          line.balance = effect.balance;
	          updateRippleBalance(effect.currency,
	                                    effect.counterparty,
	                                    effect.balance);
	          balancesUpdated = true;
	        }

	        if (effect.deleted) {
	          delete $scope.lines[index];
	          return;
	        }

	        if (effect.limit) {
	          line.limit = effect.limit;
	        }

	        if (effect.limit_peer) {
	          line.limit_peer = effect.limit_peer;
	        }

	        $scope.lines[index] = $.extend($scope.lines[index], line);
	      }
	    });

	    if (balancesUpdated) $scope.$broadcast('$balancesUpdate');
	  }

	  function updateRippleBalance(currency, new_account, new_balance)
	  {
	    // Ensure the balances entry exists first
	    if (!$scope.balances[currency]) {
	      $scope.balances[currency] = {components: {}, total: null};
	    }

	    var balance = $scope.balances[currency];

	    if (new_account) {
	      balance.components[new_account] = new_balance;
	    }

	    $(balance.components).sort(function(a,b){
	      return a.compareTo(b);
	    });

	    balance.total = null;
	    for (var counterparty in balance.components) {
	      var amount = balance.components[counterparty];
	      balance.total = balance.total ? balance.total.add(amount) : amount;
	    }

	    // Try to identify the gateway behind this balance
	    // TODO be more smart doing requests, one app may have multiple currencies
	    appManager.getApp(new_account, function(err, app){
	      if (err) {
	        console.warn(err);
	        return;
	      }

	      var gateway = {
	        app: app,
	        inboundBridge: app.getInboundBridge(currency)
	      };

	      balance.components[new_account].gateway = gateway;

	      // User's gateway account
	      app.findProfile('account').getUser($scope.address, function(err, user){
	        if (err) {
	          console.warn(err);
	          return;
	        }

	        gateway.user = user;

	        // Get inbound bridge instructions
	        gateway.inboundBridge.getInstructions($scope.address,function(err, instructions){
	          if (err) {
	            console.warn(err);
	            return;
	          }

	          // TODO ...
	          // if (!user.verified && gateway.inboundBridge.currencies[0].limit && balance) {
	          //   gateway.inboundBridge.limit = gateway.inboundBridge.currencies[0].limit - balance.components[new_account].to_human();
	          // }

	          gateway.inboundBridge.limit = $scope.B2R.currencies[0].limit;

	          gateway.inboundBridge.instructions = instructions;
	        });
	      });
	    });
	  }

	  /**
	   * Integrations
	   */
	  function loadB2r() {
	    $scope.loadState.B2RApp = false;
	    $scope.loadState.B2RInstructions = false;

	    // B2R
	    if ('web' === $scope.client) {
	      appManager.loadApp(Options.b2rAddress, function(err, app){
	        if (err) {
	          console.warn('Error loading app', err.message);
	          return;
	        }

	        $scope.B2RApp = app;

	        $scope.B2R = app.getInboundBridge('BTC');

	        appManager.save(app);

	        app.refresh = function() {
	          app.findProfile('account').getUser($scope.address, function(err, user){
	            $scope.loadState.B2RApp = true;

	            if (err) {
	              console.log('Error', err);
	              return;
	            }

	            $scope.B2R.active = user;

	            // TODO ...
	            // if (!user.verified && $scope.B2R.currencies[0].limit && $scope.balances['BTC']) {
	            //   $scope.B2R.limit = $scope.B2R.currencies[0].limit - $scope.balances['BTC'].components['rhxULAn1xW9T4V2u67FX9pQjSz4Tay2zjZ'].to_human();
	            // } else {
	            $scope.B2R.limit = $scope.B2R.currencies[0].limit;
	            // }

	            // Do the necessary trust
	            var trust = _.findWhere($scope.B2R.currencies, {currency: 'BTC'});
	            $scope.B2R.trust(trust.currency,trust.issuer);

	            // Get pending transactions
	            $scope.B2R.getPending($scope.address, function(err, pending){
	              // TODO support multiple pending transactions
	              $scope.pending = pending[0];
	            });

	            // Get deposit instructions
	            $scope.B2R.getInstructions($scope.address,function(err, instructions){
	              if (err) {
	                return;
	              }

	              $scope.B2R.instructions = instructions;
	              $scope.loadState.B2RInstructions = true;
	            });
	          });
	        };

	        var watcher = $scope.$watch('address', function(address){
	          if (!address) return;

	          app.refresh();
	          watcher();
	        });

	        // Required fields
	        $scope.B2RSignupFields = app.findProfile('account').getFields();
	      });
	    }
	  }

	  $scope.currencies_all = __webpack_require__(72);

	  // prefer currency full_names over whatever the local storage has saved
	  var storeCurrenciesAll = store.get('ripple_currencies_all') || [];

	  // run through all currencies
	  _.each($scope.currencies_all, function(currency) {

	    // find the currency in the local storage
	    var allCurrencyHit = _.where(storeCurrenciesAll, {value: currency.value})[0];

	    // if the currency already exists in local storage, updated only the name
	    if (allCurrencyHit) {
	      allCurrencyHit.name = currency.name;
	    } else {
	      // else append the currency to the storeCurrenciesAll array
	      storeCurrenciesAll.push(currency);
	    }
	  });

	  $scope.currencies_all = storeCurrenciesAll;

	  // Personalized default pair set
	  if (!store.disabled && !store.get('ripple_pairs_all')) {
	    store.set('ripple_pairs_all',__webpack_require__(73));
	  }

	  var pairs_all = store.get('ripple_pairs_all');
	  var pairs_default = __webpack_require__(73);
	  $scope.pairs_all = genericUtils.uniqueObjArray(pairs_all, pairs_default, 'name');

	  function compare(a, b) {
	    if (a.order < b.order) return 1;
	    if (a.order > b.order) return -1;
	    return 0;
	  }

	  // sort currencies and pairs by order
	  $scope.currencies_all.sort(compare);

	  function compare_last_used(a, b) {
	    var time_a = a.last_used || a.order || 0;
	    var time_b = b.last_used || b.order || 0;
	    if (time_a < time_b) return 1;
	    if (time_a > time_b) return -1;
	    return 0;
	  }
	  $scope.pairs_all.sort(compare_last_used);

	  $scope.currencies_all_keyed = {};
	  _.each($scope.currencies_all, function(currency){
	    $scope.currencies_all_keyed[currency.value] = currency;
	  });

	  $scope.$watch('currencies_all', function(){
	    if (!store.disabled) {
	      store.set('ripple_currencies_all',$scope.currencies_all);
	    }
	  }, true);

	  $scope.$watch('pairs_all', function(){
	    if (!store.disabled) {
	      store.set('ripple_pairs_all',$scope.pairs_all);
	    }
	  }, true);

	  $scope.pairs = $scope.pairs_all.slice(1);

	  $scope.app_loaded = true;

	  // Moved this to the run block
	  // Nav links same page click fix
	  // $('nav a').click(function(){
	  //   if (location.hash == this.hash) {
	  //     location.href="#/";
	  //     location.href=this.href;
	  //   }
	  // });

	  $scope.$on('$idAccountLoad', function (e, data) {
	    // Server is connected
	    if ($scope.connected) {
	      handleAccountLoad(e, data);
	    }

	    // Server is not connected yet. Handle account load after server response.
	    $scope.$on('$netConnected', function(){
	      if ($.isEmptyObject($scope.account)) {
	        $scope.$broadcast('$idAccountUnload', {account: $scope.account});
	        handleAccountLoad(e, data);
	      }
	    });
	  });

	  $scope.$on('$idAccountUnload', handleAccountUnload);

	  // XXX: The app also needs to handle updating its data when the connection is
	  //      lost and later re-established. (... or will the Ripple lib do that for us?)
	  var removeFirstConnectionListener =
	        $scope.$on('$netConnected', handleFirstConnection);
	  function handleFirstConnection() {
	    removeFirstConnectionListener();
	  }

	  $net.listenId($id);
	  $net.init();
	  $id.init();
	  appManager.init();

	  $scope.logout = function () {
	    $id.logout();
	    location.reload();
	  };

	  $scope.$on('$idRemoteLogout', handleRemoteLogout);
	  function handleRemoteLogout()
	  {
	    location.reload();
	  }

	  // Generate an array of source currencies for path finding.
	  // This will generate currencies for every issuers.
	  // It will also generate a self-issue currency for currencies which have multi issuers.
	  //
	  // Example balances for account rEXAMPLE:
	  //   CNY: rCNY1
	  //        rCNY2
	  //   BTC: rBTC
	  // Will generate:
	  //   CNY/rEXAMPLE
	  //   CNY/rCNY1
	  //   CNY/rCNY2
	  //   BTC/rBTC
	  $scope.generate_src_currencies = function () {
	    var src_currencies = [];
	    var balances = $scope.balances;
	    var isIssuer = $scope.generate_issuer_currencies();
	    src_currencies.push({ currency: "XRP" });
	    for (var currency_name in balances) {
	      if (!balances.hasOwnProperty(currency_name)) continue;

	      var currency = balances[currency_name];
	      var currency_hex = currency.total.currency().to_hex();
	      var result = [];
	      for (var issuer_name in currency.components)
	      {
	        if (!currency.components.hasOwnProperty(issuer_name)) continue;
	        var component = currency.components[issuer_name];
	        if (component.is_positive())
	          result.push({ currency: currency_hex, issuer: issuer_name});
	      }

	      if (result.length > 1 || isIssuer[currency_hex] || result.length === 0)
	        result.unshift({ currency: currency_hex });

	      src_currencies = src_currencies.concat(result);
	    }
	    return src_currencies;
	  };

	  $scope.generate_issuer_currencies = function () {
	    var isIssuer = {};
	    _.each($scope.lines, function(line){
	      if (line.limit_peer.is_positive()) {
	        isIssuer[line.balance.currency().to_hex()] = true;
	      }
	    });
	    return isIssuer;
	  };

	  /**
	   * Testing hooks
	   */
	  this.reset                  =  reset;
	  this.handleAccountLoad      =  handleAccountLoad;
	  this.handleAccountUnload    =  handleAccountUnload;
	  this.handleRemoteLogout     =  handleRemoteLogout;
	  this.handleRippleLines      =  handleRippleLines;
	  this.handleRippleLinesError =  handleRippleLinesError;
	  this.handleOffers           =  handleOffers;
	  this.handleOffersError      =  handleOffersError;
	  this.handleAccountEntry     =  handleAccountEntry;
	  this.handleAccountTx        =  handleAccountTx;
	  this.handleAccountTxError   =  handleAccountTxError;
	  this.handleAccountEvent     =  handleAccountEvent;
	  this.processTxn             =  processTxn;
	  this.updateOffer            =  updateOffer;
	  this.updateLines            =  updateLines;
	  this.updateRippleBalance    =  updateRippleBalance;
	  this.compare                =  compare;
	  this.handleFirstConnection  =  handleFirstConnection;
	}]);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * NAVBAR
	 *
	 * The navbar controller manages the bar at the top of the screen.
	 */

	var Amount = ripple.Amount,
	    rewriter = __webpack_require__(69);

	var module = angular.module('navbar', []);

	module.controller('NavbarCtrl', ['$scope', '$element', '$compile', 'rpId',
	                                 'rpNetwork', '$location',
	                                 function ($scope, el, $compile, $id,
	                                           network, $location)
	{
	  var queue = [];
	  var tickInterval = 4000;
	  var tickUpcoming = false;

	  var tplAccount = __webpack_require__(71);

	  // Activate #status panel
	  $scope.toggle_secondary = function () {
	    $scope.show_secondary = !$scope.show_secondary;
	  };

	  // Username
	  $scope.$watch('userCredentials', function(){
	    var username = $scope.userCredentials.username;
	    $scope.shortUsername = null;
	    if(username && username.length > 25) {
	      $scope.shortUsername = username.substring(0,24)+"...";
	    }
	  }, true);

	  $scope.$on('$netConnected', function (e) {
	    setConnectionStatus(true);
	  });

	  $scope.$on('$netDisconnected', function (e) {
	    setConnectionStatus(false);
	  });

	  var updateNotifications = function () {
	    if ($scope.events) {
	      $scope.notifications = $scope.events.slice(0,10);
	    }
	  };

	  $scope.$on('$eventsUpdate', updateNotifications);

	  /**
	   * Marks all the notifications as seen.
	   */
	  $scope.read = function() {
	    // don't do anything if account is unfunded
	    if (!$scope.notifications.length)
	      return;

	    var lastTxDate = $scope.notifications[0].date;

	    if ($scope.unseen > 0) {
	      $scope.unseen = 0;
	    }

	    if (($scope.userBlob.data.lastSeenTxDate || 0) < lastTxDate) {
	      // Remember last seen date
	      $scope.userBlob.set("/lastSeenTxDate", lastTxDate);

	      // Reset the counter
	      $scope.unseen = $scope.unseenNotifications.count;
	      $scope.unseenNotifications.count = 0;

	      // Set seen for all the events
	//      _.each($scope.events, function(event){
	//        event.unseen = false;
	//      })
	    }
	  };

	  /**
	   * Graphically display a network-related notifications.
	   *
	   * This function does no filtering - we assume that any transaction that makes
	   * it here is ready to be rendered by the notification area.
	   *
	   * @param {Object} e Angular event object
	   * @param {Object} tx Transaction info, returned from JsonRewriter#processTxn
	   */

	// VH: Hiding this for now.
	//  $scope.$on('$appTxNotification', function (e, tx) {
	//    var $localScope = $scope.$new();
	//    $localScope.tx = tx.tx;
	//
	//    var html = tplAccount($localScope);
	//
	//    if (html.length) {
	//      var msg = $compile(html)($localScope);
	//      enqueue(msg);
	//    }
	//  });

	  function setConnectionStatus(connected) {
	    $scope.connected = !!connected;
	    if (connected) {
	      notifyEl.find('.type-offline').remove();
	    } else {
	      notifyEl.append('<div class="notification active type-offline">OFFLINE</div>');
	    }
	  }

	  // A notification might have been queued already before the app was fully
	  // initialized. If so, we display it now.
	  if (queue.length) tick();

	  var notifyEl = $('<div>').attr('id', 'notification').insertAfter(el);

	  // Default to disconnected
	  setTimeout(function() {
	    setConnectionStatus($scope.connected);
	  }, 1000 * 3);

	  /**
	   * Add the status message to the queue.
	   */
	  function enqueue(msg)
	  {
	    queue.push(msg);
	    if (!tickUpcoming) {
	      setImmediate(tick);
	    }
	  }

	  /**
	   * Proceed to next notification.
	   */
	  var prevEl = null;
	  function tick()
	  {
	    if (prevEl) {
	      // Hide notification box
	      prevEl.removeClass('active');
	      var prevElRef = prevEl;
	      setTimeout(function () {
	        prevElRef.remove();
	      }, 1000);
	      prevEl = null;
	    }

	    tickUpcoming = false;
	    if (queue.length) {
	      // Ensure secondary currencies pulldown is closed
	      $scope.$apply(function() {
	        $scope.show_secondary = false;
	      });

	      // Show next status message
	      var next = queue.shift();

	      var el = $(next);
	      el.addClass('notification');
	      el.appendTo(notifyEl);
	      setImmediate(function () {
	        el.addClass('active');
	      });

	      prevEl = el;

	      tickUpcoming = true;
	      setTimeout(tick, tickInterval);
	    }
	  }

	  updateNotifications();

	  // Testing Hooks
	  this.setConnectionStatus = setConnectionStatus;
	  this.enqueue             = enqueue;
	  this.tick                = tick;
	}]);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * CHARTS
	 *
	 * Charts and data visualization directives go into this file.
	 */

	var module = angular.module('charts', []);

	/**
	 * Trust line graph. (Similar to small box plot.)
	 */
	module.directive('rpTrustLine', ['$filter', function($filter) {
	  function redraw(ctx, data) {
	    // Axis distance to left and right edges
	    var axisMargin = 30;
	    // Tick length away from axis
	    var tickLen    = 5;
	    // Thickness of bars
	    var barWidth   = 6;
	    // Offset for text below axis
	    var lowText    = 16;
	    // Offset for text above bar
	    var highText   = -10;

	    // Fetch size of canvas
	    var width      = ctx.canvas.width;
	    var height     = ctx.canvas.height;
	    var axisLen    = width - axisMargin * 2;
	    var axisY      = Math.floor(height/2);

	    // Clear canvas
	    ctx.clearRect(0, 0, width, height);

	    // Parse input data
	    var trust_l, trust_r, balance;
	    try {
	      trust_l = -data.limit_peer.to_number();
	      trust_r = data.limit.to_number();
	      balance = data.balance.to_number();
	    } catch (e) {
	      // In case of invalid input data we simply skip drawing the chart.
	      return;
	    }

	    // Calculate minimum and maximum logical point
	    var min        = Math.min(balance, trust_l);
	    var max        = Math.max(balance, trust_r);
	    var scale      = axisLen / (max - min);

	    ctx.lineWidth = 2;
	    ctx.strokeStyle = '#333';

	    // Draw balance
	    if (balance > 0) {
	      ctx.beginPath();
	      ctx.rect(f(0), axisY-barWidth, f(balance)-f(0), barWidth);
	      ctx.fillStyle = 'green';
	      ctx.fill();
	    } else {
	      ctx.beginPath();
	      ctx.rect(f(balance), axisY, f(0)-f(balance), barWidth);
	      ctx.fillStyle = balance === 0 ? 'black' : 'red';
	      ctx.fill();
	    }

	    ctx.beginPath();
	    // Draw axis
	    ctx.moveTo(f(trust_l), axisY);
	    ctx.lineTo(f(trust_r), axisY);
	    // Left end tick
	    ctx.moveTo(f(trust_l), axisY-tickLen);
	    ctx.lineTo(f(trust_l), axisY+tickLen);
	    // Right end tick
	    ctx.moveTo(f(trust_r), axisY-tickLen);
	    ctx.lineTo(f(trust_r), axisY+tickLen);
	    // Origin tick
	    ctx.moveTo(f(0),       axisY-tickLen);
	    ctx.lineTo(f(0),       axisY+tickLen);
	    ctx.stroke();

	    // Draw labels
	    var rpamount = $filter('rpamount');
	    var fmt = {rel_precision: 0};
	    ctx.font = "11px sans-serif";
	    ctx.textAlign = 'center';
	    ctx.fillText(rpamount(data.balance, fmt), f(balance), axisY+highText);
	    ctx.fillStyle = '#333';

	    var lAmount = rpamount(data.limit_peer, fmt);

	    if (0 !== trust_l)
	      lAmount = "-"+lAmount;

	    if (trust_l === trust_r && 0 === trust_l) {
	      lAmount = "0 / 0";
	    } else {
	      ctx.fillText(rpamount(data.limit, fmt), f(trust_r), axisY+lowText);
	    }

	    ctx.fillText(lAmount, f(trust_l), axisY+lowText);

	    // Exchange a value to a pixel position
	    function f(val)
	    {
	      // Enforce limits
	      val = Math.min(val, max);
	      val = Math.max(val, min);
	      return Math.round((val - min) * scale + axisMargin);
	    }
	  }

	  return {
	    restrict: 'E',
	    template: '<canvas width="140" height="50">',
	    scope: {
	      data: '=rpLineData'
	    },
	    link: function(scope, elm, attrs) {
	      var ctx = elm.find('canvas')[0].getContext('2d');

	      redraw(ctx, scope.data);

	      scope.$watch('data', function () {
	        redraw(ctx, scope.data);
	      }, true);
	    }
	  };
	}]);



	/**
	 * Balance pie chart
	 */
	module.directive('rpPieChart', ['$filter', function($filter) {
	  var rpcurrency = $filter('rpcurrency');
	  var rpcontactname = $filter('rpcontactname');
	  function contactButNotXrp(x) {
	    return x==="XRP" ? "XRP" : rpcontactname(x);
	  }

	  // Create a pie chart in the element, using the data on the scope.
	  function pieChart(element, scope) {
	    
	    var SIZE = parseInt(scope.size, 10);
	    
	    // Main function
	    function drawPieChart(container, exchangeRates, drops, ious) {
	      
	      if (!(drops && exchangeRates && Object.keys(exchangeRates).length)) {
	        return;
	      }
	      
	      var xrpAsSuch = parseInt(drops,10) / 1000000;      
	      
	      // We construct an array of "pieces", which each correspond to one piece of the pie,
	      // containing information that will be extracted to calculate the appearance of each sector.
	      var pieces = [{
	        issuerSubshares: [{
	          issuer: "XRP",
	          subbalance: xrpAsSuch
	        }],
	        amountForCurrency: "0"
	      }];
	        
	      function descendingBy(key) {
	        return function(a,b) {
	          return b[key] - a[key];
	        };
	      }
	        
	      var totalAsXrp = xrpAsSuch;
	      for (var cur in ious) {if (ious.hasOwnProperty(cur)){
	        var components = ious[cur].components;
	        var issuerSubshares = [];
	        var issuer;
	        for (issuer in components) {if (components.hasOwnProperty(issuer)){
	          var amount = components[issuer].to_number();
	          // The chart ignores negative balances. The user should be notified (separately) of this omission.
	          if (amount > 0) {
	            var subbalanceAsXrp = amount * (exchangeRates[cur+":"+issuer] || 0);
	            totalAsXrp += subbalanceAsXrp;
	            issuerSubshares.push({
	              issuer: contactButNotXrp(issuer),
	              subbalance: subbalanceAsXrp
	            });
	          }
	        }}
	        issuerSubshares.sort(descendingBy("subbalance"));
	        pieces.push({
	          issuerSubshares: issuerSubshares,
	          amountForCurrency: components[issuer]
	        });
	      }}
	      
	      // Now, go through the list of pieces and do the following for each:
	      // -Divide all the subbalances by totalAsXrp, inserting the result as "subshare"s
	      // -Insert the sum of the "subshare"s as "share"
	      // -Insert "currency" by translating "amountForCurrency" into a currency
	      var i, j, piece;
	      for (i=0; i<pieces.length; i++) {
	        piece = pieces[i];
	        var share = 0;
	        for (j=0; j<piece.issuerSubshares.length; j++) {
	          var is = piece.issuerSubshares[j];
	          is.subshare = is.subbalance / totalAsXrp;
	          share += is.subshare;
	        }
	        piece.share = share;
	        piece.currency = rpcurrency(piece.amountForCurrency);
	      }
	      
	      pieces.sort(descendingBy("share"));
	      
	      
	      // Reset the container
	      container.find('*').remove();
	      container.append('<svg></svg>');
	      
	      // Draw the subsectors          
	      function selectValue(name) {
	        return function(o) {
	          return o[name];
	        };
	      }
	      var p, offset=0, broken=false;
	      for (p=0; p<pieces.length; p++) {
	        piece = pieces[p];
	        if (p>0) {
	          offset += pieces[p-1].share;
	        }
	        if (offset < 0.97) {
	          drawSectors(
	            container,
	            piece.issuerSubshares.map(selectValue("subshare")),
	            piece.issuerSubshares.map(selectValue("issuer")),
	            "sub",
	            piece.currency,
	            offset
	          );
	        } else if (offset < 0.999999999999) { // (to account for floating-point errors)
	          // We've come to the limit, and so we'll lump the rest in under "other".
	          broken = true;
	          drawSectors(container, [1 - offset], ["other"], "sub", "other", offset);
	          break;
	        }
	      }
	      if (broken) {
	        pieces.length = p;
	        pieces.push({
	          share: 1 - offset,
	          currency: "other" // We are trusting here that no actual currency will ever be called "other".
	        });
	      }

	      // Draw the main sectors.
	      // This must come last, so that the onMouseOver works.
	      drawSectors(
	        container,
	        pieces.map(selectValue("share")),
	        pieces.map(selectValue("currency")),
	        "main",
	        pieces.map(selectValue("currency"))
	      );
	      
	      // Draw the hole in the middle
	      $('<circle></circle>').appendTo(container.find('svg')).attr({
	        "class": "hole",
	        cx:   SIZE/2,
	        cy:   SIZE/2,
	        r:    SIZE/6
	      });
	      
	      // Refresh the DOM (because JQuery and SVG don't play nice)
	      container.html(container.html());
	      
	      // Center text elements
	      container.find("text").each(function(){
	        var width = $(this)[0].getBBox().width;
	        var x = $(this).attr("x");
	        $(this).attr("x",x - width/2);
	      });
	      
	      // Resolve collisions and adjust viewBox
	      var extremeBounds = resolveCollisions(container);
	      var PADDING = 5;
	      container.find('svg')[0].setAttribute("viewBox", [
	        (extremeBounds.left-PADDING),
	        (extremeBounds.top-PADDING),
	        (extremeBounds.right-extremeBounds.left+PADDING*2),
	        (extremeBounds.bottom-extremeBounds.top+PADDING*2)
	      ].join(" "));
	      
	      // Define hovering behavior
	      container.find("path.main").on("mouseover", function(){
	        var group = $(this).attr("group");
	        container.find(".main text").css("opacity",0);
	        container.find(".main path").css("opacity",0.125);
	        $(this).css("opacity",0);
	        container.find(".sub[group='"+group+"']").css("opacity",1);
	      }).on("mouseout", function(){
	        container.find(".main").css("opacity",1);
	        container.find(".sub").css("opacity",0);
	      });
	      
	    }
	    
	    // Given a container, and parallel arrays "shares" and "labels",
	    // draw sectors on the container's SVG element, with the given "cssClass" and "grouping".
	    // Off-set the whole thing by "offset" turns.
	    function drawSectors(container, shares, labels, cssClass, grouping, offset) {
	      var TAU = Math.PI*2;
	      if (shares.length && shares[0] === 1) {
	        shares[0] = 0.9999;
	      }
	      if (offset) {
	        shares.unshift(offset);
	        labels.unshift("!!!"); // If you see this in the view, something's wrong.
	      }
	      
	      
	      var boundaries = [];
	      var sum = 0;
	      var i;
	      for (i=0; i<shares.length; i++) {
	        boundaries.push(shares[i]+sum);
	        sum += shares[i];
	      }
	      var boundaryAngles = boundaries.map(function(x){return x*TAU;});
	      
	      var midpoints = [];
	      for (i=0; i<shares.length; i++) {
	        midpoints.push((boundaries[i-1]||0) + shares[i]/2);
	      }
	      var midpointAngles = midpoints.map(function(x){return x*TAU;});
	      
	      var center = [SIZE/2,SIZE/2];
	      var circleRadius = SIZE/2;
	      
	      var polarToRect = function(radius, angle) {
	        return [
	          center[0]+radius*Math.sin(angle), 
	          center[1]-radius*Math.cos(angle)
	        ];
	      };
	      
	      
	      var sectors = [];
	      for ((offset ? i=1 : i=0); i<shares.length; i++) {
	        var share = shares[i];
	        if (share !== 0) {
	          var pointA = polarToRect(circleRadius, boundaryAngles[i-1]||0);
	          var pointB = polarToRect(circleRadius, boundaryAngles[i]);
	          var labelCoords = polarToRect(circleRadius+20, midpointAngles[i]);
	          var labelPosition = {
	            x: labelCoords[0],
	            y: labelCoords[1]
	          };
	          
	          sectors.push({
	            path: "M "+center.join(",")+
	              " L "+pointA.join(",")+
	              " A "+circleRadius+","+circleRadius+
	              " 0,"+(shares[i]>0.5?"1":"0")+",1 "+
	              pointB.join(",")+" Z",
	            labelPosition: labelPosition,
	            labelText: labels[i],
	            group: "string"===typeof(grouping) ? grouping : grouping[i],
	            share: share
	          });
	        }
	      }

	      var svg = container.find('svg').attr({
	        width: "100%",
	        height: SIZE*19/12,
	        "xmlns:svg": "http://www.w3.org/2000/svg",
	        "xmlns":     "http://www.w3.org/2000/svg"
	      });
	      
	      var sector, g;
	      for (i=0; i<sectors.length; i++) {
	        sector = sectors[i];
	        
	        var colorClass = sector.group.toLowerCase();
	        if (!({
	          xrp: true,
	          usd: true,
	          btc: true,
	          eur: true,
	          cny: true,
	          jpy: true,
	          cad: true, // If we add any more specific currency colors, add them to this list also.
	          other: true
	        }).hasOwnProperty(colorClass)) {
	          colorClass = "generic" + (i%2 + 1);
	        }
	        g = $('<g></g>').appendTo(svg).attr({
	          "class": cssClass + " " + colorClass,
	          group: sector.group
	        });
	        
	        $('<path></path>').appendTo(g).attr({
	          d: sector.path,
	          "class": cssClass,
	          group: sector.group
	        });
	      }

	      for (i=0; i<sectors.length; i++) {
	        sector = sectors[i];
	        
	        g = $('<g></g>').appendTo(svg).attr({
	          "class": cssClass + " pielabel",
	          group: sector.group
	        });
	        
	        $('<text></text>').appendTo(g).text(sector.labelText).attr({
	          x: sector.labelPosition.x,
	          y: sector.labelPosition.y,
	          "class": cssClass,
	          group: sector.group
	        });
	        
	        var percentage = Math.round(sector.share*100);
	        if (percentage === 0 && sector.share > 0) {
	          percentage = "<1";
	        }
	        
	        $('<text></text>').appendTo(g).text(percentage+"%").attr({
	          "class": cssClass + " percentage",
	          x: sector.labelPosition.x,
	          y: sector.labelPosition.y+14,
	          group: sector.group
	        });
	      }
	    }

	    // Move the labels around until they don't overlap, and return the extreme bounding box.
	    // (The adjustment is only done a finite number of times, to avoid an infinite loop.)
	    function resolveCollisions(container) {
	      var svg = container.find('svg');
	      var bounds = [];

	      var iterations=0, mainBounds, changed, temp;
	      do {
	        temp = resolveCollisionsInSelection(svg.find("g.main.pielabel"));
	        mainBounds = temp[0];
	        changed = temp[1];
	        iterations++;
	      } while (changed && iterations<10);
	      bounds.push(mainBounds);
	      
	      var groups = {};
	      svg.find("g.sub.pielabel").each(function(){
	        groups[$(this).attr("group")] = true;
	      });
	      var okg = Object.keys(groups);
	      var i;
	      var groupBounds;
	      for (i=0; i<okg.length; i++) {
	        var group = okg[i];
	        var selection = svg.find("g.sub.pielabel[group='"+group+"']");
	        iterations = 0;
	        do {
	          temp = resolveCollisionsInSelection(selection);
	          groupBounds = temp[0];
	          changed = temp[1];
	          iterations++;
	        } while (changed && iterations<10);
	        bounds.push(groupBounds);
	      }
	      return findExtremeBounds(bounds);
	    }
	    
	    // Given a list of "bounds" objects, find the smallest bound that contains them all.
	    function findExtremeBounds(bounds) {
	      var extrema = {
	        left:    0,
	        right:  SIZE,
	        top:     0,
	        bottom: SIZE
	      };
	      
	      for (var i=0; i<bounds.length; i++) {
	        var bound = bounds[i];
	        extrema = {
	          left:   Math.min(extrema.left, bound.left),
	          right:  Math.max(extrema.right, bound.right),
	          top:    Math.min(extrema.top, bound.top),
	          bottom: Math.max(extrema.bottom, bound.bottom)
	        };
	      }
	      return extrema;
	    }
	    
	    // Given a selection, move the labels around if they collide.
	    // Returns an array: [
	    //   The extreme bounds after moving the labels, and
	    //   true/false whether anything was moved.
	    // ]
	    function resolveCollisionsInSelection(selection) {
	      var bounds = [];
	      selection.each(function(){
	        var bbox = $(this)[0].getBBox();
	        bounds.push({
	          left:   bbox.x,
	          right:  bbox.x+bbox.width,
	          top:    bbox.y,
	          bottom: bbox.y+bbox.height
	        });
	      });
	      var collisions = {};
	      var collider, collidee;
	      for (collider=0; collider<bounds.length; collider++) {
	        var colliderBounds = bounds[collider];
	        for (collidee=0; collidee<bounds.length; collidee++) { if (collider !== collidee) {
	          var collideeBounds = bounds[collidee];
	          var collisionLR = colliderBounds.right - collideeBounds.left;
	          var collisionRL = colliderBounds.left - collideeBounds.right;
	          var collisionTB = colliderBounds.bottom - collideeBounds.top;
	          var collisionBT = colliderBounds.top - collideeBounds.bottom;
	          
	          if (collisionLR > 0 && collisionRL < 0 && collisionTB > 0 && collisionBT < 0) {
	            if (!collisions[collider]) {
	              collisions[collider] = {};
	            }
	            if (!collisions[collider][collidee]) {
	              collisions[collider][collidee] = {};
	            }
	            collisions[collider][collidee] = {
	              x: (collisionLR > -collisionRL ? collisionRL : collisionLR),
	              y: (collisionTB > -collisionBT ? collisionBT : collisionTB)
	            };
	          }
	        }}
	      }
	      
	      function adjustBy(collision, coordinate) {
	        return function() {
	          var t = $(this).attr(coordinate);
	          var adjustment = collision[coordinate];
	          $(this).attr(coordinate,t-adjustment/1.9);
	        };
	      }
	      
	      for (collider in collisions) {if (collisions.hasOwnProperty(collider)) {
	        var collidingWith = collisions[collider];
	        for (collidee in collidingWith) {if (collidingWith.hasOwnProperty(collidee)) {
	          var collision = collidingWith[collidee];
	          var g = $(selection[collider]);
	          if (Math.abs(collision.x) < Math.abs(collision.y)) {
	            g.find("text").each(adjustBy(collision,"x"));
	          } else {
	            g.find("text").each(adjustBy(collision,"y"));
	          }
	        }}
	      }}
	            
	      return [
	        findExtremeBounds(bounds),
	        !!(Object.keys(collisions).length)
	      ];
	    }
	    
	    
	    // Finally, call the main function.
	    drawPieChart(element, scope.exchangeRates, scope.drops, scope.ious);
	  }
	  
	  return {
	    restrict: 'E',
	    scope: {
	      drops: '=rpDrops',
	      ious: '=rpIous',
	      exchangeRates: '=rpExchangeRates',
	      size: '@rpSize'
	    },
	    link: function(scope, element, attributes) {
	      pieChart(element, scope);
	      scope.$watch('drops', function() {
	        pieChart(element, scope);
	      });
	      
	      scope.$on('$balancesUpdate', function() {
	        pieChart(element, scope);
	      });
	      
	      scope.$watch('exchangeRates', function() {
	        pieChart(element, scope);
	      }, true);
	    }
	  };
	}]); 





/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * FIELDS
	 *
	 * Angular-powered input components go into this file.
	 */

	var webutil = __webpack_require__(66);

	var module = angular.module('fields', []);

	/**
	 * Combobox input element.
	 *
	 * Adds a autocomplete-like dropdown to an input element.
	 *
	 * @param {string} rpCombobox Pass a function that takes a string and returns
	 *   the matching autocompletions.
	 */
	module.directive('rpCombobox', [function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, el, attrs, ngModel) {
	      var keyCursor = -1;

	      el.wrap('<div class="rp-combobox">');
	      el.attr('autocomplete', 'off');
	      var cplEl = $('<ul class="completions"></ul>').hide();
	      el.parent().append(cplEl);

	      // Explicit select button
	      if (attrs.rpComboboxSelect) {
	        var selectEl = $('<div>').appendTo(el.parent());
	        selectEl.addClass('select');
	        selectEl.mousedown(function (e) {
	          e.preventDefault();
	        });
	        selectEl.click(function () {
	          var complFn = scope.$eval(attrs.rpCombobox);
	          if ("function" !== typeof complFn) {
	            var options = complFn;
	            complFn = webutil.queryFromOptions(complFn);
	            scope.$watch(options, function(value) {
	              setCompletions(complFn());
	            });
	          }
	          setCompletions(complFn());
	          if (cplEl.is(':visible')) {
	            el.blur();
	          } else {
	            setCompletions(complFn());
	            el.focus();
	          }
	        });
	      }

	      // Listen for keyboard keydown events
	      el.keydown(function (e) {
	        // "Up/Down" key press
	        if (e.which === 38 || e.which === 40) {
	          if (!cplEl.children().length) {
	            updateCompletions();
	          }
	          e.preventDefault();

	          // Move cursor (highlighted option) up/down
	          if (e.which === 38) keyCursor--;
	          else keyCursor++;

	          updateKeyCursor();
	        }

	        // "Enter" key press (select the option)
	        else if (e.which === 13) {
	          var curEl = cplEl.find('li.cursor');
	          if (cplEl.is(':visible')) {
	            e.preventDefault();
	          }
	          if (cplEl.find('li').length === 1) {
	            // Only one completion, we'll assume that's the one they want
	            selectCompletion(cplEl.find('li'));
	          } else if (curEl.length === 1) {
	            selectCompletion(curEl);
	          }
	        }

	        // "ESC" key press
	        else if (e.which === 27) {
	          // Hide the options list
	          setVisible(false);
	        }
	      });

	      // Listen for keyboard keyup events to enable binding
	      el.keyup(function(e) {
	        // Ignore Left, up, right, down
	        if (e.which >= 37 && e.which <= 40) return;
	        // Ignore Enter, Esc
	        if (e.which === 13 || e.which === 27) return;

	        // Any other keypress should update completions list
	        updateCompletions();
	      });

	      el.focus(function() {
	        keyCursor = -1;
	        triggerCompletions();
	      });

	      el.blur(function() {
	        setVisible(false);
	      });

	      cplEl.mousedown(function (e) {
	        e.preventDefault();
	      });

	      function setVisible(to) {
	        el.parent()[to ? 'addClass' : 'removeClass']('active');
	        cplEl[to ? 'fadeIn' : 'fadeOut']('fast');
	      }

	      /**
	       * Update completions list
	       */
	      function updateCompletions() {
	        var match = ngModel.$viewValue, // Input value
	            completions = [], re = null,
	            complFn, valueOption;

	        // Query function. This should return the full options list
	        complFn = scope.$eval(attrs.rpCombobox);

	        // Uses the default query function, if it's not defined
	        if ("function" !== typeof complFn) {
	          complFn = webutil.queryFromOptions(complFn);
	        }

	        if ("string" === typeof match && match.length) {
	          // Escape field value
	          var escaped = webutil.escapeRegExp(match);
	          // Build the regex for completion list lookup
	          re = new RegExp('('+escaped+')', 'i');

	          completions = complFn(match, re);
	        }

	        // Value as option
	        if (attrs.rpComboboxValueAsOption && match.length) {
	          var prefix = attrs.rpComboboxValueAsOptionPrefix;

	          valueOption = (prefix && 0 !== match.indexOf(prefix))
	            ? prefix + match
	            : match;

	          completions.push(valueOption);
	        }

	        // Value as ripple name
	        if (attrs.rpComboboxValueAsRippleName && match.length
	          && 'web' === scope.client) { // TODO Don't do a client check in validators
	          valueOption = (0 !== match.indexOf('~'))
	            ? '~' + match
	            : match;

	          if (webutil.isRippleName(valueOption)) {
	            completions.push(valueOption);
	          }
	        }

	        // By fading out without updating the completions we get a smoother effect
	        if (!completions.length) {
	          setVisible(false);
	          return;
	        }

	        setCompletions(completions, re);
	        triggerCompletions();
	      }

	      function setCompletions(completions, re) {
	        cplEl.empty();
	        keyCursor = -1;
	        completions.forEach(function (completion) {
	          var additional = '';

	          if ("string" === typeof completion) {
	            val = completion;
	          } else {
	            val = completion.name;

	            if (completion.additional) {
	              additional = '<span class="additional">' + completion.additional + '</span>';
	            }
	          }

	          if (re) val = val.replace(re, '<u>$1</u>');
	          var completionHtml = $('<li><span class="val">' + val + '</span>' + additional + '</li>');
	          el.parent().find('.completions').append(completionHtml);
	        });
	      }

	      function triggerCompletions() {
	        var cplEls = cplEl.children();
	        var visible = !!cplEls.length;
	        if (cplEls.length === 1 &&
	            cplEls.eq(0).text() === el.val()) {
	          visible = false;
	        }
	        setVisible(visible);
	      }

	      // Update the cursor (highlight selected option)
	      function updateKeyCursor() {
	        var opts = cplEl.find('li');
	        keyCursor = Math.max(keyCursor, 0);
	        keyCursor = Math.min(keyCursor, opts.length - 1);
	        opts.removeClass('cursor');
	        opts.eq(keyCursor).addClass('cursor');
	      }

	      function selectCompletion(liEl) {
	        var val = $(liEl).find('.val').text();
	        scope.$apply(function () {
	          el.val(val);
	          ngModel.$setViewValue(val);
	          setVisible(false);
	        });
	      }

	      function escape(str) {
	        return str
	          .replace(/&/g, '&amp;')
	          .replace(/</g, '&lt;')
	          .replace(/>/g, '&gt;')
	          .replace(/"/g, '&quot;')
	          .replace(/'/g, '&apos;');
	      }

	      cplEl.on('click', 'li', function () {
	        selectCompletion(this);
	      });
	    }
	  };
	}]);

	/**
	 * Datepicker
	 */
	module.directive('rpDatepicker', [function() {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function(scope, element, attr, ngModel) {
	      attr.$observe('rpDatepicker', function() {
	        var dp = $(element).datepicker();
	        dp.on('changeDate', function(e) {
	          scope.$apply(function () {
	            ngModel.$setViewValue(e.date.getMonth() ? e.date : new Date(e.date));
	          });
	        });
	        scope.$watch(attr.ngModel,function() {
	          var update = ngModel.$viewValue;

	          function falsy(v) {return v == '0' || v == 'false'; }

	          if (!falsy(attr.ignoreInvalidUpdate) &&
	               (update == null ||
	                 (update instanceof Date && isNaN(update.getYear())) )) {
	              return;
	            } else {
	              dp.datepicker('setValue', update)
	                .datepicker('update');
	            }
	        });
	      });
	    }
	  };
	}]);

	module.directive('fileUploadButton', function() {
	  return {
	    require: '^ngModel',
	    link: function(scope, element, attributes) {
	      var el = angular.element(element);

	      var button = el.children()[0];

	      el.css({
	        'position': 'relative',
	        'margin-bottom': 14
	      });

	      var fileInput = angular.element('<input type="file" ng-model="walletfile" nwsaveas="wallet.txt" />');

	      fileInput.bind('change', function () {
	          scope.$apply(attributes.fileUploadButton);
	      });

	      fileInput.css({
	        position: 'absolute',
	        top: 0,
	        left: 0,
	        'z-index': '2',
	        width: '100%',
	        height: '100%',
	        opacity: '0',
	        cursor: 'pointer'
	      });

	      el.append(fileInput);
	    }
	  };
	});



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * EFFECTS
	 *
	 * Angular-powered animation and visual effects directives go into this file.
	 */

	var module = angular.module('effects', []);

	/**
	 * Animate element creation
	 */
	module.directive('rpAnimate', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, elm, attrs) {
	      if (attrs.rpAnimate !== "rp-animate" && !scope.$eval(attrs.rpAnimate)) return;
	      elm = jQuery(elm);
	      elm.hide();
	      elm.fadeIn(600);
	      elm.css('background-color', '#E2F5E4');
	      elm.addClass('rp-animate-during rp-animate');
	      elm.animate({
	        'background-color': '#fff'
	      }, {
	        duration: 600,
	        complete: function () {
	          elm.removeClass('rp-animate-during').addClass('rp-animate-after');
	        }
	      });
	    }
	  };
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * VALIDATORS
	 *
	 * Form validation directives go into this file.
	 */

	var webutil = __webpack_require__(66),
	    Base = ripple.Base,
	    Amount = ripple.Amount,
	    Currency = ripple.Currency;

	var module = angular.module('validators', []);

	/**
	 * Secret Account Key validator
	 */
	module.directive('rpMasterKey', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        if (value && !Base.decode_check(33, value)) {
	          ctrl.$setValidity('rpMasterKey', false);
	          return;
	        }

	        ctrl.$setValidity('rpMasterKey', true);
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpMasterKey', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/*
	 * Invalidate duplicate account_id's
	 * consider the masterkey invalid unless the database does not have the derived account_id
	 */
	module.directive('rpMasterAddressExists', function ($http) {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        if (!value || !Base.decode_check(33, value)) {
	          ctrl.$setValidity('rpMasterAddressExists', true);
	          return value;
	        
	        } else if (value) {
	          ctrl.$setValidity('rpMasterAddressExists', false); //while checking
	          scope.checkingMasterkey = true;
	          var account_id = ripple.Seed.from_json(value).get_key().get_address().to_json();    
	              
	          //NOTE: is there a better way to get the blobvault URL?         
	          ripple.AuthInfo.get(Options.domain, "1", function(err, authInfo) {
	            if (err) {
	              scope.checkingMasterkey = false;
	              return;
	            }
	            
	            $http.get(authInfo.blobvault + '/v1/user/' + account_id)
	              .success(function(data) {
	                if (data.username) {
	                  scope.masterkeyUsername = data.username; 
	                  scope.masterkeyAddress  = account_id;
	                  ctrl.$setValidity('rpMasterAddressExists', false);
	                  scope.checkingMasterkey = false;
	                } else {
	                  ctrl.$setValidity('rpMasterAddressExists', true);
	                  scope.checkingMasterkey = false;
	                }
	              });
	          });

	          return value;
	        }
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpMasterAddressExists', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Validate a payment destination.
	 *
	 * You can set this validator and one or more of the type attributes:
	 *
	 * - rp-dest-address     - If set, allows Ripple addresses as destinations.
	 * - rp-dest-contact     - If set, allows address book contacts.
	 * - rp-dest-bitcoin     - If set, allows Bitcoin addresses as destinations.
	 * - rp-dest-email       - If set, allows federation/email addresses.
	 * - rp-dest-ripple-name - If set, allows Existing ripple name as destination.
	 * - rp-dest-model       - If set, updates the model with the resolved ripple address.
	 *
	 * If the input can be validly interpreted as one of these types, the validation
	 * will succeed.
	 */
	module.directive('rpDest', function ($timeout, $parse) {
	  var emailRegex = /^\S+@\S+\.[^\s.]+$/;
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var timeoutPromise, getter;
	      var validator = function(value) {
	        var strippedValue = webutil.stripRippleAddress(value);
	        var address = ripple.UInt160.from_json(strippedValue);

	        ctrl.rpDestType = null;

	        if (attr.rpDestAddress && address.is_valid()) {
	          ctrl.rpDestType = "address";
	          ctrl.$setValidity('rpDest', true);

	          if (attr.rpDestModel) {
	            getter = $parse(attr.rpDestModel);
	            getter.assign(scope,value);
	          }

	          return value;
	        }

	        if (attr.rpDestContact && scope.userBlob &&
	            webutil.getContact(scope.userBlob.data.contacts,strippedValue)) {
	          ctrl.rpDestType = "contact";
	          ctrl.$setValidity('rpDest', true);

	          if (attr.rpDestModel) {
	            getter = $parse(attr.rpDestModel);
	            getter.assign(scope,webutil.getContact(scope.userBlob.data.contacts,strippedValue).address);
	          }

	          return value;
	        }

	        if (attr.rpDestBitcoin && !isNaN(Base.decode_check([0, 5], strippedValue, 'bitcoin'))) {
	          ctrl.rpDestType = "bitcoin";
	          ctrl.$setValidity('rpDest', true);

	          if (attr.rpDestModel) {
	            getter = $parse(attr.rpDestModel);
	            getter.assign(scope,value);
	          }

	          return value;
	        }

	        if (attr.rpDestEmail && emailRegex.test(strippedValue)) {
	          ctrl.rpDestType = "email";
	          ctrl.$setValidity('rpDest', true);

	          if (attr.rpDestModel) {
	            getter = $parse(attr.rpDestModel);
	            getter.assign(scope,value);
	          }

	          return value;
	        }

	        if (((attr.rpDestRippleName && webutil.isRippleName(value)) ||
	          (attr.rpDestRippleNameNoTilde && value && value[0] !== '~' && webutil.isRippleName('~'+value)))
	          && 'web' === scope.client) { // TODO Don't do a client check in validators
	          ctrl.rpDestType = "rippleName";

	          if (timeoutPromise) $timeout.cancel(timeoutPromise);

	          timeoutPromise = $timeout(function(){
	            if (attr.rpDestLoading) {
	              var getterL = $parse(attr.rpDestLoading);
	              getterL.assign(scope,true);
	            }

	            ripple.AuthInfo.get(Options.domain, value, function(err, info){
	              scope.$apply(function(){
	                ctrl.$setValidity('rpDest', info.exists);

	                if (attr.rpDestModel && info.exists) {
	                  getter = $parse(attr.rpDestModel);
	                  getter.assign(scope,info.address);
	                }

	                if (attr.rpDestLoading) {
	                  getterL.assign(scope,false);
	                }
	              });
	            });
	          }, 500);

	          return value;
	        }

	        ctrl.$setValidity('rpDest', false);
	        return;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpDest', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Check if the ripple name is valid and is available for use
	 */
	module.directive('rpAvailableName', function ($timeout, $parse) {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var timeoutPromise;

	      var validator = function(value) {
	        var getterInvalidReason = $parse(attr.rpAvailableNameInvalidReason);
	        var getterReserved = $parse(attr.rpAvailableNameReservedFor);

	        if (timeoutPromise) $timeout.cancel(timeoutPromise);

	        if (!value) {
	          // No name entered, show nothing, do nothing
	          getterInvalidReason.assign(scope,false);
	        } else if (value.length < 2) {
	          getterInvalidReason.assign(scope,'tooshort');
	        } else if (value.length > 20) {
	          getterInvalidReason.assign(scope,'toolong');
	        } else if (!/^[a-zA-Z0-9\-]+$/.exec(value)) {
	          getterInvalidReason.assign(scope,'charset');
	        } else if (/^-/.exec(value)) {
	          getterInvalidReason.assign(scope,'starthyphen');
	        } else if (/-$/.exec(value)) {
	          getterInvalidReason.assign(scope,'endhyphen');
	        } else if (/--/.exec(value)) {
	          getterInvalidReason.assign(scope,'multhyphen');
	        } else {

	          timeoutPromise = $timeout(function(){
	            if (attr.rpLoading) {
	              var getterL = $parse(attr.rpLoading);
	              getterL.assign(scope,true);
	            }

	            ripple.AuthInfo.get(Options.domain, value, function(err, info){
	              scope.$apply(function(){
	                if (info.exists) {
	                  ctrl.$setValidity('rpAvailableName', false);
	                  getterInvalidReason.assign(scope,'exists');
	                } else if (info.reserved) {
	                  ctrl.$setValidity('rpAvailableName', false);
	                  getterInvalidReason.assign(scope,'reserved');
	                  getterReserved.assign(scope,info.reserved);
	                } else {
	                  ctrl.$setValidity('rpAvailableName', true);
	                }

	                if (attr.rpLoading) {
	                  getterL.assign(scope,false);
	                }
	              });
	            });
	          }, 500);

	          return value;
	        }

	        ctrl.$setValidity('rpAvailableName', false);
	        return;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpAvailableName', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Source and destination tags validator
	 *
	 * Integer in the range 0 to 2^32-1
	 */
	module.directive('rpStdt', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        if (!value || (!isNaN(parseFloat(value)) && isFinite(value) && value >= 0 && value < Math.pow(2,32) - 1)) {
	          ctrl.$setValidity('rpStdt', true);
	          return value;
	        } else {
	          ctrl.$setValidity('rpStdt', false);
	          return;
	        }
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpStdt', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	module.directive('rpNotMe', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        var contact = webutil.getContact(scope.userBlob.data.contacts,value);

	        if (value) {
	          if ((contact && contact.address === scope.userBlob.data.account_id) || scope.userBlob.data.account_id === value) {
	            ctrl.$setValidity('rpNotMe', false);
	            return;
	          }
	        }

	        ctrl.$setValidity('rpNotMe', true);
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpNotMe', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	module.directive('rpIssuer', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        if(!value){
	          ctrl.$setValidity('rpIssuer', false);
	          return;
	        }

	        var shortValue = value.slice(0, 3).toUpperCase();

	        if ( (shortValue==="XRP") || webutil.findIssuer(scope.lines,shortValue))
	        {
	          ctrl.$setValidity('rpIssuer', true);
	          return value;
	        } else {
	          ctrl.$setValidity('rpIssuer', false);
	          return;
	        }
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpIssuer', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Verify a set of inputs have the same value.
	 *
	 * For example you could use this as a password repeat validator.
	 *
	 * @example
	 *   <input name=password type=password rp-same-in-set="passwordSet">
	 *   <input name=password2 type=password rp-same-in-set="passwordSet">
	 */
	module.directive('rpSameInSet', [function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elm, attrs, ctrl) {
	      var set = scope.$eval(attrs.rpSameInSet);

	      function validator(value) {
	        var oldValue = value !== ctrl.$modelValue
	            ? ctrl.$modelValue
	            : (value !== ctrl.$viewValue ? ctrl.$viewValue : value);
	        if (value !== oldValue) {
	          set[oldValue] = (set[oldValue] || 1) - 1;
	          if (set[oldValue] === 0) {
	            delete set[oldValue];
	          }
	          if (value) {
	            set[value] = (set[value] || 0) + 1;
	          }
	        }
	        return value;
	      }

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.push(validator);

	      scope.$watch(
	          function() {
	            return _.size(set) === 1;
	          },
	          function(value){
	            ctrl.$setValidity('rpSameInSet', value);
	          }
	      );
	    }
	  };
	}]);

	/**
	 * Field uniqueness validator.
	 *
	 * @param {array=} rpUnique Array of strings which are disallowed values.
	 * @param {string=} rpUniqueField If set, rpUnique will be interpreted as an
	 *   array of objects and we compare the value with the field named
	 *   rpUniqueField inside of those objects.
	 * @param {string=} rpUniqueOrig You can set this to the original value to
	 *   ensure this value is always allowed.
	 * @param {string=} rpUniqueGroup @ref rpUniqueScope
	 *
	 * @example
	 *   <input ng-model="name" rp-unique="addressbook" rp-unique-field="name">
	 */
	module.directive('rpUnique', function() {
	  var globalGroups = {};
	  var bind = function(callback) {
	    return function(args) {
	      return callback.apply(this, args);
	    };
	  };
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function ($scope, elm, attr, ctrl) {
	      if (!ctrl) return;
	      var group;
	      if (attr.rpUniqueGroup) {
	        var groups;
	        groups = elm.inheritedData(RP_UNIQUE_SCOPE) || globalGroups;
	        if (!groups[attr.rpUniqueGroup]) groups[attr.rpUniqueGroup] = [];
	        group = groups[attr.rpUniqueGroup];
	        group.push([$scope, elm, attr, ctrl]);
	      } else {
	        group = [[$scope, elm, attr, ctrl]];
	      }

	      var setResult = function(result) {
	        _.forEach(group, bind(function($scope, elm, attr, ctrl){
	          ctrl.$setValidity('rpUnique', result);
	        }));
	      };

	      // makes undefined == ''
	      var checkValue = function(a, b) {
	        if (a === b) return true;
	        if ((a === null || a === undefined || a === '') &&
	            (b === null || b === undefined || b === '')) return true;
	        return false;
	      };

	      var validator = function(value) {
	        var thisCtrl = ctrl;
	        var pool = $scope.$eval(attr.rpUnique) || [];
	        var orig = _.every(group, bind(function($scope, elm, attr, ctrl){
	          return attr.rpUniqueOrig && checkValue(ctrl === thisCtrl ? value : ctrl.$viewValue, $scope.$eval(attr.rpUniqueOrig));
	        }));
	        if (orig) {
	          // Original value is always allowed
	          setResult(true);
	        } else if (attr.rpUniqueField) {
	          var check = function (i){
	            return _.every(group, bind(function($scope, elm, attr, ctrl){
	              return checkValue(pool[i][attr.rpUniqueField], ctrl === thisCtrl ? value : ctrl.$viewValue);
	            }));
	          };
	          for (i = 0, l = pool.length; i < l; i++) {
	            if (check(i)) {
	              setResult(false);
	              return value;
	            }
	            setResult(true);
	          }
	        } else {
	          ctrl.$setValidity('rpUnique', pool.indexOf(value) === -1);
	        }

	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      $scope.$watch(attr.rpUnique, function () {
	        validator(ctrl.$viewValue);
	      }, true);
	    }
	  };
	});

	/**
	 * Field uniqueness validator scope for group mode. rpUniqueField must be present.
	 *
	 * @example
	 *   <div rp-unique-scope>
	 *     <input ng-model="name" rp-unique="addressbook" rp-unique-field="name"> // this will not join the group
	 *     <input ng-model="address" rp-unique="addressbook" rp-unique-field="address" rp-unique-group="address-dt">
	 *     <input ng-model="dt" rp-unique="addressbook" rp-unique-field="dt" rp-unique-group="address-dt">
	 *   </div>
	 */
	var RP_UNIQUE_SCOPE = "rp-unique-scope";
	module.directive('rpUniqueScope', function() {
	  return {
	    restrict: 'EA',
	    link: {
	      pre: function ($scope, elm) {
	        elm.data(RP_UNIQUE_SCOPE, {});
	      }
	    }
	  };
	});

	/**
	 * Password strength validator
	 */
	module.directive('rpStrongPassword', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(password) {
	        var score = 0;
	        var username = ""+scope.username;

	        if (!password) {
	          scope.strength = '';
	          return password;
	        }

	        // password < 6
	        if (password.length < 6 ) {
	          ctrl.$setValidity('rpStrongPassword', false);
	          scope.strength = 'weak';
	          return;
	        }

	        // password == user name
	        if (password.toLowerCase() === username.toLowerCase()) {
	          ctrl.$setValidity('rpStrongPassword', false);
	          scope.strength = 'match';
	          return;
	        }

	        checkRepetition = function (pLen, str) {
	          var res = "";
	          for (var i = 0; i < str.length; i++ ) {
	            var repeated = true;

	            for (var j = 0; j < pLen && (j+i+pLen) < str.length; j++) {
	              repeated = repeated && (str.charAt(j+i) === str.charAt(j+i+pLen));
	            }
	            if (j<pLen) {
	              repeated = false;
	            }

	            if (repeated) {
	              i += pLen-1;
	              repeated = false;
	            } else {
	              res += str.charAt(i);
	            }
	          }
	          return res;
	        };

	        // password length
	        score += password.length * 4;
	        score += ( checkRepetition(1, password).length - password.length ) * 1;
	        score += ( checkRepetition(2, password).length - password.length ) * 1;
	        score += ( checkRepetition(3, password).length - password.length ) * 1;
	        score += ( checkRepetition(4, password).length - password.length ) * 1;

	        // password has 3 numbers
	        if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
	          score += 5;
	        }

	        // password has 2 symbols
	        if (password.match(/(.*[!,@,#,$,%,&,*,?,_,~].*[!,@,#,$,%,&,*,?,_,~])/)) {
	          score += 5;
	        }

	        // password has Upper and Lower chars
	        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
	          score += 10;
	        }

	        // password has number and chars
	        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
	          score += 15;
	        }

	        //password has number and symbol
	        if (password.match(/([!,@,#,$,%,&,*,?,_,~])/) && password.match(/([0-9])/)) {
	          score += 15;
	        }

	        // password has char and symbol
	        if (password.match(/([!,@,#,$,%,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)) {
	          score += 15;
	        }

	        // password is just a numbers or chars
	        if (password.match(/^\w+$/) || password.match(/^\d+$/) ) {
	          score -= 10;
	        }

	        // verifying 0 < score < 100
	        if (score < 0) { score = 0; }
	        if (score > 100) { score = 100; }

	        if (score < 34) {
	          ctrl.$setValidity('rpStrongPassword', false);
	          scope.strength = 'weak';
	          return;
	        }

	        ctrl.$setValidity('rpStrongPassword', true);

	        if (score < 68) {
	          scope.strength = 'medium';
	          return password;
	        }

	        scope.strength = 'strong';
	        return password;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpStrongPassword', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	module.directive('rpAmount', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        if (value && value.toString().indexOf(",") != -1) {
	          value = value.split(",").join("");
	        }

	        var test = /^(([0-9]*?\.\d+)|([1-9]\d*))$/.test(value);

	        if (test && value[0] == '.') {
	          value = '0' + value;
	        }

	        // check for valid amount
	        ctrl.$setValidity('rpAmount', test);

	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);
	    }
	  };
	});

	module.directive('rpAmountPositive', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      // We don't use parseAmount here, assuming that you also use rpAmount validator
	      var validator = function(value) {
	        // check for positive amount
	        ctrl.$setValidity('rpAmountPositive', value > 0);

	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);
	    }
	  };
	});

	module.directive('rpAmountXrpLimit', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      // We don't use parseAmount here, assuming that you also use rpAmount validator
	      var validator = function(value) {
	        var currency = Currency.from_json(attr.rpAmountXrpLimitCurrency);

	        // If XRP, ensure amount is less than 100 billion and is at least one drop
	        if (currency.is_valid() && currency.is_native()) {
	          ctrl.$setValidity('rpAmountXrpLimit', value <= 100000000000 && value >= 0.000001);
	        } else {
	          ctrl.$setValidity('rpAmountXrpLimit', true);
	        }

	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpAmountXrpLimitCurrency', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Limit currencies to be entered
	 */
	module.directive('rpRestrictCurrencies', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        var match = /^([a-zA-Z0-9]{3}|[A-Fa-f0-9]{40})\b/.exec(value);

	        if (attr.rpRestrictCurrencies) {
	          if (match) {
	            ctrl.$setValidity('rpRestrictCurrencies',
	              attr.rpRestrictCurrencies.indexOf(match[1]) != -1
	                ? true
	                : value === 'XRP'
	            );
	          } else {
	            ctrl.$setValidity('rpRestrictCurrencies', false);
	          }
	        }
	        else {
	          ctrl.$setValidity('rpRestrictCurrencies', true);
	        }

	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);
	    }
	  };
	});

	/**
	 * Port number validator
	 */
	module.directive('rpPortNumber', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        ctrl.$setValidity('rpPortNumber', (parseInt(value,10) == value && value >= 1 && value <= 65535));
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpPortNumber', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Hostname validator
	 * IPv4, IPv6 and hostname
	 */
	module.directive('rpHostname', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      function validate(str) {
	        var test = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-_]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str);
	        //var test = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str);
	        return test;
	      }

	      var validator = function(value) {
	        ctrl.$setValidity('rpHostname', validate(value));
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpHostname', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Used for currency selectors
	 */
	module.directive('rpNotXrp', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var validator = function(value) {
	        ctrl.$setValidity('rpNotXrp', !value || value.toLowerCase() !== 'xrp');
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpNotXrp', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});

	/**
	 * Email address validation
	 */
	module.directive('rpEmail', function () {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function (scope, elm, attr, ctrl) {
	      if (!ctrl) return;

	      var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	      var validator = function(value) {
	        ctrl.$setValidity('rpEmail', emailRegex.test(value));
	        return value;
	      };

	      ctrl.$formatters.push(validator);
	      ctrl.$parsers.unshift(validator);

	      attr.$observe('rpEmail', function() {
	        validator(ctrl.$viewValue);
	      });
	    }
	  };
	});



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * EVENTS
	 *
	 * Angular-powered event handling directives go into this file.
	 */

	var module = angular.module('events', []);

	/**
	 * Handle ENTER key press.
	 */
	module.directive('ngEnter', function() {
	  return function(scope, elm, attrs) {
	    elm.bind('keypress', function(e) {
	      if (e.charCode === 13) scope.$apply(attrs.ngEnter);
	    });
	  };
	});


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * FORMATTERS
	 *
	 * Formatters are directives that simply display a value. Normally we do this
	 * via filters, however if the value needs HTML (rather than just text) it's
	 * better to use a directive.
	 */

	var webutil = __webpack_require__(66),
	    Amount = ripple.Amount,
	    Currency = ripple.Currency;

	var module = angular.module('formatters', ['domainalias']);

	module.directive('rpPrettyIssuer', ['rpDomainAlias',
	                                    function (aliasService) {
	  return {
	    restrict: 'EA',
	    scope: {
	      issuer: '=rpPrettyIssuer',
	      contacts: '=rpPrettyIssuerContacts'
	    },
	    template: '{{alias || name || issuer}}',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        function update() {
	          if (!scope.issuer) {
	            scope.alias = attr.rpPrettyIssuerDefault ? attr.rpPrettyIssuerDefault : '???';
	            return;
	          }
	          var aliasPromise = aliasService.getAliasForAddress(scope.issuer);
	          scope.alias = null;
	          aliasPromise.then(function (result) {
	            scope.alias = result;
	          });

	          scope.name = null;
	          if (scope.contacts) {
	            scope.name = webutil.isContact(scope.contacts, scope.issuer);
	          }

	          if (!scope.name && attr.rpPrettyIssuerOrShort) {
	            scope.name = "" + scope.issuer.substring(0,7) + "…";
	          }
	        }

	        scope.$watch('issuer', update);
	        scope.$watch('contacts', update, true);
	        update();
	      };
	    }
	  };
	}]);

	var RP_PRETTY_AMOUNT_DATE = 'rp-pretty-amount-date';

	module.directive('rpPrettyAmount', [function () {
	  return {
	    restrict: 'EA',
	    scope: {
	      amount: '=rpPrettyAmount'
	    },
	    template: '<span class="value">{{amount | rpamount:{reference_date:date} }}</span> ' +
	              '<span class="currency" rp-currency="amount"></span>',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        scope.date = scope.date || element.inheritedData(RP_PRETTY_AMOUNT_DATE);
	      };
	    }
	  };
	}]);

	/**
	 * Set the reference date for rpPrettyAmount.
	 *
	 * You can set this on the same element that uses rpPrettyAmount or on any
	 * parent element.
	 *
	 * The reference date is used to calculate demurrage/interest correctly.
	 */
	module.directive('rpPrettyAmountDate', [function () {
	  return {
	    restrict: 'EA',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        element.data(RP_PRETTY_AMOUNT_DATE, scope.$eval(attr.rpPrettyAmountDate));
	      };
	    }
	  };
	}]);

	module.directive('rpPrettyIdentity', ['$timeout', function ($timeout) {
	  var popupDelay = 800;
	  var hideDelay =  790;

	  return {
	    restrict: 'EA',
	    scope: {
	      identity: '=rpPrettyIdentity'
	    },
	    template: '{{identity | rpcontactname | rpripplename:{tilde:true} }}',
	    compile: function (element, attr, linker) {
	      if (attr.rpPrettyIdentityFilters) {
	        element.text('{{identity | ' + attr.rpPrettyIdentityFilters + ' }}');
	      }
	      return function (scope, element, attr) {
	        var cancelHidePopoverTimeout;
	        var cancelShowPopoverTimeout;
	        var tip;
	        var shown = false;

	        function hidePopover() {
	          if (!cancelHidePopoverTimeout) {
	            cancelHidePopoverTimeout = $timeout( function() {
	              element.popover('hide');
	              shown = false;
	            }, hideDelay, false );
	            cancelHidePopoverTimeout.finally(function() { cancelHidePopoverTimeout = null; });
	          }
	        }

	        function onPopoverEnter() {
	          if (cancelShowPopoverTimeout) {
	            $timeout.cancel( cancelShowPopoverTimeout );
	            cancelShowPopoverTimeout = null;
	          }
	          if (cancelHidePopoverTimeout) {
	            $timeout.cancel( cancelHidePopoverTimeout );
	            cancelHidePopoverTimeout = null;
	          }
	        }

	        function onPopoverLeave() {
	          hidePopover();
	        }

	        function onElemEnter() {
	          if (cancelHidePopoverTimeout) {
	            $timeout.cancel( cancelHidePopoverTimeout );
	            cancelHidePopoverTimeout = null;
	          } else if (!cancelShowPopoverTimeout) {
	            cancelShowPopoverTimeout = $timeout( function() {
	              element.popover('show'); 
	              shown = true;
	            }, popupDelay, false );
	            cancelShowPopoverTimeout.finally(function() { cancelShowPopoverTimeout = null; });
	          }
	        }

	        function onElemLeave() {
	          if (cancelShowPopoverTimeout) {
	            $timeout.cancel( cancelShowPopoverTimeout );
	            cancelShowPopoverTimeout = null;
	          } else if (shown) {
	            hidePopover();
	          }
	        }

	        function unbindHanlders() {
	          element.unbind('mouseenter', onElemEnter);
	          element.unbind('mouseleave', onElemLeave);
	          tip.unbind('mouseenter', onPopoverEnter);
	          tip.bind('mouseleave', onPopoverLeave);
	        }
	        // XXX Set title to identity
	        console.log(element);

	        element.popover('destroy');
	        var content = 'Ripple address ' + scope.identity;
	        var options = {  content: content,
	          trigger: 'manual', placement: 'top',
	          container: 'body',
	          template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content" ></div></div></div>'
	        };
	        var popover = element.popover(options);
	        tip = element.data('popover').tip();
	        element.bind('mouseenter', onElemEnter);
	        element.bind('mouseleave', onElemLeave);
	        tip.bind('mouseenter', onPopoverEnter);
	        tip.bind('mouseleave', onPopoverLeave);
	        // Make sure popover is destroyed and removed.
	        scope.$on('$destroy', function onDestroyPopover() {
	          $timeout.cancel( cancelHidePopoverTimeout );
	          $timeout.cancel( cancelShowPopoverTimeout );
	          unbindHanlders();
	          if (tip) {
	            tip.remove();
	            tip = null;
	          }
	        });
	      };
	    }
	  };
	}]);

	module.directive('rpBindColorAmount', function () {
	  return {
	    restrict: 'A',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        scope.$watch(attr.rpBindColorAmount, function(value){
	          if (value) {
	            var parts = value.split(".");

	            if (parts.length === 2) { // you never know
	              var decimalPart = parts[1].replace(/0(0+)$/, '0<span class="insig">$1</span>');

	              element[0].innerHTML = decimalPart.length > 0 ? parts[0] + "." + decimalPart : parts[0];
	            }
	          }
	        });
	      };
	    }
	  };
	});

	module.directive('rpCurrency', function () {
	  return {
	    restrict: 'A',
	    compile: function (element, attr, linker) {
	      return function (scope, element, attr) {
	        scope.$watch(attr.rpCurrency, function (input) {
	          var currency;
	          if (input instanceof Currency) {
	            currency = input;
	          } else {
	            var amount = Amount.from_json(input);
	            currency = amount.currency();
	          }

	          var mainText = currency.to_human();

	          // Should we look for a full name like "USD - US Dollar"?
	          if (attr.rpCurrencyFull) {
	            var currencyInfo = $.grep(scope.currencies_all, function(e){ return e.value == mainText; })[0];
	            if (currencyInfo) mainText = currencyInfo.name;
	          }

	          if (currency.has_interest()) {
	            // Get yearly interest rate
	            var referenceDate = currency._interest_start + 3600 * 24 * 365;
	            var interestRate = currency.get_interest_at(referenceDate);

	            // Convert to percent and round to two decimal places
	            interestRate = Math.round(interestRate * 10000 - 10000) / 100;

	            var helpText;
	            if (interestRate > 0) {
	              // Positive interest
	              helpText = "Interest: "+interestRate+" %/yr";
	            } else {
	              // Fee
	              helpText = "Fee: "+(-interestRate)+"%/yr";
	            }

	            var el = $('<abbr></abbr>')
	                  .attr('title', helpText)
	                  .text(mainText);
	            element.empty().append(el);
	          } else {
	            element.empty().text(mainText);
	          }
	        });
	      };
	    }
	  };
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * DIRECTIVES
	 *
	 * Miscellaneous directives go in this file.
	 */

	var module = angular.module('directives', ['popup']);

	/**
	 * Inline edit
	 */
	module.directive('inlineEdit', function() {
	  var previewTemplate = '<span ng-hide="mode">{{model}}</span>';
	  var editTemplate = '<input ng-show="mode" ng-model="model" />';

	  return {
	    restrict: 'E',
	    scope: {
	      model: '=',
	      mode: '='
	    },
	    template: previewTemplate + editTemplate
	  };
	});

	/**
	 * Group of validation errors for a form field.
	 *
	 * @example
	 *   <input name=send_destination ng-model=recipient>
	 *   <div rp-errors=send_destination>
	 *     <div rp-error-on=required>This field is required.</div>
	 *     <div rp-error-valid>{{recipient}} is a valid destination.</div>
	 *   </div>
	 */
	var RP_ERRORS = 'rp-errors';
	module.directive('rpErrors', [function() {
	  return {
	    restrict: 'EA',
	    compile: function(el, attr, linker) {
	      var fieldName = attr.rpErrors || attr.on,
	        errs = {};

	      el.data(RP_ERRORS, errs);
	      return function(scope, el) {
	        var formController = el.inheritedData('$formController');
	        var formName = formController.$name,
	          selectedTransclude,
	          selectedElement,
	          selectedScope;

	        function updateErrorTransclude() {
	          var field = formController[fieldName];

	          if (!field) return;

	          var $error = field && field.$error;

	          if (selectedElement) {
	            selectedScope.$destroy();
	            selectedElement.remove();
	            selectedElement = selectedScope = null;
	          }

	          // Pristine fields should show neither success nor failure messages
	          if (field.$pristine) return;

	          // Find any error messages defined for current errors
	          selectedTransclude = false;
	          $.each(errs, function(validator, transclude) {
	            if (validator.length <= 1) return;
	            if ($error && $error[validator.slice(1)]) {
	              selectedTransclude = transclude;
	              return false;
	            }
	          });

	          // Show message for valid fields
	          if (!selectedTransclude && errs['+'] && field.$valid) {
	            selectedTransclude = errs['+'];
	          }

	          // Generic message for invalid fields when there is no specific msg
	          if (!selectedTransclude && errs['?'] && field.$invalid) {
	            selectedTransclude = errs['?'];
	          }

	          if (selectedTransclude) {
	            scope.$eval(attr.change);
	            selectedScope = scope.$new();
	            selectedTransclude(selectedScope, function(errElement) {
	              selectedElement = errElement;
	              el.append(errElement);
	            });
	          }
	        }

	        scope.$watch(formName + '.' + fieldName + '.$error', updateErrorTransclude, true);
	        scope.$watch(formName + '.' + fieldName + '.$pristine', updateErrorTransclude);
	      };
	    }
	  };
	}]);

	/**
	 * Error message for validator failure.
	 *
	 * Use this directive within a rp-errors block to show a message for a specific
	 * validation failing.
	 *
	 * @example
	 *   <div rp-errors=send_destination>
	 *     <div rp-error-on=required>This field is required.</div>
	 *   </div>
	 */
	module.directive('rpErrorOn', [function() {
	  return {
	    transclude: 'element',
	    priority: 500,
	    compile: function(element, attrs, transclude) {
	      var errs = element.inheritedData(RP_ERRORS);
	      if (!errs) return;
	      errs['!' + attrs.rpErrorOn] = transclude;
	    }
	  };
	}]);

	/**
	 * Message for no matched validator failures.
	 *
	 * Use this directive within a rp-errors block to show a message if the field is
	 * invalid, but there was no error message defined for any of the failing
	 * validators.
	 *
	 * @example
	 *   <div rp-errors=send_destination>
	 *     <div rp-error-on=required>This field is required.</div>
	 *     <div rp-error-unknown>Invalid value.</div>
	 *   </div>
	 */
	module.directive('rpErrorUnknown', [function() {
	  return {
	    transclude: 'element',
	    priority: 500,
	    compile: function(element, attrs, transclude) {
	      var errs = element.inheritedData(RP_ERRORS);
	      if (!errs) return;
	      errs['?'] = transclude;
	    }
	  };
	}]);

	/**
	 * Message for field valid.
	 *
	 * Use this directive within a rp-errors block to show a message if the field is
	 * valid.
	 */
	module.directive('rpErrorValid', [function() {
	  return {
	    transclude: 'element',
	    priority: 500,
	    compile: function(element, attrs, transclude) {
	      var errs = element.inheritedData(RP_ERRORS);
	      if (!errs) return;
	      errs['+'] = transclude;
	    }
	  };
	}]);

	module.directive('rpConfirm', ['rpPopup', function(popup) {
	  return {
	    restrict: 'E',
	    link: function postLink(scope, element, attrs) {
	      // Could have custom or bootstrap modal options here
	      var popupOptions = {};
	      element.find('a,button').click(function(e) {
	        e.preventDefault();

	        popup.confirm(attrs.title, attrs.actionText,
	          attrs.actionButtonText, attrs.actionFunction, attrs.actionButtonCss,
	          attrs.cancelButtonText, attrs.cancelFunction, attrs.cancelButtonCss,
	          scope, popupOptions);
	      });
	    }
	  };
	}]);

	module.directive('rpPopup', ['rpPopup', '$parse', function(popup, $parse) {
	  return {
	    restrict: 'E',
	    link: function postLink(scope, element, attrs) {
	      var a = element.find('a[rp-popup-link]');
	      a.click(function(e) {
	        e.preventDefault();

	        // onShow action
	        if (attrs.rpPopupOnOpen) {
	          $parse(attrs.rpPopupOnOpen)(scope);
	        }

	        var content = element.find('[rp-popup-content]');
	        xml = new XMLSerializer().serializeToString(content[0]);

	        popup.blank(xml, scope);
	        if (attrs.onopen && scope[attrs.onopen]) {
	          scope[attrs.onopen]();
	        }
	      });
	    }
	  };
	}]);

	// TODO Make it have different styling for different limits
	module.directive('rpInboundBridgeLimit', [function(){
	  return {
	    restrict: 'E',
	    scope: {
	      limit: '='
	    },
	    template: '<span> {{limit}} BTC </span>',
	    compile: function(element, attrs) {
	      element.addClass('test');
	    }
	  };
	}]);

	/*
	 * Adds download functionality to an element.
	 */
	module.directive('rpDownload', [function() {
	  return {
	    restrict: 'A',
	    scope: {
	      data: '=rpDownload',
	      filename: '@rpDownloadFilename',
	      isCsv: '@rpDownloadCsv',
	      clickHandler: '@ngClick'
	    },
	    compile: function(element, attr, linker) {
	      return function(scope, element, attr) {
	        var trigger = element.find('[rp-download-trigger]');
	        if (!trigger.length) trigger = element;

	        if ("download" in document.createElement("a")) {
	          scope.$watch('data', function(data) {
	            if (scope.isCsv) trigger.attr('href', data ? "data:text/csv;charset=utf-8," + escape(data) : "");
	            else trigger.attr('href', "data:text/plain," + data);
	          });
	          scope.$watch('filename', function(filename) {
	            trigger.attr('download', filename);
	          });
	        } else if (swfobject.hasFlashPlayerVersion("10.0.0")) {
	          element.css('position', 'relative');

	          setImmediate(function() {
	            var width = trigger.innerWidth();
	            var height = trigger.innerHeight();
	            var offsetTrigger = trigger.offset();
	            var offsetElement = element.offset();
	            var topOffset = offsetTrigger.top - offsetElement.top;
	            var leftOffset = offsetTrigger.left - offsetElement.left;
	            var dl = Downloadify.create(element[0], {
	              filename: function() {
	                return scope.filename;
	              },
	              data: function() {
	                // If there was a click handler in the element Downloadify hides, then trigger it now
	                if (scope.clickHandler) trigger.trigger('click');
	                return scope.data;
	              },
	              transparent: true,
	              swf: 'swf/downloadify.swf',
	              downloadImage: 'img/transparent_l.gif',
	              width: width,
	              height: height,
	              append: true
	            });

	            var id = dl.flashContainer.id;
	            $('#' + id).css({
	              position: 'absolute',
	              top: topOffset + 'px',
	              left: leftOffset + 'px'
	            });
	          });
	        } else {
	          // XXX Should provide some alternative or error
	        }
	      };
	    }
	  };
	}]);

	/**
	 * Tooltips
	 */
	module.directive('rpTooltip', [function() {
	  return function(scope, element, attr) {
	    attr.$observe('rpTooltip', function(value) {
	      // Title
	      var options = {'title': value};

	      // Placement
	      if (attr.rpTooltipPlacement)
	        options.placement = attr.rpTooltipPlacement;

	      $(element).tooltip('destroy');
	      $(element).tooltip(options);
	    });
	  };
	}]);

	/**
	 * Popovers
	 */
	module.directive('rpPopover', [function() {
	  return function(scope, element, attr) {
	    if (!attr.rpPopoverTrigger) attr.rpPopoverTrigger = 'click';

	    $(element).popover({
	      html: true,
	      placement: attr.rpPopoverPlacement,
	      title: attr.rpPopoverTitle,
	      trigger: attr.rpPopoverTrigger
	      // TODO also use rpPopoverContent attribute (there's a bug with this)
	    });

	    $('html').click(function() {
	      $(element).popover('hide');
	    });

	    $(element).click(function(event){
	      event.stopPropagation();
	    });
	  };
	}]);

	module.directive('rpAutofill', ['$parse', function($parse) {
	  return {
	    restrict: 'A',
	    require: '?ngModel',
	    link: function($scope, element, attr, ctrl) {
	      if (!ctrl) return;

	      $scope.$watch(attr.rpAutofill, function(value) {
	        if (value) {
	          // Normalize amount
	          if (attr.rpAutofillAmount || attr.rpAutofillCurrency) {
	            // 1 XRP will be interpreted as 1 XRP, not 1 base unit
	            if (value === ("" + parseInt(value, 10))) {
	              value = value + '.0';
	            }

	            var convertCurrency = function(currencyObj) {
	              if (attr.rpAutofillCurrencyFullname) {
	                if ($scope.currencies_all_keyed[currencyObj.get_iso()]) {
	                  return currencyObj.to_human({full_name:$scope.currencies_all_keyed[currencyObj.get_iso()].name});
	                } else {
	                  return currencyObj.to_human();
	                }
	              } else {
	                return currencyObj.to_json();
	              }
	            };

	            // Is it an amount?
	            var amount = ripple.Amount.from_json(value);
	            if (amount.is_valid()) {
	              if (attr.rpAutofillAmount) {
	                value = amount.to_human({
	                  group_sep: false
	                });
	              } else {
	                value = convertCurrency(amount.currency());
	              }
	            }
	            // Maybe a currency?
	            else {
	              var currency = ripple.Currency.from_json(value);
	              if (!currency.is_valid()) return;

	              value = convertCurrency(currency);
	            }
	          }

	          element.val(value);
	          ctrl.$setViewValue(value);
	          $scope.$eval(attr.rpAutofillOn);
	        }
	      }, true);
	    }
	  };
	}]);

	module.directive('rpSelectEl', [function() {
	  return {
	    restrict: 'A',
	    scope: {
	      target: '@rpSelectEl'
	    },
	    link: function($scope, element, attr) {
	      element.click(function() {
	        var doc = document;
	        var text = doc.getElementById($scope.target);

	        if (doc.body.createTextRange) { // ms
	          var range = doc.body.createTextRange();
	          range.moveToElementText(text);
	          range.select();
	        } else if (window.getSelection) { // moz, opera, webkit
	          var selection = window.getSelection();
	          var srange = doc.createRange();
	          srange.selectNodeContents(text);
	          selection.removeAllRanges();
	          selection.addRange(srange);
	        }
	      });
	    }
	  };
	}]);

	module.directive('rpNoPropagate', [function() {
	  return {
	    restrict: 'A',
	    link: function($scope, element, attr) {
	      element.click(function(e) {
	        e.stopPropagation();
	      });
	    }
	  };
	}]);

	/**
	 * Spinner
	 */
	module.directive('rpSpinner', [function() {
	  return {
	    restrict: 'A',
	    link: function(scope, element, attr) {
	      var spinner = null;
	      attr.$observe('rpSpinner', function(value) {
	        element.removeClass('spinner');
	        if (spinner) {
	          spinner.stop();
	          spinner = null;
	        }

	        if (value > 0) {
	          spinner = new Spinner({
	            lines: 9, // The number of lines to draw
	            length: 3, // The length of each line
	            width: 2, // The line thickness
	            radius: value, // The radius of the inner circle
	            className: 'spinnerInner'
	          });

	          // Spinner for input field
	          if (element.is('input')) {
	            element.after('<div class="inputSpinner"></div>');
	            spinner.spin(element.parent().find('.inputSpinner')[0]);
	          }

	          // Spinner for everything else
	          else {
	            element.addClass('spinner');
	            spinner.spin(element[0]);
	          }
	        }
	      });
	    }
	  };
	}]);


	// Version 0.2.0
	// AngularJS simple file upload directive
	// this directive uses an iframe as a target
	// to enable the uploading of files without
	// losing focus in the ng-app.
	//
	// <div ng-app="app">
	//   <div ng-controller="mainCtrl">
	//    <form action="/uploads" ng-upload="results()">
	//      <input type="file" name="avatar"></input>
	//      <input type="submit" value="Upload"></input>
	//    </form>
	//  </div>
	// </div>
	//
	//  angular.module('app', ['ngUpload'])
	//    .controller('mainCtrl', function($scope) {
	//      $scope.results = function(content) {
	//        console.log(content);
	//      }
	//  });
	//
	//
	module.directive('ngUpload', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {

	      // Options (just 1 for now)
	      // Each option should be prefixed with 'upload-Options-' or 'uploadOptions'
	      // {
	      //    // specify whether to enable the submit button when uploading forms
	      //    enableControls: bool
	      // }
	      var options = {};
	      options.enableControls = attrs['uploadOptionsEnableControls'];

	      // get scope function to execute on successful form upload
	      if (attrs['ngUpload']) {

	        element.attr("target", "upload_iframe");
	        element.attr("method", "post");

	        // Append a timestamp field to the url to prevent browser caching results
	        element.attr("action", element.attr("action") + "?_t=" + new Date().getTime());

	        element.attr("enctype", "multipart/form-data");
	        element.attr("encoding", "multipart/form-data");

	        // Retrieve the callback function
	        var fn = attrs['ngUpload'].split('(')[0];
	        var callbackFn = scope.$eval(fn);
	        if (callbackFn === null || callbackFn === undefined || !angular.isFunction(callbackFn)) {
	          var message = "The expression on the ngUpload directive does not point to a valid function.";
	          // console.error(message);
	          throw message + "\n";
	        }

	        // Helper function to create new iframe for each form submission
	        var addNewDisposableIframe = function(submitControl) {
	          // create a new iframe
	          var iframe = $("<iframe id='upload_iframe' name='upload_iframe' border='0' width='0' height='0' style='width: 0px; height: 0px; border: none; display: none' />");

	          // attach function to load event of the iframe
	          iframe.bind('load', function() {

	            // get content - requires jQuery
	            var content = iframe.contents().find('body').text();

	            // execute the upload response function in the active scope
	            scope.$apply(function() {
	              callbackFn(content, content !== "" /* upload completed */ );
	            });

	            // remove iframe
	            if (content !== "") // Fixes a bug in Google Chrome that dispose the iframe before content is ready.
	              setTimeout(function() {
	                iframe.remove();
	              }, 250);

	            //if (options.enableControls == null || !(options.enableControls.length >= 0))
	            submitControl.attr('disabled', null);
	            submitControl.attr('title', 'Click to start upload.');
	          });

	          // add the new iframe to application
	          element.parent().append(iframe);
	        };

	        // 1) get the upload submit control(s) on the form (submitters must be decorated with the 'ng-upload-submit' class)
	        // 2) attach a handler to the controls' click event
	        $('.upload-submit', element).click(

	          function() {

	            addNewDisposableIframe($(this) /* pass the submit control */ );

	            scope.$apply(function() {
	              callbackFn("Please wait...", false /* upload not completed */ );
	            });

	            //console.log(angular.toJson(options));

	            var enabled = true;
	            if (options.enableControls === null || options.enableControls === undefined || options.enableControls.length >= 0) {
	              // disable the submit control on click
	              $(this).attr('disabled', 'disabled');
	              enabled = false;
	            }

	            $(this).attr('title', (enabled ? '[ENABLED]: ' : '[DISABLED]: ') + 'Uploading, please wait...');

	            // submit the form
	            $(element).submit();
	          }).attr('title', 'Click to start upload.');
	      } else console.log("No callback function found on the ngUpload directive.");
	    }
	  };
	});

	/**
	 * Focus element on render
	 */
	module.directive('rpFocus', ['$timeout', function($timeout) {
	  return function($scope, element) {
	    $timeout(function() {
	      $scope.$watch(function() {return element.is(':visible');}, function(newValue) {
	        if (newValue === true)
	          element.focus();
	      });
	    });
	  };
	}]);

	module.directive('rpOffCanvasMenu', function() {
	  return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	      element.find('h2').click(function () {
	        element.parent().toggleClass('off-canvas-nav-expand');
	      });
	    }
	  };
	});

	module.directive('rpSnapper', ['rpId', function($id) {
	  return function($scope) {
	    // Initialize snapper only if user is logged in.
	    var watcher = $scope.$watch(function(){return $id.loginStatus;}, function() {
	      var snapper;

	      if ($id.loginStatus) {
	        setImmediate(function(){
	          snapper = new Snap({
	            element: document.getElementById('wrapper'),
	            disable: 'right'
	          });

	          // Check
	          checkSize();

	          // Snapper toggle button
	          $('.snapper-toggle').click(function(){
	            snapper.state().state == 'closed' ? snapper.open('left') : snapper.close();
	          });

	          $('.mobile-nav').find('a').click(function(){
	            snapper.close();
	          });
	        });

	        // Activate if resized to mobile size
	        $(window).resize(function(){
	          checkSize();
	        });

	        var checkSize = function(){
	          // screen-xs-max
	          if ('object' === typeof snapper) {
	            if ($(window).width() > 767) {
	              snapper.close();
	              snapper.disable();
	            } else {
	              $('.mobile-nav').show();
	              snapper.enable();
	            }
	          }
	        };

	        // Remove watcher
	        watcher();
	      }
	    });
	  }
	}]);

	/**
	 * Adds spacing around span tags.
	 */
	module.directive('rpSpanSpacing', [function () {
	  return {
	    restrict: 'EA',
	    compile: function (element, attr, linker) {
	      element.find('> span').before(' ').after(' ');
	    }
	  };
	}]);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * DATALINKS
	 *
	 * Data-centric links for things like transactions, accounts etc.
	 */

	var module = angular.module('datalinks', []);

	module.directive('rpLinkTx', ['$location', function ($location) {
	  return {
	    restrict: 'A',
	    link: function ($scope, element, attr) {
	      var url;
	      $scope.$watch(attr.rpLinkTx, function (hash) {
	        url = "/tx?id="+hash;
	      });
	      element.click(function () {
	        $scope.$apply(function () {
	          if (url) $location.url(url);
	        });
	      });
	    }
	  };
	}]);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ERRORS
	 *
	 * Directives related to errors and error messages.
	 */

	var module = angular.module('errors', []);

	/**
	 * Trust line graph. (Similar to small box plot.)
	 */
	module.directive('rpTransactionStatus', function() {
	  return {
	    restrict: 'E',
	    template: __webpack_require__(74),
	    scope: {
	      engine_result: '@rpEngineResult',
	      engine_result_message: '@rpEngineResultMessage',
	      accepted: '@rpAccepted'
	    },
	    link: function(scope, elm, attrs) {
	    }
	  };
	});


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * QR
	 *
	 * Directive to render a QR code.
	 */

	var module = angular.module('qr', []);

	/**
	 * angular-qrcode v3.1.0
	 * (c) 2013 Monospaced http://monospaced.com
	 * License: MIT
	 */
	module.directive('rpQrcode', ['$window', function($window) {
	  var canvas2D = !!$window.CanvasRenderingContext2D,
	      levels = {
	        'L': 'Low',
	        'M': 'Medium',
	        'Q': 'Quartile',
	        'H': 'High'
	      },
	      draw = function(context, qr, modules, tile) {
	        for (var row = 0; row < modules; row++) {
	          for (var col = 0; col < modules; col++) {
	            var w = (Math.ceil((col + 1) * tile) - Math.floor(col * tile)),
	                h = (Math.ceil((row + 1) * tile) - Math.floor(row * tile));

	            context.fillStyle = qr.isDark(row, col) ? '#000' : '#fff';
	            context.fillRect(Math.round(col * tile),
	                             Math.round(row * tile), w, h);
	          }
	        }
	      };

	  return {
	    restrict: 'E',
	    template: '<canvas></canvas>',
	    link: function(scope, element, attrs) {
	      var domElement = element[0],
	          canvas = element.find('canvas')[0],
	          context = canvas2D ? canvas.getContext('2d') : null,
	          trim = /^\s+|\s+$/g,
	          error,
	          version,
	          errorCorrectionLevel,
	          data,
	          size,
	          modules,
	          tile,
	          qr,
	          setVersion = function(value) {
	            version = Math.max(1, Math.min(parseInt(value, 10), 10)) || 4;
	          },
	          setErrorCorrectionLevel = function(value) {
	            errorCorrectionLevel = value in levels ? value : 'M';
	          },
	          setData = function(value) {
	            if (!value) {
	              return;
	            }

	            data = value.replace(trim, '');
	            qr = qrcode(version, errorCorrectionLevel);
	            qr.addData(data);

	            try {
	              qr.make();
	            } catch(e) {
	              error = e.message;
	              return;
	            }

	            error = false;
	            modules = qr.getModuleCount();
	          },
	          setSize = function(value) {
	            size = parseInt(value, 10) || modules * 2;
	            tile = size / modules;
	            canvas.width = canvas.height = size;
	          },
	          render = function() {
	            if (!qr) {
	              return;
	            }

	            if (error) {
	              if (!canvas2D) {
	                domElement.innerHTML = '<img src width="' + size + '"' +
	                  'height="' + size + '">';
	              }
	              scope.$emit('qrcode:error', error);
	              return;
	            }

	            if (canvas2D) {
	              draw(context, qr, modules, tile);
	            } else {
	              domElement.innerHTML = qr.createImgTag(tile, 0);
	            }
	          };

	      setVersion(attrs.version);
	      setErrorCorrectionLevel(attrs.errorCorrectionLevel);
	      setSize(attrs.size);

	      attrs.$observe('version', function(value) {
	        if (!value) {
	          return;
	        }

	        setVersion(value);
	        setData(data);
	        setSize(size);
	        render();
	      });

	      attrs.$observe('errorCorrectionLevel', function(value) {
	        if (!value) {
	          return;
	        }

	        setErrorCorrectionLevel(value);
	        setData(data);
	        setSize(size);
	        render();
	      });

	      attrs.$observe('data', function(value) {
	        if (!value) {
	          return;
	        }

	        setData(value);
	        setSize(size);
	        render();
	      });

	      attrs.$observe('size', function(value) {
	        if (!value) {
	          return;
	        }

	        setSize(value);
	        render();
	      });
	    }
	  };
	}]);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var module = angular.module('filters', []),
	    webutil = __webpack_require__(66),
	    Amount = ripple.Amount,
	    Currency = ripple.Currency,
	    Base = ripple.Base;

	var currencies = __webpack_require__(72);
	/**
	 * Format a ripple.Amount.
	 *
	 * If the parameter is a number, the number is treated the relative
	 */
	module.filter('rpamount', function () {
	  return function (input, options) {

	    var currency;
	    var opts = jQuery.extend(true, {}, options);

	    
	    if ("number" === typeof opts) {
	      opts = {
	        rel_min_precision: opts
	      };
	    } else if ("object" !== typeof opts) {
	      opts = {};
	    }

	    if (!input) return "n/a";

	    if (opts.xrp_human && input === ("" + parseInt(input, 10))) {
	      input = input + ".0";
	    }

	    // Reference date
	    // XXX Should maybe use last ledger close time instead
	    if (!opts.reference_date && !opts.no_interest) {
	      opts.reference_date = new Date();
	    }
	    
	    //If XRP, then set standard precision here
	    if (input._is_native) {
	      currency = currencies[0].standard_precision;
	      opts.min_precision = currency;
	      opts.precision = currency;
	    }

	    var amount = Amount.from_json(input);

	    if (!amount.is_valid()) return "n/a";

	    // Currency default precision 
	    for (var i = 0; i < currencies.length; i++) {
	      if (currencies[i].value === amount.currency().to_human()) {
	        currency = currencies[i].standard_precision;

	        // Default standard precision per currency is taken from currencies.js
	        opts.min_precision = currency;
	        opts.precision = currency;
	        break;
	      }
	    }

	    var cdp = ("undefined" !== typeof currency) ? currency : 4;

	    if (amount.to_human() < 0.01 && amount.to_human() > 0) {
	      // We attempt to show the entire number, by setting opts.precision to a high number... 100
	      opts.precision = 100;

	    }

	    // Certain formatting options are relative to the currency default precision
	    if ("number" === typeof opts.rel_precision) {
	      opts.precision = cdp + opts.rel_precision;
	    }
	    if ("number" === typeof opts.rel_min_precision) {
	      opts.min_precision = cdp + opts.rel_min_precision;
	    }

	    // But we will cut off after five significant decimals
	    // if ("number" !== typeof opts.max_sig_digits) {
	    //   opts.max_sig_digits = 30;
	    // }

	    var out = amount.to_human(opts);

	    // If amount is very small and only has zeros (ex. 0.0000), raise precision
	    // to make it useful.
	    // if (out.length > 1 && 0 === +out && !opts.hard_precision) {
	    //   opts.precision = 5;

	    //   out = amount.to_human(opts);
	    // }

	    return out;
	  };
	});

	/**
	 * Get the currency from an Amount or Currency object.
	 *
	 * If the input is neither an Amount or Currency object it will be passed to
	 * Amount#from_json to try to interpret it.
	 */
	module.filter('rpcurrency', function () {
	  return function (input) {
	    if (!input) return "";

	    var currency;
	    if (input instanceof Currency) {
	      currency = input;
	    } else {
	      var amount = Amount.from_json(input);
	      currency = amount.currency();
	    }

	    return currency.to_human();
	  };
	});

	/**
	 * Get the currency issuer.
	 */
	module.filter('rpissuer', function () {
	  return function (input) {
	    if (!input) return "";

	    var amount = Amount.from_json(input);
	    return amount.issuer().to_json();
	  };
	});

	/**
	 * Get the full currency name from an Amount.
	 */
	module.filter('rpcurrencyfull', ['$rootScope', function ($scope) {
	  return function (input) {
	    if (!input) return "";

	    var amount = Amount.from_json(input);
	    var currency = $.grep($scope.currencies_all, function(e){ return e.value == amount.currency().to_human(); })[0];

	    if (currency) {
	      return currency.name;
	    } else {
	      return amount.currency().to_human();
	    }
	  };
	}]);

	/**
	 * Calculate a ratio of two Amounts.
	 */
	module.filter('rpamountratio', function () {
	  return function (numerator, denominator) {
	    try {
	      return Amount.from_json(numerator).ratio_human(denominator, {reference_date: new Date()});
	    } catch (err) {
	      return Amount.NaN();
	    }
	  };
	});

	/**
	 * Calculate the sum of two Amounts.
	 */
	module.filter('rpamountadd', function () {
	  return function (a, b) {
	    try {
	      b = Amount.from_json(b);
	      if (b.is_zero()) return a;
	      return Amount.from_json(a).add(b);
	    } catch (err) {
	      return Amount.NaN();
	    }
	  };
	});
	/**
	 * Calculate the difference of two Amounts.
	 */
	module.filter('rpamountsubtract', function () {
	  return function (a, b) {
	    try {
	      return Amount.from_json(a).subtract(b);
	    } catch (err) {
	      return Amount.NaN();
	    }
	  };
	});

	/**
	 * Angular filter for Moment.js.
	 *
	 * Displays a timestamp as "x minutes ago".
	 */
	var momentCache = {};

	module.filter('rpfromnow', function () {
	  return function (input) {
	    // This is an expensive function, cache it
	    if (!momentCache[input]) momentCache[input] = moment(input).fromNow();

	    return momentCache[input];
	  };
	});

	/**
	 * Show Ripple Name
	 *
	 * Shows a ripple name for a given ripple address
	 */
	module.filter("rpripplename", ['$rootScope', '$http', function($scope, $http) {
	  var resolvedNames = [],
	    serviceInvoked = [];

	  function realFilter(address) {
	    return resolvedNames[address];
	  }

	  return function(address, options) {
	    var strippedValue = webutil.stripRippleAddress(address);
	    var rpAddress = ripple.UInt160.from_json(address);
	    if (!rpAddress.is_valid()) return address;

	    var opts = jQuery.extend(true, {}, options);

	    if(!resolvedNames[address]) {
	      if(!serviceInvoked[address]) {
	        serviceInvoked[address] = true;

	        // Get the blobvault url
	        ripple.AuthInfo.get(Options.domain, "1", function(err, authInfo) {
	          if (err) {
	            console.log("Can't get the authinfo", err);
	          }

	          // Get the user
	          $http.get(authInfo.blobvault + '/v1/user/' + address)
	            .success(function(data) {
	              if (data.username) {
	                if (opts.tilde === true) {
	                  resolvedNames[address] = "~".concat(data.username);
	                } else {
	                  resolvedNames[address] = data.username;
	                }
	              } else {
	                // Show the ripple address if there's no name associated with it
	                resolvedNames[address] = address;
	              }
	            })
	            .error(function(err){
	              console.log("Can't get the blobvault", err);
	            });
	        });
	      }
	      return address;
	    }
	    else return realFilter(address);
	  };
	}]);

	/**
	 * Show contact name or short address
	 */
	module.filter('rpcontactname', ['$rootScope', function ($scope) {
	  return function (address) {
	    address = address ? ""+address : "";

	    var contact = webutil.getContact($scope.userBlob.data.contacts, address);

	    if (!contact) {
	      //return "" + address.substring(0,7) + "…";
	      return address;
	    }

	    return contact.name;
	  };
	}]);

	module.filter('rpcontactnamefull', ['$rootScope', function ($scope) {
	  return function (address) {
	    address = address ? ""+address : "";
	    var contact = webutil.getContact($scope.userBlob.data.contacts, address);

	    if (!contact) {
	      return "" + address;
	    }

	    return contact.name;
	  };
	}]);

	module.filter('rponlycontactname', ['$rootScope', function ($scope) {
	  return function (address) {
	    address = address ? ""+address : "";

	    var contact = webutil.getContact($scope.userBlob.data.contacts, address);

	    if (contact) {
	      return contact.name;
	    }
	  };
	}]);

	/**
	 * Masks a string like so: •••••.
	 *
	 * The number of the bullets will correspond to the length of the string.
	 */
	module.filter('rpmask', function () {
	  return function (pass) {
	    pass = ""+pass;
	    return Array(pass.length+1).join("•");
	  };
	});

	/**
	 * Crops a string to len characters
	 *
	 * The number of the bullets will correspond to the length of the string.
	 */
	module.filter('rptruncate', function () {
	  return function (str, len) {
	    return str ? str.slice(0, len) : '';
	  };
	});

	/**
	 * Format a file size.
	 *
	 * Based on code by aioobe @ StackOverflow.
	 * @see http://stackoverflow.com/questions/3758606
	 */
	module.filter('rpfilesize', function () {
	  function number_format( number, decimals, dec_point, thousands_sep ) {
	    // http://kevin.vanzonneveld.net
	    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +     bugfix by: Michael White (http://crestidg.com)
	    // +     bugfix by: Benjamin Lupton
	    // +     bugfix by: Allan Jensen (http://www.winternet.no)
	    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	    // *     example 1: number_format(1234.5678, 2, '.', '');
	    // *     returns 1: 1234.57

	    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
	    var d = dec_point === undefined ? "," : dec_point;
	    var t = thousands_sep === undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
	    var i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "", j = (j = i.length) > 3 ? j % 3 : 0;

	    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	  }

	  // SI (International System of Units)
	  // e.g. 1000 bytes = 1 kB
	  var unit = 1000;
	  var prefixes = "kMGTPE";
	  var common = "B";

	  // Binary system
	  // e.g. 1024 bytes = 1 KiB
	  //var unit = 1024
	  //var prefixes = "KMGTPE";
	  //var common = "iB";

	  return function (str) {
	    var bytes = +str;
	    if (bytes < unit) return bytes + " B";
	    var exp = Math.floor(Math.log(bytes) / Math.log(unit));
	    var pre = " "+prefixes[exp-1] + common;
	    return number_format(bytes / Math.pow(unit, exp), 2, '.', '')+pre;
	  };
	});

	/**
	 * Uppercase the first letter.
	 */
	module.filter('rpucfirst', function () {
	  return function (str) {
	    str = ""+str;
	    return str.charAt(0).toUpperCase() + str.slice(1);
	  };
	});

	/**
	 * Something similar to javascript for loop
	 *
	 * Usage
	 * Example1 : ng-repeat="n in [20] | rprange"
	 * Example2 : ng-repeat="n in [10, 35] | rprange"
	 */
	module.filter('rprange', function() {
	  return function(input) {
	    var lowBound, highBound;
	    switch (input.length) {
	      case 1:
	        lowBound = 0;
	        highBound = parseInt(input[0], 10) - 1;
	        break;
	      case 2:
	        lowBound = parseInt(input[0], 10);
	        highBound = parseInt(input[1], 10);
	        break;
	      default:
	        return input;
	    }
	    var result = [];
	    for (var i = lowBound; i <= highBound; i++)
	      result.push(i);
	    return result;
	  };
	});

	module.filter('rpaddressorigin', function() {
	  return function(recipient) {
	    return !isNaN(Base.decode_check([0, 5], recipient, 'bitcoin')) ? 'bitcoin' : 'ripple';
	  };
	});

	module.filter('rpheavynormalize', function () {
	  return function (value, maxLength) {
	    return String(value)
	      // Remove non-printable and non-ASCII characters
	      .replace(/[^ -~]/g, '')
	      // Enforce character limit
	      .substr(0, maxLength || 160)
	      // Remove leading whitespace
	      .replace(/^\s+/g, '')
	      // Remove trailing whitespace
	      .replace(/\s+$/g, '')
	      // Normalize all other whitespace
	      .replace(/\s+/g, ' ');
	  };
	});


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var globals = angular.module('app.globals', []);

	/*
	We want to be able to inject mocks into tests with dependencies on these globals
	*/

	// deps/js/store.js
	globals.constant('store', store);
	// config.js
	globals.constant('Options', Options);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ID
	 *
	 * The id service is used for user identification and authorization.
	 */

	var util = __webpack_require__(102),
	    Base58Utils = __webpack_require__(65),
	    RippleAddress = __webpack_require__(1).RippleAddress;

	var module = angular.module('id', ['authflow', 'blob', 'oldblob']);

	module.factory('rpId', ['$rootScope', '$location', '$route', '$routeParams', '$timeout',
	                        'rpAuthFlow', 'rpBlob', 'rpOldBlob',
	                        function($scope, $location, $route, $routeParams, $timeout,
	                                 $authflow, $blob, $oldblob)
	{
	  /**
	   * Identity manager
	   *
	   * This class manages the encrypted blob and all user-specific state.
	   */
	  var Id = function ()
	  {
	    this.account = null;
	    this.loginStatus = false;
	  };

	  // This object defines the minimum structure of the blob.
	  //
	  // This is used to ensure that the blob we get from the server has at least
	  // these fields and that they are of the right types.
	  Id.minimumBlob = {
	    data: {
	      contacts: [],
	      preferred_issuer: {},
	      preferred_second_issuer: {}
	    },
	    meta: []
	  };

	  // The default blob is the blob that a new user gets.
	  //
	  // Right now this is equal to the minimum blob, but we may define certain
	  // default values here in the future.
	  Id.defaultBlob = Id.minimumBlob;

	  /**
	   * Reduce username to standardized form.
	   *
	   * This creates the version of the username that is displayed in the UI.
	   */
	  Id.normalizeUsernameForDisplay = function (username) {
	    username = ""+username;

	    // Strips whitespace at beginning and end.
	    username = username.trim();

	    return username;
	  };

	  /**
	   * Reduce username to standardized form.
	   *
	   * This version is used in the login system and it's the version sent to
	   * servers.
	   */
	  Id.normalizeUsernameForInternals = function (username) {
	    username = ""+username;

	    // Strips whitespace at beginning and end.
	    username = username.trim();

	    // Remove hyphens
	    username = username.replace(/-/g, '');

	    // All lowercase
	    username = username.toLowerCase();

	    return username;
	  };

	  /**
	   * Reduce username to the oldBlob standardized form.
	   *
	   * This version is used in the login system and it's the version sent to
	   * servers.
	   */
	  Id.normalizeUsernameForOldBlob = function (username) {
	    // The old blob does not remove hyphens

	    username = ""+username;

	    // Strips whitespace at beginning and end.
	    username = username.trim();

	    // All lowercase
	    username = username.toLowerCase();

	    return username;
	  };

	  /**
	   * Reduce password to standardized form.
	   *
	   * Strips whitespace at beginning and end.
	   */
	  Id.normalizePassword = function (password) {
	    password = ""+password;
	    password = password.trim();
	    return password;
	  };

	  Id.prototype.init = function ()
	  {
	    var self = this;

	    // Initializing sjcl.random doesn't really belong here, but there is no other
	    // good place for it yet.
	    for (var i = 0; i < 8; i++) {
	      sjcl.random.addEntropy(Math.random(), 32, "Math.random()");
	    }

	    $scope.userBlob = Id.defaultBlob;
	    $scope.userCredentials = {};

	    $scope.$watch('userBlob',function(){
	      // XXX Maybe the blob service should handle this stuff?
	      $scope.$broadcast('$blobUpdate');

	      // XXX What's the equivalent in the new login API?
	      /*
	      if (self.username && self.password) {
	        $oldblob.set(...,
	                  self.username.toLowerCase(), self.password,
	                  $scope.userBlob,function(){
	                    $scope.$broadcast('$blobSave');
	                  });
	      }
	      */
	    },true);

	    $scope.$on('$blobUpdate', function(){
	      // Account address
	      if (!$scope.address && $scope.userBlob.data.account_id) {
	        $scope.address = $scope.userBlob.data.account_id;
	      }
	    });

	    if (!!store.get('ripple_auth')) {
	      
	      self.relogin(function(err, blob) {
	        if (!blob) {
	          self.logout();  
	          $location.path('/login');
	        }
	      });
	    }

	    $(window).bind('storage', function (e) {
	      // http://stackoverflow.com/questions/18476564/ie-localstorage-event-misfired
	      if (document.hasFocus()) return;

	      if (e.originalEvent.key == 'ripple_auth' && e.originalEvent.oldValue && !e.originalEvent.newValue) {
	        $timeout(function(){ $scope.$broadcast('$idRemoteLogout'); }, 0);
	      }

	      if (e.originalEvent.key == 'ripple_auth' && !e.originalEvent.oldValue && e.originalEvent.newValue) {
	        $timeout(function(){ $scope.$broadcast('$idRemoteLogin'); }, 0);
	      }
	    });
	  };

	  Id.prototype.setUsername = function (username)
	  {
	    this.username = username;
	    $scope.userCredentials.username = username;
	    $scope.$broadcast('$idUserChange', {username: username});
	  };

	  Id.prototype.setAccount = function (accId)
	  {
	    if (this.account !== null) {
	      $scope.$broadcast('$idAccountUnload', {account: accId});
	    }
	    this.account = accId;
	    $scope.userCredentials.account = accId;
	    $scope.$broadcast('$idAccountLoad', {account: accId});
	  };

	  Id.prototype.setLoginKeys = function (keys)
	  {
	    this.keys = keys;
	  };

	  Id.prototype.isReturning = function ()
	  {
	    return !!store.get('ripple_known');
	  };

	  Id.prototype.isLoggedIn = function ()
	  {
	    return this.loginStatus;
	  };

	  Id.prototype.storeLoginKeys = function (url, username, keys)
	  {
	    store.set('ripple_auth', {url:url, username: username, keys: keys});
	  };

	  Id.prototype.verify = function (opts, callback) {
	    $authflow.verify(opts, callback);
	  };

	  Id.prototype.resendEmail = function (opts, callback) {
	    $authflow.resendEmail(opts, callback);
	  };

	  Id.prototype.rename = function (opts, callback) {
	    opts.blob = $scope.userBlob;
	    opts.url = $scope.userBlob.url;
	    opts.username = this.username;

	    $authflow.rename(opts, callback);
	  };

	  Id.prototype.register = function (opts, callback)
	  {
	    var self = this;

	    // If account master key is not present, generate one
	    var masterkey = !!opts.masterkey
	      ? opts.masterkey
	      : Base58Utils.encode_base_check(33, sjcl.codec.bytes.fromBits(sjcl.random.randomWords(4)));

	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    // Username is empty for the desktop client
	    if (!opts.username) opts.username = 'local';

	    // Blob data
	    var username = Id.normalizeUsernameForDisplay(opts.username);
	    var password = Id.normalizePassword(opts.password);
	    var account  = (new RippleAddress(masterkey)).getAddress();

	    $authflow.register({
	      'username': username,
	      'password': password,
	      'account': account,
	      'email': opts.email,
	      'masterkey': masterkey,
	      'oldUserBlob': opts.oldUserBlob,
	      'walletfile': opts.walletfile
	    },
	    function (err, blob, keys) {
	      if (err) {
	        console.log("client: id: registration failed:", (err && err.stack) ? err.stack : err);
	        callback(err);
	        return;
	      }

	      $scope.userBlob = blob;

	      self.setUsername(username);

	//      self.setAccount(blob.data.account_id);
	//      self.setLoginKeys(keys);
	//      self.storeLoginKeys(username, keys);
	//      self.loginStatus = true;
	//      $scope.$broadcast('$blobUpdate');

	      if ('desktop' === $scope.client) {
	        self.setAccount(blob.data.account_id);
	        self.loginStatus = true;
	        $scope.$broadcast('$blobUpdate');
	      }

	      // Remove old blob
	      if(Options.blobvault) {
	        $oldblob.remove(['vault', 'local'], opts.oldUsername, opts.oldPassword, function (err, data) {
	          if (err) {
	            console.log("Can't delete the old blobvault:", err);
	            return;
	          }

	          console.log('Old blob has been removed.');
	        });
	      }

	      store.set('ripple_known', true);
	      callback(null, masterkey);
	    });
	  };

	  Id.prototype.exists = function (username, password, callback)
	  {
	    var self = this;

	    username = Id.normalizeUsernameForDisplay(username);
	    password = Id.normalizePassword(password);

	    $authflow.exists(Id.normalizeUsernameForInternals(username), password, function (err, data) {
	      if (!err && data) {
	        // Blob found, new auth method
	        callback(null, true);
	      } else {
	        // No blob found
	        callback(null, false);
	      }
	    });
	  };

	  Id.prototype.oldLogin = function (opts, callback) {
	    var self = this;

	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    var username = Id.normalizeUsernameForDisplay(opts.username);
	    var password = Id.normalizePassword(opts.password);
	    var oldBlobUsername = Id.normalizeUsernameForOldBlob(username);

	    $oldblob.get(['vault'], oldBlobUsername, password, function (oerr, data) {
	//      $location.path('/register');

	      if (oerr) {
	        // Old blob failed - since this was just the fallback report the
	        // original error
	        console.log("Old backend reported:", oerr);
	        callback(oerr);
	        return;
	      }

	      var blob = $oldblob.decrypt(oldBlobUsername, password, data);
	      if (!blob) {
	        // Unable to decrypt blob
	        var msg = 'Unable to decrypt blob (Username / Password is wrong)';
	        callback(new Error(msg));
	      } else if (blob.old && !self.allowOldBlob) {
	        var oldBlobErr = new Error('Old blob format detected');
	        oldBlobErr.name = "OldBlobError";
	        callback(oldBlobErr);
	      } else {
	        // Migration

	        $scope.oldUserBlob = blob;
	        $scope.oldUsername = oldBlobUsername;
	        $scope.oldPassword = password;
	        $location.path('/register');

	        return;
	      }
	    });
	  };

	  Id.prototype.login = function (opts, callback)
	  {
	    var self = this;

	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    var username = Id.normalizeUsernameForDisplay(opts.username);
	    var password = Id.normalizePassword(opts.password);
	    var deviceID = opts.device_id || store.get('device_id');

	    $authflow.login({
	      'username': Id.normalizeUsernameForInternals(username),
	      'password': password,
	      'walletfile': opts.walletfile,
	      'device_id' : deviceID
	    }, function (err, blob, keys, actualUsername, emailVerified) {
	      
	      //handle 2FA
	      if (err && err.twofactor) {
	 
	        //request verification token. If they are using the
	        //app, the request will be ignored.
	        $authflow.requestToken(err.twofactor.blob_url, err.twofactor.blob_id, false, function(tokenError, tokenResp) {
	          
	          //keep this for reporting
	          err.twofactor.tokenError    = tokenError; 
	          err.twofactor.tokenResponse = tokenResp;
	          return callback(err);
	        });
	        
	      } else if (err) {
	        // New login protocol failed and no fallback configured
	        callback(err);
	      } else {
	        // Ensure certain properties exist
	        $.extend(true, blob, Id.minimumBlob);

	        // Ripple's username system persists the capitalization of the username,
	        // even though usernames are case-insensitive. That's why we want to use
	        // the "actualUsername" that the server returned.
	        //
	        // However, we want this to never be a source for problems, so we'll
	        // ensure the actualUsername returned is equivalent to what we expected
	        // and fall back to what the user entered otherwise.
	        if ("string" !== typeof actualUsername ||
	            Id.normalizeUsernameForInternals(actualUsername) !== Id.normalizeUsernameForInternals(username)) {
	          actualUsername = username;
	        }

	        $scope.userBlob = blob;
	        self.setUsername(actualUsername);

	        if (!emailVerified) {
	          $scope.unverified = true;
	          $location.path('/register');

	          callback(new Error("Email has not been verified!"));
	          return;
	        }

	        self.setAccount(blob.data.account_id);
	        self.setLoginKeys(keys);
	        self.storeLoginKeys(blob.url, actualUsername, keys);
	        store.set('device_id', blob.device_id);
	        self.loginStatus = true;
	        $scope.$broadcast('$blobUpdate');
	        store.set('ripple_known', true);

	        if (blob.data.account_id) {
	          // Success
	          callback(null);
	        } else {
	          // Invalid blob
	          callback(new Error("Blob format unrecognized!"));
	        }
	      }
	    });
	  };
	  
	  Id.prototype.relogin = function (callback) {
	    var self     = this;
	    var auth     = store.get('ripple_auth');
	    var deviceID = store.get('device_id');
	    if (!auth || !auth.keys) {
	      return callback(new Error('Missing authentication keys'));
	    }
	    
	    // XXX This is technically not correct, since we don't know yet whether
	    //     the login will succeed. But we need to set it now, because the page
	    //     controller will likely query it long before we get a response from
	    //     the login system.
	    //
	    //     Will work fine as long as any relogin error triggers a logout and
	    //     logouts trigger a full page reload.
	    self.loginStatus = true;    
	    
	    $authflow.relogin(auth.url, auth.keys, deviceID, function (err, blob) {
	      
	      if (err) {
	        
	        // Failed to relogin
	        console.log("client: id: failed to relogin:", err.message || err.toString());
	        callback(err);        
	        
	      } else {
	        // Ensure certain properties exist
	        $.extend(true, blob, Id.minimumBlob);

	        $scope.userBlob = blob;
	        self.setUsername(auth.username);
	        self.setAccount(blob.data.account_id);
	        self.setLoginKeys(auth.keys);
	        self.loginStatus = true;
	        $scope.$broadcast('$blobUpdate');
	        store.set('ripple_known', true);
	        callback(null, blob);
	      }
	    });    
	  };

	  Id.prototype.verifyToken = function (options, callback) {
	    store.set('remember_me', options.remember_me);
	    $authflow.verifyToken(options, callback);    
	  }; 
	  
	  Id.prototype.changePassword = function (options, callback) {
	    var self = this;
	    
	    $authflow.changePassword(options, function(err, resp) {  
	      
	      if (err) {
	        return callback(err);
	      }
	      
	      //NOTE: the section below changed so that you can recover with 2FA enabled
	      //We should be checking attestation statuses here also.
	      
	      //perform login, so that the email verification is checked
	      //and the username, blob, and keys get stored.
	      //self.login(options, callback); 
	      
	      var keys = {id:options.blob.id,crypt:options.blob.key};
	      
	      $scope.userBlob = options.blob;
	      self.setUsername(options.username);
	      self.setAccount(options.blob.data.account_id);
	      self.setLoginKeys(keys);
	      self.storeLoginKeys(options.blob.url, options.username, keys);
	      store.set('device_id', options.blob.device_id);
	      self.loginStatus = true;
	      $scope.$broadcast('$blobUpdate');
	      store.set('ripple_known', true);  
	      callback();          
	    });
	  };
	  
	  Id.prototype.logout = function ()
	  {
	    store.remove('ripple_auth');

	    //remove deviceID if remember me is not set
	    if (!store.get('remember_me')) {
	      store.remove('device_id');  
	    }
	    
	    // TODO make it better
	    this.account = '';
	    this.keys = {};
	    this.loginStatus = false;
	    this.username = '';

	    $scope.address = '';
	//    $location.path('/login');

	    // problem?
	    // reload will not work, as some pages are also available for guests.
	    // Logout will show the same page instead of showing login page.
	    // This line redirects user to root (login) page
	//    var port = location.port.length > 0 ? ":" + location.port : "";
	//    location.href = location.protocol + '//' + location.hostname  + port + location.pathname;
	  };

	  Id.prototype.unlock = function (username, password, callback)
	  {
	    var self = this;

	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    //username = Id.normalizeUsernameForDisplay(username);
	    //password = Id.normalizePassword(password);

	    $authflow.unlock(username, password, function (err, resp) {
	      if (err) {
	        callback(err);
	        return;
	      }
	    
	      callback(null, resp.secret);
	    });
	  };

	  /**
	   * Go to an identity page.
	   *
	   * Redirects the user to a page where they can identify. This could be the
	   * login or register tab most likely.
	   */
	  Id.prototype.goId = function () {
	    if (!this.isLoggedIn()) {
	      if (_.size($routeParams)) {
	        var tab = $route.current.tabName;
	        $location.search('tab', tab);
	        $location.path('/login');
	        return;
	      }

	      if (this.isReturning()) {
	        $location.path('/login');
	      } else {
	        $location.path('/register');
	      }
	    }
	  };

	  return new Id();
	}]);




/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Event tracker (analytics)
	 */

	var module = angular.module('tracker', []);

	module.factory('rpTracker', ['$rootScope', function ($scope)
	{
	  // Identify user
	  var removeBlobUpdateListener = $scope.$on('$blobUpdate', function(){
	    if (!$scope.userCredentials.username)
	      return;

	    try {
	      mixpanel.identify($scope.userCredentials.username);
	      mixpanel.people.set({
	        $username: $scope.userCredentials.username,
	        $name: $scope.userCredentials.username,
	        "Ripple Address": $scope.address
	      });

	      removeBlobUpdateListener();
	    } catch (ex) {
	      // This probably means the browser is blocking us
	      // or mixpanel is down
	      console.log('Mixpanel tracking failed', ex);
	    }
	  });

	  var track = function (event,properties) {
	    if (Options.mixpanel && Options.mixpanel.track && window.mixpanel) {
	      try {
	        mixpanel.track(event,properties);
	      } catch (ex) {
	        // This probably means the browser is blocking us
	        // or mixpanel is down
	        console.log('Mixpanel tracking failed', ex);
	      }
	    }
	  };

	  var trackError = function (eventName, errorObject, additionalProperties) {
	    if (errorObject && 'object' === typeof errorObject) {
	      errorObject = {
	        Name: errorObject.name,
	        Message: errorObject.message,
	        Stack: errorObject.stack
	      };
	    } else {
	      errorObject = {
	        Name: 'NonErrorThrownValue',
	        Message: 'Not an Error object: ' + errorObject,
	        Stack: ''
	      };
	    }

	    if (additionalProperties) {
	      angular.extend(errorObject, additionalProperties);
	    }

	    track(eventName, errorObject);
	  };

	  return {
	    track: track,
	    trackError: trackError
	  };
	}]);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * BLOB
	 *
	 * User blob storage service
	 */

	// TODO build a blobPrototype.
	// There's currently a code repetition between blobLocal and blobRemote..

	var webutil = __webpack_require__(66);

	var module = angular.module('blob', []);

	module.factory('rpBlob', ['$rootScope', '$http', function ($scope, $http)
	{
	  var BlobObj = function (url, id, key)
	  {
	    this.url = url;
	    this.id = id;
	    this.key = key;
	    this.data = {};
	  };

	  // Blob operations
	  // Do NOT change the mapping of existing ops
	  BlobObj.ops = {
	    // Special
	    "noop": 0,

	    // Simple ops
	    "set": 16,
	    "unset": 17,
	    "extend": 18,

	    // Meta ops
	    "push": 32,
	    "pop": 33,
	    "shift": 34,
	    "unshift": 35,
	    "filter": 36
	  };

	  BlobObj.opsReverseMap = [];
	  $.each(BlobObj.ops, function (name, code) {
	    BlobObj.opsReverseMap[code] = name;
	  });

	  /**
	   * Attempts to retrieve the blob.
	   */
	  BlobObj.get = function(url, id, callback)
	  {
	    if (url.indexOf("://") === -1) url = "http://" + url;

	    $.ajax({
	      url: url + '/v1/blob/' + id,
	      dataType: 'json',
	      timeout: 8000
	    })
	      .success(function (data) {
	        setImmediate(function () {
	          $scope.$apply(function () {
	            if (data.result === "success") {
	              callback(null, data);
	            } else {
	              callback(new Error("Incorrect Ripple name or password."));
	            }
	          });
	        });
	      })
	      .error(webutil.getAjaxErrorHandler(callback, "BlobVault GET"));
	  };

	  /**
	   * Attempts to retrieve and decrypt the blob.
	   */
	  BlobObj.init = function(url, id, crypt, callback)
	  {
	    BlobObj.get(url, id, function (err, data) {
	      if (err) {
	        callback(err);
	        return;
	      }

	      var blob = new BlobObj(url, id, crypt);

	      blob.revision = data.revision;

	      // HOTFIX: Workaround for blobvault sending encrypted_secret in incorrect format
	      if (Array.isArray(data.encrypted_secret)) {
	        data.encrypted_secret = sjcl.codec.utf8String.fromBits(sjcl.codec.bytes.toBits(data.encrypted_secret));
	      }
	      blob.encrypted_secret = data.encrypted_secret;

	      if (!blob.decrypt(data.blob)) {
	        callback(new Error("Error while decrypting blob"));
	      }

	      // Apply patches
	      if ($.isArray(data.patches) && data.patches.length) {
	        var successful = true;
	        $.each(data.patches, function (i, patch) {
	          successful = successful && blob.applyEncryptedPatch(patch);
	        });

	        if (successful) blob.consolidate();
	      }

	      // HOTFIX: Workaround for old staging accounts that have the secret stored in the blob
	      //         This is NOT needed for any production accounts and will be removed in the future.
	      if (blob.encrypted_secret === "" &&
	          "object" === typeof blob.data &&
	          "string" === typeof blob.data.encrypted_secret) {
	        blob.encrypted_secret = blob.data.encrypted_secret;
	      }

	      callback(null, blob);
	    });
	  };

	  /**
	   * Create a blob object
	   *
	   * @param {object} opts
	   * @param {string} opts.url
	   * @param {string} opts.id
	   * @param opts.crypt
	   * @param opts.unlock
	   * @param {string} opts.username
	   * @param {string} opts.account
	   * @param {string} opts.masterkey
	   * @param {object=} opts.oldUserBlob
	   * @param {function} callback
	   */
	  BlobObj.create = function (opts, callback)
	  {
	    var blob = new BlobObj(opts.url, opts.id, opts.crypt);
	    var encryptedSecret = blob.encryptSecret(opts.unlock, opts.masterkey);

	    blob.revision = 0;
	    blob.data = {
	      auth_secret: sjcl.codec.hex.fromBits(sjcl.random.randomWords(8)),
	      account_id: opts.account,
	      email: opts.email,
	      contacts: [],
	      created: (new Date()).toJSON()
	    };
	    blob.encrypted_secret = encryptedSecret;

	    // Migration
	    if (opts.oldUserBlob) {
	      blob.data.contacts = opts.oldUserBlob.data.contacts;
	    }

	    var config = {
	      method: "POST",
	      url: opts.url + '/v1/user',
	      data: {
	        blob_id: opts.id,
	        username: opts.username,
	        address: opts.account,
	        auth_secret: blob.data.auth_secret,
	        data: blob.encrypt(),
	        email: opts.email,
	        hostlink: Options.activate_link,
	        encrypted_blobdecrypt_key: blob.encryptBlobCrypt(opts.masterkey, opts.crypt),
	        encrypted_secret: encryptedSecret
	      }
	    };

	    $http(BlobObj.signRequestAsymmetric(config, opts.masterkey, opts.account, opts.id))
	    .success(function (data) {
	      if (data.result === "success") {
	        callback(null, blob, data);
	      } else {
	        callback(new Error("Could not create blob"));
	      }
	    })
	//    .error(webutil.getAjaxErrorHandler(callback, "BlobVault POST /v1/user"));
	    .error(function(err){
	      console.log('err',err);
	    });
	  };

	  BlobObj.verify = function (opts, callback) {
	    $http({
	      method: 'GET',
	      url: opts.url + '/v1/user/' + opts.username + '/verify/' + opts.token
	    })
	    .success(function(data, status, headers, config) {
	      if (data.result === "success") {
	        callback(null, data);
	      } else {
	        console.log("client: blob: could not verify:", data);
	        callback(new Error("Failed to verify the account"));
	      }
	    })
	    .error(function(data, status, headers, config) {
	      console.log("client: blob: could not verify: "+status+" - "+data);
	      callback(new Error("Failed to verify the account - XHR error"));
	    });
	  };

	  BlobObj.prototype.resendEmail = function (opts, callback) {
	    var config = {
	      method: 'POST',
	      url: opts.url + '/v1/user/email',
	      responseType: 'json',
	      data: {
	        blob_id: this.id,
	        username: opts.username,
	        email: opts.email,
	        hostlink: Options.activate_link
	      }
	    };

	    $http(BlobObj.signRequestAsymmetric(config, opts.masterkey, this.data.account_id, this.id))
	      .success(function(data, status, headers, config) {
	        if (data.result === "success") {
	          callback(null, data);
	        } else {
	          console.log("client: blob: could not resend the token:", data);
	          callback(new Error("Failed to resend the token"));
	        }
	      })
	      .error(function(data, status, headers, config) {
	        console.log("client: blob: could not resend the token:", data);
	        callback(new Error("Failed to resend the token"));
	      });
	  };

	  var cryptConfig = {
	    cipher: "aes",
	    mode: "ccm",
	    // tag length
	    ts: 64,
	    // key size
	    ks: 256,
	    // iterations (key derivation)
	    iter: 1000
	  };

	  function encrypt(key, data)
	  {
	    key = sjcl.codec.hex.toBits(key);

	    var opts = $.extend({}, cryptConfig);

	    var encryptedObj = JSON.parse(sjcl.encrypt(key, data, opts));

	    var version = [sjcl.bitArray.partial(8, 0)];
	    var initVector = sjcl.codec.base64.toBits(encryptedObj.iv);
	    var ciphertext = sjcl.codec.base64.toBits(encryptedObj.ct);

	    var encryptedBits = sjcl.bitArray.concat(version, initVector);
	    encryptedBits = sjcl.bitArray.concat(encryptedBits, ciphertext);

	    return sjcl.codec.base64.fromBits(encryptedBits);
	  }

	  function decrypt(key, data)
	  {
	    key = sjcl.codec.hex.toBits(key);
	    var encryptedBits = sjcl.codec.base64.toBits(data);

	    var version = sjcl.bitArray.extract(encryptedBits, 0, 8);

	    if (version !== 0) {
	      throw new Error("Unsupported encryption version: "+version);
	    }

	    var encrypted = $.extend({}, cryptConfig, {
	      iv: sjcl.codec.base64.fromBits(sjcl.bitArray.bitSlice(encryptedBits, 8, 8+128)),
	      ct: sjcl.codec.base64.fromBits(sjcl.bitArray.bitSlice(encryptedBits, 8+128))
	    });

	    return sjcl.decrypt(key, JSON.stringify(encrypted));
	  }

	  BlobObj.prototype.encrypt = function()
	  {
	    // Filter Angular metadata before encryption
	    if ('object' === typeof this.data &&
	        'object' === typeof this.data.contacts)
	      this.data.contacts = angular.fromJson(angular.toJson(this.data.contacts));

	    var key = sjcl.codec.hex.toBits(this.key);

	    return encrypt(this.key, JSON.stringify(this.data));
	  };

	  BlobObj.prototype.decrypt = function (data)
	  {
	    try {
	      this.data = JSON.parse(decrypt(this.key, data));
	      return this;
	    } catch (e) {
	      console.log("client: blob: decryption failed", e.toString());
	      console.log(e.stack);
	      return false;
	    }
	  };

	  BlobObj.prototype.applyEncryptedPatch = function (patch)
	  {
	    try {
	      var params = JSON.parse(decrypt(this.key, patch));
	      var op = params.shift();
	      var path = params.shift();

	      this.applyUpdate(op, path, params);

	      this.revision++;

	      return true;
	    } catch (err) {
	      console.log("client: blob: failed to apply patch:", err.toString());
	      console.log(err.stack);
	      return false;
	    }
	  };

	  BlobObj.prototype.consolidate = function (callback) {
	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    console.log("client: blob: consolidation at revision", this.revision);
	    var encrypted = this.encrypt();

	    var config = {
	      method: 'POST',
	      url: this.url + '/v1/blob/consolidate',
	      responseType: 'json',
	      data: {
	        blob_id: this.id,
	        data: encrypted,
	        revision: this.revision
	      }
	    };

	    $http(BlobObj.signRequestHmac(config, this.data.auth_secret, this.id))
	      .success(function(data, status, headers, config) {
	        if (data.result === "success") {
	          callback(null, data);
	        } else {
	          console.log("client: blob: could not consolidate:", data);
	          callback(new Error("Failed to consolidate blob"));
	        }
	      })
	      .error(function(data, status, headers, config) {
	        console.log("client: blob: could not consolidate: "+status+" - "+data);

	        // XXX Add better error information to exception
	        callback(new Error("Failed to consolidate blob - XHR error"));
	      });
	  };

	  BlobObj.escapeToken = function (token) {
	    return token.replace(/[~\/]/g, function (key) { return key === "~" ? "~0" : "~1"; });
	  };
	  BlobObj.prototype.escapeToken = BlobObj.escapeToken;

	  var unescapeToken = function(str) {
	    return str.replace(/~./g, function(m) {
	      switch (m) {
	      case "~0":
	        return "~";
	      case "~1":
	        return "/";
	      }
	      throw("Invalid tilde escape: " + m);
	    });
	  };

	  BlobObj.prototype.applyUpdate = function (op, path, params) {
	    // Exchange from numeric op code to string
	    if ("number" === typeof op) {
	      op = BlobObj.opsReverseMap[op];
	    }
	    if ("string" !== typeof op) {
	      throw new Error("Blob update op code must be a number or a valid op id string");
	    }

	    // Separate each step in the "pointer"
	    var pointer = path.split("/");

	    var first = pointer.shift();
	    if (first !== "") {
	      throw new Error("Invalid JSON pointer: "+path);
	    }

	    this._traverse(this.data, pointer, path, op, params);
	  };

	  BlobObj.prototype._traverse = function (context, pointer,
	                                          originalPointer, op, params) {
	    var _this = this;
	    var part = unescapeToken(pointer.shift());

	    if (Array.isArray(context)) {
	      if (part === '-') {
	        part = context.length;
	      } else if (part % 1 !== 0 && part >= 0) {
	        throw new Error("Invalid pointer, array element segments must be " +
	                        "a positive integer, zero or '-'");
	      }
	    } else if ("object" !== typeof context) {
	      return null;
	    } else if (!context.hasOwnProperty(part)) {
	      // Some opcodes create the path as they're going along
	      if (op === "set") {
	        context[part] = {};
	      } else if (op === "unshift") {
	        context[part] = [];
	      } else {
	        return null;
	      }
	    }

	    if (pointer.length !== 0) {
	      return this._traverse(context[part], pointer,
	                            originalPointer, op, params);
	    }

	    switch (op) {
	    case "set":
	      context[part] = params[0];
	      break;
	    case "unset":
	      if (Array.isArray(context)) {
	        context.splice(part, 1);
	      } else {
	        delete context[part];
	      }
	      break;
	    case "extend":
	      if ("object" !== typeof context[part]) {
	        throw new Error("Tried to extend a non-object");
	      }
	      $.extend(context[part], params[0]);
	      break;
	    case "unshift":
	      if ("undefined" === typeof context[part]) {
	        context[part] = [];
	      } else if (!Array.isArray(context[part])) {
	        throw new Error("Operator 'unshift' must be applied to an array.");
	      }
	      context[part].unshift(params[0]);
	      break;
	    case "filter":
	      if (Array.isArray(context[part])) {
	        context[part].forEach(function (element, i) {
	          if ("object" === typeof element &&
	              element.hasOwnProperty(params[0]) &&
	              element[params[0]] === params[1]) {
	            var subpointer = originalPointer+"/"+i;
	            var subcommands = normalizeSubcommands(params.slice(2));

	            subcommands.forEach(function (subcommand) {
	              var op = subcommand[0];
	              var pointer = subpointer+subcommand[1];
	              _this.applyUpdate(op, pointer, subcommand.slice(2));
	            });
	          }
	        });
	      }
	      break;
	    default:
	      throw new Error("Unsupported op "+op);
	    }
	  };

	  function copyObjectWithSortedKeys(object) {
	    if (jQuery.isPlainObject(object)) {
	      var newObj = {};
	      var keysSorted = Object.keys(object).sort();
	      var key;
	      for (var i in keysSorted) {
	        key = keysSorted[i];
	        if (Object.prototype.hasOwnProperty.call(object, key)) {
	          newObj[key] = copyObjectWithSortedKeys(object[key]);
	        }
	      }
	      return newObj;
	    } else if (jQuery.isArray(object)) {
	      return object.map(copyObjectWithSortedKeys);
	    } else {
	      return object;
	    }
	  }

	  var dateAsIso8601 = (function () {
	    function pad(n) {
	      return (n < 0 || n > 9 ? "" : "0") + n;
	    }

	    return function dateAsIso8601() {
	      var date = new Date();
	      return date.getUTCFullYear() + "-"
	        + pad(date.getUTCMonth() + 1) + "-"
	        + pad(date.getUTCDate()) + "T"
	        + pad(date.getUTCHours()) + ":"
	        + pad(date.getUTCMinutes()) + ":"
	        + pad(date.getUTCSeconds()) + ".000Z";
	    };
	  })();

	  BlobObj.getStringToSign = function (config, parser, date, mechanism) {
	    // XXX This method doesn't handle signing GET requests correctly. The data
	    //     field will be merged into the search string, not the request body.

	    // Sort the properties of the JSON object into canonical form
	    var canonicalData = JSON.stringify(copyObjectWithSortedKeys(config.data));

	    // We're using URL parsing using browser functionality. Unfortunately the
	    // parsing result slightly differs in IE - it is missing a leading slash.
	    // XXX Proper fix would be to use a pure JS URL parser.
	    var pathname = parser.pathname;

	    // IE11 Workaround
	    if (pathname[0] !== '/') pathname = '/' + pathname;

	    // Canonical request using Amazon's v4 signature format
	    // See: http://docs.aws.amazon.com/general/latest/gr/sigv4-create-canonical-request.html
	    var canonicalRequest = [
	      config.method || 'GET',
	      pathname || '',
	      parser.search || '',
	      // XXX Headers signing not supported
	      '',
	      '',
	      sjcl.codec.hex.fromBits(sjcl.hash.sha512.hash(canonicalData)).toLowerCase()
	    ].join('\n');

	    // String to sign inspired by Amazon's v4 signature format
	    // See: http://docs.aws.amazon.com/general/latest/gr/sigv4-create-string-to-sign.html
	    //
	    // We don't have a credential scope, so we skip it.
	    //
	    // But that modifies the format, so the format ID is RIPPLE1, instead of AWS4.
	    return stringToSign = [
	      mechanism,
	      date,
	      sjcl.codec.hex.fromBits(sjcl.hash.sha512.hash(canonicalRequest)).toLowerCase()
	    ].join('\n');
	  };

	  BlobObj.signRequestHmac = function (config, auth_secret, blob_id) {
	    config = $.extend({}, config);

	    // Parse URL
	    var parser = document.createElement('a');
	    parser.href = config.url;

	    var date = dateAsIso8601();
	    var signatureType = 'RIPPLE1-HMAC-SHA512';

	    var stringToSign = BlobObj.getStringToSign(config, parser, date, signatureType);

	    var hmac = new sjcl.misc.hmac(sjcl.codec.hex.toBits(auth_secret), sjcl.hash.sha512);
	    var signature = sjcl.codec.hex.fromBits(hmac.mac(stringToSign));

	    config.url += (parser.search ? "&" : "?") +
	      'signature=' + signature +
	      '&signature_date=' + date +
	      '&signature_blob_id=' + blob_id +
	      '&signature_type=' + signatureType;

	    return config;
	  };

	  BlobObj.signRequestAsymmetric = function (config, secretKey, account, blob_id) {
	    config = $.extend({}, config);

	    // Parse URL
	    var parser = document.createElement('a');
	    parser.href = config.url;

	    var date = dateAsIso8601();
	    var signatureType = 'RIPPLE1-ECDSA-SHA512';

	    var stringToSign = BlobObj.getStringToSign(config, parser, date, signatureType);

	    var signature = ripple.Message.signMessage(stringToSign, secretKey);

	    config.url += (parser.search ? "&" : "?") +
	      'signature='+webutil.base64ToBase64Url(signature)+
	      '&signature_date='+date+
	      '&signature_blob_id='+blob_id+
	      '&signature_account='+account+
	      '&signature_type='+signatureType;

	    return config;
	  };

	  BlobObj.prototype.postUpdate = function (op, pointer, params, callback) {
	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    if ("string" === typeof op) {
	      op = BlobObj.ops[op];
	    }
	    if ("number" !== typeof op) {
	      throw new Error("Blob update op code must be a number or a valid op id string");
	    }
	    if (op < 0 || op > 255) {
	      throw new Error("Blob update op code out of bounds");
	    }

	    console.log("client: blob: submitting update", BlobObj.opsReverseMap[op], pointer, params);

	    params.unshift(pointer);
	    params.unshift(op);

	    var config = {
	      method: 'POST',
	      url: this.url + '/v1/blob/patch',
	      responseType: 'json',
	      data: {
	        blob_id: this.id,
	        patch: encrypt(this.key, JSON.stringify(params))
	      }
	    };

	    $http(BlobObj.signRequestHmac(config, this.data.auth_secret, this.id))
	      .success(function(data, status, headers, config) {
	        if (data.result === "success") {
	          console.log("client: blob: saved patch as revision", data.revision);
	          callback(null, data);
	        } else {
	          console.log("client: blob: could not save patch:", data);
	          callback(new Error("Patch could not be saved - bad result"));
	        }
	      })
	      .error(function(data, status, headers, config) {
	        console.log("client: blob: could not save patch: "+status+" - "+data);
	        callback(new Error("Patch could not be saved - XHR error"));
	      });
	  };

	  BlobObj.prototype.set = function (pointer, value, callback) {
	    this.applyUpdate('set', pointer, [value]);
	    this.postUpdate('set', pointer, [value], callback);
	  };

	  BlobObj.prototype.unset = function (pointer, callback) {
	    this.applyUpdate('unset', pointer, []);
	    this.postUpdate('unset', pointer, [], callback);
	  };

	  BlobObj.prototype.extend = function (pointer, value, callback) {
	    this.applyUpdate('extend', pointer, [value]);
	    this.postUpdate('extend', pointer, [value], callback);
	  };

	  /**
	   * Prepend an entry to an array.
	   *
	   * This method adds an entry to the beginning of an array.
	   */
	  BlobObj.prototype.unshift = function (pointer, value, callback) {
	    this.applyUpdate('unshift', pointer, [value]);
	    this.postUpdate('unshift', pointer, [value], callback);
	  };

	  function normalizeSubcommands(subcommands, compress) {
	    // Normalize parameter structure
	    if ("number" === typeof subcommands[0] ||
	        "string" === typeof subcommands[0]) {
	      // Case 1: Single subcommand inline
	      subcommands = [subcommands];
	    } else if (subcommands.length === 1 &&
	               Array.isArray(subcommands[0]) &&
	               ("number" === typeof subcommands[0][0] ||
	                "string" === typeof subcommands[0][0])) {
	      // Case 2: Single subcommand as array
	      // (nothing to do)
	    } else if (Array.isArray(subcommands[0])) {
	      // Case 3: Multiple subcommands as array of arrays
	      subcommands = subcommands[0];
	    }

	    // Normalize op name and convert strings to numeric codes
	    subcommands = subcommands.map(function (subcommand) {
	      if ("string" === typeof subcommand[0]) {
	        subcommand[0] = BlobObj.ops[subcommand[0]];
	      }
	      if ("number" !== typeof subcommand[0]) {
	        throw new Error("Invalid op in subcommand");
	      }
	      if ("string" !== typeof subcommand[1]) {
	        throw new Error("Invalid path in subcommand");
	      }
	      return subcommand;
	    });

	    if (compress) {
	      // Convert to the minimal possible format
	      if (subcommands.length === 1) {
	        return subcommands[0];
	      } else {
	        return [subcommands];
	      }
	    } else {
	      return subcommands;
	    }
	  }

	  /**
	   * Filter the row(s) from an array.
	   *
	   * This method will find any entries from the array stored under `pointer` and
	   * apply the `subcommands` to each of them.
	   *
	   * The subcommands can be any commands with the pointer parameter left out.
	   */
	  BlobObj.prototype.filter = function (pointer, field, value, subcommands, callback) {
	    var params = Array.prototype.slice.apply(arguments);
	    if ("function" === typeof params[params.length-1]) {
	      callback = params.pop();
	    }
	    params.shift();

	    // Normalize subcommands to minimize the patch size
	    params = params.slice(0, 2).concat(normalizeSubcommands(params.slice(2), true));

	    this.applyUpdate('filter', pointer, params);
	    this.postUpdate('filter', pointer, params, callback);
	  };

	  BlobObj.prototype.decryptSecret = function (secretUnlockKey) {
	    return decrypt(secretUnlockKey, this.encrypted_secret);
	  };

	  BlobObj.prototype.encryptSecret = function (secretUnlockKey, secret) {
	    return encrypt(secretUnlockKey, secret);
	  };

	  function deriveRecoveryEncryptionKeyFromSecret(secret) {
	    var seed = ripple.Seed.from_json(secret).to_bits();
	    var hmac = new sjcl.misc.hmac(seed, sjcl.hash.sha512);
	    var key = hmac.mac("ripple/hmac/recovery_encryption_key/v1");
	    key = sjcl.bitArray.bitSlice(key, 0, 256);
	    return sjcl.codec.hex.fromBits(key);
	  }

	  BlobObj.prototype.decryptBlobCrypt = function (secret) {
	    var recoveryEncryptionKey = deriveRecoveryEncryptionKeyFromSecret(secret);
	    return decrypt(recoveryEncryptionKey, this.encrypted_blobdecrypt_key);
	  };

	  BlobObj.prototype.encryptBlobCrypt = function (secret, blobDecryptKey) {
	    var recoveryEncryptionKey = deriveRecoveryEncryptionKeyFromSecret(secret);
	    return encrypt(recoveryEncryptionKey, blobDecryptKey);
	  };

	  function BlobError(message, backend) {
	    this.name = "BlobError";
	    this.message = message || "";
	    this.backend = backend || "generic";
	  }

	  BlobError.prototype = Error.prototype;

	  BlobObj.BlobError = BlobError;

	  return BlobObj;
	}]);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * OLD BLOB
	 *
	 * The old blob service that used to manage the user's private information.
	 */

	var webutil = __webpack_require__(66),
	    log = __webpack_require__(67);

	var module = angular.module('oldblob', []);

	module.factory('rpOldBlob', ['$rootScope', function ($scope)
	{
	  var BlobObj = function ()
	  {
	    this.data = {};
	    this.meta = {};
	  };

	  function processBackendsParam(backends)
	  {
	    if (!Array.isArray(backends)) {
	      backends = [backends];
	    }

	    backends = backends.map(function (backend) {
	      if ("string" === typeof backend) {
	        return BlobObj.backends[backend];
	      } else {
	        return backend;
	      }
	    });

	    return backends;
	  }

	  /**
	   * Attempts to retrieve the blob from the specified backend.
	   */
	  BlobObj.get = function(backends, user, pass, callback)
	  {
	    backends = processBackendsParam(backends);

	    var backend = backends.shift();

	    var key = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(user + pass));
	    try {
	      backend.get(key, function (err, data) {
	        $scope.$apply(function () {
	          if (err) {
	            handleError(err, backend);
	            return;
	          }

	          if (data) {
	            callback(null, data);
	          } else {
	            handleError('Wallet not found (Username / Password is wrong)', backend);
	          }
	        });
	      });
	    } catch (err) {
	      handleError(err, backend);
	    }

	    function handleError(err, backend) {
	      console.warn("Backend failed:", backend.name, err.toString());
	      if ("string" === typeof err) {
	        err = new BlobError(err, backend.name);
	      } else if (!(err instanceof BlobError)) {
	        err = new BlobError(err.message, backend.name);
	      }
	      $scope.$broadcast('$blobError', err);
	      tryNext(err);
	    }

	    function tryNext(err) {
	      // Do we have more backends to try?
	      if (backends.length) {
	        BlobObj.get(backends, user, pass, callback);
	      } else {
	        callback(err);
	      }
	    }
	  };

	  BlobObj.enc = function(username,password,bl)
	  {
	    // filter out contacts before they are encrypted
	    if (typeof(bl.data.contacts) === 'object')
	      bl.data.contacts = angular.fromJson(angular.toJson(bl.data.contacts));

	    var key = ""+username.length+'|'+username+password;
	    return btoa(sjcl.encrypt(key, JSON.stringify(bl.data), {
	      iter: 1000,
	      adata: JSON.stringify(bl.meta),
	      ks: 256
	    }));
	  };

	  BlobObj.set = function(backends, username, password, bl, callback)
	  {
	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    backends = processBackendsParam(backends);

	    var hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username + password));
	    var encData = BlobObj.enc(username, password, bl);

	    backends.forEach(function (backend) {
	      backend.set(hash, encData, callback);
	    });
	  };

	  BlobObj.remove = function(backends, username, password, callback)
	  {
	    // Callback is optional
	    if ("function" !== typeof callback) callback = $.noop;

	    backends = processBackendsParam(backends);

	    var hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username + password));

	    backends.forEach(function (backend) {
	      backend.set(hash, '.', callback);
	    });
	  };

	  BlobObj.decrypt = function (user, pass, data)
	  {
	    function decrypt(priv, ciphertext)
	    {
	      var blob = new BlobObj();
	      blob.data = JSON.parse(sjcl.decrypt(priv, ciphertext));
	      // TODO unescape is deprecated
	      blob.meta = JSON.parse(unescape(JSON.parse(ciphertext).adata));
	      return blob;
	    }

	    var key;
	    try {
	      // Try new-style key
	      key = ""+user.length+'|'+user+pass;
	      return decrypt(key, atob(data));
	    } catch (e1) {
	      console.log("Blob decryption failed with new-style key:", e1.toString());
	      try {
	        // Try old style key
	        key = user+pass;
	        var blob = decrypt(key, atob(data));
	        blob.old = true;
	        return blob;
	      } catch (e2) {
	        console.log("Blob decryption failed with old-style key:", e2.toString());
	        return false;
	      }
	    }
	  };

	  var VaultBlobBackend = {
	    name: "Payward",

	    get: function (key, callback) {
	      var url = Options.blobvault;

	      if (url.indexOf("://") === -1) url = "http://" + url;

	      $.ajax({
	        url: url + '/' + key,
	        timeout: 8000
	      })
	        .success(function (data) {
	          callback(null, data);
	        })
	        .error(webutil.getAjaxErrorHandler(callback, "BlobVault GET"));
	    },

	    set: function (key, value, callback) {
	      var url = Options.blobvault;

	      if (url.indexOf("://") === -1) url = "http://" + url;

	      $.post(url + '/' + key, { blob: value })
	        .success(function (data) {
	          callback(null, data);
	        })
	        .error(webutil.getAjaxErrorHandler(callback, "BlobVault SET"));
	    }
	  };

	  var LocalBlobBackend = {
	    name: "Local browser",

	    get: function (key, callback)
	    {
	      console.log('local get','ripple_blob_' + key);
	      var blob = store.get('ripple_blob_'+key);
	      // We use a timeout to simulate this function being asynchronous
	      callback(null, blob);
	    },

	    set: function (key, value, callback)
	    {
	      if (!store.disabled) {
	        store.set('ripple_blob_'+key, value);
	      }
	      callback();
	    }
	  };

	  BlobObj.backends = {
	    vault: VaultBlobBackend,
	    local: LocalBlobBackend
	  };

	  function BlobError(message, backend) {
	    this.name = "BlobError";
	    this.message = message || "";
	    this.backend = backend || "generic";
	  }

	  BlobError.prototype = Error.prototype;

	  BlobObj.BlobError = BlobError;

	  return BlobObj;
	}]);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Transaction Queue
	 *
	 * This is the Transaction Queue service
	 */

	var module = angular.module('txQueue', []);

	module.service('rpTxQueue', ['$rootScope', 'rpNetwork', 'rpKeychain', 'rpId',
	  function($scope, network, keychain, id)
	{
	  return {
	    /**
	     * Add (or execute immediately if account is funded) transaction to the txQueue.
	     * This method will set the secret, sequence number and sign it.
	     *
	     * @param tx object
	     * @param callback function
	     */
	    addTransaction: function(tx) {
	      // If account is funded submit the transaction right away
	      if ($scope.account.Balance) {
	        network.remote.requestSubmit()
	          .txBlob(blob)
	          .request();
	      }

	      // If not, add it to the queue.
	      // (Will be submitted as soon as account gets funding)
	      else {
	        var item = {
	          tx_json: tx.tx_json,
	          type: tx.tx_json.TransactionType
	        };

	        // Additional details depending on a transaction type
	        if ('TrustSet' === item.type) {
	          item.details = tx.tx_json.LimitAmount;
	        }

	        $scope.userBlob.unshift("/txQueue", item);
	      }
	    },

	    /**
	     * Check if the account has been funded.
	     * If yes, submit all the transactions in the queue.
	     */
	    checkQueue: function() {
	      if (!$scope.account.Balance || !$scope.userBlob.data.txQueue) return;

	      var self = this;

	      // Get user's secret key
	      keychain.requestSecret(id.account, id.username, function (err, secret) {
	        if (err) {
	          console.log("client: txQueue: error while unlocking wallet: ", err);

	          return;
	        }

	        $scope.userBlob.data.txQueue.forEach(function(item){
	          // Backward compatibility!
	          // Transactions created by RT version <= 1.0.10-1
	          if (item.blob) {
	            network.remote.requestSubmit()
	              .txBlob(item.blob)
	              .request();
	            return;
	          }

	          var tx = ripple.Transaction.from_json(item.tx_json);
	          tx.remote = network.remote;
	          tx.secret(secret);
	          tx.submit();
	        });

	        self.emptyQueue();
	      });
	    },

	    /**
	     * Empty transaction queue
	     */
	    emptyQueue: function() {
	      $scope.userBlob.unset('/txQueue');
	    }
	  };
	}]);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * AUTH FLOW
	 *
	 * The auth flow service manages the login, unlock and registration procedures.
	 */

	var webutil     = __webpack_require__(66);
	var log         = __webpack_require__(67);

	var module = angular.module('authflow', []);

	module.factory('rpAuthFlow', ['$rootScope',
	                              function ($scope)
	{
	  var AuthFlow = {};

	  AuthFlow.exists = function (username, password, callback) {
	    var meta = AuthFlow.getVaultClient(username);
	    meta.client.exists(meta.username, callback);
	  };

	  AuthFlow.login = function (opts, callback) {
	    var meta     = AuthFlow.getVaultClient(opts.username);
	    var deviceID = opts.device_id || meta.client.generateDeviceID();
	    meta.client.login(meta.username, opts.password, deviceID, function(err, resp) {
	      if (err) {
	        $scope.$apply(function(){
	          callback(err);
	        });

	        return;
	      }

	      var keys = {
	        id    : resp.blob.id,
	        crypt : resp.blob.key
	      };

	      console.log("client: authflow: login succeeded", resp.blob);
	      $scope.$apply(function(){
	        callback(null, resp.blob, keys, resp.username, resp.verified);
	      });
	    });
	  };

	  /**
	   * Register an account
	   *
	   * @param {object} opts
	   * @param {string} opts.username
	   * @param {string} opts.password
	   * @param {string} opts.account
	   * @param {string} opts.masterkey
	   * @param {object} opts.oldUserBlob
	   * @param {function} callback
	   */
	  AuthFlow.register = function (opts, callback) {
	    opts.activateLink = Options.activate_link; //add the email activation link
	    opts.domain = Options.domain;

	    var meta = AuthFlow.getVaultClient(opts.username);
	    opts.username = meta.username;

	    meta.client.register(opts, function(err, resp) {
	      if (err) {
	        $scope.$apply(function(){
	          callback(err);
	        });
	        return;
	      }

	      var keys = {
	        id    : resp.blob.id,
	        crypt : resp.blob.key
	      };

	      console.log("client: authflow: registration succeeded", resp.blob);
	      $scope.$apply(function(){
	        callback(null, resp.blob, keys, resp.username);
	      });
	    });
	  };

	  AuthFlow.verify = function (opts, callback) {
	    var meta = AuthFlow.getVaultClient(opts.username);
	    meta.client.verify(meta.username, opts.token, function(err, resp){
	      $scope.$apply(function(){
	        callback(err, resp);
	      });
	    });
	  };

	  AuthFlow.resendEmail = function (opts, callback) {
	    opts.activateLink = Options.activate_link;
	    var meta = AuthFlow.getVaultClient(opts.username);
	    opts.username = meta.username;
	    meta.client.resendEmail(opts, function(err, resp){
	      $scope.$apply(function(){
	        callback(err, resp);
	      });
	    });
	  };

	  AuthFlow.rename = function (opts, callback) {
	    var meta = AuthFlow.getVaultClient(opts.username);
	    meta.client.rename(opts, function(err, resp){
	      $scope.$apply(function(){
	        callback(err, resp);
	      });
	    });
	  };

	  AuthFlow.relogin = function (url, keys, deviceID, callback) {
	    var meta = AuthFlow.getVaultClient('');
	    if (!deviceID) deviceID = meta.client.generateDeviceID();
	    meta.client.relogin(url, keys.id, keys.crypt, deviceID, function(err, resp){
	        if (err) {
	          callback(err);
	          return;
	        }

	       callback(null, resp.blob);
	    });
	  };

	  AuthFlow.unlock = function (username, password, callback) {
	    if (!$scope.userBlob) {
	      $scope.$apply(function(){
	        callback(new Error("Blob not found"));
	      });
	      return;
	    }

	    var meta = AuthFlow.getVaultClient(username);
	    var encrypted_secret = $scope.userBlob.encrypted_secret;
	    meta.client.unlock(meta.username, password, encrypted_secret, function (err, resp){
	      setImmediate(function(){
	        $scope.$apply(function(){
	          callback(err, resp);
	        });
	      });
	    });
	  };

	  AuthFlow.recoverBlob = function (username, masterkey, callback) {
	    var meta = AuthFlow.getVaultClient(username);

	    meta.client.getAuthInfo(username, function(err, authInfo){
	      if (err) {
	        $scope.$apply(function(){
	          callback(err);
	        });

	      } else if (!authInfo.exists) {
	        $scope.$apply(function(){
	          callback(new Error ("User does not exist."));
	        });

	      } else {
	        var options = {
	          url       : authInfo.blobvault,
	          username  : authInfo.username, //must use actual username
	          masterkey : masterkey
	        };
	        meta.client.recoverBlob(options, function (err, resp) {
	          setImmediate(function() {
	            $scope.$apply(function() {

	              //need the actual username for the change password call
	              if (resp) {
	                resp.username = authInfo.username;
	              }

	              callback(err, resp);
	            });
	          });
	        });
	      }

	    });
	  };

	  AuthFlow.changePassword = function (options, callback) {
	    var meta = AuthFlow.getVaultClient(options.username);

	    meta.client.changePassword(options, function(err, resp){
	      $scope.$apply(function(){
	        callback(err, resp);
	      });
	    });
	  };

	  AuthFlow.requestToken = function (url, id, force_sms, callback) {
	    var meta = AuthFlow.getVaultClient('');
	    meta.client.requestToken(url, id, force_sms, function(err, resp){
	      $scope.$apply(function() {
	        callback(err, resp);
	      });
	    });
	  };

	  AuthFlow.verifyToken = function (options, callback) {
	    var meta = AuthFlow.getVaultClient('');
	    if (!options.device_id) {
	      options.device_id = meta.client.generateDeviceID();
	    }

	    meta.client.verifyToken(options, function(err, resp){
	      $scope.$apply(function() {
	        callback(err, resp);
	      });
	    });
	  };

	  AuthFlow.updateAttestation = function (options, callback) {
	    var meta = AuthFlow.getVaultClient('');

	    meta.client.updateAttestation(options, function(err, resp) {
	      $scope.$apply(function() {
	        callback(err, resp);
	      });
	    });
	  };

	  AuthFlow.getAttestation = function(options, callback) {
	    var meta = AuthFlow.getVaultClient('');

	    meta.client.getAttestation(options, function(err, resp) {
	      $scope.$apply(function() {
	        callback(err, resp);
	      });
	    });
	  };

	  AuthFlow.getAttestationSummary = function(options, callback) {
	    var meta = AuthFlow.getVaultClient('');

	    meta.client.getAttestationSummary(options, function(err, resp) {
	      $scope.$apply(function() {
	        callback(err, resp);
	      });
	    });
	  };

	  AuthFlow.getVaultClient = function(username) {
	    var meta = { username: username, domain: Options.domain };

	    var atSign = username.indexOf('@');
	    if (atSign !== -1) {
	      meta = {
	        username: username.substring(0, atSign),
	        domain: username.substring(atSign+1)
	      };
	    }

	    meta.client = new ripple.VaultClient(meta.domain);

	    return meta;
	  };

	  return AuthFlow;
	}]);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * AUTH INFO
	 *
	 * The auth info service is responsible for downloading the authentication
	 * metadata.
	 *
	 * The authentication metadata contains information about the authentication
	 * procedure the user needs to go through in order to decrypt their blob
	 * successfully.
	 */

	var webutil = __webpack_require__(66),
	    log = __webpack_require__(67);

	var module = angular.module('authinfo', []);

	module.factory('rpAuthInfo', ['$rootScope', 'rpRippleTxt', '$http',
	  function ($scope, $txt, $http)
	{
	  var AuthInfo = {};

	  AuthInfo.get = function (domain, username, callback) {
	    var txtPromise = $txt.get(domain);

	    if (txtPromise) {
	      if ("function" === typeof txtPromise.then) {
	        txtPromise.then(processTxt, handleNoTxt);
	      } else {
	        processTxt(txtPromise);
	      }
	    } else {
	      handleNoTxt();
	    }

	    function handleNoTxt() {
	      callback(new Error("Unable to load ripple.txt of authentication provider"));
	    }

	    function processTxt(txt) {
	      if (txt.authinfo_url) {
	        $.ajax({
	          url: txt.authinfo_url,
	          dataType: "json",
	          data: {
	            domain: domain,
	            username: username
	          },
	          error: function () {
	            $scope.$apply(function() {
	              callback(new Error("Cannot connect to our login system, please try again later or contact support@ripple.com."));
	            });
	          },
	          success: function (data) {
	            $scope.$apply(function() {
	              callback(null, data);
	            });
	          }
	        });
	      } else {
	        callback(new Error("Authentication is not supported on "+domain));
	      }
	    }
	  };

	  AuthInfo.getByRippleAddress = function (domain, rippleAddress, callback) {
	    $http({
	      method: 'GET',
	      url: 'http://' + domain + ':8081/v1/user/' + rippleAddress
	    })
	    .success(function(data, status, headers, config) {
	      callback(null, data);
	    })
	    .error(function(data, status, headers, config) {
	      callback(new Error("Failed to get the account - XHR error"));
	    });
	  };

	  return AuthInfo;
	}]);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * KEY DERIVATION FUNCTION
	 *
	 * This service takes care of the key derivation, i.e. converting low-entropy
	 * secret into higher entropy secret via either computationally expensive
	 * processes or peer-assisted key derivation (PAKDF).
	 */

	var webutil = __webpack_require__(66),
	    log = __webpack_require__(67);

	var module = angular.module('kdf', []);

	// Full domain hash based on SHA512
	function fdh(data, bytelen)
	{
	  var bitlen = bytelen << 3;

	  if (typeof data === "string") {
	    data = sjcl.codec.utf8String.toBits(data);
	  }

	  // Add hashing rounds until we exceed desired length in bits
	  var counter = 0, output = [];
	  while (sjcl.bitArray.bitLength(output) < bitlen) {
	    var hash = sjcl.hash.sha512.hash(sjcl.bitArray.concat([counter], data));
	    output = sjcl.bitArray.concat(output, hash);
	    counter++;
	  }

	  // Truncate to desired length
	  output = sjcl.bitArray.clamp(output, bitlen);

	  return output;
	}

	module.factory('rpKdf', ['$http', function ($http)
	{
	  var Kdf = {};

	  Kdf.deriveRemotely = function (opts, username, purpose, secret, callback)
	  {
	    var iExponent = new sjcl.bn(String(opts.exponent)),
	        iModulus = new sjcl.bn(String(opts.modulus)),
	        iAlpha = new sjcl.bn(String(opts.alpha));

	    var publicInfo = "PAKDF_1_0_0:"+opts.host.length+":"+opts.host+
	          ":"+username.length+":"+username+
	          ":"+purpose.length+":"+purpose+
	          ":",
	        publicSize = Math.ceil(Math.min((7+iModulus.bitLength()) >>> 3, 256)/8),
	        publicHash = fdh(publicInfo, publicSize),
	        publicHex  = sjcl.codec.hex.fromBits(publicHash),
	        iPublic    = new sjcl.bn(String(publicHex)).setBitM(0),
	        secretInfo = publicInfo+":"+secret.length+":"+secret+":",
	        secretSize = (7+iModulus.bitLength()) >>> 3,
	        secretHash = fdh(secretInfo, secretSize),
	        secretHex  = sjcl.codec.hex.fromBits(secretHash),
	        iSecret    = new sjcl.bn(String(secretHex)).mod(iModulus);

	    if (iSecret.jacobi(iModulus) !== 1) {
	      iSecret = iSecret.mul(iAlpha).mod(iModulus);
	    }

	    var iRandom;
	    for (;;) {
	      iRandom = sjcl.bn.random(iModulus, 0);
	      if (iRandom.jacobi(iModulus) === 1)
	        break;
	    }

	    var iBlind = iRandom.powermodMontgomery(iPublic.mul(iExponent), iModulus),
	        iSignreq = iSecret.mulmod(iBlind, iModulus),
	        signreq = sjcl.codec.hex.fromBits(iSignreq.toBits());

	    $http({
	      method: "POST",
	      url: opts.url,
	      data: {
	        info: publicInfo,
	        signreq: signreq
	      },
	      responseType: 'json'
	    })
	      .success(function (data) {
	        if (data.result === "success") {
	          var iSignres = new sjcl.bn(String(data.signres));
	          var iRandomInv = iRandom.inverseMod(iModulus);
	          var iSigned = iSignres.mulmod(iRandomInv, iModulus);

	          callback(null, iSigned.toBits());
	        } else {
	          // XXX Handle error
	        }
	      })
	      .error(function () {
	        callback(new Error("Could not query PAKDF server "+opts.host));
	      });
	  };

	  return Kdf;
	}]);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * KEYCHAIN
	 *
	 * Manages the actual signing keys for the account.
	 *
	 * The account is locked by default. When a transaction is requested, the user
	 * can enter their password to unlock their account for a certain period of
	 * time. This class manages the timeout when the account will be re-locked.
	 */

	var webutil = __webpack_require__(66),
	    log = __webpack_require__(67);

	var module = angular.module('keychain', ['popup']);

	module.factory('rpKeychain', ['$rootScope', '$timeout', 'rpPopup', 'rpId',
	                              function ($scope, $timeout, popup, id)
	{
	  var Keychain = function ()
	  {
	    var _this = this;
	    this.secrets = {};

	    // Unlock the Desktop client right away
	    if ('desktop' === $scope.client) {
	      var keychain = this;
	      var watcher = $scope.$watch('userBlob', function(){
	        if ($scope.userBlob.data && $scope.userBlob.data.account_id) {
	          keychain.secrets[$scope.userBlob.data.account_id] = {
	            masterkey: $scope.userBlob.data.masterkey
	          };
	          watcher();
	        }
	      }, true);
	    }
	  };

	  // Default unlock duration is 5 minutes
	  Keychain.unlockDuration = 5 * 60 * 1000;

	  Keychain.prototype.isUnlocked = function (account) {
	    return !!this.secrets[account];
	  };

	  /**
	   * Getting a secret for an account with default UI.
	   *
	   * This function will immediatly callback if the wallet is already unlocked.
	   * Otherwise, it will automatically handle the unlock process using a modal
	   * popover.
	   *
	   * If the user cancels the operation, the method will call the callback with
	   * an error.
	   */
	  Keychain.prototype.requestSecret = function (account, username, purpose, callback) {
	    var _this = this;

	    if ("function" === typeof purpose) {
	      callback = purpose;
	      purpose = null;
	    }

	    // Handle already unlocked accounts
	    if (this.secrets[account]) {
	      // Keep the secret in a closure in case it happens to get locked
	      // between now and when $timeout calls back.
	      var secret = this.secrets[account].masterkey;
	      $timeout(function () {
	        callback(null, secret);
	      });
	      return;
	    }

	    var popupScope = $scope.$new();
	    var unlock = popupScope.unlock = {
	      isConfirming: false,
	      password: '',
	      purpose: purpose
	    };
	    popupScope.confirm = function () {
	      unlock.isConfirming = true;

	      function handleSecret(err, secret) {
	        if (err) {
	          // XXX More fine-grained error handling would be good. Can we detect
	          //     server down?
	          unlock.isConfirming = false;
	          unlock.error = "password";
	        } else {
	          popup.close();

	          callback(null, secret);
	        }
	      }

	      _this.getSecret(account, username, popupScope.unlock.password,
	                      handleSecret);
	    };
	    popupScope.cancel = function () {
	      callback("canceled"); //need this for setting password protection
	      popup.close();
	    };
	    popup.blank(__webpack_require__(75)(), popupScope);
	  };

	  /**
	   * Getting a secret for an account with custom UI.
	   *
	   * The difference between this method and Keychain#requestSecret is that to
	   * call this function you have to request the password from the user yourself.
	   */
	  Keychain.prototype.getSecret = function (account, username, password, callback) {
	    var _this = this;

	    // Handle already unlocked accounts
	    if (this.secrets[account] && this.secrets[account].password === password) {
	      // Keep the secret in a closure in case it happens to get locked
	      // between now and when $timeout calls back.
	      var secret = this.secrets[account].masterkey;
	      $timeout(function () {
	        callback(null, secret);
	      });
	      return;
	    }

	    id.unlock(username, password, function (err, secret) {
	      if (err) {
	        callback(err);
	        return;
	      }

	      // Cache secret for unlock period
	      _this.secrets[account] = {
	        masterkey: secret,
	        password: password
	      };

	      _this.expireSecret(account);
	      callback(null, secret);
	    });
	  };

	  /**
	   * Synchronous way to acquire secret.
	   *
	   * This function will only work if the account is already unlocked. Throws an
	   * error otherwise.
	   */
	  Keychain.prototype.getUnlockedSecret = function (account) {
	    if (!this.isUnlocked) {
	      throw new Error("Keychain: Tried to get secret for locked account synchronously.");
	    }

	    return this.secrets[account].masterkey;
	  };


	 /**
	  * setPasswordProtection
	  * @param {Object} protect
	  * @param {Object} callback
	  */
	  Keychain.prototype.setPasswordProtection = function (requirePassword, callback) {
	    var _this   = this;

	    if (requirePassword === false) {
	      this.requestSecret(id.account, id.username, function(err, secret) {
	        if (err) {
	          return callback(err);
	        }

	        setPasswordProtection(requirePassword, secret, callback);
	      });

	    } else {
	      setPasswordProtection(requirePassword, null, callback);
	    }

	    function setPasswordProtection (requirePassword, secret, callback) {

	      $scope.userBlob.set('/persistUnlock', !requirePassword, function(err, resp) {
	        if (err) {
	          return callback(err);
	        }

	        if (requirePassword) {
	          _this.expireSecret(id.account);
	        }

	      });
	    }
	  };

	  Keychain.prototype.expireSecret = function (account) {
	    var _this = this;
	    $timeout(function(){
	      if (_this.secrets[account] && !$scope.userBlob.data.persistUnlock) {
	        delete _this.secrets[account];
	      }
	    }, Keychain.unlockDuration);
	  };

	  return new Keychain();
	}]);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * NETWORK
	 *
	 * The network service is used to communicate with the Ripple network.
	 *
	 * It encapsulates a ripple.Remote instance.
	 */

	var module = angular.module('network', []);

	module.factory('rpNetwork', ['$rootScope', function($scope)
	{
	  /**
	   * Manage network state.
	   *
	   * This class is intended to manage the connection status to the
	   * Ripple network.
	   *
	   * Note that code in other places *is allowed* to call the Ripple
	   * library directly. This is not to be intended to be an abstraction
	   * layer on top of an abstraction layer.
	   */
	  var Network = function ()
	  {
	    this.remote = new ripple.Remote(Options.server, true);
	    this.remote.on('connected', this.handleConnect.bind(this));
	    this.remote.on('disconnected', this.handleDisconnect.bind(this));

	    // Set network max transaction fee from Options, or default to 12 drops of XRP
	    this.remote.max_fee = Options.max_tx_network_fee || 12;

	    this.connected = false;
	  };

	  Network.prototype.init = function ()
	  {
	    this.remote.connect();
	  };

	  /**
	   * Setup listeners for identity state.
	   *
	   * This function causes the network object to start listening to
	   * changes in the identity state and automatically subscribe to
	   * accounts accordingly.
	   */
	  Network.prototype.listenId = function (id)
	  {
	    var self = this;
	  };

	  Network.prototype.handleConnect = function (e)
	  {
	    var self = this;
	    $scope.$apply(function () {
	      self.connected = true;
	      $scope.connected = true;
	      $scope.$broadcast('$netConnected');
	    });
	  };

	  Network.prototype.handleDisconnect = function (e)
	  {
	    var self = this;
	    $scope.$apply(function () {
	      self.connected = false;
	      $scope.connected = false;
	      $scope.$broadcast('$netDisconnected');
	    });
	  };

	  return new Network();
	}]);



/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * BOOKS
	 *
	 * The books service is used to keep track of orderbooks.
	 */

	var module = angular.module('books', ['network']);
	var Amount = ripple.Amount;


	module.factory('rpBooks', ['rpNetwork', '$q', '$rootScope', '$filter', 'rpId',
	function(net, $q, $scope, $filter, $id) {

	  var rowCount;

	  function loadBook(gets, pays, taker) {
	    return net.remote.book(gets.currency, gets.issuer,
	    pays.currency, pays.issuer,
	    taker);
	  }

	  function filterRedundantPrices(data, action, combine) {
	    var max_rows = Options.orderbook_max_rows || 100;

	    var price;
	    var lastprice;
	    var current;
	    var rpamount = $filter('rpamount');
	    var newData = jQuery.extend(true, {}, data);

	    rowCount = 0;
	    newData = _.values(_.compact(_.map(newData, function(d, i) {

	      // This check is redundant, but saves the CPU some work
	      if (rowCount > max_rows) return;

	      // rippled has a bug where it shows some unfunded offers
	      // We're ignoring them
	      if (d.taker_gets_funded === "0" || d.taker_pays_funded === "0")
	        return;

	      if (d.TakerGets.value) {
	        d.TakerGets.value = d.taker_gets_funded;
	      } else {
	        d.TakerGets = parseInt(Number(d.taker_gets_funded), 10);
	      }

	      if (d.TakerPays.value) {
	        d.TakerPays.value = d.taker_pays_funded;
	      } else {
	        d.TakerPays = parseInt(Number(d.taker_pays_funded), 10);
	      }

	      d.TakerGets = Amount.from_json(d.TakerGets);
	      d.TakerPays = Amount.from_json(d.TakerPays);

	      // You never know
	      if (!d.TakerGets.is_valid() || !d.TakerPays.is_valid())
	        return;

	      if (action === "asks") {
	        d.price = Amount.from_quality(d.BookDirectory,
	                                      d.TakerPays.currency(),
	                                      d.TakerPays.issuer(), {
	          base_currency: d.TakerGets.currency(),
	          reference_date: new Date()
	        });
	      } else {
	        d.price = Amount.from_quality(d.BookDirectory,
	                                      d.TakerGets.currency(),
	                                      d.TakerGets.issuer(), {
	          inverse: true,
	          base_currency: d.TakerPays.currency(),
	          reference_date: new Date()
	        });
	      }

	      var price = rpamount(d.price, {
	        rel_precision: 4,
	        rel_min_precision: 2
	      });

	      // Don't combine current user's orders.
	      if (d.Account == $id.account) {
	        d.my = true;
	      }

	      if (lastprice === price && !d.my) {
	        if (combine) {
	          newData[current].TakerPays = Amount.from_json(newData[current].TakerPays).add(d.TakerPays);
	          newData[current].TakerGets = Amount.from_json(newData[current].TakerGets).add(d.TakerGets);
	        }
	        d = false;
	      } else current = i;

	      if (!d.my)
	        lastprice = price;

	      if (d) rowCount++;

	      if (rowCount > max_rows) return false;

	      return d;
	    })));

	    var key = action === "asks" ? "TakerGets" : "TakerPays";
	    var sum;
	    _.each(newData, function (order, i) {
	      if (sum) sum = order.sum = sum.add(order[key]);
	      else sum = order.sum = order[key];
	    });

	    return newData;
	  }

	  return {
	    get: function(first, second, taker) {
	      var asks = loadBook(first, second, taker);
	      var bids = loadBook(second, first, taker);
	     
	      asks._shouldSubscribe = true;
	      bids._shouldSubscribe = true;
	      
	      var model = {
	        asks: filterRedundantPrices(asks.offersSync(), 'asks', true),
	        bids: filterRedundantPrices(bids.offersSync(), 'bids', true)
	      };

	      function handleAskModel(offers) {
	        $scope.$apply(function () {
	          model.asks = filterRedundantPrices(offers, 'asks', true);
	          model.updated = true;
	        });
	      }

	      function handleAskTrade(gets, pays) {
	        $scope.$apply(function () {
	          model.last_price = gets.ratio_human(pays);
	          model.updated = true;
	        });
	      }
	      asks.on('model', handleAskModel);
	      asks.on('trade', handleAskTrade);

	      function handleBidModel(offers) {
	        $scope.$apply(function () {
	          model.bids = filterRedundantPrices(offers, 'bids', true);
	          model.updated = true;
	        });
	      }

	      function handleBidTrade(gets, pays) {
	        $scope.$apply(function () {
	          model.last_price = pays.ratio_human(gets);
	          model.updated = true;
	        });
	      }
	      bids.on('model', handleBidModel);
	      bids.on('trade', handleBidTrade);

	      model.unsubscribe = function() {
	        asks.removeListener('model', handleAskModel);
	        asks.removeListener('trade', handleAskTrade);
	        bids.removeListener('model', handleBidModel);
	        bids.removeListener('trade', handleBidTrade);
	      };

	      return model;
	    },

	    getLength: function() {
	      return rowCount;
	    }
	  };
	}]);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * TRANSACTIONS
	 *
	 * The transactions service is used to listen to all Ripple network
	 * transactions.
	 *
	 * This obviously won't scale, but it'll do long enough for us (or somebody
	 * else) to come up with something better.
	 */

	var module = angular.module('transactions', ['network']);

	module.factory('rpTransactions', ['$rootScope', 'rpNetwork',
	                                  function($scope, net) {
	  var listeners = [],
	      subscribed = false;

	  function subscribe() {
	    if (subscribed) return;
	    net.remote.request_subscribe("transactions").request();
	    subscribed = true;
	  }

	  function handleTransaction(msg) {
	    $scope.$apply(function () {
	      listeners.forEach(function (fn) {
	        fn(msg);
	      });
	    });
	  }

	  net.remote.on('net_transaction', handleTransaction);

	  return {
	    addListener: function (fn) {
	      listeners.push(fn);
	      subscribe();
	    },
	    removeListener: function (fn) {
	      var position = -1;
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        if (listeners[i] === fn) {
	          position = i;
	        }
	      }
	      if (position < 0) return;
	      listeners.splice(position, 1);
	    }
	  };
	}]);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * LEDGER
	 *
	 * The ledger service is used to provide information that requires watching the
	 * entire ledger.
	 *
	 * This obviously won't scale, but it'll do long enough for us (or somebody
	 * else) to come up with something better.
	 */

	var module = angular.module('ledger', ['network', 'transactions']);

	module.factory('rpLedger', ['$q', '$rootScope', 'rpNetwork', 'rpTransactions',
	                            function($q, $rootScope, net, transactions)
	{

	  var offerPromise = $q.defer();
	  var tickerPromise = $q.defer();
	  var requested = false;

	  var ledger = {
	    offers: offerPromise.promise,
	    tickers: tickerPromise.promise,
	    getOrders: getOrders
	  };

	  function filterOrder(buyCurrency, sellCurrency, buyIssuer, sellIssuer,
	                       pays, gets) {
	    if (buyCurrency !== gets.currency || sellCurrency !== pays.currency) {
	      return false;
	    }

	    if (buyCurrency !== 'XRP' && buyIssuer && gets.issuer !== buyIssuer) {
	      return false;
	    }

	    if (sellCurrency !== 'XRP' && sellIssuer && pays.issuer !== sellIssuer) {
	      return false;
	    }

	    return true;
	  }

	  function getOrders(buyCurrency, sellCurrency, buyIssuer, sellIssuer) {
	    var obj = {
	      asks: [],
	      bids: []
	    };

	    if (!Array.isArray(ledger.offers)) return obj;

	    ledger.offers.forEach(function (node) {
	      var gets = rewriteAmount(node.TakerGets);
	      var pays = rewriteAmount(node.TakerPays);

	      if (filterOrder(buyCurrency, sellCurrency, buyIssuer, sellIssuer, pays, gets)) {
	        obj.asks.push({i: gets, o: pays});

	        // A bid can't also be an ask
	        return;
	      }

	      if (filterOrder(buyCurrency, sellCurrency, buyIssuer, sellIssuer, gets, pays)) {
	        obj.bids.push({i: pays, o: gets});
	      }
	    });

	    obj.asks.sort(function (a, b) {
	      var aRatio = a.o.amount.ratio_human(a.i.amount, {reference_date: new Date()});
	      var bRatio = b.o.amount.ratio_human(b.i.amount, {reference_date: new Date()});
	      return aRatio.compareTo(bRatio);
	    });

	    obj.bids.sort(function (a, b) {
	      var aRatio = a.o.amount.ratio_human(a.i.amount, {reference_date: new Date()});
	      var bRatio = b.o.amount.ratio_human(b.i.amount, {reference_date: new Date()});
	      return bRatio.compareTo(aRatio);
	    });

	    fillSum(obj.asks, 'i');
	    fillSum(obj.bids, 'i');

	    return obj;
	  }

	  function rewriteAmount(amountJson) {
	    var amount = ripple.Amount.from_json(amountJson);
	    return {
	      amount: amount,
	      // Pretty dirty hack, but to_text for native values gives 1m * value...
	      // In the future we will likely remove this field altogether (and use
	      // Amount class math instead), so it's ok.
	      num: +amount.to_human({group_sep: false}),
	      currency: amount.currency().to_human(),
	      issuer: amount.issuer().to_json()
	    };
	  }

	  /**
	   * Fill out the sum field in the bid or ask orders array.
	   */
	  function fillSum(array, field) {
	    var sum = null;
	    for (var i = 0, l = array.length; i<l; i++) {
	      if (sum === null) {
	        sum = array[i][field].amount;
	      } else {
	        sum = sum.add(array[i][field].amount);
	      }
	      array[i].sum = sum;
	    }
	  }

	  if(net.connected) {
	    doRequest();
	  }

	  net.on('connected', function(){
	    doRequest();
	  });

	  function doRequest()
	  {
	    if (requested) return;

	    net.remote.request_ledger("ledger_closed", "full")
	        .on('success', handleLedger)
	        .request();

	    transactions.addListener(handleTransaction);

	    requested = true;
	  }

	  function handleTransaction(msg)
	  {
	    // XXX: Update the ledger state using this transaction's metadata
	  }

	  function handleLedger(e)
	  {
	    $rootScope.$apply(function(){
	      var offers = e.ledger.accountState.filter(function (node) {
	        return node.LedgerEntryType === "Offer";
	      });

	      offerPromise.resolve(offers);
	      ledger.offers = offers;
	    });
	  }

	  return ledger;
	}]);


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * POPUP
	 *
	 * The popup service is used to provide modals, alerts, and confirmation screens
	 */

	var module = angular.module('popup', []);

	module.factory('rpPopup', ['$compile',
	                           function ($compile)
	{
	  var popupService = {};

	  // Get the popup
	  popupService.getPopup = function(create)
	  {
	    if (!popupService.popupElement && create)
	    {
	      popupService.popupElement = $( '<div class="modal fade"></div>' );
	      popupService.popupElement.appendTo( 'BODY' );
	    }

	    return popupService.popupElement;
	  };

	  popupService.compileAndRunPopup = function (popup, scope, options) {
	    $compile(popup)(scope);
	    popup.modal(options);
	  };

	  popupService.blank = function(content,scope) {
	    var popup = popupService.getPopup(true);

	    var html = '<div class="modal-dialog"><div class="modal-content">';
	    html += content;
	    html += '</div></div>';

	    popup.html(html);

	    popupService.compileAndRunPopup(popup, scope);
	  };

	  popupService.confirm = function(title, actionText, actionButtonText, actionFunction, actionButtonCss, cancelButtonText, cancelFunction, cancelButtonCss, scope, options) {
	    actionText = (actionText) ? actionText : "Are you sure?";
	    actionButtonText = (actionButtonText) ? actionButtonText : "Ok";
	    actionButtonCss = (actionButtonCss) ? actionButtonCss : "btn btn-info";
	    cancelButtonText = (cancelButtonText) ? cancelButtonText : "Cancel";
	    cancelButtonCss = (cancelButtonCss) ? cancelButtonCss : "";

	    var popup = popupService.getPopup(true);
	    var confirmHTML = '<div class="modal-dialog"><div class="modal-content">';

	    if (title) {
	      confirmHTML += "<div class=\"modal-header\"><h1>"+title+"</h1></div>";
	    }

	    confirmHTML += "<div class=\"modal-body\"><p class=\"question\">"+actionText+"</p>"
	        +    "<div class=\"actions\">";

	    if (actionFunction) {
	      confirmHTML += "<button class=\"" + actionButtonCss + " \" ng-click=\""+actionFunction+"\">"+actionButtonText+"</button>";
	    }
	    else {
	      confirmHTML += "<button class=\"" + actionButtonCss + " \">"+actionButtonText+"</button>";
	    }

	    if (cancelFunction) {
	      confirmHTML += "<button class=\"" + cancelButtonCss + " btn-cancel\" ng-click=\""+cancelFunction+"\">"+cancelButtonText+"</button>";
	    }
	    else {
	      confirmHTML += "<button class=\"" + cancelButtonCss + " btn-cancel\">"+cancelButtonText+"</button>";
	    }

	    confirmHTML += "</div></div></div></div>";

	    popup.html(confirmHTML);

	    popup.find(".btn").click(function () {
	      popupService.close();
	    });

	    popupService.compileAndRunPopup(popup, scope, options);
	  };

	  popupService.close = function()
	  {
	    var popup = popupService.getPopup();
	    if (popup) {
	      popup.modal('hide');
	    }
	  };

	  return popupService;
	}]);


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * RIPPLE.TXT
	 *
	 * The ripple.txt service looks up and caches ripple.txt files.
	 *
	 * These files are used to do DNS-based verifications autonomously on the
	 * client-side. Quite neat when you think about it and a decent solution until
	 * we have a network-internal nickname system.
	 */

	var module = angular.module('rippletxt', []);

	module.factory('rpRippleTxt', ['$q', '$rootScope',
	                               function ($q, $scope) {
	  var txts = {};

	  function get(domain) {
	    var txtPromise = $q.defer();

	    var urls = [
	      'https://ripple.'+domain+'/ripple.txt',
	      'https://www.'+domain+'/ripple.txt',
	      'https://'+domain+'/ripple.txt'
	    ].reverse();
	    var next = function (xhr, status) {
	      if (!urls.length) {
	        txtPromise.reject(new Error("No ripple.txt found"));
	        return;
	      }
	      var url = urls.pop();
	      $.ajax({
	        url: url,
	        dataType: 'text',
	        success: function (data) {
	          $scope.$apply(function() {
	            var sections = parse(data);
	            txts[domain] = sections;
	            txtPromise.resolve(sections);
	          });
	        },
	        error: function (xhr, status) {
	          setImmediate(function () {
	            $scope.$apply(function () {
	              next(xhr, status);
	            });
	          });
	        }
	      });
	    };
	    next();

	    return txtPromise.promise;
	  }

	  function parse(txt) {
	    txt = txt.replace('\r\n', '\n');
	    txt = txt.replace('\r', '\n');
	    txt = txt.split('\n');

	    var currentSection = "", sections = {};
	    for (var i = 0, l = txt.length; i < l; i++) {
	      var line = txt[i];
	      if (!line.length || line[0] === '#') {
	        continue;
	      } else if (line[0] === '[' && line[line.length-1] === ']') {
	        currentSection = line.slice(1, line.length-1);
	        sections[currentSection] = [];
	      } else {
	        line = line.replace(/^\s+|\s+$/g, '');
	        if (sections[currentSection]) {
	          sections[currentSection].push(line);
	        }
	      }
	    }

	    return sections;
	  }

	  return {
	    get: get,
	    parse: parse
	  };
	}]);


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * FEDERATION
	 *
	 * The federation service looks up and caches federation queries.
	 *
	 * These files are used to do DNS-based verifications autonomously on the
	 * client-side. Quite neat when you think about it and a decent solution until
	 * we have a network-internal nickname system.
	 */

	var module = angular.module('federation', []);

	module.factory('rpFederation', ['$q', '$rootScope', 'rpRippleTxt',
	                               function ($q, $scope, $txt) {
	  var txts = {};

	  function check_email(email) {
	    var federationPromise = $q.defer();

	    var tmp = email.split('@');
	    var domain = tmp.pop();
	    var user = tmp.join('@');

	    var txtPromise = $txt.get(domain);

	    if (txtPromise) {
	      if ("function" === typeof txtPromise.then) {
	        txtPromise.then(processTxt, handleNoTxt);
	      } else {
	        processTxt(txtPromise);
	      }
	    } else {
	      handleNoTxt();
	    }

	    return federationPromise.promise;

	    function handleNoTxt() {
	      federationPromise.reject({
	        result: "error",
	        error: "noRippleTxt",
	        error_message: "Ripple.txt not available for the requested domain."
	      });
	    }
	    function processTxt(txt) {
	      if (txt.federation_url) {
	        $.ajax({
	          url: txt.federation_url[0],
	          dataType: "json",
	          data: {
	            type: 'federation',
	            domain: domain,
	            destination: user,
	            // DEPRECATED "destination" is a more neutral name for this field
	            //   than "user"
	            user: user
	          },
	          error: function () {
	            $scope.$apply(function() {
	              federationPromise.reject({
	                result: "error",
	                error: "unavailable",
	                error_message: "Federation gateway did not respond."
	              });
	            });
	          },
	          success: function (data) {
	            $scope.$apply(function() {
	              if ("object" === typeof data &&
	                  "object" === typeof data.federation_json &&
	                  data.federation_json.type === "federation_record" &&
	                  (data.federation_json.user === user ||
	                   data.federation_json.destination === user) &&
	                  data.federation_json.domain === domain) {
	                federationPromise.resolve(data.federation_json);
	              } else if ("string" === typeof data.error) {
	                federationPromise.reject({
	                  result: "error",
	                  error: "remote",
	                  error_remote: data.error,
	                  error_message: data.error_message
	                    ? "Service error: " + data.error_message
	                    : "Unknown remote service error."
	                });
	              } else {
	                federationPromise.reject({
	                  result: "error",
	                  error: "unavailable",
	                  error_message: "Federation gateway's response was invalid."
	                });
	              }
	            });
	          }
	        });
	      } else {
	        federationPromise.reject({
	          result: "error",
	          error: "noFederation",
	          error_message: "Federation is not available on the requested domain."
	        });
	      }
	    }
	  }

	  return {
	    check_email: check_email
	  };
	}]);


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * DOMAIN ALIAS
	 *
	 * The domain alias service resolves ripple address to domains.
	 *
	 * In the AccountRoot entry of any ripple account users can provide a reference
	 * to a domain they own. Ownership of the domain is verified via the ripple.txt
	 * magic file.
	 *
	 * This service provides both the lookup in the ledger and the subsequent
	 * verification via ripple.txt.
	 */

	var module = angular.module('domainalias', ['network', 'rippletxt']);

	module.factory('rpDomainAlias', ['$q', '$rootScope', 'rpNetwork', 'rpRippleTxt',
	                                 function ($q, $scope, net, txt)
	{
	  // Alias caching
	  var aliases = {};

	  /**
	   * Validates a domain against an object parsed from ripple.txt data.
	   *
	   * @private
	   */
	  function validateDomain(domain, address, data)
	  {
	    // Validate domain
	    if (!data.domain ||
	        data.domain.length !== 1 ||
	        data.domain[0] !== domain) {
	      return false;
	    }

	    // Validate address
	    if (!data.accounts) {
	      return false;
	    }
	    for (var i = 0, l = data.accounts.length; i < l; i++) {
	      if (data.accounts[i] === address) {
	        return true;
	      }
	    }

	    return false;
	  }

	  function getAliasForAddress(address)
	  {
	    // Return the promise if there's already a lookup in progress for this address
	    if (aliases[address] && aliases[address].promise) {
	      return aliases[address].promise;
	    }

	    var aliasPromise = $q.defer();

	    // We might already have the alias for given ripple address
	    if (aliases[address] && aliases[address].resolved) {
	      if (aliases[address].domain) {
	        aliasPromise.resolve(aliases[address].domain);
	      }
	      else {
	        aliasPromise.reject(new Error("Invalid domain"));
	      }
	    }

	    // If not, then get the alias
	    else {
	      net.remote.request_account_info(address)
	        .on('success', function (data) {
	          if (data.account_data.Domain) {
	            $scope.$apply(function () {
	              var domain = sjcl.codec.utf8String.fromBits(sjcl.codec.hex.toBits(data.account_data.Domain));

	              var txtData = txt.get(domain);
	              txtData.then(
	                function (data) {
	                  aliases[address] = {
	                    resolved: true
	                  };

	                  if(validateDomain(domain, address, data)) {
	                    aliases[address].domain = domain;
	                    aliasPromise.resolve(domain);
	                  }
	                  else {
	                    aliasPromise.reject(new Error("Invalid domain"));
	                  }
	                },
	                function (error) {
	                  aliases[address] = {
	                    resolved: true
	                  };
	                  aliasPromise.reject(new Error(error));
	                }
	              );
	            });
	          }
	          else {
	            aliases[address] = {
	              resolved: true
	            };
	            aliasPromise.reject(new Error("No domain found"));
	          }
	        })
	        .on('error', function () {
	          aliasPromise.reject(new Error("No domain found"));
	        })
	        .request();

	      // Because finally is a reserved word in JavaScript and reserved keywords
	      // are not supported as property names by ES3, we're invoking the
	      // method like aliasPromise['finally'](callback) to make our code
	      // IE8 and Android 2.x compatible.
	      aliasPromise.promise['finally'](function(){
	        aliases[address].promise = false;
	      });

	      aliases[address] = {
	        promise: aliasPromise.promise
	      };

	    }

	    return aliasPromise.promise;
	  }

	  return {
	    getAliasForAddress: getAliasForAddress
	  };
	}]);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * APP MANAGER
	 *
	 * The app manager service is used to communicate with the Ripple apps
	 * and connect them to the client.
	 */

	var module = angular.module('appManager', ['domainalias','integrationProfileManager']);

	module.service('rpAppManager', ['$rootScope', '$http', 'rpDomainAlias', 'rpRippleTxt', 'rpProfileManager',
	  function($scope, $http, aliasService, txt, profileManager)
	{
	  var log = function(){
	    var mainArguments = Array.prototype.slice.call(arguments);
	    mainArguments[0] = '%c ' + mainArguments[0] + ' ';
	    mainArguments.splice(1, 0, 'background: green; color: white');
	    console.log.apply(console,mainArguments);
	  };

	  /**
	   * Load all apps
	   */
	  var init = function () {
	    $scope.$watch('userBlob.data.apps', function(apps){
	      if (apps && apps.length) {
	        apps.forEach(function(appInBlob){
	          loadApp(appInBlob.rippleAddress, function(err, app){
	            $scope.apps[appInBlob.rippleAddress] = app;
	          });
	        });
	      }
	    });
	  };

	  // Loaded apps
	  $scope.apps = {};

	  /**
	   * App object
	   *
	   * @param manifest
	   * @constructor
	   */
	  var App = function(manifest){
	    this.name = manifest.name;
	    this.description = manifest.description;
	    this.image = manifest.imageUrl;
	    this.rippleAddress = manifest.rippleAddress;
	    this.profiles = [];

	    var self = this;

	    _.each(manifest.profiles, function(profile,key){
	      self.profiles[key] = profileManager.getProfile(profile);
	    });
	  };

	  App.prototype.findProfile = function (type) {
	    return _.findWhere(this.profiles, {type:type});
	  };

	  App.prototype.getInboundBridge = function (currency) {
	    var found;

	    this.profiles.forEach(function(profile,key){
	      if ('inboundBridge' === profile.type) {
	        profile.currencies.forEach(function(c){
	          if (currency.toUpperCase() === c.currency) {
	            found = profile;
	          }
	        });
	      }
	    });

	    return found;
	  };

	  var getApp = function(rippleAddress,callback) {
	    $scope.$watch('apps', function(apps){
	      if (app = apps[rippleAddress]) {
	        callback(null, app);
	      }
	    }, true);
	  };

	  var getAllApps = function(callback) {
	    $scope.$watch('apps', function(apps){
	      if (!$.isEmptyObject(apps)) callback(apps);
	    }, true);
	  };

	  /**
	   * Save app to userBlob
	   *
	   * @param app
	   */
	  var save = function(app) {
	    var watcher = $scope.$watch('userBlob', function(userBlob){
	      if (userBlob.data.created && !_.findWhere($scope.userBlob.data.apps, {rippleAddress:app.rippleAddress})) {
	        $scope.userBlob.unshift("/apps", {
	          name: app.name,
	          rippleAddress: app.rippleAddress
	        });

	        watcher();
	      }
	    });
	  };

	  /**
	   * Initializes Ripple App.
	   *
	   * @param rippleAddress
	   * @param callback
	   */
	  var loadApp = function(rippleAddress, callback){
	    var domain, manifest;

	    // Get Domain
	    log('appManager:','Looking up',rippleAddress);

	    var alias = aliasService.getAliasForAddress(rippleAddress);
	    alias.then(
	      // Fulfilled
	      function (domain) {
	        log('appManager:','The domain for',rippleAddress,'is',domain);
	        log('appManager:','Looking up ',domain,'for ripple.txt');

	        // Get ripple.txt
	        var txtPromise = txt.get(domain);
	        txtPromise.then(
	          // Fulfilled
	          function(rippletxt){
	            log('appManager:','Got ripple.txt',rippletxt);

	            if (rippletxt.manifest_url) {
	              log('appManager:','Looking up manifest',rippletxt.manifest_url);

	              $http({url: rippletxt.manifest_url, method: 'get'})
	                .success(function(data, status, headers, config) {
	                  manifest = jQuery.extend(true, {}, data);

	                  log('appManager:','Got the manifest for',manifest.name,manifest);

	                  if (!validateManifest(manifest)) {
	                    log('appManager:','Manifest is invalid.');
	                    return;
	                  }

	                  // Create the App object.
	                  $scope.apps[rippleAddress] = new App(manifest);

	                  callback(null, $scope.apps[rippleAddress]);
	                })
	                .error(function(data, status, headers, config) {
	                  log('appManager:','Can\'t get the manifest');
	                });
	            }
	          },

	          // Rejected
	          function(reason) {
	            callback(reason);
	          }
	        );
	      },

	      // Rejected
	      function(reason) {
	        callback(reason);
	      }
	    );
	  };

	  /**
	   * Function to validate manifest file
	   *
	   * @param m manifest json
	   * @returns {boolean}
	   */
	  var validateManifest = function(m) {
	    // TODO more validation
	    if (!m.name || !m.rippleAddress || !m.profiles) {
	      return;
	    }

	    // Ripple address is wrong
	    if (!ripple.UInt160.from_json(m.rippleAddress).is_valid()) return;

	    return true;
	  };

	  return {
	    getApp: getApp,
	    getAllApps: getAllApps,
	    loadApp: loadApp,
	    init: init,
	    save: save
	  };
	}]);


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Profile manager
	 *
	 * This service is used for managing profiles
	 */

	var module = angular.module('integrationProfileManager', [
	  'integrationAccount',
	  'integrationHistory',
	  'integrationTrust',
	  'integrationInboundBridge'
	]);

	module.service('rpProfileManager', [
	  '$rootScope',
	  'rpAccountProfile',
	  'rpHistoryProfile',
	  'rpTrustProfile',
	  'rpInboundBridgeProfile',
	  function(
	    $scope,
	    accountProfile,
	    historyProfile,
	    trustProfile,
	    inboundBridgeProfile
	  )
	{
	  this.getProfile = function(manifest) {
	    var profiles = {
	      'accountProfile': function() {return accountProfile.fromManifest(manifest);},
	      'historyProfile': function() {return historyProfile.fromManifest(manifest);},
	      'trustProfile': function() {return trustProfile.fromManifest(manifest);},
	      'inboundBridgeProfile': function() {return inboundBridgeProfile.fromManifest(manifest);}
	    };

	    return profiles[manifest.type + 'Profile']();
	  };
	}]);


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Account profile
	 *
	 * This is the "Account" profile implementation
	 */

	var module = angular.module('integrationAccount', []);

	// TODO Sign sent data
	module.service('rpAccountProfile', ['$rootScope', 'rpNetwork', '$http',
	  function($scope, $network, $http)
	{
	  this.accountProfile = function(manifest) {
	    return {
	      type: manifest.type,
	      version: manifest.version,

	      getFields: function () {
	        return manifest.signupFields;
	      },
	      signup: function(fields, callback) {
	        $http({
	          url: manifest.urls.signup,
	          method: 'POST',
	          data: fields
	        })
	        .success(function(response){
	          if (response.status === 'error') {
	            callback({
	              message: response.message
	            });

	            return;
	          }

	          callback(null, response);
	        })
	        .error(function(data,status){
	          callback({
	            message: 'Unable to sign up.'
	          });
	        });
	      },
	      getUser: function(rippleAddress, callback) {
	        $http({
	          url: manifest.urls.user,
	          method: 'GET',
	          params: {rippleAddress: rippleAddress}
	        })
	        .success(function(response){
	          if (response.status === 'error') {
	            callback({
	              message: response.message
	            });

	            return;
	          }

	          callback(null, response);
	        })
	        .error(function(data,status){
	          callback({
	            message: "Can't get the user."
	          });
	        });
	      }
	    };
	  };

	  this.fromManifest = function (manifest) {
	    return new this.accountProfile(manifest);
	  };
	}]);


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * History profile
	 *
	 * This is the "History" profile implementation
	 */

	var module = angular.module('integrationHistory', []);

	module.service('rpHistoryProfile', ['$rootScope', 'rpNetwork', '$http',
	  function($scope, $network, $http)
	{
	  this.historyProfile = function(manifest) {
	    return {
	      type: manifest.type,
	      version: manifest.version,

	      getTransactions: function(rippleAddress, callback) {
	        $http({
	          url: manifest.urls.transactions,
	          method: 'GET',
	          params: {
	            rippleAddress: rippleAddress
	          }
	        })
	        .success(function(response){
	          if (response.status === 'error') {
	            callback({
	              message: response.message
	            });

	            return;
	          }

	          callback(null, response.history);
	        })
	        .error(function(data,status){
	          callback({
	            message: 'Unable to fetch the history.'
	          });
	        });
	      }
	    };
	  };

	  this.fromManifest = function (manifest) {
	    return new this.historyProfile(manifest);
	  };
	}]);


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Trust profile
	 *
	 * This is the "Trust" profile implementation
	 */

	var module = angular.module('integrationTrust', ['txQueue','keychain']);

	// TODO Sign sent data
	module.service('rpTrustProfile', ['$rootScope', 'rpNetwork', 'rpTxQueue', 'rpKeychain', 'rpId',
	  function($scope, network, txQueue, keychain, id)
	{
	  this.trustProfile = function(manifest) {
	    return {
	      type: manifest.type,
	      version: manifest.version,

	      // TODO remove this
	      grantNeccessaryTrusts: function() {
	        manifest.currencies.forEach(function(currency){
	          // Is there an existing trust line?
	          if(existingTrustLine = $scope.lines[currency.issuer + currency.currency.toUpperCase()]) {
	            // Is the trust limit enough?
	            if(existingTrustLine.limit.to_number() >= currency.amount)
	              // We're good with the existing trust line
	              return;
	          }

	          // Ok, looks like we need to set a trust line
	          var tx = network.remote.transaction();
	          tx.rippleLineSet(id.account, currency.amount + '/' + currency.currency + '/' + currency.issuer);
	          tx.setFlags('NoRipple');

	          // txQueue please set the trust line asap.
	          txQueue.addTransaction(tx);
	        });

	        if('function' == typeof callback) callback();
	      }
	    };
	  };

	  this.fromManifest = function (manifest) {
	    return new this.trustProfile(manifest);
	  };
	}]);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Inbound Bridge profile
	 *
	 * This is the "InboundBridge" profile implementation
	 */

	var module = angular.module('integrationInboundBridge', []);

	module.service('rpInboundBridgeProfile', ['$rootScope', 'rpNetwork', 'rpId', '$http', 'rpTxQueue',
	  function($scope, network, id, $http, txQueue)
	{
	  this.inboundBridgeProfile = function(manifest) {
	    return {
	      type: manifest.type,
	      version: manifest.version,
	      bridgeType: manifest.bridgeType,
	      currencies: manifest.currencies,

	      /**
	       * Trust one of the inbound bridge supported currencies.
	       *
	       * @param currency
	       * @param issuer
	       */
	      trust: function(currency,issuer) {
	        // Does this inbound bridge support this currency?
	        var line = _.findWhere(manifest.currencies, {
	          currency: currency.toUpperCase(),
	          issuer: issuer
	        });

	        // Nope
	        if (!line) {
	          console.warn("This service doesn't support " + currency + '/' + issuer);
	          return;
	        }

	        // Is there an existing trust line?
	        if(existingTrustLine = $scope.lines[line.issuer + line.currency]) {
	          // Is the trust limit enough?
	          if(existingTrustLine.limit.to_number() >= line.amount)
	          // We're good with the existing trust line
	            return;
	        }

	        // Is there an existing trustTx in queue?
	        // (Does this really belong here? maybe just move it to txqueue.js?)
	        var noNeed;
	        _.each(
	          // Find all trust transactions in queue
	          _.findWhere($scope.userBlob.data.txQueue, {type: "TrustSet"}),
	          function(elm,index,txInQueue){
	            // Does this fulfil our needs?
	            noNeed = txInQueue && txInQueue.details.currency === line.currency
	              && txInQueue.details.issuer === line.issuer
	              && txInQueue.details.value >= line.amount;
	          }
	        );

	        // We already have the necessary trustTx waiting in line.
	        if (noNeed) return;

	        // Ok, looks like we need to set a trust line
	        var tx = network.remote.transaction();
	        tx.rippleLineSet(id.account, line.amount + '/' + line.currency + '/' + line.issuer);
	        tx.setFlags('NoRipple');

	        // Add memo to tx
	        tx.addMemo('client', 'rt' + $scope.version);

	        // txQueue please set the trust line asap.
	        txQueue.addTransaction(tx);
	      },

	      /**
	       * Get instructions on using the inbound bridge
	       *
	       * @param rippleAddress
	       * @param callback
	       */
	      getInstructions: function(rippleAddress, callback) {
	        $http({
	          url: manifest.urls.instructions,
	          method: 'GET',
	          params: {rippleAddress: rippleAddress}
	        })
	        .success(function(response){
	          if (response.status === 'error') {
	            callback({
	              message: response.message
	            });

	            return;
	          }

	          callback(null, response);
	        })
	        .error(function(data,status){
	          callback({
	            message: "Can't get the instructions."
	          });
	        });
	      },

	      /**
	       * Get pending deposits list
	       *
	       * @param rippleAddress
	       * @param callback
	       */
	      getPending: function(rippleAddress, callback) {
	        $http({
	          url: manifest.urls.pending,
	          method: 'GET',
	          params: {rippleAddress: rippleAddress}
	        })
	        .success(function(response){
	          if (response.status === 'error') {
	            callback({
	              message: response.message
	            });

	            return;
	          }

	          callback(null, response.deposits);
	        })
	        .error(function(data,status){
	          callback({
	            message: "Can't get pending deposits."
	          });
	        });
	      }
	    };
	  };

	  /**
	   * Create and return a new instance of inbound bridge based on manifest
	   *
	   * @param manifest
	   * @returns {profiles.inboundBridgeProfile}
	   */
	  this.fromManifest = function (manifest) {
	    return new this.inboundBridgeProfile(manifest);
	  };
	}]);


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var Tab  = __webpack_require__(76).Tab;

	var RegisterTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(RegisterTab, Tab);

	RegisterTab.prototype.tabName = 'register';
	RegisterTab.prototype.pageMode = 'single';
	RegisterTab.prototype.parent = 'main';

	RegisterTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(77)();
	};

	RegisterTab.prototype.extraRoutes = [
	  { name: '/register/activate/:username/:token' }
	];

	RegisterTab.prototype.angular = function (module) {
	  module.controller('RegisterCtrl', ['$scope', '$rootScope', '$location', '$element',
	                                     'rpId', 'rpTracker', '$routeParams', 'rpKeychain',
	                                     function ($scope, $rootScope, $location, $element,
	                                               $id, $rpTracker, $routeParams, keychain)
	  {
	    /**
	     * Email verification
	     */
	    if ($routeParams.token) {
	      $id.verify({
	        username: $routeParams.username,
	        token: $routeParams.token
	      }, function(err, response){
	        if (err) {
	          $rootScope.verifyStatus = 'error';

	          $rpTracker.track('Email verification', {
	            result: 'failed',
	            message: err
	          });
	        }
	        else if ('success' === response.result) {
	          $rootScope.verifyStatus = 'verified';

	          $rpTracker.track('Email verification', {
	            result: 'success'
	          });
	        }
	      });

	      $rootScope.verifyStatus = 'verifying';
	      $rootScope.username = $routeParams.username;
	      $id.logout();
	      $location.path('/login');
	    }

	    /**
	     * User is already logged in
	     */
	    if ($id.loginStatus) {
	      $location.path('/balance');
	      return;
	    }

	    // Countries list
	    /*
	    var lang = store.get('ripple_language') || 'en';

	    $scope.countries = _.sortBy(require('../l10n/countries/' + lang + '.json'),
	      function(country){
	        return country;
	      }
	    );
	    */

	    $scope.reset = function()
	    {
	      $scope.username = '';
	      $scope.password = '';
	      $scope.passwordSet = {};
	      $scope.password1 = '';
	      $scope.password2 = '';
	      $scope.master = '';
	      $scope.key = '';
	      $scope.mode = 'form';
	      $scope.showMasterKeyInput = false;
	      $scope.submitLoading = false;

	      if ($scope.registerForm) $scope.registerForm.$setPristine(true);
	    };

	    $scope.register = function()
	    {
	      if ($scope.oldUserBlob) {
	        $scope.masterkey = $scope.oldUserBlob.data.master_seed;
	      }

	      $id.register({
	        'username': $scope.username,
	        'password': $scope.password1,
	        'email': $scope.email,
	        'masterkey': $scope.masterkey,
	        'oldUserBlob': $scope.oldUserBlob,
	        'oldUsername': $scope.oldUsername,
	        'oldPassword': $scope.oldPassword
	      },
	      function(err, key){
	        $scope.submitLoading = false;

	        if (err) {
	          $scope.mode = "failed";
	          $scope.error_detail = err.message;

	          $rpTracker.track('Sign Up', {
	            'Used key': !!$scope.masterkey,
	            'Password strength': $scope.strength,
	            'Result': 'fail'
	          });

	          return;
	        }
	        $scope.password = new Array($scope.password1.length+1).join("*");
	        $scope.keyOpen = key;
	        $scope.key = $scope.keyOpen[0] + new Array($scope.keyOpen.length).join("*");

	        $scope.mode = 'secret';

	        $rpTracker.track('Sign Up', {
	          'Used key': !!$scope.masterkey,
	          'Password strength': $scope.strength,
	          'Result': 'success'
	        });
	      });
	    };

	    $scope.resendEmail = function()
	    {
	      $scope.resendLoading = true;

	      keychain.requestSecret($id.account, $id.username,
	        function (err, masterkey) {
	          if (err) {
	            console.log("client: register tab: error while " +
	              "unlocking wallet: ", err);
	            $scope.mode = "error";
	            $scope.error_type = "unlockFailed";
	            return;
	          }
	                    
	          $id.resendEmail({
	            id:$scope.userBlob.id,
	            url:$scope.userBlob.url,
	            username: $scope.userCredentials.username,
	            account_id: $scope.userBlob.data.account_id,
	            email: $scope.newEmail || $scope.userBlob.data.email,
	            masterkey: masterkey
	          }, function(err, response){
	            if (err) {
	              console.log('Error',err);
	              return;
	            }

	            // Update the blob
	            $scope.userBlob.set('/email', $scope.newEmail || $scope.userBlob.data.email);

	            $scope.resendLoading = false;
	            $scope.resendSuccess = true;
	          });
	        });
	    };

	    var updateFormFields = function(){
	      var username;
	      var password1;
	      var password2;

	      username = $element.find('input[name="register_username"]').eq(0).val();
	      password1 = $element.find('input[name="register_password1"]').eq(0).val();
	      password2 = $element.find('input[name="register_password2"]').eq(0).val();

	      if ("string" === typeof username) {
	        $scope.registerForm.register_username.$setViewValue(username);
	      }
	      if ("string" === typeof password1) {
	        $scope.registerForm.register_password1.$setViewValue(password1);
	      }
	      if ("string" === typeof password2) {
	        $scope.registerForm.register_password2.$setViewValue(password2);
	      }
	    };

	    /**
	     * Registration cases
	     *
	     * -- CASE --                                                            -- ACTION --
	     * 1. username or/and password is/are missing ----------------------------- show error
	     * 2. passwords do not match ---------------------------------------------- show error
	     * 3. username and password passed the validation
	     *    3.1 master key is not present
	     *        3.1.1 account exists
	     *              3.1.1.1 and we can login ---------------------------------- login
	     *              3.1.1.2 and we can't login -------------------------------- show error
	     *        3.1.2 account doesn't exist ------------------------------------- register and generate master key
	     *    3.3 master key is present
	     *        3.3.1 account exists, but we can't login ------------------------ show error
	     *        3.3.2 account exists and it uses the same master key =----------- login
	     *        3.3.3 account exists, and it uses another master key
	     *              3.3.2.1 master key is valid ------------------------------- tell him about the situation, and let him decide what to do
	     *              3.3.2.2 master key is invalid ----------------------------- show error
	     *        3.3.3 account doesn't exist ------------------------------------- register with given master key
	     */

	    $scope.submitForm = function()
	    {
	      // Disable submit button
	      $scope.submitLoading = true;

	      updateFormFields();

	      var regInProgress;

	      // TODO Update this. It cannot exist anymore, 'cause usernames are unique
	      $id.exists($scope.username, $scope.password1, function (error, exists) {
	        if (!regInProgress) {
	          if (!exists) {
	            regInProgress = true;

	            if (!store.disabled) {
	              store.set('ripple_settings', JSON.stringify(Options));
	            }

	            $scope.register();
	          } else {
	            $scope.mode = 'alreadyexists';
	          }
	        }
	      });
	    };

	    $scope.reset();

	    // Unverified account login
	    if ($scope.unverified) {
	      $scope.mode = 'verification';
	    }
	  }]);
	};

	module.exports = RegisterTab;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var Tab = __webpack_require__(76).Tab;

	var LoginTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(LoginTab, Tab);

	LoginTab.prototype.tabName = 'login';
	LoginTab.prototype.pageMode = 'single';
	LoginTab.prototype.parent = 'main';

	LoginTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(85)();
	};

	LoginTab.prototype.angular = function (module) {
	  module.controller('LoginCtrl', ['$scope', '$element', '$routeParams',
	                                  '$location', 'rpId', '$rootScope',
	                                  'rpPopup', '$timeout', 'rpTracker', 'rpAuthFlow',
	                                  function ($scope, $element, $routeParams,
	                                            $location, $id, $rootScope,
	                                            popup, $timeout, $rpTracker, authflow)
	  {
	    if ($id.loginStatus) {
	      $location.path('/balance');
	      return;
	    }

	    $scope.attempts = 0;
	    $scope.error = '';
	    $scope.password = '';
	    $scope.token = '';
	    $scope.showRecover = false;
	    $scope.rememberMe = true;

	    $scope.loginForm && $scope.loginForm.$setPristine(true);
	    $scope.backendMessages = [];

	    //set username and password here so
	    //that the form will be valid if we are
	    //only verifying via 2FA
	    if ($scope.twoFactor && $scope.twoFactor.tokenError) {
	      $scope.backendMessages.push({'backend': "2FA", 'message': $scope.twoFactor.tokenError.message});
	    }

	    // Autofill fix
	    $timeout(function(){
	      $scope.$apply(function () {
	        $scope.username = $element.find('input[name="login_username"]').val();
	        $scope.password = $element.find('input[name="login_password"]').val();
	      });
	    }, 1000);

	//    $rootScope.$on("$blobError", function (e, err) {
	//      console.log("BLOB ERROR", arguments);
	//      $scope.backendMessages.push({'backend': err.backend, 'message': err.message});
	//    });

	    var updateFormFields = function(){
	      var username;
	      var password;

	      // There are multiple login forms due to the Ripple URI login feature.
	      // But only one of them should be visible and that's the one we want.
	      username = $element.find('input[name="login_username"]:visible').eq(0).val();
	      password = $element.find('input[name="login_password"]:visible').eq(0).val();

	      if ("string" === typeof username) {
	        $scope.loginForm.login_username.$setViewValue(username);
	      }
	      if ("string" === typeof password) {
	        $scope.loginForm.login_password.$setViewValue(password);
	      }
	    };

	    // Issues #1024, #1060
	    $scope.$watch('username',function(){
	      $rootScope.username = $scope.username;
	      $timeout(function(){
	        $scope.$apply(function () {
	          updateFormFields();
	        });
	      }, 50);
	    });

	    // Ok, now try to remove this line and then go write "a" for wallet name, and "a" for passphrase.
	    // "Open wallet" is still disabled hah? no worries, just enter anything else and it will be activated.
	    // Probably this is an AngularJS issue. Had no time to check it yet.
	    $scope.$watch('password');

	    $scope.submitForm = function()
	    {
	      if ($scope.ajax_loading) return;

	      $scope.backendMessages = [];

	      //submitting a verification code
	      if ($scope.twoFactor) {
	        var options = {
	          url         : $scope.twoFactor.blob_url,
	          id          : $scope.twoFactor.blob_id,
	          device_id   : $scope.twoFactor.device_id,
	          token       : $scope.token,
	          remember_me : $scope.rememberMe
	        };

	        $id.verifyToken(options, function(err, resp) {
	          $scope.ajax_loading = false;

	          if (err) {
	            $scope.status = 'Verification Falied:';
	            $scope.backendMessages.push({'backend': "2FA", 'message': err.message});

	          } else {
	            var username = (""+$scope.username).trim();
	            var keys     = {
	              id    : $scope.twoFactor.blob_id,
	              crypt : $scope.twoFactor.blob_key
	            };

	            //save credentials for login
	            $id.storeLoginKeys($scope.twoFactor.blob_url, username, keys);
	            $id.setUsername(username);
	            store.set('device_id', $scope.twoFactor.device_id);
	            setImmediate(login);
	          }
	        });

	        $scope.ajax_loading = true;
	        $scope.error  = '';
	        $scope.status = 'verifiying...';
	        return;
	      }

	      // Issue #36: Password managers may change the form values without
	      // triggering the events Angular.js listens for. So we simply force
	      // an update of Angular's model when the form is submitted.
	      updateFormFields();

	      setImmediate(login);

	      $scope.ajax_loading = true;
	      $scope.error  = '';
	      $scope.status = 'Logging in...';
	    };

	    //initiate the login
	    function login () {
	      if ($scope.twoFactor) {
	        $id.relogin(loginCallback);

	      } else {
	        $id.login({
	          username   : $scope.username,
	          password   : $scope.password
	        }, loginCallback);
	      }
	    }
	    $scope.$on('$idRemoteLogin', function(){
	      $id.relogin(loginCallback);
	    });

	    //handle the login results
	    function loginCallback (err, blob) {

	      $scope.ajax_loading = false;

	      //blob has 2FA enabled
	      if (err && err.twofactor) {
	        if (err.twofactor.tokenError) {
	          $scope.status = 'Request token:';
	          $scope.backendMessages.push({'backend': "2FA", 'message': err.twofactor.tokenError.message});
	          return;
	        }

	        $scope.twoFactor     = err.twofactor;
	        $scope.twoFactor.via = '';//TODO remove this from blob response
	        $scope.status        = '';
	        $scope.maskedPhone   = err.twofactor.masked_phone;

	        //TODO: different display if 'ignored' is set,
	        //meaning the user has the app
	        if (err.twofactor.tokenResponse) {
	          $scope.twoFactor.via = err.twofactor.tokenResponse.via;
	        }

	        return;

	      //login failed for a different reason
	      } else if (err) {
	        if (++$scope.attempts>2) {
	          $scope.showRecover = true;
	        }

	        $scope.status = 'Login failed:';

	        if (err.name === "OldBlobError") {
	          popup.confirm("Wallet Upgrade", "Ripple is upgrading the wallet encryption format. After the upgrade, only Ripple clients 0.2.24 or higher can access your wallet.<br><br>If you use other clients, please make sure they are upgraded to the current version.",
	                        "OK", "migrateConfirm()", null,
	                        "Abort login", null, null,
	                        $scope, {});

	          $scope.migrateConfirm = function () {
	            $id.allowOldBlob = true;
	            $scope.submitForm();
	          };
	        }

	        if (err.name !== "BlobError") {
	          $scope.backendMessages.push({'backend': "ID", 'message': err.message});
	        }

	        $rpTracker.track('Login', {
	          'Status': 'error',
	          'Message': err.message
	        });

	        if (!$scope.$$phase) {
	          $scope.$apply();
	        }
	        return;
	      }

	      $rpTracker.track('Login', {
	        'Status': 'success'
	      });

	      $scope.status = '';
	      if ($routeParams.tab) {
	        $location.path('/'+$routeParams.tab);
	      } else {
	        if ($rootScope.verifyStatus) {
	          $rootScope.verifyStatus = '';
	          $location.path('/fund');
	        }
	        else {
	          $location.path('/balance');
	        }
	      }
	    }

	    $scope.requestToken = function() {
	      var force = $scope.twoFactor.via == 'app' ? true : false;
	      $scope.status = 'requesting token...';
	      authflow.requestToken($scope.twoFactor.blob_url, $scope.twoFactor.blob_id, force, function(tokenError, tokenResp) {
	        if (tokenError) {
	          $scope.status = 'token request failed...';
	          $scope.backendMessages.push({'backend': "2FA", 'message': tokenError.message});
	        } else {
	          $scope.status = 'token resent!';
	        }
	      });
	    };

	    $scope.cancel2FA = function() {
	      $scope.twoFactor  = null;
	      $scope.status     = null;
	    };
	  }]);

	  /**
	   * Focus on username input only if it's empty. Otherwise focus on password field
	   * This directive will not be used anywhere else, that's why it's here.
	   */
	  module.directive('rpFocusOnEmpty', ['$timeout', function($timeout) {
	    return function($scope, element) {
	      $timeout(function(){
	        $scope.$watch(function () {return element.is(':visible');}, function(newValue) {
	          if (newValue === true && !element.val())
	            element.focus();
	        });
	      }, 200);
	    };
	  }]);
	};



	module.exports = LoginTab;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var Tab = __webpack_require__(76).Tab;

	var MigrateTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(MigrateTab, Tab);

	MigrateTab.prototype.tabName = 'migrate';
	MigrateTab.prototype.pageMode = 'single';
	MigrateTab.prototype.parent = 'main';

	MigrateTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(79)();
	};

	MigrateTab.prototype.angular = function (module) {
	  module.controller('MigrateCtrl', ['$scope', '$element', '$routeParams',
	                                  '$location', 'rpId', '$rootScope',
	                                  'rpPopup', '$timeout', 'rpTracker', 'rpAuthFlow',
	                                  function ($scope, $element, $routeParams,
	                                            $location, $id, $rootScope,
	                                            popup, $timeout, $rpTracker, authflow)
	  {
	    if ($id.loginStatus) {
	      $location.path('/balance');
	      return;
	    }

	    $scope.attempts = 0;
	    $scope.error = '';
	    $scope.password = '';
	    $scope.backendMessages = [];

	    $scope.submitForm = function()
	    {
	      if ($scope.ajax_loading) return;

	      $scope.backendMessages = [];

	      login();

	      $scope.ajax_loading = true;
	      $scope.error = '';
	      $scope.status = 'Logging in...';
	    };

	    //initiate the login
	    function login () {
	      $id.oldLogin({
	        username: $scope.username,
	        password: $scope.password
	      }, loginCallback);
	    }

	    //handle the login results
	    function loginCallback (err, blob) {

	      $scope.ajax_loading = false;

	      if (err) {
	        // TODO move to template
	        $scope.status = "Migrate failed:";
	        $scope.error = "This username/passphrase combination doesn't exist in ripple.com/client. Please try again.";

	        if (err.name === "OldBlobError") {
	          popup.confirm("Wallet Upgrade", "Ripple is upgrading the wallet encryption format. After the upgrade, only Ripple clients 0.2.24 or higher can access your wallet.<br><br>If you use other clients, please make sure they are upgraded to the current version.",
	                        "OK", "migrateConfirm()", null,
	                        "Abort login", null, null,
	                        $scope, {});

	          $scope.migrateConfirm = function () {
	            $id.allowOldBlob = true;
	            $scope.submitForm();
	          };
	        }

	        if (err.name !== "BlobError") {
	          $scope.backendMessages.push({'backend': "ID", 'message': err.message});
	        }

	        if (!$scope.$$phase) {
	          $scope.$apply();
	        }
	        return;
	      }

	      $scope.error = '';
	      $scope.status = '';
	      if ($routeParams.tab) {
	        $location.path('/'+$routeParams.tab);
	      } else {
	        if ($rootScope.verifyStatus) {
	          $rootScope.verifyStatus = '';
	          $location.path('/fund');
	        }
	        else {
	          $location.path('/balance');
	        }
	      }
	    }

	  }]);

	  /**
	   * Focus on username input only if it's empty. Otherwise focus on password field
	   * This directive will not be used anywhere else, that's why it's here.
	   */
	  module.directive('rpFocusOnEmpty', ['$timeout', function($timeout) {
	    return function($scope, element) {
	      $timeout(function(){
	        $scope.$watch(function () {return element.is(':visible');}, function(newValue) {
	          if (newValue === true && !element.val())
	            element.focus();
	        });
	      }, 200);
	    };
	  }]);
	};

	module.exports = MigrateTab;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var util     = __webpack_require__(102);
	var Tab      = __webpack_require__(76).Tab;

	var RecoverTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(RecoverTab, Tab);

	RecoverTab.prototype.tabName = 'recover';
	RecoverTab.prototype.pageMode = 'single';
	RecoverTab.prototype.parent = 'main';

	RecoverTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(78)();
	};

	RecoverTab.prototype.extraRoutes = [
	  { name: '/recover/:username' }
	];

	RecoverTab.prototype.angular = function (module) {
	  module.controller('RecoverCtrl', ['$scope', '$element', '$routeParams',
	                                  '$location', 'rpId', '$rootScope',
	                                  'rpPopup', '$timeout', 'rpTracker', 'rpAuthFlow',
	                                  function ($scope, $element, $routeParams,
	                                            $location, $id, $rootScope,
	                                            popup, $timeout, $rpTracker, $authflow) {

	    /**
	     * User is already logged in
	     */
	    if ($id.loginStatus) {
	      $location.path('/balance');
	      return;
	    }

	    var recoveredBlob;

	    $scope.username      = $routeParams.username;
	    $scope.masterkey     = '';
	    $scope.mode          = 'recover';
	    $scope.submitLoading = false;
	    $scope.passwordSet   = {};
	    $scope.password1     = '';
	    $scope.password2     = '';
	    $scope.recoverError  = null;
	    $scope.passwordError = null;

	    $scope.submitForm = function() {

	      // Disable submit button
	      $scope.submitLoading = true;

	      if ($scope.mode === 'recover') {
	        $authflow.recoverBlob($scope.username, $scope.masterkey, function (err, blob){
	          $scope.submitLoading = false;

	          if (err) {
	            $rpTracker.track('Recover Blob', {
	              'Status': 'error',
	              'Message': err.message
	            });

	            var message = err.message || err;
	            if (err.message == 'Invalid ECDSA signature') {
	              message = 'Please check your secret key';
	            }

	            $scope.recoverError = message;
	            return;
	          }

	          $rpTracker.track('Recover Blob', {
	            result: 'success'
	          });

	          recoveredBlob       = blob;
	          $scope.username     = blob.username;
	          $scope.mode         = 'setPassword';
	          $scope.recoverError = null; //clear any existing errors
	        });

	      } else if ($scope.mode === 'setPassword') {

	        var options = {
	          username  : $scope.username,
	          password  : $scope.password1,
	          masterkey : $scope.masterkey,
	          blob      : recoveredBlob
	        };

	        $id.changePassword(options, function(err, resp) {
	          $scope.submitLoading = false;

	          if (err) {
	            $rpTracker.track('Change Password', {
	              'Status': 'error',
	              'Message': err.message
	            });

	            $scope.passwordError = err.message || err;
	            return;
	          }

	          $rpTracker.track('Change Password', {
	            result: 'success'
	          });

	          $rootScope.recovered = true;
	          $location.path('/balance');
	        });
	      }
	    };
	  }]);
	};

	module.exports = RecoverTab;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    Tab = __webpack_require__(76).Tab,
	    Amount = ripple.Amount,
	    rewriter = __webpack_require__(69);

	var BalanceTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(BalanceTab, Tab);

	BalanceTab.prototype.tabName = 'balance';
	BalanceTab.prototype.mainMenu = 'wallet';

	BalanceTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['qr']);

	BalanceTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(81)();
	};

	BalanceTab.prototype.angular = function (module)
	{


	  module.controller('BalanceCtrl', ['$rootScope', 'rpId', 'rpNetwork', '$filter', '$http', 'rpAppManager',
	                                     function ($scope, $id, $network, $filter, $http, appManager)
	  {
	    if (!$id.loginStatus) return $id.goId();

	    // In the following, we get and watch for changes to data that is used to
	    // calculate the pie chart and aggregate balance. This data includes:
	    // -What balances the user holds
	    // -What (if any) market value in terms of XRP each balance has, according to
	    //  https://api.ripplecharts.com/api/exchangeRates
	    // -What metric the user has chosen to calculate the aggregate value in


	    // When the selected value metric changes, update the displayed amount.

	    ($scope.selectedValueMetric = store.get('balance')) || ($scope.selectedValueMetric = "XRP");

	    $scope.changeMetric = function(scope) {
	      $scope.selectedValueMetric = scope.selectedValueMetric;

	      //NOTE: this really should be stored in the blob or
	      //scoped to the blob_id so that it changes based on
	      //which account is being viewed
	      store.set('balance', $scope.selectedValueMetric);
	    };

	    $scope.$watch("selectedValueMetric", function() {
	      if ($scope.selectedValueMetric && $scope.aggregateValueAsXrp) {
	        updateAggregateValueDisplayed();
	      }
	    });


	    // Maintain a dictionary for the value of each "currency:issuer" pair, denominated in XRP.
	    // Fetch the data from RippleCharts, and refresh it whenever any non-XRP balances change.
	    // When exchangeRates changes, update the aggregate value, and the list of available value metrics,
	    // and also check for negative balances to see if the user should be notified.

	    $scope.exchangeRates || ($scope.exchangeRates = {"XRP":1});

	    function updateExchangeRates() {
	      var currencies = [];
	      var hasNegative = false;
	      for (var cur in $scope.balances) {if ($scope.balances.hasOwnProperty(cur)){
	        var components = $scope.balances[cur].components;
	        for (var issuer in components) {if (components.hasOwnProperty(issuer)){
	          // While we're at it, check for negative balances:
	          hasNegative || (hasNegative = components[issuer].is_negative());
	          currencies.push({
	            currency: cur,
	            issuer: issuer
	          });
	        }}
	      }}
	      $scope.hasNegative = hasNegative;
	      var pairs = currencies.map(function(c){
	        return {
	          base:c,
	          counter:{currency:"XRP"}
	        };
	      });
	      if (pairs.length) {
	        $scope.exchangeRatesNonempty = false;
	        $http.post("https://api.ripplecharts.com/api/exchangeRates", {pairs:pairs,last:true})
	        .success(function(response){

	          for (var i=0; i<response.length; i++) {
	            var pair = response[i];
	            if (pair.last > 0) { // Disregard unmarketable assets
	              $scope.exchangeRates[pair.base.currency+":"+pair.base.issuer] = pair.last;
	            }
	          }

	          $scope.exchangeRatesNonempty = true;
	          console.log("Exchange Rates: ", $scope.exchangeRates);
	        });
	      } else {
	        $scope.exchangeRatesNonempty = true;
	      }
	    }

	    $scope.$on('$balancesUpdate', updateExchangeRates);

	    $scope.$watch("exchangeRates", function(){
	      if ($scope.exchangeRates) {
	        var isAmbiguous = {};
	        var okser = Object.keys($scope.exchangeRates);
	        for (var i=0; i<okser.length; i++) {
	          var cur = okser[i].split(":")[0];
	          if (!isAmbiguous[cur] || !isAmbiguous.hasOwnProperty(cur)) {
	            // (In case there's a currency called "constructor" or something)
	            for (var j=i+1; j<okser.length; j++) {
	              var cur2 = okser[j].split(":")[0];
	              if (cur === cur2) {
	                isAmbiguous[cur] = true;
	                break;
	              }
	            }
	          }
	        }
	        $scope.valueMetrics = okser.map(function(code){
	          var curIssuer = code.split(":");
	          var currencyName = $filter('rpcurrency')(ripple.Amount.from_human("0 "+curIssuer[0])); //This is really messy
	          var issuerName = $filter('rpripplename')(curIssuer[1], tilde=true);
	          return {
	            code: code,
	            text: currencyName + (isAmbiguous[curIssuer[0]] ? " ("+ issuerName +")" : "")
	          };
	        });

	        updateAggregateValueAsXrp();
	      }
	    }, true);


	    // Whenever the XRP balance changes, update the aggregate value, but no need to refresh exchangeRates.
	    // Update the displayed amount.

	    $scope.$watch("account.Balance", updateAggregateValueAsXrp);

	    function updateAggregateValueAsXrp() {
	      if ( $scope.account.Balance) {
	        var av = $scope.account.Balance / 1000000;
	        for (var cur in $scope.balances) {if ($scope.balances.hasOwnProperty(cur)){
	          var components = $scope.balances[cur].components;
	          for (var issuer in components) {if (components.hasOwnProperty(issuer)){
	            var rate = ( $scope.exchangeRates[cur+":"+issuer] || 0);
	            var sbAsXrp = components[issuer].to_number() * rate;
	            av += sbAsXrp;
	          }}
	        }}
	        $scope.aggregateValueAsXrp = av;
	        updateAggregateValueDisplayed();
	      }
	    }

	    function updateAggregateValueDisplayed() {
	      var metric = $scope.exchangeRates[$scope.selectedValueMetric];
	      if (!metric) {
	        $scope.selectedValueMetric = "XRP";
	        $scope.changeMetric($scope);
	        metric = $scope.exchangeRates[$scope.selectedValueMetric];
	      }

	      $scope.aggregateValueAsMetric = $scope.aggregateValueAsXrp / metric;

	      if($scope.selectedValueMetric === "XRP" ||
	          $scope.selectedValueMetric === "0158415500000000C1F76FF6ECB0BAC600000000:rDRXp3XC6ko3JKNh1pNrDARZzFKfBzaxyi" ||
	          $scope.selectedValueMetric === "015841551A748AD2C1F76FF6ECB0CCCD00000000:rs9M85karFkCRjvc6KMWn8Coigm9cbcgcx" )
	      {
	        $scope.aggregateValueDisplayed = (Amount.from_json({value:($scope.aggregateValueAsMetric.toFixed(4)
	            .substring(0, (($scope.aggregateValueAsXrp / metric).toFixed(4)).length - 5))})).to_human();
	        $scope.aggregateValueDisplayedDecimal = $scope.aggregateValueAsMetric.toFixed(4).substring((($scope.aggregateValueAsXrp / metric)
	            .toFixed(4)).length - 5, (($scope.aggregateValueAsXrp / metric).toFixed(4)).length);
	      }
	      else {
	        $scope.aggregateValueDisplayed = (Amount.from_json({value:($scope.aggregateValueAsMetric.toFixed(2)
	            .substring(0, (($scope.aggregateValueAsXrp / metric).toFixed(2)).length - 3))})).to_human();
	        $scope.aggregateValueDisplayedDecimal = $scope.aggregateValueAsMetric.toFixed(2).substring((($scope.aggregateValueAsXrp / metric)
	            .toFixed(2)).length - 3, (($scope.aggregateValueAsXrp / metric).toFixed(2)).length);

	      }
	    }

	    //if we were previously loaded, update the estimate
	    if ($scope.loadState.lines) {
	      updateExchangeRates();
	    }

	    var history = [];

	    var getDateRangeHistory = function(dateMin,dateMax,callback)
	    {
	      if (!$id.account) return;
	      var completed = false;
	      var history = [];

	      var params = {
	        'account': $id.account,
	        'ledger_index_min': -1
	      };

	      var getTx = function(){
	        $network.remote.request_account_tx(params)
	        .on('success', function(data) {
	          if (data.transactions.length) {
	            for(var i=0;i<data.transactions.length;i++) {
	              var date = ripple.utils.toTimestamp(data.transactions[i].tx.date);

	              if(date < dateMin.getTime()) {
	                completed = true;
	                break;
	              }

	              if(date > dateMax.getTime())
	                continue;

	              // Push
	              var tx = rewriter.processTxn(data.transactions[i].tx, data.transactions[i].meta, $id.account);
	              if (tx) history.push(tx);
	            }

	            if (data.marker) {
	              params.marker = data.marker;
	              $scope.tx_marker = params.marker;
	            }
	            else {
	              // Received all transactions since a marker was not returned
	              completed = true;
	            }

	            if (completed)
	              callback(history);
	            else
	              getTx();
	          } else {
	            callback(history);
	          }
	        }).request();
	      };

	      getTx(0);
	    };

	    var changeDateRange = function(dateMin,dateMax) {
	      history = [];
	      $scope.trendValueAsPercentage = undefined;

	      getDateRangeHistory(dateMin,dateMax,function(hist){
	        $scope.$apply(function () {
	          history = hist;
	          updateTrend();
	        });
	      });
	    };

	    var updateTrend = function() {
	      $scope.trendMap = {};
	      var trendMap = _.reduce(history, function(map, event) {
	          _.forEach(event.effects, function(effect){
	            switch (effect.type) {
	              case 'fee':
	              case 'balance_change':
	              case 'trust_change_balance':
	                currency = effect.amount.is_native() ? "XRP" : (effect.currency + ":" + effect.counterparty);
	                if (typeof map[currency] === "undefined") map[currency] = 0;

	                map[currency] += effect.amount.is_native()
	                  ? effect.amount.to_number() / 1000000
	                  : effect.amount.to_number();
	                break;
	              }
	            });
	          return map;
	        }, {});
	      $scope.trendMap = trendMap;
	    };

	    $scope.selectedTrendSpan = 86400000;

	    $scope.changeTrendSpan = function(scope) {
	      $scope.selectedTrendSpan = scope.selectedTrendSpan;
	    };

	    var refreshTrend = function() {
	      changeDateRange(new Date(new Date() - $scope.selectedTrendSpan),new Date());
	    };

	    $scope.$watch("selectedTrendSpan", refreshTrend);
	    $scope.$watch("account.Balance", refreshTrend);

	    $scope.$watch("aggregateValueAsXrp", updateTrendValue);
	    $scope.$watch("trendMap", updateTrendValue);

	    function updateTrendValue() {
	      if (!$scope.trendMap) return;
	      var av = $scope.aggregateValueAsXrp;
	      for (var cur in $scope.trendMap) {if ($scope.trendMap.hasOwnProperty(cur)){
	        var rate = ( $scope.exchangeRates[cur] || 0);
	        var sbAsXrp = $scope.trendMap[cur] * rate;
	        av -= sbAsXrp;
	      }}
	      $scope.trendValueAsPercentage = ($scope.aggregateValueAsXrp - av) / av;
	    }

	  }]);

	  module.directive('rpFlatSelect', [function () {
	    return {
	      restrict: 'A',
	      link: function (scope, el, attrs) {
	        var expanded = true;

	        var collapse = function() {
	          expanded = false;
	          element = this;
	          el.find('option').each(function(i, option){
	            $option = $(option);
	            $option.attr("rp-flat-select-text", $option.html());
	            if (i != element.selectedIndex)
	              $option.html("");
	          });
	          el.width("auto");
	        };

	        var expand = function() {
	          if (expanded) return;
	          expanded = true;
	          element = this;
	          el.width(el.width());
	          el.find('option').each(function(i, option){
	            $option = $(option);
	            if (!$option.attr("rp-flat-select-text"))
	              $option.attr("rp-flat-select-text", $option.html());
	            if ($option.html() != $option.attr("rp-flat-select-text"))
	              $option.html($option.attr("rp-flat-select-text"));
	          });
	        };

	        el.focus(expand);
	        el.mouseover(expand);
	        el.blur(collapse);
	        el.change(function(){
	          collapse.apply(this);
	          expand.apply(this);
	        });

	        optionsAttr = el.attr('ng-options') || el.attr('data-ng-options');
	        if (optionsAttr) {
	          watch = $.trim(optionsAttr.split('|')[0]).split(' ').pop();
	          scope.$watch(watch, function(){
	            if (el.is(":focus")) return;
	            collapse.apply(el.first()[0]);
	          });
	        }
	      }
	    };
	  }]);
	};

	module.exports = BalanceTab;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    webUtil = __webpack_require__(66),
	    Tab = __webpack_require__(76).Tab,
	    rewriter = __webpack_require__(69),
	    Amount = ripple.Amount;

	var HistoryTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(HistoryTab, Tab);

	HistoryTab.prototype.tabName = 'history';
	HistoryTab.prototype.mainMenu = 'wallet';

	HistoryTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(83)();
	};

	HistoryTab.prototype.angular = function (module) {
	  module.controller('HistoryCtrl', ['$scope', 'rpId', 'rpNetwork', 'rpTracker', 'rpAppManager',
	                                     function ($scope, $id, $network, $rpTracker, appManager)
	  {
	    if (!$id.loginStatus) return $id.goId();

	    var history = [];

	    // Latest transaction
	    var latest;

	    // History collection
	    $scope.historyShow = [];
	    $scope.historyCsv = '';

	    // History states
	    $scope.$watch('loadState.transactions',function(){
	      $scope.historyState = !$scope.loadState.transactions ? 'loading' : 'ready';
	    });

	    // Open/close states of individual history items
	    $scope.details = [];

	    //$scope.typeUsage = [];
	    //$scope.currencyUsage = [];

	    // Currencies from history
	    var historyCurrencies = [];

	    $scope.types = {
	      sent: {
	        'types': ['sent'],
	        'checked': true
	      },
	      received: {
	        'types': ['received'],
	        'checked': true
	      },
	      gateways: {
	        'types': ['trusting','trusted'],
	        'checked': true
	      },
	      trades: {
	        'types': ['offernew','exchange'],
	        'checked': true
	      },
	      orders: {
	        'types': ['offernew','offercancel','exchange'],
	        'checked': true
	      },
	      other: {
	        'types': ['accountset','failed','rippling'],
	        'checked': true
	      }
	    };

	    $scope.advanced_feature_switch = Options.advanced_feature_switch;

	    $scope.orderedTypes = ['sent','received','gateways','trades','orders','other'];

	    if (store.get('ripple_history_type_selections')) {
	      $scope.types = $.extend(true,$scope.types,store.get('ripple_history_type_selections'));
	    }

	    // Filters
	    if (store.get('ripple_history_filters')) {
	      $scope.filters = store.get('ripple_history_filters');
	    } else {
	      $scope.filters = {
	        'currencies_is_active': false, // we do the currency filter only if this is true, which happens when at least one currency is off
	        'currencies': {},
	        'types': ['sent','received','exchange','trusting','trusted','offernew','offercancel','rippling'],
	        'minimumAmount': 0.000001
	      };
	    }

	    var getDateRangeHistory = function(dateMin,dateMax,callback)
	    {
	      var completed = false;
	      var history = [];

	      var params = {
	        'account': $id.account,
	        'ledger_index_min': -1,
	        'limit': 200
	      };

	      var getTx = function(){
	        $network.remote.request_account_tx(params)
	        .on('success', function(data) {
	          if (data.transactions.length) {
	            for(var i=0;i<data.transactions.length;i++) {
	              var date = ripple.utils.toTimestamp(data.transactions[i].tx.date);

	              if(date < dateMin.getTime()) {
	                completed = true;
	                break;
	              }

	              if(date > dateMax.getTime())
	                continue;

	              // Push
	              var tx = rewriter.processTxn(data.transactions[i].tx, data.transactions[i].meta, $id.account);
	              if (tx) history.push(tx);
	            }

	            if (data.marker) {
	              params.marker = data.marker;
	              $scope.tx_marker = params.marker;
	            }
	            else {
	              // Received all transactions since a marker was not returned
	              completed = true;
	            }

	            if (completed)
	              callback(history);
	            else
	              getTx();
	          } else {
	            callback(history);
	          }
	        }).request();
	      };

	      getTx(0);
	    };

	    // DateRange filter form
	    $scope.submitDateRangeForm = function() {
	      $scope.dateMaxView.setDate($scope.dateMaxView.getDate() + 1); // Including last date
	      changeDateRange($scope.dateMinView,$scope.dateMaxView);
	    };

	    $scope.submitMinimumAmountForm = function() {
	      updateHistory();
	    };

	    var changeDateRange = function(dateMin,dateMax) {
	      history = [];
	      $scope.historyState = 'loading';

	      getDateRangeHistory(dateMin,dateMax,function(hist){
	        $scope.$apply(function () {
	          history = hist;
	          $scope.historyState = 'ready';
	          updateHistory();
	        });
	      });
	    };

	    // All the currencies
	    $scope.$watch('balances', function(){
	      updateCurrencies();
	    });

	    // Types filter has been changed
	    $scope.$watch('types', function(){
	      var arr = [];
	      var checked = {};
	      _.each($scope.types, function(type,index){
	        if (type.checked) {
	          arr = arr.concat(type.types);
	        }

	        checked[index] = {
	          checked: !!type.checked
	        };
	      });
	      $scope.filters.types = arr;

	      if (!store.disabled) {
	        store.set('ripple_history_type_selections', checked);
	      }
	    }, true);

	    if (!store.disabled) {
	      $scope.$watch('filters', function(){
	        store.set('ripple_history_filters', $scope.filters);
	      }, true);
	    }

	    $scope.$watch('filters.types', function(){
	      updateHistory();
	    }, true);

	    // Currency filter has been changed
	    $scope.$watch('filters.currencies', function(){
	      updateCurrencies();
	      updateHistory();
	    }, true);

	    // New transactions
	    $scope.$watchCollection('history',function(){
	      history = $scope.history;

	      updateHistory();

	      // Update currencies
	      if (history.length)
	        updateCurrencies();
	    },true);

	    // Updates the history collection
	    var updateHistory = function (){

	      //$scope.typeUsage = [];
	      //$scope.currencyUsage = [];
	      $scope.historyShow = [];

	      if (history.length) {
	        var dateMin, dateMax;

	        $scope.minLedger = 0;

	        var currencies = _.map($scope.filters.currencies,function(obj,key){return obj.checked ? key : false;});
	        history.forEach(function(event)
	        {

	          // Calculate dateMin/dateMax. Used in date filter view
	          if (!$scope.dateMinView) {
	            if (!dateMin || dateMin > event.date)
	              dateMin = event.date;

	            if (!dateMax || dateMax < event.date)
	              dateMax = event.date;
	          }

	          var affectedCurrencies = _.map(event.affected_currencies, function (currencyCode) {
	            return ripple.Currency.from_json(currencyCode).to_human();
	          });

	          // Update currencies
	          historyCurrencies = _.union(historyCurrencies, affectedCurrencies); // TODO put in one large array, then union outside of foreach

	          // Calculate min ledger. Used in "load more"
	          if (!$scope.minLedger || $scope.minLedger > event.ledger_index)
	            $scope.minLedger = event.ledger_index;

	          // Type filter
	          if (event.transaction && event.transaction.type === 'error') ; // Always show errors
	          else if (event.transaction && !_.contains($scope.filters.types,event.transaction.type))
	            return;

	          // Some events don't have transactions.. this is a temporary fix for filtering offers
	          else if (!event.transaction && !_.contains($scope.filters.types,'offernew'))
	            return;

	          // Currency filter
	          //if ($scope.filters.currencies_is_active && _.intersection(currencies,event.affected_currencies).length <= 0)
	          //  return;

	          var effects = [];
	          var isFundedTrade = false; // Partially/fully funded
	          var isCancellation = false;

	          if (event.effects) {
	            // Show effects
	            $.each(event.effects, function(){
	              var effect = this;
	              switch (effect.type) {
	                case 'offer_funded':
	                case 'offer_partially_funded':
	                case 'offer_bought':
	                  isFundedTrade = true;
	                  /* falls through */
	                case 'offer_cancelled':
	                  if (effect.type === 'offer_cancelled') {
	                    isCancellation = true;
	                    if (event.transaction && event.transaction.type === 'offercancel')
	                      return;
	                  }
	                  effects.push(effect);
	                  break;
	              }
	            });

	            event.showEffects = effects;

	            // Trade filter - remove open orders that haven't been filled/partially filled
	            if (_.contains($scope.filters.types,'exchange') && !_.contains($scope.filters.types,'offercancel')) {
	              if ((event.transaction && event.transaction.type === 'offernew' && !isFundedTrade) || isCancellation)
	                return;
	            }

	            effects = [ ];

	            var amount, maxAmount;
	            var minimumAmount = $scope.filters.minimumAmount;

	            // Balance changer effects
	            $.each(event.effects, function(){
	              var effect = this;
	              switch (effect.type) {
	                case 'fee':
	                case 'balance_change':
	                case 'trust_change_balance':
	                  effects.push(effect);

	                  // Minimum amount filter
	                  if (effect.type === 'balance_change' || effect.type === 'trust_change_balance') {
	                    amount = effect.amount.abs().is_native()
	                      ? effect.amount.abs().to_number() / 1000000
	                      : effect.amount.abs().to_number();

	                    if (!maxAmount || amount > maxAmount)
	                      maxAmount = amount;
	                    }
	                  break;
	              }
	            });

	            // Minimum amount filter
	            if (maxAmount && minimumAmount > maxAmount)
	              return;

	            event.balanceEffects = effects;
	          }

	          // Don't show sequence update events
	          if (event.effects && 1 === event.effects.length && event.effects[0].type == 'fee')
	            return;

	          // Push events to history collection
	          $scope.historyShow.push(event);

	          // Type and currency usages
	          // TODO offers/trusts
	          //if (event.transaction)
	          //  $scope.typeUsage[event.transaction.type] = $scope.typeUsage[event.transaction.type] ? $scope.typeUsage[event.transaction.type]+1 : 1;

	          //event.affected_currencies.forEach(function(currency){
	          //  $scope.currencyUsage[currency] = $scope.currencyUsage[currency]? $scope.currencyUsage[currency]+1 : 1;
	          //});
	        });

	        if ($scope.historyShow.length && !$scope.dateMinView) {
	          setValidDateOnScopeOrNullify('dateMinView', dateMin);
	          setValidDateOnScopeOrNullify('dateMaxView', dateMax);
	        }
	      }
	    };

	    // Update the currency list
	    var updateCurrencies = function (){
	      if (!$.isEmptyObject($scope.balances)) {
	        var currencies = _.union(
	          ['XRP'],
	          _.map($scope.balances,function(obj,key){return obj.total.currency().to_human();}),
	          historyCurrencies
	        );

	        var objCurrencies = {};

	        var firstProcess = $.isEmptyObject($scope.filters.currencies);

	        $scope.filters.currencies_is_active = false;

	        _.each(currencies, function(currency){
	          var checked = ($scope.filters.currencies[currency] && $scope.filters.currencies[currency].checked) || firstProcess;
	          objCurrencies[currency] = {'checked':checked};

	          if (!checked)
	            $scope.filters.currencies_is_active = true;
	        });

	        $scope.filters.currencies = objCurrencies;
	      }
	    };

	    var setValidDateOnScopeOrNullify = function(key, value) {
	      if (isNaN(value) || value == null) {
	        $scope[key] = null;
	      } else {
	        $scope[key] = new Date(value);
	      }
	    };

	    $scope.loadMore = function () {
	      var dateMin = $scope.dateMinView;
	      var dateMax = $scope.dateMaxView;

	      $scope.historyState = 'loading';

	      var limit = 100; // TODO why 100?

	      var params = {
	        account: $id.account,
	        ledger_index_min: -1,
	        limit: limit,
	        marker: $scope.tx_marker
	      };

	      $network.remote.request_account_tx(params)
	      .on('success', function(data) {
	        $scope.$apply(function () {
	          if (data.transactions.length < limit) {

	          }

	          $scope.tx_marker = data.marker;

	          if (data.transactions) {
	            var transactions = [];

	            data.transactions.forEach(function (e) {
	              var tx = rewriter.processTxn(e.tx, e.meta, $id.account);
	              if (tx) {
	                var date = ripple.utils.toTimestamp(tx.date);

	                if (dateMin && dateMax) {
	                  if (date < dateMin.getTime() || date > dateMax.getTime())
	                    return;
	                } else if (dateMax && date > dateMax.getTime()) {
	                  return;
	                } else if (dateMin && date < dateMin.getTime()) {
	                  return;
	                }
	                transactions.push(tx);
	              }
	            });

	            var newHistory = _.uniq(history.concat(transactions),false,function(ev) {return ev.hash;});

	            $scope.historyState = (history.length === newHistory.length) ? 'full' : 'ready';
	            history = newHistory;
	            updateHistory();
	          }
	        });
	      }).request();
	    };

	    var exists = function(pty) {
	      return typeof pty !== 'undefined';
	    };

	    // Change first letter of string to uppercase or lowercase
	    var capFirst = function(str, caps) {
	      var first = str.charAt(0);
	      return (caps ? first.toUpperCase() : first.toLowerCase()) + str.slice(1);
	    };

	    var rippleName = function(address) {
	      var name;
	      if (address !== '') name = webUtil.isContact($scope.userBlob.data.contacts, address);
	      return name ? name : address;
	    };

	    var issuerToString = function(issuer) {
	      var iss = issuer.to_json();
	      return typeof iss === 'number' && isNaN(iss) ? '' : iss;
	    };

	    // Convert Amount value to human-readable format
	    var formatAmount = function(amount) {
	      var formatted = '';

	      if (amount instanceof Amount) {
	        formatted = amount.to_human({group_sep: false, precision: 2});

	        // If amount is very small and only has zeros (ex. 0.0000), raise precision
	        if (formatted.length > 1 && 0 === +formatted) {
	          formatted = amount.to_human({group_sep: false, precision: 20, max_sig_digits: 5});
	        }
	      }

	      return formatted;
	    };

	    $scope.exportCsv = function() {

	      // Header (1st line) of CSV with name of each field
	      // Ensure that the field values for each row added in addLineToCsvToCsv() correspond in this order
	      var csv = 'Date,Time,Ledger Number,Transaction Type,Trust address,' +
	        'Address sent from,Amount sent/sold,Currency sent/sold,Issuer of sent/sold ccy,' +
	        'Address sent to,Amount received,Currency received,Issuer of received ccy,' +
	        'Executed Price,Network Fee paid,Transaction Hash\r\n';

	      var addLineToCsv = function(line) {
	        // Ensure that the fields match the CSV header initialized in var csv
	        csv += [ line.Date, line.Time, line.LedgerNum, line.TransType, line.TrustAddr,
	          line.FromAddr, line.SentAmount, line.SentCcy, line.SentIssuer,
	          line.ToAddr, line.RecvAmount, line.RecvCcy, line.RecvIssuer,
	          line.ExecPrice, line.Fee, line.TransHash
	          ].join(',') + '\r\n';
	      };

	      // Convert the fields of interest in buy & sell Amounts to strings in Key/Value pairs
	      var getOrderDetails = function(keyVal, buy, sell) {
	        if (buy !== null && buy instanceof Amount) {
	          keyVal.SentAmount = formatAmount(buy);
	          keyVal.SentCcy = buy.currency().get_iso();
	          keyVal.SentIssuer = rippleName(issuerToString(buy.issuer()));
	        }

	        if (sell !== null && sell instanceof Amount) {
	          keyVal.RecvAmount = formatAmount(sell);
	          keyVal.RecvCcy = sell.currency().get_iso();
	          keyVal.RecvIssuer = rippleName(issuerToString(sell.issuer()));
	        }
	      };

	      // Construct a CSV string by:
	      // 1) Iterating over each line item in the *displayed* Transaction History
	      // 2) If the type of Transaction is in scope, convert the relevant fields to strings in Key/Value pairs
	      // 3) Concatenate the strings extracted in (2) in a comma-delimited line and append this line to the CSV
	      for (var i = 0; i < $scope.historyShow.length; i++) {
	        var  histLine = $scope.historyShow[i],
	          transaction = histLine.transaction,
	          type = histLine.tx_type,
	          dateTime = moment(histLine.date),
	          na = 'NA',
	          line = {},
	          lineTemplate = {},
	          lineTrust = {},
	          linePayment = {},
	          lineOffer = {},
	          sent;

	        // Unsuccessful transactions are excluded from the export
	        var transType = exists(transaction) ? transaction.type : null;
	        if (transType === 'failed' || histLine.tx_result !== 'tesSUCCESS') continue;

	        // Fields common to all Transaction types
	        lineTemplate.Date = dateTime.format('YYYY-MM-DD');
	        lineTemplate.Time = dateTime.format('HH:mm:ss');
	        lineTemplate.LedgerNum = histLine.ledger_index;
	        lineTemplate.Fee = formatAmount(Amount.from_json(histLine.fee));
	        lineTemplate.TransHash = histLine.hash;

	        // Default type-specific fields to NA, they will be overridden later if applicable
	        lineTemplate.TrustAddr = lineTemplate.FromAddr = lineTemplate.ToAddr = na;
	        lineTemplate.RecvAmount = lineTemplate.RecvCcy = lineTemplate.ExecPrice = na;

	        // Include if Payment, Trust, Offer. Otherwise Exclude.
	        if (type === 'TrustSet') {
	          // Trust Line (Incoming / Outgoing)
	          var trust = '';

	          if (transType === 'trusted') trust = 'Incoming ';
	          else if (transType === 'trusting') trust = 'Outgoing ';
	          else continue;  // unrecognised trust type

	          lineTrust.TransType = trust + 'trust line';
	          lineTrust.TrustAddr = rippleName(transaction.counterparty);

	          lineTrust.SentAmount = formatAmount(transaction.amount);
	          lineTrust.SentCcy = transaction.currency; //transaction.amount.currency().get_iso();

	          lineTrust.SentIssuer = lineTrust.RecvIssuer = na;

	          line = $.extend({}, lineTemplate, lineTrust);
	          addLineToCsv(line);
	        }
	        else if (type === 'Payment' && transType !== null) {
	          // Payment (Sent / Received)
	          if (transType === 'sent') sent = true;
	          else if (transType === 'received') sent = false;
	          else continue;  // unrecognised payment type

	          linePayment.TransType = capFirst(transType, true) + ' ' + capFirst(type, false);

	          if (sent) {
	            // If sent, counterparty is Address To
	            linePayment.ToAddr = rippleName(transaction.counterparty);
	            linePayment.FromAddr = rippleName($id.account);
	          }
	          else {
	            // If received, counterparty is Address From
	            linePayment.FromAddr = rippleName(transaction.counterparty);
	            linePayment.ToAddr = rippleName($id.account);
	          }

	          if (exists(transaction.amountSent)) {
	            amtSent = transaction.amountSent;
	            linePayment.SentAmount = exists(amtSent.value) ? amtSent.value : formatAmount(Amount.from_json(amtSent));
	            linePayment.SentCcy = exists(amtSent.currency) ? amtSent.currency : 'XRP';
	            if (exists(transaction.sendMax)) linePayment.SentIssuer = rippleName(transaction.sendMax.issuer);
	          }

	          linePayment.RecvAmount = formatAmount(transaction.amount);
	          linePayment.RecvCcy = transaction.currency;
	          linePayment.RecvIssuer = rippleName(issuerToString(transaction.amount.issuer()));

	          line = $.extend({}, lineTemplate, linePayment);
	          addLineToCsv(line);
	        }
	        else if (type === 'Payment' || type === 'OfferCreate' || type === 'OfferCancel') {
	          // Offers (Created / Cancelled / Executed)
	          var effect;

	          if (transType === 'offernew') {
	            getOrderDetails(lineOffer, transaction.gets, transaction.pays);
	            lineOffer.TransType = 'Offer Created';

	            line = $.extend({}, lineTemplate, lineOffer);
	            addLineToCsv(line);
	          }
	          else if (transType === 'offercancel') {
	            for (var e = 0; e < histLine.effects.length; e++) {
	              effect = histLine.effects[e];

	              if (effect.type === 'offer_cancelled') {
	                getOrderDetails(lineOffer, effect.gets, effect.pays);
	                lineOffer.TransType = 'Offer Cancelled';

	                line = $.extend({}, lineTemplate, lineOffer);
	                addLineToCsv(line);

	                break;
	              }
	            }
	          }

	          for (var s = 0; s < histLine.showEffects.length; s++) {
	            effect = histLine.showEffects[s],
	              buy = null,
	              sell = null;
	            lineOffer = {};

	            switch (effect.type) {
	            case 'offer_bought':
	            case 'offer_funded':
	            case 'offer_partially_funded':
	              // Order fills (partial or full)

	              if (effect.type === 'offer_bought') {
	                buy = exists(effect.paid) ? effect.paid : effect.pays;
	                sell = exists(effect.got) ? effect.got : effect.gets;
	              }
	              else {
	                buy = exists(effect.got) ? effect.got : effect.gets;
	                sell = exists(effect.paid) ? effect.paid : effect.pays;
	              }

	              getOrderDetails(lineOffer, buy, sell);
	              lineOffer.TransType = 'Executed offer';
	              lineOffer.ExecPrice = formatAmount(effect.price);

	              line = $.extend({}, lineTemplate, lineOffer);
	              if (s > 0) line.Fee = '';  // Fee only applies once
	              addLineToCsv(line);

	            break;  // end case
	            }
	          }
	        }
	        // else unrecognised Transaction type hence ignored
	      }

	      // Ensure that historyCsv is set to empty string if there is nothing to download,
	      // otherwise the file download will be a single line with header and no data
	      $scope.historyCsv = $scope.historyShow.length ? csv : '';
	    };

	  }]);
	};

	module.exports = HistoryTab;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var util      = __webpack_require__(102);
	var webutil   = __webpack_require__(66);
	var Tab       = __webpack_require__(76).Tab;

	var ContactsTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(ContactsTab, Tab);

	ContactsTab.prototype.tabName = 'contacts';
	ContactsTab.prototype.mainMenu = 'wallet';

	// /contact is the way it appears in Ripple URIs
	ContactsTab.prototype.aliases = ['contact'];

	ContactsTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(80)();
	};

	ContactsTab.prototype.angular = function (module) {
	  module.controller('ContactsCtrl', ['$scope', 'rpId', 'rpTracker',
	    function ($scope, $id, $rpTracker)
	  {
	    if (!$id.loginStatus) return $id.goId();

	    $scope.reset_form = function ()
	    {
	      $scope.contact = {
	        name: '',
	        view: '',
	        address: ''
	      };
	      if ($scope.addForm) $scope.addForm.$setPristine();
	    };

	    $scope.reset_form();

	    /**
	     * Toggle "add contact" form
	     */
	    $scope.toggle_form = function ()
	    {
	      $scope.addform_visible = !$scope.addform_visible;
	      $scope.reset_form();
	    };

	    /**
	     * Create contact
	     */
	    $scope.create = function ()
	    {
	      var contact = {
	        name: $scope.contact.name,
	        view: $scope.contact.view,
	        address: $scope.contact.address
	      };

	      if ($scope.contact.dt) {
	        contact.dt = $scope.contact.dt;
	      }

	      // Enable the animation
	      $scope.enable_highlight = true;

	      // Add an element
	      $scope.userBlob.unshift("/contacts", contact);

	      // Hide the form
	      $scope.toggle_form();

	      // Clear form
	      $scope.reset_form();
	    };
	  }]);

	  module.controller('ContactRowCtrl', ['$scope', '$location',
	    function ($scope, $location) {
	      $scope.editing = false;

	      /**
	       * Switch to edit mode
	       *
	       * @param index
	       */
	      $scope.edit = function (index)
	      {
	        $scope.editing = true;
	        $scope.editname = $scope.entry.name;
	        $scope.editaddress = $scope.entry.address;
	        $scope.editview = $scope.entry.view || $scope.entry.address;
	        $scope.editdt = $scope.entry.dt;
	      };

	      /**
	       * Update contact
	       *
	       * @param index
	       */
	      $scope.update = function (index)
	      {
	        if (!$scope.inlineAddress.editaddress.$error.rpUnique
	            && !$scope.inlineAddress.editaddress.$error.rpDest
	            && !$scope.inlineName.editname.$error.rpUnique) {

	          var entry = {
	            name: $scope.editname,
	            view: $scope.editview,
	            address: $scope.editaddress
	          };

	          if ($scope.editdt) {
	            entry.dt = $scope.editdt;
	          }

	          // Update blob
	          $scope.userBlob.filter('/contacts', 'name', $scope.entry.name,
	                                 'extend', '', entry);
	          // delete destination tag
	          if (!$scope.editdt && $scope.entry.dt) {
	            $scope.userBlob.filter('/contacts', 'name', $scope.entry.name,
	                                   'unset', '/dt');
	          }

	          $scope.editing = false;
	        }
	      };

	      /**
	       * Remove contact
	       *
	       * @param index
	       */
	      $scope.remove = function (name) {
	        // Update blob
	        $scope.userBlob.filter('/contacts', 'name', $scope.entry.name,
	                               'unset', '');
	      };

	      /**
	       * Cancel contact edit
	       *
	       * @param index
	       */
	      $scope.cancel = function (index)
	      {
	        $scope.editing = false;
	      };

	      $scope.send = function (index)
	      {
	        var search = {to: $scope.entry.name};

	        $location.path('/send');
	        $location.search(search);
	      };
	    }]);
	};

	module.exports = ContactsTab;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    webutil = __webpack_require__(66),
	    Tab = __webpack_require__(76).Tab,
	    Amount = ripple.Amount,
	    Base = ripple.Base,
	    Currency = ripple.Currency;

	var ExchangeTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(ExchangeTab, Tab);

	ExchangeTab.prototype.tabName = 'exchange';
	ExchangeTab.prototype.mainMenu = 'exchange';

	ExchangeTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(94)();
	};

	ExchangeTab.prototype.angular = function (module)
	{
	  module.controller('ExchangeCtrl', ['$scope', '$timeout', '$routeParams',
	    'rpId', 'rpNetwork', 'rpTracker', 'rpKeychain', '$rootScope',
	    function ($scope, $timeout, $routeParams, $id, $network, $rpTracker, keychain, $rootScope)
	    {
	      if (!$id.loginStatus) return $id.goId();

	      var timer, pf;

	      // Remember user preference on Convert vs. Trade
	      $rootScope.ripple_exchange_selection_trade = false;

	      var xrpCurrency = Currency.from_json("XRP");

	      $scope.xrp = {
	        name: xrpCurrency.to_human({full_name:$scope.currencies_all_keyed.XRP.name}),
	        code: xrpCurrency.get_iso(),
	        currency: xrpCurrency
	      };

	      $scope.$watch('exchange.amount', function () {
	        $scope.update_exchange();
	      }, true);

	      $scope.$watch('exchange.currency_name', function () {
	        var exchange = $scope.exchange;
	        var currency = Currency.from_human($scope.exchange.currency_name ? $scope.exchange.currency_name : "XRP");
	        exchange.currency_obj = currency;
	        exchange.currency_code = currency.get_iso();
	        exchange.currency_name = currency.to_human({
	          full_name: $scope.currencies_all_keyed[currency.get_iso()] ? $scope.currencies_all_keyed[currency.get_iso()].name : null
	        });
	        $scope.update_exchange();
	      }, true);


	      $scope.reset_paths = function () {
	        var exchange = $scope.exchange;

	        exchange.alternatives = [];
	      };

	      var pathUpdateTimeout;
	      $scope.update_exchange = function () {
	        var exchange = $scope.exchange;
	        var currency = ripple.Currency.from_human(exchange.currency_name);

	        $scope.reset_paths();

	        // if formatted or money to exchange is 0 then don't calculate paths or offer to exchange
	        if (parseFloat(exchange.amount) === 0 || !exchange.currency_name)
	        {
	          $scope.error_type = 'required';
	          return false;
	        }

	        else {
	          $scope.error_type = '';
	        }

	        var matchedCurrency = currency.has_interest() ? currency.to_hex() : currency.get_iso();
	        var match = /^([a-zA-Z0-9]{3}|[A-Fa-f0-9]{40})\b/.exec(matchedCurrency);

	        if (!match) {
	          // Currency code not recognized, should have been caught by
	          // form validator.
	          return;
	        }

	        // Demurrage: Get a reference date five minutes in the future
	        //
	        // Normally, when using demurrage currencies, we would immediately round
	        // down (e.g. 0.99999 instead of 1) as demurrage occurs continuously. Not
	        // a good user experience.
	        //
	        // By choosing a date in the future, this gives us a time window before
	        // this rounding down occurs. Note that for positive interest currencies
	        // this actually *causes* the same odd rounding problem, so in the future
	        // we'll want a better solution, but for right now this does what we need.
	        var refDate = new Date(new Date().getTime() + 5 * 60000);

	        exchange.amount_feedback = Amount.from_human('' + exchange.amount + ' ' + matchedCurrency, { reference_date: refDate });
	        exchange.amount_feedback.set_issuer($id.account);

	        if (exchange.amount_feedback.is_valid() && exchange.amount_feedback.is_positive()) {
	          exchange.path_status = 'pending';
	          exchange.alt = null;

	          if (pathUpdateTimeout) clearTimeout(pathUpdateTimeout);
	          pathUpdateTimeout = $timeout($scope.update_paths, 500);
	        } else {
	          exchange.path_status = 'waiting';
	        }
	      };

	      $scope.update_paths = function () {
	        $scope.$apply(function () {
	          $scope.exchange.path_status = 'pending';
	          var amount = $scope.exchange.amount_feedback;

	          if (amount.is_zero()) return;

	          // Start path find
	          pf = $network.remote.path_find($id.account,
	              $id.account,
	              amount);
	              // $scope.generate_src_currencies());
	              // XXX: Roll back pathfinding changes temporarily
	          var isIssuer = $scope.generate_issuer_currencies();

	          var lastUpdate;

	          pf.on('update', function (upd) {
	            $scope.$apply(function () {
	              lastUpdate = new Date();

	              clearInterval(timer);
	              timer = setInterval(function(){
	                $scope.$apply(function(){
	                  var seconds = Math.round((new Date() - lastUpdate) / 1000);
	                  $scope.lastUpdate = seconds ? seconds : 0;
	                });
	              }, 1000);

	              if (!upd.alternatives || !upd.alternatives.length) {
	                $scope.exchange.path_status  = "no-path";
	                $scope.exchange.alternatives = [];
	              } else {
	                var currencies = {};
	                $scope.exchange.path_status  = "done";
	                $scope.exchange.alternatives = _.filter(_.map(upd.alternatives, function (raw) {
	                  var alt = {};
	                  alt.amount   = Amount.from_json(raw.source_amount);
	                  alt.rate     = alt.amount.ratio_human(amount);
	                  alt.send_max = alt.amount.product_human(Amount.from_json('1.01'));
	                  alt.paths    = raw.paths_computed
	                      ? raw.paths_computed
	                      : raw.paths_canonical;

	                  if (alt.amount.issuer().to_json() != $scope.address && !isIssuer[alt.amount.currency().to_hex()]) {
	                    currencies[alt.amount.currency().to_hex()] = true;
	                  }

	                  return alt;
	                }), function(alt) {
	                  // XXX: Roll back pathfinding changes temporarily
	                  /* if (currencies[alt.amount.currency().to_hex()]) {
	                    return alt.amount.issuer().to_json() != $scope.address;
	                  } */
	                  //return false;
	                  return !(alt.amount.is_native() && $scope.account.max_spend
	                    && $scope.account.max_spend.to_number() > 1
	                    && $scope.account.max_spend.compareTo(alt.amount) < 0);
	                });
	                if (!$scope.exchange.alternatives.length) {
	                  $scope.exchange.path_status  = "no-path";
	                  $scope.exchange.alternatives = [];
	                }
	              }
	            });
	          });
	        });
	      };

	      var updateCurrencyOptions = function(){
	        // create a list of currency codes from the trust line objects
	        var currencies = _.uniq(_.map($scope.lines, function (line) {
	          return line.currency;
	        }));

	        // add XRP
	        currencies.unshift('XRP');

	        // create a currency object for each of the currency codes
	        for (var i=0; i < currencies.length; i++) {
	          currencies[i] = ripple.Currency.from_json(currencies[i]);
	        }

	        // create the display version of the currencies
	        currencies = _.map(currencies, function (currency) {
	          if ($scope.currencies_all_keyed[currency.get_iso()]) {
	            return currency.to_human({full_name:$scope.currencies_all_keyed[currency.get_iso()].name});
	          }

	          return currency.get_iso();
	        });

	        $scope.currency_choices = currencies;
	      };

	      $scope.$on('$balancesUpdate', updateCurrencyOptions);

	      $scope.reset = function () {
	        $scope.mode = "form";

	        // XXX Most of these variables should be properties of $scope.exchange.
	        //     The Angular devs recommend that models be objects due to the way
	        //     scope inheritance works.
	        $scope.exchange = {
	          amount: '',
	          currency_name: $scope.xrp.name,
	          currency_code: $scope.xrp.code,
	          currency_obj: $scope.xrp.currency,
	          path_status: 'waiting',
	          fund_status: 'none'
	        };
	        $scope.nickname = '';
	        $scope.error_type = '';
	        if ($scope.exchangeForm) $scope.exchangeForm.$setPristine(true);
	      };

	      $scope.cancelConfirm = function () {
	        $scope.mode = "form";
	        $scope.exchange.alt = null;
	      };

	      $scope.reset_goto = function (tabName) {
	        $scope.reset();

	        // TODO do something clever instead of document.location
	        // because goToTab does $scope.$digest() which we don't need
	        document.location = '#' + tabName;
	      };

	      /**
	       * N3. Confirmation page
	       */
	      $scope.exchange_prepared = function () {
	        $scope.confirm_wait = true;
	        $timeout(function () {
	          $scope.confirm_wait = false;
	        }, 1000, true);

	        $scope.mode = "confirm";
	      };

	      /**
	       * N4. Waiting for transaction result page
	       */
	      $scope.exchange_confirmed = function () {

	        // parse the currency name and extract the iso
	        var currency = Currency.from_human($scope.exchange.currency_name);
	        currency = currency.has_interest() ? currency.to_hex() : currency.get_iso();
	        var amount = Amount.from_human(""+$scope.exchange.amount+" "+currency);

	        amount.set_issuer($id.account);

	        var tx = $network.remote.transaction();

	        // Add memo to tx
	        tx.addMemo('client', 'rt' + $rootScope.version);

	        // Destination tag
	        tx.destination_tag(webutil.getDestTagFromAddress($id.account));
	        tx.payment($id.account, $id.account, amount.to_json());
	        tx.send_max($scope.exchange.alt.send_max);
	        tx.paths($scope.exchange.alt.paths);

	        if ($scope.exchange.secret) {
	          tx.secret($scope.exchange.secret);
	        } else {
	          // Get secret asynchronously
	          keychain.requestSecret($id.account, $id.username,
	            function (err, secret) {
	              if (err) {
	                console.log("client: exchange tab: error while " +
	                  "unlocking wallet: ", err);
	                $scope.mode = "error";
	                $scope.error_type = "unlockFailed";

	                return;
	              }

	              $scope.exchange.secret = secret;
	              $scope.exchange_confirmed();
	            });
	          return;
	        }

	        tx.on('proposed', function (res) {
	          $scope.$apply(function () {
	            setEngineStatus(res, false);
	            $scope.exchanged(tx.hash);

	            // Remember currency and increase order
	            var found;

	            for (var i = 0; i < $scope.currencies_all.length; i++) {
	              if ($scope.currencies_all[i].value.toLowerCase() === $scope.exchange.amount_feedback.currency().get_iso().toLowerCase()) {
	                $scope.currencies_all[i].order++;
	                found = true;
	                break;
	              }
	            }

	            // // Removed feature until a permanent fix
	            // if (!found) {
	            //   $scope.currencies_all.push({
	            //     "name": $scope.exchange.amount_feedback.currency().to_human().toUpperCase(),
	            //     "value": $scope.exchange.amount_feedback.currency().to_human().toUpperCase(),
	            //     "order": 1
	            //   });
	            // }
	          });
	        });
	        tx.on('success',function(res){
	          setEngineStatus(res, true);
	        });
	        tx.on('error', function (res) {
	          setImmediate(function () {
	            $scope.$apply(function () {
	              $scope.mode = "error";

	              if (res.result === "tejMaxFeeExceeded") {
	                $scope.error_type = "maxFeeExceeded";
	              }

	              if (res.error === 'remoteError' &&
	                  res.remote.error === 'noPath') {
	                $scope.mode = "status";
	                $scope.tx_result = "noPath";
	              }
	            });
	          });
	        });
	        tx.submit();

	        $scope.mode = "sending";
	      };

	      /**
	       * N6. exchanged page
	       */
	      $scope.exchanged = function (hash) {
	        $scope.mode = "status";
	        $network.remote.on('transaction', handleAccountEvent);

	        function handleAccountEvent(e) {
	          $scope.$apply(function () {
	            if (e.transaction.hash === hash) {
	              setEngineStatus(e, true);
	              $network.remote.removeListener('transaction', handleAccountEvent);
	            }
	          });
	        }
	      };

	      function setEngineStatus(res, accepted) {
	        $scope.engine_result = res.engine_result;
	        $scope.engine_result_message = res.engine_result_message;
	        switch (res.engine_result.slice(0, 3)) {
	          case 'tes':
	            $scope.tx_result = accepted ? "cleared" : "pending";
	            break;
	          case 'tem':
	            $scope.tx_result = "malformed";
	            break;
	          case 'ter':
	            $scope.tx_result = "failed";
	            break;
	          case 'tep':
	            $scope.tx_result = "partial";
	            break;
	          case 'tec':
	            $scope.tx_result = "claim";
	            break;
	          case 'tef':
	            $scope.tx_result = "failure";
	            break;
	          case 'tel':
	            $scope.tx_result = "local";
	            break;
	          default:
	            console.warn("Unhandled engine status encountered!");
	        }
	      }

	      $scope.reset();

	      updateCurrencyOptions();

	      // Stop the pathfinding when leaving the page
	      $scope.$on('$destroy', function(){
	        if (pf && "function" === typeof pf.close) {
	          pf.close();
	        }
	      });
	    }]);

	  /**
	   * Contact name and address uniqueness validator
	   */
	    // TODO move to global directives
	  module.directive('unique', function() {
	    return {
	      restrict: 'A',
	      require: '?ngModel',
	      link: function ($scope, elm, attr, ctrl) {
	        if (!ctrl) return;

	        var validator = function(value) {
	          var unique = !webutil.getContact($scope.userBlob.data.contacts,value);
	          ctrl.$setValidity('unique', unique);
	          if (unique) return value;
	        };

	        ctrl.$formatters.push(validator);
	        ctrl.$parsers.unshift(validator);

	        attr.$observe('unique', function() {
	          validator(ctrl.$viewValue);
	        });
	      }
	    };
	  });
	};

	module.exports = ExchangeTab;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var Tab = __webpack_require__(76).Tab;

	var AccountTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(AccountTab, Tab);

	AccountTab.prototype.tabName = 'account';
	AccountTab.prototype.mainMenu = 'account';

	AccountTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(82)();
	};

	AccountTab.prototype.extraRoutes = [
	  { name: '/account/:route' }
	];

	AccountTab.prototype.angular = function(module)
	{
	  module.controller('AccountCtrl', ['$scope', '$timeout', 'rpId', 'rpKeychain', '$routeParams',
	    function ($scope, $timeout, $id, keychain, $routeParams)
	    {
	      if (!$id.loginStatus) return $id.goId();
	      if (!$routeParams.route) $routeParams.route = 'public';

	      $scope.rename = function() {
	        $scope.loading = true;
	        $scope.error = false;
	        // Get the master key
	        keychain.getSecret($id.account, $id.username, $scope.password,
	          function (err, masterkey) {
	            if (err) {
	              console.log("client: account tab: error while " +
	                "unlocking wallet: ", err);

	              $scope.error = 'wrongpassword';
	              $scope.loading = false;
	              return;
	            }

	            // Rename
	            $id.rename({
	              new_username: $scope.username,
	              password: $scope.password,
	              masterkey: masterkey
	            }, function(err){
	              if (err) {
	                console.log('client: account tab: error while ' +
	                  'renaming account: ', err);
	                $scope.error = true;
	                $scope.loading = false;
	                return;
	              }

	              // Re-login
	              // TODO implement refresh/relogin in ID.
	              $id.login({
	                username: $scope.username,
	                password: $scope.password
	              }, function (err) {
	                if (err) {
	                  console.log('client: account tab: error while ' +
	                    'logging user in: ', err);
	                  $scope.error = 'cantlogin';
	                  $scope.loading = false;
	                  return;
	                }

	                $scope.success = true;
	                reset();
	              });
	            });
	          }
	        );
	      };

	      var reset = function() {
	        $scope.openForm = false;
	        $scope.username = '';
	        $scope.password = '';
	        $scope.showPassword = true;
	        $scope.loading = false;
	        $scope.error = false;

	        if ($scope.renameForm) {
	          $scope.renameForm.$setPristine(true);
	        }

	      };

	      reset();
	      $scope.success = false;

	    }]
	  );
	};

	module.exports = AccountTab;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var webutil = __webpack_require__(66);
	var Tab = __webpack_require__(76).Tab;
	var Amount = ripple.Amount;
	var Currency = ripple.Currency;

	var TrustTab = function ()
	{
	  Tab.call(this);

	};

	util.inherits(TrustTab, Tab);

	TrustTab.prototype.tabName = 'trust';
	TrustTab.prototype.mainMenu = 'fund';

	TrustTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(84)();
	};

	TrustTab.prototype.angular = function (module)
	{
	  module.controller('TrustCtrl', ['$scope', 'rpBooks', '$timeout', '$routeParams', 'rpId',
	                                  '$filter', 'rpNetwork', 'rpTracker', 'rpKeychain',
	                                  function ($scope, books, $timeout, $routeParams, id,
	                                            $filter, $network, $rpTracker, keychain)
	  {
	    if (!id.loginStatus) return id.goId();

	    $scope.advanced_feature_switch = Options.advanced_feature_switch;
	    $scope.trust = {};

	    // Trust line sorting
	    $scope.sorting = {
	      predicate: 'balance',
	      reverse: true,
	      sort: function(line){
	        return $scope.sorting.predicate === 'currency' ? line.currency : line.balance.to_number();
	      }
	    };

	    $scope.validation_pattern = /^0*(([1-9][0-9]*.?[0-9]*)|(.0*[1-9][0-9]*))$/; //Don't allow zero for new trust lines.

	    $scope.reset = function () {
	      $scope.mode = 'main';
	      var usdCurrency = Currency.from_human('USD');
	      $scope.currency = usdCurrency.to_human({full_name:$scope.currencies_all_keyed[usdCurrency.get_iso()].name});
	      $scope.addform_visible = false;
	      $scope.edituser = '';
	      $scope.amount = '';
	      $scope.allowrippling = false;
	      $scope.counterparty = '';
	      $scope.counterparty_view = '';
	      $scope.counterparty_address = '';
	      $scope.saveAddressName = '';
	      $scope.error_account_reserve = false;
	    };

	    $scope.toggle_form = function () {

	      if($scope.addform_visible) {
	        $scope.reset();
	      } else {
	        $scope.addform_visible = true;
	      }
	    };


	    // User should not even be able to try granting a trust if the reserve is insufficient
	    $scope.$watch('account', function() {
	      $scope.can_add_trust = false;
	      if ($scope.account.Balance && $scope.account.reserve_to_add_trust) {
	        if (!$scope.account.reserve_to_add_trust.subtract($scope.account.Balance).is_positive()
	          || $.isEmptyObject($scope.lines))
	        {
	          $scope.can_add_trust = true;
	        }
	      }
	    }, true);

	    $scope.$watch('counterparty', function() {
	      $scope.error_account_reserve = false;
	      $scope.contact = webutil.getContact($scope.userBlob.data.contacts,$scope.counterparty);
	      if ($scope.contact) {
	        $scope.counterparty_name = $scope.contact.name;
	        $scope.counterparty_address = $scope.contact.address;
	      } else {
	        $scope.counterparty_name = '';
	        $scope.counterparty_address = $scope.counterparty;
	      }
	    }, true);

	    /**

	     * N2. Confirmation page
	     */
	    $scope.grant = function ()
	    {
	      // set variable to show throbber
	      $scope.verifying = true;
	      $scope.error_account_reserve = false;
	      // test if account is valid
	      $network.remote.request_account_info($scope.counterparty_address)
	        // if account is valid then just to confirm page
	        .on('success', function (m){
	          $scope.$apply(function(){
	            // hide throbber
	            $scope.verifying = false;

	            $scope.lineCurrencyObj = Currency.from_human($scope.currency);
	            var matchedCurrency = $scope.lineCurrencyObj.has_interest() ? $scope.lineCurrencyObj.to_hex() : $scope.lineCurrencyObj.get_iso();
	            var match = /^([a-zA-Z0-9]{3}|[A-Fa-f0-9]{40})\b/.exec(matchedCurrency);

	            if (!match) {
	              // Currency code not recognized, should have been caught by
	              // form validator.
	              console.error('Currency code:', match, 'is not recognized');
	              return;
	            }

	            if ($scope.advanced_feature_switch === false || $scope.amount === "") {
	              // $scope.amount = Number(ripple.Amount.consts.max_value);
	              $scope.amount = Options.gateway_max_limit;
	            }

	            var amount = ripple.Amount.from_human('' + $scope.amount + ' ' + $scope.lineCurrencyObj.to_hex(), {reference_date: new Date(+new Date() + 5*60000)});

	            amount.set_issuer($scope.counterparty_address);
	            if (!amount.is_valid()) {
	              // Invalid amount. Indicates a bug in one of the validators.
	              return;
	            }

	            $scope.amount_feedback = amount;

	            $scope.confirm_wait = true;
	            $timeout(function () {
	              $scope.confirm_wait = false;
	            }, 1000, true);

	            $scope.mode = 'confirm';

	            /**
	             * Warning messages
	             *
	             * - firstIssuer
	             * - sameIssuer
	             * - multipleIssuers
	             */
	            currency = amount.currency().to_human({full_name:$scope.currencies_all_keyed[amount.currency().get_iso()].name});
	            var balance = $scope.balances[currency];
	            $scope.currencyWarning = false;

	            // New trust on a currency or no rippling enabled
	            // if (!balance || !$scope.allowrippling) {
	            //   $scope.currencyWarning = 'firstIssuer';
	            // }
	            // else {
	              // Trust limit change
	              // for (var counterparty in balance.components) {
	              //   if (counterparty === $scope.counterparty_address)
	              //     $scope.currencyWarning = 'sameIssuer';
	              // }

	              // Multiple trusts on a same currency
	              // if (!$scope.currencyWarning)
	              //   $scope.currencyWarning = 'multipleIssuers';
	            // }
	          });
	        })
	        .on('error', function (m){
	          setImmediate(function () {
	            $scope.$apply(function(){
	              $scope.verifying = false;
	              $scope.error_account_reserve = true;
	            });
	          });
	        })
	        .request();
	    };

	    /**
	     * N3. Waiting for grant result page
	     */
	    $scope.grant_confirmed = function () {
	      var amount = $scope.amount_feedback.to_json();
	      var tx = $network.remote.transaction();

	      // Add memo to tx
	      tx.addMemo('client', 'rt' + $scope.version);

	      $scope.toggle_form();

	      // Flags
	      tx
	        .rippleLineSet(id.account, amount)
	        .setFlags($scope.allowrippling ? 'ClearNoRipple' : 'NoRipple')
	        .on('proposed', function(res){
	          $scope.$apply(function () {
	            setEngineStatus(res, false);
	            $scope.granted(tx.hash);

	            // Remember currency and increase order
	            var found;

	            for (var i = 0; i < $scope.currencies_all.length; i++) {
	              if ($scope.currencies_all[i].value.toLowerCase() === $scope.amount_feedback.currency().get_iso().toLowerCase()) {
	                $scope.currencies_all[i].order++;
	                found = true;
	                break;
	              }
	            }

	            // // Removed feature until a permanent fix
	            // if (!found) {
	            //   $scope.currencies_all.push({
	            //     'name': currency,
	            //     'value': currency,
	            //     'order': 1
	            //   });
	            // }
	          });
	        })
	        .on('success', function(res){
	          $scope.$apply(function () {
	            setEngineStatus(res, true);
	          });
	        })
	        .on('error', function(res){
	          setImmediate(function () {
	            $scope.$apply(function () {
	              $scope.mode = 'error';
	            });
	          });
	        })
	      ;

	      keychain.requestSecret(id.account, id.username, function (err, secret) {
	        // XXX Error handling
	        if (err) return;

	        $scope.mode = 'granting';

	        tx.secret(secret);
	        tx.submit();
	        if(tx.tx_json.LimitAmount.issuer == "rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67") {
	          store.set('gbi_connected', true);
	        }
	      });
	    };

	    /**
	     * N5. Granted page
	     */
	    $scope.granted = function (hash) {
	      $scope.mode = 'granted';
	      $network.remote.on('transaction', handleAccountEvent);

	      function handleAccountEvent(e) {
	        $scope.$apply(function () {
	          if (e.transaction.hash === hash) {
	            setEngineStatus(e, true);
	            $network.remote.removeListener('transaction', handleAccountEvent);
	          }
	        });
	      }

	      $timeout(function(){
	        $scope.mode = 'main';
	      }, 10000);
	    };

	    function setEngineStatus(res, accepted) {
	      $scope.engine_result = res.engine_result;
	      $scope.engine_result_message = res.engine_result_message;

	      switch (res.engine_result.slice(0, 3)) {
	        case 'tes':
	          $scope.tx_result = accepted ? 'cleared' : 'pending';
	          break;
	        case 'tem':
	          $scope.tx_result = 'malformed';
	          break;
	        case 'ter':
	          $scope.tx_result = 'failed';
	          break;
	        case 'tec':
	          $scope.tx_result = 'failed';
	          break;
	        case 'tel':
	          $scope.tx_result = "local";
	          break;
	        case 'tep':
	          console.warn('Unhandled engine status encountered!');
	      }
	    }

	    $scope.edit_line = function ()
	    {
	      var line = this.component;
	      var filterAddress = $filter('rpcontactnamefull');
	      var contact = filterAddress(line.issuer);
	      $scope.line = this.component;
	      $scope.edituser = (contact) ? contact : 'User';
	      $scope.validation_pattern = contact ? /^[0-9.]+$/ : /^0*(([1-9][0-9]*.?[0-9]*)|(.0*[1-9][0-9]*))$/;

	      var lineCurrency = Currency.from_json(line.currency);
	      var formatOpts;
	      if ($scope.currencies_all_keyed[lineCurrency.get_iso()]) {
	        formatOpts = {
	          full_name:$scope.currencies_all_keyed[lineCurrency.get_iso()].name
	        };
	      }

	      $scope.lineCurrencyObj = lineCurrency;
	      $scope.currency = lineCurrency.to_human(formatOpts);
	      $scope.balance = line.balance.to_human();
	      $scope.balanceAmount = line.balance;
	      $scope.counterparty = line.issuer;
	      $scope.counterparty_view = contact;

	      $scope.amount = line.max.currency().has_interest()
	        ? +Math.round(line.max.applyInterest(new Date()).to_text())
	        : +line.max.to_text();

	      $scope.allowrippling = line.rippling;

	      // Close/open form. Triggers focus on input.
	      $scope.addform_visible = false;

	      $scope.load_orderbook();
	    };

	    $scope.$watch('userBlob.data.contacts', function (contacts) {
	      $scope.counterparty_query = webutil.queryFromContacts(contacts);
	    }, true);

	    $scope.currency_query = webutil.queryFromOptionsIncludingKeys($scope.currencies_all);

	    $scope.reset();

	    var updateAccountLines = function() {
	      var obj = {};

	      _.each($scope.lines, function(line){
	        if (!obj[line.currency]) {
	          obj[line.currency] = { components: [] };
	        }

	        obj[line.currency].components.push(line);
	        if(line.account == "rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67"){
	          store.set('gbi_connected', true);
	        }
	      });

	      $scope.accountLines = obj;
	      return;
	    };

	    $scope.$on('$balancesUpdate', function(){
	      updateAccountLines();
	    });

	    updateAccountLines();
	  }]);

	  module.controller('AccountRowCtrl', ['$scope', 'rpBooks', 'rpNetwork', 'rpId', 'rpKeychain', '$timeout',
	    function ($scope, books, $network, id, keychain, $timeout) {

	      $scope.validation_pattern = /^0*(([0-9]*.?[0-9]*)|(.0*[1-9][0-9]*))$/;

	      $scope.cancel = function () {
	        $scope.editing = false;
	      };


	      $scope.edit_account = function() {
	        $scope.editing = true;

	        $scope.trust = {};
	        $scope.trust.limit = Number($scope.component.limit.to_json().value);
	        $scope.trust.rippling = !$scope.component.no_ripple;
	        $scope.trust.limit_peer = Number($scope.component.limit_peer.to_json().value);
	        $scope.trust.balance = String($scope.component.balance.to_json().value);
	        $scope.trust.balanceAmount = $scope.component.balance;

	        var currency = Currency.from_human($scope.component.currency);

	        currency.to_human({full_name:$scope.currencies_all_keyed[currency.get_iso()]})
	          ? $scope.trust.currency = currency.to_human({full_name:$scope.currencies_all_keyed[currency]})
	          : $scope.trust.currency = currency.to_human({full_name:$scope.currencies_all_keyed[currency.get_iso()].name});

	        // $scope.trust.currency = currency.to_human({full_name:$scope.currencies_all_keyed[currency.get_iso()].name});
	        $scope.trust.counterparty = $scope.component.account;

	        $scope.load_orderbook();
	      };

	      $scope.delete_account = function()
	      {
	        $scope.trust.loading = true;
	        $scope.load_notification("remove_gateway");

	        var setSecretAndSubmit = function(tx) {
	          keychain.requestSecret(id.account, id.username, function (err, secret) {
	            if (err) {
	              $scope.mode = 'error';
	              console.log('Error on requestSecret: ', err);
	              $scope.trust.loading = false;
	              $scope.load_notification("error");
	              return;
	            }

	            tx.secret(secret);

	            tx.submit(function(err, res) {
	              if (err) {
	                $scope.mode = 'error';
	                console.log('Error on tx submit: ', err);
	                $scope.trust.loading = false;
	                $scope.load_notification("error");
	                return;
	              }

	              console.log('Transaction has been submitted with response:', res);
	              $scope.trust.loading = false;
	              $scope.load_notification("gateway_removed");
	            });

	          });
	        };

	        var nullifyTrustLine = function(idAccount, lineCurrency, lineAccount) {
	          var tx = $network.remote.transaction();

	          // Add memo to tx
	          tx.addMemo('client', 'rt' + $scope.version);

	          tx.trustSet(idAccount, '0' + '/' + lineCurrency + '/' + lineAccount);
	          tx.setFlags('ClearNoRipple');

	          setSecretAndSubmit(tx);
	        };

	        var clearBalance = function(selfAddress, issuerAddress, curr, amountObject, callback) {

	          // Decision tree: two paths
	          // 1) There is a market -> send back balance to user as XRP
	          // 2) There is no market -> send back balance to issuer

	          var sendBalanceToSelf = function() {
	            var tx = $network.remote.transaction();

	            // Add memo to tx
	            tx.addMemo('client', 'rt' + $scope.version);

	            var payment = tx.payment(selfAddress, selfAddress, '100000000000');

	            payment.setFlags('PartialPayment');
	            payment.sendMax(amountObject.to_human() + '/' + curr + '/' + issuerAddress);

	            return tx;
	          };

	          var sendBalanceToIssuer = function() {
	            var tx = $network.remote.transaction();

	            // Add memo to tx
	            tx.addMemo('client', 'rt' + $scope.version);

	            var amount = amountObject.clone();
	            var newAmount = amount.set_issuer(issuerAddress);
	            var payment = tx.payment(selfAddress, issuerAddress, newAmount);

	            return tx;
	          };

	          var tx = ($scope.orderbookStatus === 'exists') ? sendBalanceToSelf() : sendBalanceToIssuer();

	          setSecretAndSubmit(tx);

	          tx.once('proposed', callback);
	        };

	        // $scope.counterparty inside the clearBalance callback function does not have counterparty in its scope, therefore, we need an immediate function to capture it.

	        if ($scope.trust.balance !== '0') {
	          (function (counterparty) {
	            clearBalance(id.account, $scope.trust.counterparty, $scope.trust.currency, $scope.trust.balanceAmount, function(res) {
	              nullifyTrustLine(id.account, $scope.trust.currency, counterparty);
	            });
	          })($scope.trust.counterparty);
	          if($scope.trust.counterparty == "rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67") {
	            store.set('gbi_connected', false);
	          }
	        }

	        else {
	          nullifyTrustLine(id.account, $scope.trust.currency, $scope.trust.counterparty);
	          if($scope.trust.counterparty == "rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67") {
	            store.set('gbi_connected', false);
	          }
	        }

	      };

	      $scope.load_orderbook = function() {
	        $scope.orderbookStatus = false;

	        if ($scope.book) {
	          $scope.book.unsubscribe();
	        }

	        $scope.book = books.get({
	          currency: $scope.trust.currency,
	          issuer: $scope.trust.counterparty
	        }, {

	          currency: 'XRP',
	          issuer: undefined
	        });

	        $scope.$watchCollection('book', function () {
	          if (!$scope.book.updated) return;

	          if ($scope.book.asks.length !== 0 && $scope.book.bids.length !== 0) {
	            $scope.orderbookStatus = 'exists';
	          } else {
	            $scope.orderbookStatus = 'not';
	          }
	        });

	      };

	      $scope.save_account = function () {

	        $scope.trust.loading = true;

	        $scope.load_notification('loading');

	        var amount = ripple.Amount.from_human(
	          $scope.trust.limit + ' ' + $scope.component.currency,
	          {reference_date: new Date(+new Date() + 5*60000)}
	        );

	        amount.set_issuer($scope.component.account);

	        if (!amount.is_valid()) {
	          // Invalid amount. Indicates a bug in one of the validators.
	          console.log('Invalid amount');
	          return;
	        }

	        var tx = $network.remote.transaction();

	        // Add memo to tx
	        tx.addMemo('client', 'rt' + $scope.version);

	        // Flags
	        tx
	          .rippleLineSet(id.account, amount)
	          .setFlags($scope.trust.rippling ? 'ClearNoRipple' : 'NoRipple')
	          .on('success', function(res){
	            $scope.$apply(function () {
	              setEngineStatus(res, true);

	              $scope.trust.loading = false;
	              $scope.load_notification('success');
	              $scope.editing = false;
	            });
	          })
	          .on('error', function(res){
	            console.log('error', res);
	            setImmediate(function () {
	              $scope.$apply(function () {
	                $scope.mode = 'error';

	                $scope.trust.loading = false;
	                $scope.load_notification("error");
	                $scope.editing = false;
	              });
	            });
	          });

	        function setEngineStatus(res, accepted) {
	          $scope.engine_result = res.engine_result;
	          $scope.engine_result_message = res.engine_result_message;

	          switch (res.engine_result.slice(0, 3)) {
	            case 'tes':
	              $scope.tx_result = accepted ? 'cleared' : 'pending';
	              break;
	            case 'tem':
	              $scope.tx_result = 'malformed';
	              break;
	            case 'ter':
	              $scope.tx_result = 'failed';
	              break;
	            case 'tec':
	              $scope.tx_result = 'failed';
	              break;
	            case 'tel':
	              $scope.tx_result = "local";
	              break;
	            case 'tep':
	              console.warn('Unhandled engine status encountered!');
	          }
	        }

	        keychain.requestSecret(id.account, id.username, function (err, secret) {
	          // XXX Error handling
	          if (err) {
	            $scope.trust.loading = false;
	            $scope.load_notification('error');

	            return;
	          }

	          $scope.mode = 'granting';

	          tx.secret(secret);
	          tx.submit();
	        });
	      };

	    }]);

	};



	module.exports = TrustTab;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    webutil = __webpack_require__(66),
	    Tab = __webpack_require__(76).Tab,
	    Amount = ripple.Amount,
	    Currency = ripple.Currency,
	    Base = ripple.Base,
	    RippleError = ripple.RippleError;

	var SendTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(SendTab, Tab);

	SendTab.prototype.tabName = 'send';
	SendTab.prototype.mainMenu = 'send';

	SendTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['federation', 'keychain']);

	SendTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(87)();
	};

	SendTab.prototype.angular = function (module)
	{
	  module.controller('SendCtrl', ['$scope', '$timeout', '$routeParams', 'rpId',
	                                 'rpNetwork', 'rpFederation', 'rpTracker',
	                                 'rpKeychain',
	                                 function ($scope, $timeout, $routeParams, $id,
	                                           $network, $federation, $rpTracker,
	                                           keychain)
	  {
	    if (!$id.loginStatus) return $id.goId();

	    var timer;

	    // XRP currency object.
	    // {name: "XRP - Ripples", order: 146, value: "XRP"}
	    var xrpCurrency = Currency.from_json("XRP");

	    $scope.xrp = {
	      name: xrpCurrency.to_human({full_name:$scope.currencies_all_keyed.XRP.name}),
	      code: xrpCurrency.get_iso(),
	      currency: xrpCurrency
	    };

	    $scope.$watch('send.recipient', function(){
	      // raw address without any parameters
	      var address = webutil.stripRippleAddress($scope.send.recipient);
	      var dt = webutil.getDestTagFromAddress($scope.send.recipient);

	      if (dt) {
	          $scope.send.dt = dt;
	      }

	      $scope.contact = webutil.getContact($scope.userBlob.data.contacts, address);

	      // Sets
	      // send.recipient, send.recipient_name, send.recipient_address, send.dt.
	      if ($scope.contact) {
	        if ($scope.send.recipient === $scope.contact.address) {
	          $scope.send.recipient = $scope.contact.name;
	        }
	        $scope.send.recipient_name = $scope.contact.name;
	        $scope.send.recipient_address = $scope.contact.address;

	        if ($scope.contact.dt && !dt) {
	          $scope.send.dt = $scope.contact.dt;
	        }
	      }
	      else {
	        $scope.send.recipient_name = '';
	        $scope.send.recipient_address = address;
	      }

	      $scope.update_destination();
	    }, true);

	    $scope.$watch('send.currency', function () {
	      var currency = ripple.Currency.from_json($scope.send.currency);
	      if ($scope.send.currency !== '' && currency.is_valid()) {
	        $scope.send.currency_code = currency.to_human().toUpperCase();
	      } else {
	        $scope.send.currency_code = '';
	      }
	      $scope.update_currency();
	    }, true);

	    $scope.$watch('send.amount', function () {
	      $scope.update_amount();
	    }, true);

	    $scope.$watch('send.extra_fields', function () {
	      $scope.update_amount();
	    }, true);

	    // When the send form is invalid, path finding won't trigger. So if the form
	    // is changed by one of the update_* handlers and becomes valid during the
	    // next digest, we need to manually trigger another update_amount.
	    $scope.$watch('sendForm.$valid', function () {
	      $scope.update_amount();
	    });

	    var destUpdateTimeout;

	    // Reset everything that depends on the destination
	    $scope.reset_destination_deps = function() {
	      var send = $scope.send;
	      send.self = false;
	      send.quote_url = false;
	      send.federation = false;
	      send.fund_status = "none";
	      send.extra_fields = [];

	      // Reset federation address validity status
	      if ($scope.sendForm && $scope.sendForm.send_destination)
	        $scope.sendForm.send_destination.$setValidity("federation", true);

	      // Now starting to work on resolving the recipient
	      send.recipient_resolved = false;
	      send.recipient_actual = void(0);
	      send.amount_actual = void(0);

	      $scope.reset_currency_deps();
	    };

	    $scope.check_dt_visibility = function () {
	      var send = $scope.send;

	      send.show_dt_field =
	          ($routeParams.dt
	          || send.dt
	          || (send.recipient_info &&
	          'object' === typeof send.recipient_info &&
	          send.recipient_info.dest_tag_required))
	          && !send.federation;
	    };

	    $scope.update_destination = function () {
	      var send = $scope.send;
	      var recipient = send.recipient_address;

	      if (recipient === send.last_recipient) return;

	      // Trying to send to a Bitcoin address
	      if (!isNaN(Base.decode_check([0, 5], recipient, 'bitcoin'))) {
	        if (Options.bridge.out.bitcoin) { // And there is a default bridge
	          recipient += '@' + Options.bridge.out.bitcoin;
	          send.recipient_address = recipient;
	        }
	      }

	      send.last_recipient = recipient;

	      $scope.reset_destination_deps();

	      // Trying to send XRP to self.
	      // This is used to disable 'Send XRP' button
	      send.self = recipient === $scope.address;

	      // Trying to send to a Ripple name
	      send.rippleName = webutil.isRippleName(recipient);

	      // Trying to send to an email/federation address
	      send.federation = ("string" === typeof recipient) && ~recipient.indexOf('@');

	      // Check destination tag visibility
	      $scope.check_dt_visibility();

	      if (destUpdateTimeout) $timeout.cancel(destUpdateTimeout);
	      destUpdateTimeout = $timeout($scope.update_destination_remote, 500);
	    };

	    $scope.update_destination_remote = function () {
	      var send = $scope.send;
	      var recipient = send.recipient_address;

	      // Reset federation address validity status
	      if ($scope.sendForm && $scope.sendForm.send_destination)
	        $scope.sendForm.send_destination.$setValidity("federation", true);

	      // If there was a previous federation request, we need to clean it up here.
	      if (send.federation_record) {
	        send.federation_record = null;
	        send.dt = null;
	      }

	      if (send.federation) {
	        send.path_status = "fed-check";
	        $federation.check_email(recipient)
	          .then(function (result) {
	            // Check if this request is still current, exit if not
	            var now_recipient = send.recipient_address;
	            if (recipient !== now_recipient) return;

	            send.federation_record = result;

	            if (result.extra_fields) {
	              send.extra_fields = result.extra_fields;
	            }

	            send.dt = ("number" === typeof result.dt) ? result.dt : undefined;

	            if (result.destination_address) {
	              // Federation record specifies destination
	              send.recipient_name = recipient;
	              send.recipient_address = result.destination_address;

	              $scope.check_destination();
	            } else if (result.quote_url) {
	              // Federation destination requires us to request a quote
	              send.quote_url = result.quote_url;
	              send.quote_destination = result.destination;
	              send.path_status = "waiting";
	              $scope.update_currency_constraints();
	            } else {
	              // Invalid federation result
	              send.path_status = "waiting";
	              $scope.sendForm.send_destination.$setValidity("federation", false);
	              // XXX Show specific error message
	            }
	          }, function () {
	            // Check if this request is still current, exit if not
	            var now_recipient = send.recipient_actual || send.recipient_address;
	            if (recipient !== now_recipient) return;

	            send.path_status = "waiting";
	            $scope.sendForm.send_destination.$setValidity("federation", false);
	          })
	        ;
	      }
	      else if (send.rippleName) {
	        ripple.AuthInfo.get(Options.domain,send.recipient,function(err, response) {
	          $scope.$apply(function(){
	            send.recipient_name = '~' + response.username;
	            send.recipient_address = response.address;
	          });

	          $scope.check_destination();
	        });
	      }
	      else {
	        $scope.check_destination();
	      }
	    };

	    // Check destination for XRP sufficiency and flags
	    $scope.check_destination = function () {
	      var send = $scope.send;
	      var recipient = send.recipient_actual || send.recipient_address;

	      if (!ripple.UInt160.is_valid(recipient)) return;

	      var account = $network.remote.account(recipient);

	      send.path_status = 'checking';
	      send.recipient_info = null;
	      account.entry(function (e, data) {
	        $scope.$apply(function () {
	          // Check if this request is still current, exit if not
	          var now_recipient = send.recipient_actual || send.recipient_address;
	          if (recipient !== now_recipient) return;

	          // If we get this far, we have a Ripple address resolved
	          send.recipient_resolved = true;

	          if (e) {
	            if (e.remote.error === "actNotFound") {
	              send.recipient_info = {
	                'loaded': true,
	                'exists': false,
	                'Balance': "0"
	              };
	              $scope.update_currency_constraints();
	            } else {
	              // XXX Actual error
	            }
	          } else {
	            send.recipient_info = {
	              'loaded': true,
	              'exists': true,
	              'Balance': data.account_data.Balance,

	              // Flags
	              'disallow_xrp': data.account_data.Flags & ripple.Remote.flags.account_root.DisallowXRP,
	              'dest_tag_required': data.account_data.Flags & ripple.Remote.flags.account_root.RequireDestTag
	            };

	            // Check destination tag visibility
	            $scope.check_dt_visibility();

	            if (!$scope.account || !$scope.account.reserve_base) return;

	            var reserve_base = $scope.account.reserve_base;
	            send.xrp_deficiency = reserve_base.subtract(data.account_data.Balance);

	            send.recipient_lines = false;
	            $scope.update_currency_constraints();
	          }
	        });
	      });
	    };

	    /**
	     * Update any constraints on what currencies the user can select.
	     *
	     * In many modes, the user is restricted in terms of what they can send.
	     * For example, when sending to a Bitcoin address, they can only send BTC.
	     *
	     * This function checks those conditions and updates the UI.
	     */
	    $scope.update_currency_constraints = function () {
	      var send = $scope.send;

	      // Reset constraints
	      send.currency_choices = $scope.currencies_all;
	      send.currency_force = false;

	      send.currency_choices_constraints = {};

	      // Federation response can specific a fixed amount
	      if (send.federation_record &&
	          "undefined" !== typeof send.federation_record.amount) {
	        send.force_amount = Amount.from_json(send.federation_record.amount);
	        send.amount = send.force_amount.to_text();
	        send.currency_choices_constraints.federation = [send.force_amount.currency().to_json()];

	      // Apply federation currency restrictions
	      } else if (send.federation_record &&
	          $.isArray(send.federation_record.currencies) &&
	          send.federation_record.currencies.length >= 1 &&
	          "object" === typeof send.federation_record.currencies[0] &&
	          "string" === typeof send.federation_record.currencies[0].currency) {
	        // XXX Do some validation on this
	        send.currency_choices_constraints.federation = [];
	        $.each(send.federation_record.currencies, function () {
	          send.currency_choices_constraints.federation.push(this.currency);
	        });
	      }

	      // If this a bridge where we need a quote, we need to enter an
	      // amount first, before we can even find out who the recipient is. So
	      // if there is a quote_url, we want to bypass the recipient-based
	      // constraints.
	      if (send.quote_url) {
	        $scope.update_currency_choices();
	        return;
	      }

	      // If we don't have information about the recipient Ripple account yet,
	      // we'll just return. We'll get back here once we have that information.
	      if (!send.recipient_info.loaded) return;

	      if (send.recipient_info.exists) {
	        // Check allowed currencies for this address
	        var requestedRecipientAddress = send.recipient_address;
	        send.currency_choices_constraints.accountLines = 'pending';
	        $network.remote.request_account_currencies(requestedRecipientAddress)
	          .on('success', function (data) {
	            $scope.$apply(function () {
	              if (data.receive_currencies &&
	                  // We need to make sure the destination account hasn't changed
	                  send.recipient_address === requestedRecipientAddress) {
	                send.currency_choices_constraints.accountLines = data.receive_currencies;

	                // add XRP if it's allowed
	                if (!$scope.send.recipient_info.disallow_xrp) {
	                  send.currency_choices_constraints.accountLines.unshift('XRP');
	                }

	                $scope.update_currency_choices();
	              }
	            });
	          })
	          .on('error', function () {})
	          .request();
	      } else {
	        // If the account doesn't exist, we can only send XRP
	        send.currency_choices_constraints.accountLines = ["XRP"];
	      }

	      $scope.update_currency_choices();
	    };

	    // Generate list of accepted currencies
	    $scope.update_currency_choices = function() {
	      var send = $scope.send;

	      var currencies = [];

	      // Make sure none of the currency_choices_constraints are pending
	      if (_.values(send.currency_choices_constraints).indexOf('pending') !== -1) {
	        send.path_status = 'account-currencies';
	        send.currency_choices = [];
	        return;
	      } else {
	        // The possible currencies are the intersection of all provided currency
	        // constraints.
	        currencies = _.intersection.apply(_, _.values(send.currency_choices_constraints));
	        currencies = _.uniq(_.compact(currencies));

	        // create the display version of the currencies
	        currencies = _.map(currencies, function (currency) {
	         // create a currency object for each of the currency codes
	          var currencyObj = ripple.Currency.from_json(currency);
	          if ($scope.currencies_all_keyed[currencyObj.get_iso()]) {
	            return currencyObj.to_human({full_name:$scope.currencies_all_keyed[currencyObj.get_iso()].name});
	          } else {
	            return currencyObj.to_human();
	          }
	        });
	      }

	      if (currencies.length === 1) {
	        send.currency = send.currency_force = currencies[0];
	      } else if (currencies.length === 0) {
	        send.path_status = 'error-no-currency';
	        send.currency = '';
	      } else {
	        send.currency_force = false;

	        if (currencies.indexOf(send.currency) === -1) {
	          send.currency = currencies[0];
	        }
	      }

	      $scope.send.currency_choices = currencies;
	      $scope.update_currency();
	    };

	    // Reset anything that depends on the currency
	    $scope.reset_currency_deps = function () {
	      // XXX Reset

	      $scope.reset_amount_deps();
	    };

	    $scope.update_currency = function () {
	      var send = $scope.send;
	      var recipient = send.recipient_actual || send.recipient_address;
	      var currency = send.currency;

	      $scope.reset_currency_deps();

	      // We should have a valid recipient unless it's a quoting bridge, in
	      // which case we should continue so we can request a quote.
	      if (!ripple.UInt160.is_valid(recipient) && !send.quote_url) {
	        return;
	      }

	      if (!send.currency_choices ||
	          send.currency_choices.length === 0) {
	        return;
	      }

	      $scope.update_amount();
	    };

	    var pathUpdateTimeout;

	    $scope.reset_amount_deps = function () {
	      var send = $scope.send;
	      send.sender_insufficient_xrp = false;
	      send.quote = false;

	      $scope.reset_paths();
	    };

	    $scope.update_amount = function () {
	      var send = $scope.send;
	      var recipient = send.recipient_actual || send.recipient_address;

	      if (!send.currency_choices ||
	          send.currency_choices.length === 0) {
	        return;
	      }

	      var currency = ripple.Currency.from_human(send.currency);

	      var matchedCurrency = currency.has_interest() ? currency.to_hex() : currency.get_iso();
	      var match = /^([a-zA-Z0-9]{3}|[A-Fa-f0-9]{40})\b/.exec(matchedCurrency);

	      if (!match) {
	        // Currency code not recognized, should have been caught by
	        // form validator.
	        return;
	      }

	      // Demurrage: Get a reference date five minutes in the future
	      //
	      // Normally, when using demurrage currencies, we would immediately round
	      // down (e.g. 0.99999 instead of 1) as demurrage occurs continuously. Not
	      // a good user experience.
	      //
	      // By choosing a date in the future, this gives us a time window before
	      // this rounding down occurs. Note that for positive interest currencies
	      // this actually *causes* the same odd rounding problem, so in the future
	      // we'll want a better solution, but for right now this does what we need.
	      var refDate = new Date(new Date().getTime() + 5 * 60000);
	      var amount = send.amount_feedback = ripple.Amount.from_human('' + send.amount + ' ' + matchedCurrency, { reference_date: refDate });

	      $scope.reset_amount_deps();
	      send.path_status = 'waiting';

	      // If there is a timeout in progress, we want to cancel it, since the
	      // inputs have changed.
	      if (pathUpdateTimeout) $timeout.cancel(pathUpdateTimeout);

	      // If the form is invalid, we won't be able to submit anyway, so no point
	      // in calculating paths.
	      if ($scope.sendForm.$invalid) return;

	      if (send.quote_url) {
	        if (!send.amount_feedback.is_valid())
	          return;

	        // Dummy issuer
	        send.amount_feedback.set_issuer(1);
	        pathUpdateTimeout = $timeout($scope.update_quote, 500);
	      } else {
	        if (!ripple.UInt160.is_valid(recipient) || !ripple.Amount.is_valid(amount)) {
	          // XXX Error?
	          return;
	        }

	        // Create Amount object
	        if (!send.amount_feedback.is_native()) {
	          send.amount_feedback.set_issuer(recipient);
	        }

	        // If we don't have recipient info yet, then don't search for paths
	        if (!send.recipient_info) {
	          return;
	        }

	        // Cannot make XRP payment if the sender does not have enough XRP
	        send.sender_insufficient_xrp = send.amount_feedback.is_native()
	          && $scope.account.max_spend
	          && $scope.account.max_spend.to_number() > 1
	          && $scope.account.max_spend.compareTo(send.amount_feedback) < 0;

	        var total = send.amount_feedback.add(send.recipient_info.Balance);
	        var reserve_base = $scope.account.reserve_base;
	        if (total.compareTo(reserve_base) < 0) {
	          send.fund_status = "insufficient-xrp";
	          send.xrp_deficiency = reserve_base.subtract(send.recipient_info.Balance);
	        }

	        // If the destination doesn't exist, then don't search for paths.
	        if (!send.recipient_info.exists) {
	          send.path_status = 'none';
	          return;
	        }

	        send.path_status = 'pending';
	        pathUpdateTimeout = $timeout($scope.update_paths, 500);
	      }
	    };

	    /**
	     * Query the bridge for a quote.
	     *
	     * This will set send.amount_actual and send.recipient_actual based on the
	     * quote that the bridge returns.
	     */
	    $scope.update_quote = function () {
	      var send = $scope.send;
	      var recipient = send.recipient_actual || send.recipient_address;

	      $scope.reset_paths();

	      try {
	        // Get a quote
	        send.path_status = "bridge-quote";

	        var data = {
	          type: "quote",
	          amount: send.amount_feedback.to_text()+"/"+send.amount_feedback.currency().to_json(),
	          destination: send.quote_destination,
	          address: $scope.address
	        };

	        if ($.isArray(send.extra_fields)) {
	          $.each(send.extra_fields, function () {
	            data[this.name] = this.value;
	          });
	        }

	        $.ajax({
	          url: send.quote_url,
	          dataType: 'json',
	          data: data,
	          error: function () {
	            setImmediate(function () {
	              $scope.$apply(function () {
	                $scope.send.path_status = "error-quote";
	              });
	            });
	          },
	          success: function (data) {
	            $scope.$apply(function () {
	              // Check if this request is still current, exit if not
	              var now_recipient = send.recipient_actual || send.recipient_address;
	              if (recipient !== now_recipient) return;

	              var now_amount = send.amount_feedback;
	              if (!now_amount.equals(send.amount_feedback)) return;

	              if (!data || !data.quote ||
	                  !(data.result === "success" || data.status === "success") ||
	                  !Array.isArray(data.quote.send) ||
	                  !data.quote.send.length || !data.quote.address) {
	                $scope.send.path_status = "error-quote";
	                $scope.send.quote_error = "";
	                if (data && data.result === "error" &&
	                    "string" === typeof data.error_message) {
	                  $scope.send.quote_error = data.error_message;
	                }
	                return;
	              }

	              var amount = Amount.from_json(data.quote.send[0]);

	              send.quote = data.quote;

	              // We have a quote, now calculate a path
	              send.recipient_actual = data.quote.address;
	              send.amount_actual = amount;

	              $scope.update_paths();
	            });
	          }
	        });
	      } catch (e) {
	        console.error(e.stack ? e.stack : e);
	        $scope.send.path_status = "error-quote";
	      }
	    };

	    $scope.reset_paths = function () {
	      var send = $scope.send;

	      send.alternatives = [];
	    };


	    $scope.update_paths = function () {
	      var send = $scope.send;
	      var recipient = send.recipient_actual || send.recipient_address;
	      var amount = send.amount_actual || send.amount_feedback;
	      var tracked;

	      $scope.reset_paths();

	      send.path_status = 'pending';

	      // Determine if we need to update the paths.
	      if (send.pathfind &&
	          send.pathfind.src_account === $id.account &&
	          send.pathfind.dst_account === recipient &&
	          send.pathfind.dst_amount.equals(amount))
	        return;

	      // Start path find
	      var pf = $network.remote.path_find($id.account,
	                                         recipient,
	                                         amount);
	                                         //$scope.generate_src_currencies());
	                                         // XXX: Roll back pathfinding changes temporarily
	      var isIssuer = $scope.generate_issuer_currencies();

	      send.pathfind = pf;

	      var lastUpdate;

	      pf.on('update', function (upd) {
	        $scope.$apply(function () {
	          lastUpdate = new Date();

	          clearInterval(timer);
	          timer = setInterval(function(){
	            $scope.$apply(function(){
	              var seconds = Math.round((new Date() - lastUpdate) / 1000);
	              $scope.lastUpdate = seconds ? seconds : 0;
	            });
	          }, 1000);

	          // Check if this request is still current, exit if not
	          var now_recipient = send.recipient_actual || send.recipient_address;
	          if (recipient !== now_recipient) return;

	          var now_amount = send.amount_actual || send.amount_feedback;
	          if (!now_amount.equals(amount)) return;

	          if (!upd.alternatives || !upd.alternatives.length) {
	            $scope.send.path_status  = "no-path";
	            $scope.send.alternatives = [];
	          } else {
	            var currencies = {};
	            var currentAlternatives = [];

	            $scope.send.path_status  = "done";
	            $scope.send.alternatives = _.map(upd.alternatives, function (raw,key) {
	              var alt = {};

	              alt.amount   = Amount.from_json(raw.source_amount);

	              // Compensate for demurrage
	              //
	              // In the case of demurrage, the amount would immediately drop
	              // below where it is and because we currently always round down it
	              // would immediately show up as something like 0.99999.
	              var slightlyInFuture = new Date(+new Date() + 5 * 60000);

	              alt.rate     = alt.amount.ratio_human(amount, {reference_date: slightlyInFuture});
	              alt.send_max = alt.amount.product_human(Amount.from_json('1.01'));
	              alt.paths    = raw.paths_computed
	                ? raw.paths_computed
	                : raw.paths_canonical;

	              // Selected currency should be the first option
	              if (raw.source_amount.currency) {
	                if (raw.source_amount.currency === $scope.send.currency_code)
	                  currentAlternatives.push(alt);
	              } else if ($scope.send.currency_code === 'XRP') {
	                currentAlternatives.push(alt);
	              }

	              if (alt.amount.issuer().to_json() != $scope.address && !isIssuer[alt.amount.currency().to_hex()]) {
	                currencies[alt.amount.currency().to_hex()] = true;
	              }

	              return alt;
	            }).filter(function(alt) { return currentAlternatives.indexOf(alt) == -1; });
	            Array.prototype.unshift.apply($scope.send.alternatives, currentAlternatives);

	            $scope.send.alternatives = $scope.send.alternatives.filter(function(alt) {
	              // XXX: Roll back pathfinding changes temporarily
	              /* if (currencies[alt.amount.currency().to_hex()]) {
	                return alt.amount.issuer().to_json() != $scope.address;
	              } */
	              return true;
	            });
	          }

	          if (!tracked) {
	            $rpTracker.track('Send pathfind', {
	              'Status': 'success',
	              'Currency': $scope.send.currency_code,
	              'Address Type': $scope.send.federation ? 'federation' : 'ripple',
	              'Destination Tag': !!$scope.send.dt,
	              'Paths': upd.alternatives.length,
	              'Time': (+new Date() - +pathFindTime) / 1000,
	              'Address': $scope.userBlob.data.account_id
	            });

	            tracked = true;
	          }
	        });
	      });

	      pf.on('error', function (res) {
	        setImmediate(function () {
	          $scope.$apply(function () {
	            send.path_status = "error";
	          });
	        });

	        $rpTracker.track('Send pathfind', {
	          'Status': 'error',
	          'Message': res.engine_result,
	          'Currency': $scope.send.currency_code,
	          'Address Type': $scope.send.federation ? 'federation' : 'ripple',
	          'Destination Tag': !!$scope.send.dt,
	          'Address': $scope.userBlob.data.account_id
	        });
	      });

	      var pathFindTime = new Date();
	    };

	    $scope.$watch('userBlob.data.contacts', function (contacts) {
	      $scope.recipient_query = webutil.queryFromContacts(contacts);
	    }, true);

	    $scope.$watch('account.max_spend', function () {
	      $scope.update_amount();
	    }, true);

	    $scope.reset = function () {
	      $scope.mode = "form";

	      // XXX Most of these variables should be properties of $scope.send.
	      //     The Angular devs recommend that models be objects due to the way
	      //     scope inheritance works.
	      $scope.send = {
	        recipient: '',
	        recipient_name: '',
	        recipient_address: '',
	        recipient_prev: '',
	        recipient_info: {},
	        amount: '',
	        amount_prev: new Amount(),
	        currency: $scope.xrp.name,
	        currency_choices: [],
	        currency_code: "XRP",
	        path_status: 'waiting',
	        fund_status: 'none',
	        sender_insufficient_xrp: false
	      };
	      $scope.nickname = '';
	      $scope.error_type = '';
	      $scope.resetAddressForm();
	      if ($scope.sendForm) $scope.sendForm.$setPristine(true);
	    };

	    $scope.cancelConfirm = function () {
	      $scope.mode = "form";
	      $scope.send.alt = null;

	      // Force pathfinding reset
	      $scope.update_paths();
	    };

	    $scope.resetAddressForm = function() {
	      $scope.show_save_address_form = false;
	      $scope.addressSaved = false;
	      $scope.saveAddressName = '';
	      $scope.addressSaving = false;
	      if ($scope.saveAddressForm) $scope.saveAddressForm.$setPristine(true);
	    };

	    $scope.reset_goto = function (tabName) {
	      $scope.reset();

	      // TODO do something clever instead of document.location
	      // because goToTab does $scope.$digest() which we don't need
	      document.location = '#' + tabName;
	    };

	    /**
	     * N3. Confirmation page
	     */
	    $scope.send_prepared = function () {
	      // check if paths are available, if not then it is a direct send
	      $scope.send.indirect = $scope.send.alt ? $scope.send.alt.paths.length : false;

	      $scope.confirm_wait = true;
	      $timeout(function () {
	        $scope.confirm_wait = false;
	      }, 1000, true);

	      // Stop the pathfind - once we're on the confirmation page, we'll freeze
	      // the last state we had so the user doesn't get surprises when
	      // submitting.
	      // XXX ST: The confirmation page should warn you somehow once it becomes
	      //         outdated.
	      if ($scope.send.pathfind) {
	        $scope.send.pathfind.close();
	        delete $scope.send.pathfind;
	      }

	      $scope.mode = "confirm";

	      if (keychain.isUnlocked($id.account)) {
	        $scope.send.secret = keychain.getUnlockedSecret($id.account);
	      }

	      $rpTracker.track('Send confirmation page', {
	        'Currency': $scope.send.currency_code,
	        'Address Type': $scope.send.federation ? 'federation' : 'ripple',
	        'Destination Tag': !!$scope.send.dt,
	        'Address': $scope.userBlob.data.account_id
	      });
	    };

	    /**
	     * N4. Waiting for transaction result page
	     */

	    $scope.onTransactionProposed = function (res, tx) {
	      $scope.$apply(function () {
	        $scope.setEngineStatus(res, false);
	        $scope.sent(tx.hash);

	        // Remember currency and increase order
	        var found;

	        for (var i = 0; i < $scope.currencies_all.length; i++) {
	          if ($scope.currencies_all[i].value.toLowerCase() === $scope.send.amount_feedback.currency().get_iso().toLowerCase()) {
	            $scope.currencies_all[i].order++;
	            found = true;
	            break;
	          }
	        }

	        // // Removed feature until a permanent fix
	        // if (!found) {
	        //   $scope.currencies_all.push({
	        //     "name": $scope.send.amount_feedback.currency().to_human().toUpperCase(),
	        //     "value": $scope.send.amount_feedback.currency().to_human().toUpperCase(),
	        //     "order": 1
	        //   });
	        // }
	      });
	    };

	    $scope.onTransactionSuccess = function (res, tx) {
	      $scope.$apply(function () {
	        $scope.setEngineStatus(res, true);
	      });
	    };

	    $scope.onTransactionError = function (res, tx) {
	      setImmediate(function () {
	        $scope.$apply(function () {
	          $scope.mode = "error";

	          if (res.engine_result) {
	            $scope.setEngineStatus(res);
	          } else if (res.error === 'remoteError') {
	            $scope.error_type = res.remote.error;
	          } else {
	            $scope.error_type = "unknown";
	          }
	        });
	      });
	    };

	    $scope.send_confirmed = function () {
	      var send = $scope.send;
	      var currency = $scope.send.currency.slice(0, 3).toUpperCase();
	      var amount = send.amount_feedback;
	      var address = $scope.send.recipient_address;

	      $scope.mode = "sending";

	      amount.set_issuer(address);

	      var tx = $network.remote.transaction();
	      // Source tag
	      if ($scope.send.st) {
	        tx.source_tag($scope.send.st);
	      }

	      // Add memo to tx
	      tx.addMemo('client', 'rt' + $scope.version);

	      if (send.secret) {
	        tx.secret(send.secret);
	      } else {
	        // Get secret asynchronously
	        keychain.getSecret($id.account, $id.username, send.unlock_password,
	                           function (err, secret) {
	                             if (err) {
	                               console.log("client: send tab: error while " +
	                                           "unlocking wallet: ", err);
	                               $scope.mode = "error";
	                               $scope.error_type = "unlockFailed";
	                               return;
	                             }

	                             send.secret = secret;
	                             $scope.send_confirmed();
	                           });
	        return;
	      }

	      if ($scope.send.quote) {
	        if ("number" === typeof $scope.send.quote.destination_tag) {
	          tx.destination_tag($scope.send.quote.destination_tag);
	        }

	        if ("string" === typeof $scope.send.quote.invoice_id) {
	          tx.tx_json.InvoiceID = $scope.send.quote.invoice_id.toUpperCase();
	        }

	        tx.payment($id.account,
	                   $scope.send.quote.address,
	                   $scope.send.quote.send[0]);
	      } else {
	        // Destination tag
	        var dt;
	        if ($scope.send.dt) {
	          dt = $scope.send.dt;
	        } else {
	          dt = webutil.getDestTagFromAddress($scope.send.recipient);
	        }

	        tx.destination_tag(dt ? +dt : undefined); // 'cause +dt is NaN when dt is undefined

	        tx.payment($id.account, address, amount.to_json());
	      }

	      if ($scope.send.alt) {
	        tx.send_max($scope.send.alt.send_max);
	        tx.paths($scope.send.alt.paths);
	      } else {
	        if (!amount.is_native()) {
	          tx.build_path(true);
	        }
	      }

	      var maxLedger = Options.tx_last_ledger || 3;
	      tx.lastLedger($network.remote._ledger_current_index + maxLedger);

	      tx.on('success', function (res) {
	        $scope.onTransactionSuccess(res, tx);

	        $rpTracker.track('Send result', {
	          'Status': 'success',
	          'Currency': $scope.send.currency_code,
	          'Address Type': $scope.send.federation ? 'federation' : 'ripple',
	          'Destination Tag': !!$scope.send.dt,
	          'Time': (+new Date() - +$scope.confirmedTime) / 1000,
	          'Address': $scope.userBlob.data.account_id,
	          'Transaction ID': res.tx_json.hash
	        });
	      });

	      tx.on('proposed', function (res) {
	        $scope.onTransactionProposed(res, tx);
	      });

	      tx.on('error', function (res) {
	        $scope.onTransactionError(res, tx);

	        $rpTracker.track('Send result', {
	          'Status': 'error',
	          'Message': res.engine_result,
	          'Currency': $scope.send.currency_code,
	          'Address Type': $scope.send.federation ? 'federation' : 'ripple',
	          'Destination Tag': !!$scope.send.dt,
	          'Time': (+new Date() - +$scope.confirmedTime) / 1000,
	          'Address': $scope.userBlob.account_id,
	          'Transaction ID': res.tx_json.hash
	        });
	      });

	      tx.submit();

	      $scope.confirmedTime = new Date();
	    };

	    /**
	     * N5. Sent page
	     */
	    $scope.sent = function (hash) {
	      $scope.mode = "status";
	      $network.remote.on('transaction', handleAccountEvent);

	      function handleAccountEvent(e) {
	        $scope.$apply(function () {
	          if (e.transaction.hash === hash) {
	            $scope.setEngineStatus(e, true);
	            $network.remote.removeListener('transaction', handleAccountEvent);
	          }
	        });
	      }
	    };

	    $scope.setEngineStatus = function(res, accepted) {
	      $scope.engine_result = res.engine_result;
	      $scope.engine_result_message = res.engine_result_message;
	      $scope.engine_status_accepted = !!accepted;
	      $scope.mode = "status";
	      $scope.tx_result = "partial";
	      switch (res.engine_result.slice(0, 3)) {
	        case 'tes':
	          $scope.mode = "status";
	          $scope.tx_result = accepted ? "cleared" : "pending";
	          break;
	        case 'tep':
	          $scope.mode = "status";
	          $scope.tx_result = "partial";
	          break;
	        default:
	          $scope.mode = "rippleerror";
	      }
	    };

	    $scope.saveAddress = function () {
	      $scope.addressSaving = true;

	      var contact = {
	        name: $scope.saveAddressName,
	        view: $scope.send.recipient,
	        address: $scope.send.recipient_address
	      };

	      $scope.userBlob.unshift('/contacts', contact, function(err, data){
	        if (err) {
	          console.log("Can't save the contact. ", err);
	          return;
	        }

	        $scope.contact = data;
	        $scope.addressSaved = true;
	      });
	    };

	    $scope.$on("$destroy", function () {
	      // Stop pathfinding if the user leaves the tab
	      if ($scope.send.pathfind) {
	        $scope.send.pathfind.close();
	        delete $scope.send.pathfind;
	      }
	    });

	    $scope.reset();

	    if($routeParams.to && $routeParams.amount) {
	      var amountValue = $routeParams.amount;
	      if (amountValue === ("" + parseInt(amountValue, 10))) {
	        amountValue = amountValue + '.0';
	      }
	      var amount = ripple.Amount.from_json(amountValue);
	      var currency = amount.currency();
	      if ($scope.currencies_all_keyed[currency.get_iso()]) {
	        $scope.send.currency_choices = [currency.to_human({full_name:$scope.currencies_all_keyed[currency.get_iso()].name})];
	      } else {
	        $scope.send.currency_choices = [currency.to_human()];
	      }
	      $scope.update_destination();
	    }
	  }]);

	  /**
	   * Contact name and address uniqueness validator
	   */
	  // TODO move to global directives
	  module.directive('unique', function() {
	    return {
	      restrict: 'A',
	      require: '?ngModel',
	      link: function ($scope, elm, attr, ctrl) {
	        if (!ctrl) return;

	        var validator = function(value) {
	          var unique = !webutil.getContact($scope.userBlob.data.contacts,value);
	          ctrl.$setValidity('unique', unique);
	          if (unique) return value;
	        };

	        ctrl.$formatters.push(validator);
	        ctrl.$parsers.unshift(validator);

	        attr.$observe('unique', function() {
	          validator(ctrl.$viewValue);
	        });
	      }
	    };
	  });
	};

	module.exports = SendTab;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var webutil = __webpack_require__(66);
	var Tab = __webpack_require__(76).Tab;
	var Amount = ripple.Amount;
	var rewriter = __webpack_require__(69);
	var Currency = ripple.Currency;

	var TradeTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(TradeTab, Tab);

	TradeTab.prototype.tabName = 'trade';
	TradeTab.prototype.mainMenu = 'trade';

	TradeTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(88)();
	};

	TradeTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['books']);

	TradeTab.prototype.extraRoutes = [
	  { name: '/trade/:first/:second' }
	];

	TradeTab.prototype.angular = function(module)
	{
	  module.controller('TradeCtrl', ['rpBooks', '$scope', 'rpId', 'rpNetwork',
	                                  '$routeParams', '$location', '$filter',
	                                  'rpTracker', 'rpKeychain', '$rootScope',
	                                  function (books, $scope, id, $network,
	                                            $routeParams, $location, $filter,
	                                            $rpTracker, keychain, $rootScope)
	  {
	    if (!id.loginStatus) return id.goId();

	    // Remember user preference on Convert vs. Trade
	    $rootScope.ripple_exchange_selection_trade = true;

	    $scope.pairs_query = $scope.pairs_all;

	    var currencyPairChangedByNonUser = false;

	    var widget = {
	      first: '',
	      price: '',
	      second: '',
	      mode: 'trade'
	    };

	    var OrderbookFilterOpts = {
	      'precision':5,
	      'min_precision':5,
	      'max_sig_digits':20
	    };

	    $scope.reset = function () {
	      $scope.executedOnOfferCreate = 'none';
	      var pair = store.get('ripple_trade_currency_pair') || $scope.pairs_all[0].name;

	      // Decide which listing to show
	      var listing;
	      if ($scope.order) {
	        listing = $scope.order.listing;
	      }
	      else if(store.get('ripple_trade_listing')) {
	        listing = store.get('ripple_trade_listing');
	      }
	      else {
	        listing = 'orderbook';
	      }

	      $scope.order = {
	        currency_pair: pair,
	        // These will be filled in by updateSettings
	        //   first_currency
	        //   second_currency
	        first_issuer: null,
	        second_issuer: null,
	        listing: listing,

	        buy: jQuery.extend(true, {}, widget),
	        sell: jQuery.extend(true, {}, widget),

	        // This variable is true if both the pair and the issuers are set to
	        // valid values. It is used to enable or disable all the functionality
	        // on the page.
	        valid_settings: false
	      };

	      updateSettings();
	      updateMRU();
	    };

	    /**
	     * Resets single order widget. Used to reset widgets after
	     * the order confirmation.
	     *
	     * @param type (buy, sell)
	     */
	    $scope.reset_widget = function(type) {
	      $scope.order[type] = jQuery.extend(true, {}, widget);

	      updateSettings();
	      updateMRU();
	    };

	    /**
	     * Sets current listing, and stores it in local storage.
	     *
	     * @param listing (my, orderbook)
	     */
	    $scope.setListing = function(listing){
	      $scope.order.listing = listing;

	      if (!store.disabled) {
	        store.set('ripple_trade_listing', listing);
	      }
	    };

	    /**
	     * Fill buy/sell widget when clicking on orderbook orders (sum or price)
	     *
	     * @param type (buy/sell)
	     * @param order (order)
	     * @param sum fill sum or not
	     */
	    $scope.fill_widget = function (type, order, sum) {
	      $scope.reset_widget(type);

	      $scope.order[type].price = order.price.to_human().replace(',','');

	      if (sum) {
	        $scope.order[type].first = order.sum.to_human().replace(',','');
	        $scope.calc_second(type);
	      }

	    };

	    /**
	     * Happens when user clicks on "Place Order" button.
	     *
	     * @param type (buy, sell)
	     */
	    // TODO type is this....
	    $scope.place_order = function (type) {
	      $scope.order[type].mode = "confirm";

	      if (type === 'buy') {
	        $scope.order.buy.sell_amount = $scope.order.buy.second_amount;
	        $scope.order.buy.buy_amount = $scope.order.buy.first_amount;
	      } else {
	        $scope.order.sell.sell_amount = $scope.order.sell.first_amount;
	        $scope.order.sell.buy_amount = $scope.order.sell.second_amount;
	      }

	      $scope.fatFingerCheck(type);

	      // TODO track order type
	      $rpTracker.track('Trade order confirmation page', {
	        'Currency pair': $scope.order.currency_pair,
	        'Address': $scope.userBlob.data.account_id
	      });
	    };

	    /**
	     * Happens when user cliens the currency in "My Orders".
	     */
	    $scope.goto_order_currency = function()
	    {
	      if (!this.entry) return;
	      var entry = this.entry;
	      var order = $scope.order;
	      currencyPairChangedByNonUser = true;
	      order.first_currency = this.entry.first.currency().to_json();
	      order.first_issuer = this.entry.first.issuer().to_json();
	      order.second_currency = this.entry.second.currency().to_json();
	      order.second_issuer = this.entry.second.issuer().to_json();
	      order.currency_pair = this.entry.first.currency().to_json() + '/' + this.entry.second.currency().to_json();
	      updateSettings();
	      updateMRU();
	    };

	    /**
	     * Happens when user clicks on "Cancel" in "My Orders".
	     */
	    $scope.cancel_order = function ()
	    {
	      var seq   = this.entry ? this.entry.seq : this.order.Sequence;
	      var order = this;
	      var tx    = $network.remote.transaction();

	      $scope.cancelError = null;

	      tx.offer_cancel(id.account, seq);
	      tx.on('success', function() {
	        $rpTracker.track('Trade order cancellation', {
	          'Status': 'success',
	          'Address': $scope.userBlob.data.account_id
	        });
	      });

	      tx.on('error', function (err) {
	        console.log("cancel error: ", err);

	        order.cancelling   = false;
	        $scope.cancelError = err.engine_result_message;

	        if (!$scope.$$phase) {
	          $scope.$apply();
	        }

	        $rpTracker.track('Trade order cancellation', {
	          'Status': 'error',
	          'Message': err.engine_result,
	          'Address': $scope.userBlob.data.account_id
	        });
	      });

	      keychain.requestSecret(id.account, id.username, function (err, secret) {
	        if (err) {

	          //err should equal 'canceled' here, other errors are not passed through
	          order.cancelling = false;
	          return;
	        }

	        tx.secret(secret);
	        tx.submit();
	      });

	      order.cancelling = true;
	    };

	    $scope.dismissCancelError = function() {
	      $scope.cancelError = null;
	    };

	    /**
	     * Happens when user clicks "Confirm" in order confirmation view.
	     *
	     * @param type (buy, sell)
	     */
	    $scope.order_confirmed = function (type)
	    {
	      var order = $scope.order[type];
	      var tx = $network.remote.transaction();

	      tx.offer_create(
	        id.account,
	        order.buy_amount,
	        order.sell_amount
	      );

	      // Add memo to tx
	      tx.addMemo('client', 'rt' + $rootScope.version);

	      // Sets a tfSell flag. This is the only way to distinguish
	      // sell offers from buys.
	      if (type === 'sell')
	        tx.set_flags('Sell');

	      tx.on('proposed', function (res) {

	        setEngineStatus(res, false, type);

	      });

	      tx.on('success', function(res) {
	        setEngineStatus(res, true, type);
	        order.mode = "done";

	        var tx = rewriter.processTxn(res, res.metadata, id.account);

	        for (var i = 0; i < tx.effects.length; i++) {
	          var messageType = tx.effects[i].type;

	          switch (messageType) {
	            case 'trust_change_balance':
	              $scope.executedOnOfferCreate = 'all';
	              break;
	            case 'offer_partially_funded':
	              $scope.executedOnOfferCreate = 'partial';
	              break;
	            default:
	              $scope.executedOnOfferCreate = 'none';
	              break;
	          }
	        }

	        if (!$scope.$$phase) {
	          $scope.$apply();
	        }

	        $rpTracker.track('Trade order result', {
	          'Status': 'success',
	          'Currency pair': $scope.order.currency_pair,
	          'Address': $scope.userBlob.data.account_id,
	          'Transaction ID': res.tx_json.hash
	        });
	      });

	      tx.on('error', function (err) {
	        setEngineStatus(err, false, type);
	        order.mode = "done";

	        if (!$scope.$$phase) {
	          $scope.$apply();
	        }

	        $rpTracker.track('Trade order result', {
	          'Status': 'error',
	          'Message': err.engine_result,
	          'Currency pair': $scope.order.currency_pair,
	          'Address': $scope.userBlob.data.account_id,
	          'Transaction ID': res.tx_json.hash
	        });
	      });

	      keychain.requestSecret(id.account, id.username, function (err, secret) {
	        if (err) {

	          //err should equal 'canceled' here, other errors are not passed through
	          order.mode = 'trade';
	          return;
	        }

	        tx.secret(secret);
	        tx.submit();
	      });

	      order.mode = "sending";
	    };

	    $scope.loadMore = function () {
	      $scope.orderbookLength = books.getLength();
	      var multiplier = 30;

	      Options.orderbook_max_rows += multiplier;

	      loadOffers();

	      $scope.orderbookState = (($scope.orderbookLength - Options.orderbook_max_rows + multiplier) < 1) ? 'full' : 'ready';
	    };


	    /**
	     * Handle transaction result
	     */
	    function setEngineStatus(res, accepted, type) {
	      var order = $scope.order[type];

	      order.engine_result = res.engine_result;
	      order.engine_result_message = res.engine_result_message;
	      switch (res.engine_result.slice(0, 3)) {
	        case 'tes':
	          order.tx_result = accepted ? "cleared" : "pending";
	          break;
	        case 'tem':
	          order.tx_result = "malformed";
	          break;
	        case 'ter':
	          order.tx_result = "failed";
	          break;
	        case 'tec':
	          order.tx_result = "claim";
	          break;
	        case 'tel':
	          order.tx_result = "local";
	          break;
	        //case 'tep':
	        default:
	          order.tx_result = "unknown";
	          console.warn("Unhandled engine status encountered:"+res.engine_result);
	          break;
	      }
	    }

	    $scope.update_first = function (type) {
	      var order = $scope.order[type];
	      var first_currency = $scope.order.first_currency || Currency.from_json("XRP");
	      var formatted = "" + order.first + " " + (first_currency.has_interest() ? first_currency.to_hex() : first_currency.get_iso());

	      order.first_amount = ripple.Amount.from_human(formatted, {reference_date: new Date(+new Date() + 5*60000)});

	      if (!first_currency.is_native()) order.first_amount.set_issuer($scope.order.first_issuer);
	    };

	    $scope.update_price = function (type) {
	      var order = $scope.order[type];
	      var second_currency = $scope.order.second_currency || Currency.from_json("XRP");
	      var formatted = "" + order.price + " " + (second_currency.has_interest() ? second_currency.to_hex() : second_currency.get_iso());

	      order.price_amount = ripple.Amount.from_human(formatted, {reference_date: new Date(+new Date() + 5*60000)});

	      if (!second_currency.is_native()) order.price_amount.set_issuer($scope.order.second_issuer);
	    };

	    $scope.update_second = function (type) {
	      var order = $scope.order[type];
	      var second_currency = $scope.order.second_currency || Currency.from_json("XRP");
	      var formatted = "" + order.second + " " + (second_currency.has_interest() ? second_currency.to_hex() : second_currency.get_iso());

	      order.second_amount = ripple.Amount.from_human(formatted, {reference_date: new Date(+new Date() + 5*60000)});

	      if (!second_currency.is_native()) order.second_amount.set_issuer($scope.order.second_issuer);
	    };

	    $scope.fatFingerCheck = function(type) {
	      var order = $scope.order[type];
	      var fatFingerMarginMultiplier = 1.1;

	      $scope.fatFingerErr = false;

	      if (type === 'buy') {

	        if (order.price > ($scope.book.bids[0].showPrice * fatFingerMarginMultiplier) ||
	            order.price < ($scope.book.bids[0].showPrice / fatFingerMarginMultiplier)) {

	          $scope.fatFingerErr = true;
	        }
	      }

	      else if (type === 'sell') {

	        if (order.price > ($scope.book.asks[0].showPrice * fatFingerMarginMultiplier) ||
	            order.price < ($scope.book.asks[0].showPrice / fatFingerMarginMultiplier)) {

	          $scope.fatFingerErr = true;
	        }
	      }
	    };

	    /**
	     * Calculate second when first or price changes.
	     *
	     * @param type
	     */
	    $scope.calc_second = function (type) {
	      var order = $scope.order[type];

	      $scope.update_first(type);
	      $scope.update_price(type);
	      if (order.price_amount && order.price_amount.is_valid() &&
	          order.first_amount && order.first_amount.is_valid()) {
	        order.second_amount = order.price_amount.product_human(+order.first);
	        order.second = +order.second_amount.to_human({group_sep: false});
	      }
	    };

	    /**
	     * Calculate first when second changes.
	     *
	     * @param type
	     */
	    $scope.calc_first = function (type) {
	      var order = $scope.order[type];

	      $scope.update_second(type);
	      $scope.update_price(type);
	      if (order.price_amount  && order.price_amount.is_valid() &&
	          order.second_amount && order.second_amount.is_valid()) {

	        order.first_amount = Amount.from_json(order.second_amount.to_text_full()).ratio_human(Amount.from_json(order.price_amount.to_text()), {reference_date: new Date()});
	        order.first = +order.first_amount.to_human({group_sep: false});
	      }
	    };

	    $scope.flip_issuer = function () {
	      var order = $scope.order;
	      if (!order.valid_settings) return;
	      var currency = order.first_currency;
	      var issuer = order.first_issuer;
	      var pair = order.currency_pair.split('/');
	      currencyPairChangedByNonUser = true;
	      order.first_currency = order.second_currency;
	      order.first_issuer = order.second_issuer;
	      order.second_currency = currency;
	      order.second_issuer = issuer;
	      order.currency_pair = pair[1] + '/' + pair[0];
	      updateSettings();
	      updateMRU();
	    };

	    // This functions is called whenever the settings, specifically the pair and
	    // the issuer(s) have been modified. It checks the new configuration and
	    // sets $scope.valid_settings.
	    function updateSettings() {
	      var order = $scope.order;
	      var pair = order.currency_pair;

	      if (!store.disabled) {
	        store.set('ripple_trade_currency_pair', pair);
	      }

	      if ("string" !== typeof pair) pair = "";
	      pair = pair.split('/');

	      // Invalid currency pair
	      if (pair.length != 2 || pair[0].length === 0 || pair[1].length === 0) {
	        order.first_currency = Currency.from_json('XRP');
	        order.second_currency = Currency.from_json('XRP');
	        order.valid_settings = false;
	        return;
	      }

	      var first_currency = order.first_currency = ripple.Currency.from_json(pair[0]);
	      var second_currency = order.second_currency = ripple.Currency.from_json(pair[1]);
	      var first_issuer = ripple.UInt160.from_json(order.first_issuer);
	      var second_issuer = ripple.UInt160.from_json(order.second_issuer);

	      // Invalid issuers or XRP/XRP pair
	      if ((!first_currency.is_native() && !first_issuer.is_valid()) ||
	          (!second_currency.is_native() && !second_issuer.is_valid()) ||
	          (first_currency.is_native() && second_currency.is_native())) {
	        order.valid_settings = false;
	        return;
	      }

	      order.valid_settings = true;

	      // Remember pair
	      // Produces currency/issuer:currency/issuer
	      var key = "" +
	        order.first_currency.to_json() +
	        (order.first_currency.is_native() ? "" : "/" + order.first_issuer) +
	        ":" +
	        order.second_currency._iso_code +
	        (order.second_currency.is_native() ? "" : "/" + order.second_issuer);

	      // Load orderbook
	      if (order.prev_settings !== key) {
	        loadOffers();

	        order.prev_settings = key;
	      }

	      // Update widgets
	      ['buy','sell'].forEach(function(type){
	        $scope.update_first(type);
	        $scope.update_price(type);
	        $scope.update_second(type);
	      });

	      updateCanBuySell();
	    }

	    // This functions is called after the settings have been modified.
	    // It updates the most recent used pairs dropdown.
	    function updateMRU() {
	      var order = $scope.order;
	      if (!order.valid_settings) return;
	      if (!order.first_currency || !order.second_currency) return;
	      if (!order.first_currency.is_valid() || !order.second_currency.is_valid()) return;
	      var canonical_name = order.first_currency.to_json() + "/" + order.second_currency.to_json();

	      // Remember currency pair and set last used time
	      var found = false;
	      for (var i = 0; i < $scope.pairs_all.length; i++) {
	        if ($scope.pairs_all[i].name.toLowerCase() == canonical_name.toLowerCase()) {
	          var pair_obj = $scope.pairs_all[i];
	          pair_obj.name = canonical_name;
	          pair_obj.last_used = new Date().getTime();
	          $scope.pairs_all.splice(i, 1);
	          $scope.pairs_all.unshift(pair_obj);
	          found = true;
	          break;
	        }
	      }

	      if (!found) {
	        $scope.pairs_all.unshift({
	          "name": canonical_name,
	          "last_used": new Date().getTime()
	        });
	      }

	      if (!$scope.$$phase) {
	        $scope.$apply();
	      }
	    }

	    /**
	     * Tries to guess an issuer based on user's preferred issuer or highest trust.
	     *
	     * @param currency
	     * @param exclude_issuer
	     * @returns issuer
	     */
	    function guessIssuer(currency, exclude_issuer) {
	      var guess;

	      // First guess: An explicit issuer preference setting in the user's blob
	      try {
	        guess = $scope.userBlob.data.preferred_issuer[currency];
	        if (guess && guess === exclude_issuer) {
	          guess = $scope.userBlob.data.preferred_second_issuer[currency];
	        }
	        if (guess) return guess;
	      } catch (e) {}

	      // Second guess: The user's highest trust line in this currency
	      try {
	        var issuers = $scope.balances[currency].components;
	        for (var counterparty in issuers) {
	          if (counterparty != exclude_issuer) {
	            return counterparty;
	          }
	        }
	      } catch (e) {}

	      // We found nothing
	      return null;
	    }

	    function resetIssuers(force) {
	      var guess;
	      var order = $scope.order;

	      if (force) {
	        order.first_issuer = null;
	        order.second_issuer = null;
	      }

	      ['first','second'].forEach(function(prefix){
	        if (!order[prefix + '_issuer'] &&
	            order[prefix + '_currency'] &&
	            order[prefix + '_currency'] !== 'XRP' &&
	            (guess = guessIssuer(order[prefix + '_currency'].to_json()))) {
	          order[prefix + '_issuer'] = guess;
	        }
	      });

	      // If the same currency, exclude first issuer for second issuer guess
	      if (order.first_currency.equals(order.second_currency) &&
	          order.first_issuer === order.second_issuer &&
	          (guess = guessIssuer(order.first_currency.to_json(), order.first_issuer))) {
	        order.second_issuer = guess;
	      }
	    }

	    /**
	     * $scope.first_issuer_edit
	     * $scope.first_issuer_save
	     * $scope.second_issuer_edit
	     * $scope.second_issuer_save
	     */
	    ['first','second'].forEach(function(prefix){
	      $scope['edit_' + prefix + '_issuer'] = function () {
	        $scope.show_issuer_form = prefix;
	        $scope.order[prefix + '_issuer_edit'] = webutil.unresolveContact($scope.userBlob.data.contacts, $scope.order[prefix + '_issuer']);

	        setImmediate(function () {
	          $('#' + prefix + '_issuer').select();
	        });
	      };

	      $scope['save_' + prefix + '_issuer'] = function () {
	        $scope.order[prefix + '_issuer'] = webutil.resolveContact($scope.userBlob.data.contacts, $scope.order[prefix + '_issuer_edit']);
	        $scope.show_issuer_form = false;

	        updateSettings();
	        updateMRU();

	        // Persist issuer setting
	        if ($scope.order.valid_settings && !$scope.order[prefix + '_currency'].is_native()) {
	          if (prefix === 'first') {
	            $scope.userBlob.set("/preferred_issuer/"+
	                                $scope.userBlob.escapeToken($scope.order.first_currency.to_json()),
	                                $scope.order.first_issuer);
	          } else {
	            if ($scope.order.first_currency.equals($scope.order.second_currency)) {
	              $scope.userBlob.set("/preferred_second_issuer/"+
	                                  $scope.userBlob.escapeToken($scope.order.second_currency.to_json()),
	                                  $scope.order.second_issuer);
	            } else {
	              $scope.userBlob.set("/preferred_issuer/"+
	                                  $scope.userBlob.escapeToken($scope.order.second_currency.to_json()),
	                                  $scope.order.second_issuer);
	            }
	          }
	        }
	      };
	    });

	    /**
	     * Load orderbook
	     */
	    function loadOffers() {
	      // Make sure we unsubscribe from any previously loaded orderbook
	      if ($scope.book && "function" === typeof $scope.book.unsubscribe) {
	        $scope.book.unsubscribe();
	      }

	      $scope.book = books.get({
	        currency: ($scope.order.first_currency.has_interest() ? $scope.order.first_currency.to_hex() : $scope.order.first_currency.get_iso()),
	        issuer: $scope.order.first_issuer
	      }, {
	        currency: ($scope.order.second_currency.has_interest() ? $scope.order.second_currency.to_hex() : $scope.order.second_currency.get_iso()),
	        issuer: $scope.order.second_issuer
	      }, $scope.address);

	      $scope.orderbookState = 'ready';
	    }

	    /**
	     * Determine whether user can sell and/or buy on this pair
	     */
	    var updateCanBuySell = function () {
	      var first_currency = $scope.order.first_currency;
	      var first_issuer = $scope.order.first_issuer;
	      var second_currency = $scope.order.second_currency;
	      var second_issuer = $scope.order.second_issuer;

	      var canBuy = second_currency.is_native() ||
	          second_issuer == $scope.address ||
	          ($scope.lines[second_issuer+($scope.order.second_currency.has_interest() ? $scope.order.second_currency.to_hex() : $scope.order.second_currency.to_json())]
	            && $scope.lines[second_issuer+($scope.order.second_currency.has_interest() ? $scope.order.second_currency.to_hex() : $scope.order.second_currency.to_json())].balance.is_positive());


	      var canSell = first_currency.is_native() ||
	          first_issuer == $scope.address ||
	          ($scope.lines[first_issuer+($scope.order.first_currency.has_interest() ? $scope.order.first_currency.to_hex() : $scope.order.first_currency.to_json())]
	            && $scope.lines[first_issuer+($scope.order.first_currency.has_interest() ? $scope.order.first_currency.to_hex() : $scope.order.first_currency.to_json())].balance.is_positive());

	      $scope.order.buy.showWidget = canBuy;
	      $scope.order.sell.showWidget = canSell;
	    };

	    var rpamountFilter = $filter('rpamount');

	    $scope.$watchCollection('book', function () {
	      if (!jQuery.isEmptyObject($scope.book)) {
	        ['asks','bids'].forEach(function(type){
	          if ($scope.book[type]) {
	            $scope.book[type].forEach(function(order){
	              order.showSum = rpamountFilter(order.sum,OrderbookFilterOpts);
	              order.showPrice = rpamountFilter(order.price,OrderbookFilterOpts);

	              var showValue = type === 'bids' ? 'TakerPays' : 'TakerGets';
	              order['show' + showValue] = rpamountFilter(order[showValue],OrderbookFilterOpts);
	            });
	          }
	        });
	      }
	    });

	    /**
	     * Watch widget field changes
	     */
	    ['buy','sell'].forEach(function(type){
	      $scope.$watch('order.' + type + '.first', function () {
	        $scope.update_first(type);
	      }, true);

	      $scope.$watch('order.' + type + '.price', function () {
	        $scope.update_price(type);
	      }, true);

	      $scope.$watch('order.' + type + '.second', function () {
	        $scope.update_second(type);
	      }, true);
	    });

	    $scope.$watch('order.currency_pair', function (pair) {
	      if (currencyPairChangedByNonUser) {
	        currencyPairChangedByNonUser = false;
	        return;
	      }

	      updateSettings();
	      resetIssuers(true);
	      updateMRU();
	    }, true);

	    $scope.$on('$blobUpdate', function () {
	      resetIssuers(false);
	    });


	    $scope.$watch('order.type', function () {
	      updateCanBuySell();
	    });

	    $scope.$watch('order.first_issuer', function () {
	      updateSettings();
	      updateMRU();
	    });

	    $scope.$watch('order.second_issuer', function () {
	      updateSettings();
	      updateMRU();
	    });

	    var updateBalances = function(){
	      updateCanBuySell();
	      resetIssuers(false);
	    };

	    $scope.$on('$balancesUpdate', updateBalances);

	    $scope.$watch('userBlob.data.contacts', function (contacts) {
	      $scope.issuer_query = webutil.queryFromContacts(contacts);
	    }, true);

	    $scope.$watchCollection('offers', function(){
	      $scope.offersCount = _.size($scope.offers);
	    });

	    $scope.reset();

	    /**
	     * Route includes currency pair
	     */
	    if ($routeParams.first && $routeParams.second) {
	      var routeIssuers = {};
	      var routeCurrencies = {};

	      ['first','second'].forEach(function(prefix){
	        routeIssuers[prefix] = $routeParams[prefix].match(/:(.+)$/);
	        routeCurrencies[prefix] = $routeParams[prefix].match(/^(\w{3})/);

	        if (routeIssuers[prefix]) {
	          if (ripple.UInt160.is_valid(routeIssuers[prefix][1])) {
	            $scope.order[prefix + '_issuer'] = routeIssuers[prefix][1];
	          } else {
	            $location.path('/trade');
	          }
	        }
	      });

	      if (routeCurrencies.first && routeCurrencies.second) {
	        if (routeCurrencies.first[1] !== routeCurrencies.second[1]) {
	          $scope.order.currency_pair = routeCurrencies.first[1] + '/' + routeCurrencies.second[1];
	        } else {
	          $location.path('/trade');
	        }
	      }

	      updateSettings();
	      updateMRU();
	    }

	    updateBalances();

	    // Unsubscribe from the book when leaving this page
	    $scope.$on('$destroy', function(){
	      if ($scope.book && "function" === typeof $scope.book.unsubscribe) {
	        $scope.book.unsubscribe();
	      }
	    });
	  }]);
	};

	module.exports = TradeTab;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    webutil = __webpack_require__(66),
	    Tab = __webpack_require__(76).Tab,
	    Currency = ripple.Currency;

	var AdvancedTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(AdvancedTab, Tab);

	AdvancedTab.prototype.tabName = 'advanced';
	AdvancedTab.prototype.mainMenu = 'advanced';

	AdvancedTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(86)();
	};

	AdvancedTab.prototype.angular = function(module)
	{
	  module.controller('AdvancedCtrl', ['$scope', '$rootScope', 'rpId', 'rpKeychain',
	                                    function ($scope, $rootScope, $id, $keychain)
	  {
	    if (!$id.loginStatus) return $id.goId();

	    // XRP currency object.
	    // {name: "XRP - Ripples", order: 146, value: "XRP"}
	    var xrpCurrency = Currency.from_json("XRP");

	    $scope.xrp = {
	      name: xrpCurrency.to_human({full_name:$scope.currencies_all_keyed.XRP.name}),
	      code: xrpCurrency.get_iso(),
	      currency: xrpCurrency
	    };

	    $scope.options = Options;
	    $scope.optionsBackup = $.extend(true, {}, Options);
	    $scope.passwordProtection = !$scope.userBlob.data.persistUnlock;
	    $scope.editBridge = false;
	    $scope.editBlob = false;
	    $scope.editMaxNetworkFee = false;
	    $scope.editAcctOptions = false;
	    $scope.max_tx_network_fee_human = ripple.Amount.from_json($scope.options.max_tx_network_fee).to_human();

	    $scope.advanced_feature_switch = Options.advanced_feature_switch;

	    $scope.saveBlob = function () {
	      // Save in local storage
	      if (!store.disabled) {
	        store.set('ripple_settings', JSON.stringify($scope.options));
	      }

	      $scope.editBlob = false;

	      // Reload
	      location.reload();
	    };

	    $scope.saveBridge = function () {
	      // Save in local storage
	      if (!store.disabled) {
	        store.set('ripple_settings', JSON.stringify($scope.options));
	      }

	      $scope.editBridge = false;

	      // Reload
	      location.reload();
	    };

	    $scope.saveMaxNetworkFee = function () {
	      // Save in local storage
	      if (!store.disabled) {
	        $scope.options.max_tx_network_fee = ripple.Amount.from_human($scope.max_tx_network_fee_human).to_json();
	        store.set('ripple_settings', JSON.stringify($scope.options));
	      }

	      $scope.editMaxNetworkFee = false;

	      // Reload
	      location.reload();
	    };

	    $scope.saveAcctOptions = function () {
	      if (!store.disabled) {
	        // Save in local storage
	        store.set('ripple_settings', JSON.stringify($scope.options));
	      }

	      $scope.editAcctOptions = false;

	      // Reload
	      location.reload();
	    };

	    $scope.deleteBlob = function () {
	      $scope.options.blobvault = "";
	      // Save in local storage
	      if (!store.disabled) {
	        store.set('ripple_settings', JSON.stringify($scope.options));
	      }
	    };

	    $scope.deleteBridge = function () {
	      $scope.options.bridge.out.bitcoin = "";
	      // Save in local storage
	      if (!store.disabled) {
	        store.set('ripple_settings', JSON.stringify($scope.options));
	      }
	    };

	    $scope.cancelEditBlob = function () {
	      $scope.editBlob = false;
	      $scope.options.blobvault = $scope.optionsBackup.blobvault;
	    };

	    $scope.cancelEditBridge = function () {
	      $scope.editBridge = false;
	      $scope.options.bridge.out.bitcoin = $scope.optionsBackup.bridge.out.bitcoin;
	    };

	    $scope.cancelEditMaxNetworkFee = function () {
	      $scope.editMaxNetworkFee = false;
	      $scope.options.max_tx_network_fee = $scope.optionsBackup.max_tx_network_fee;
	    };

	    $scope.cancelEditAcctOptions = function () {
	      $scope.editAcctOptions = false;
	    };


	    $scope.$on('$blobUpdate', function () {
	      $scope.passwordProtection = !$scope.userBlob.data.persistUnlock;
	    });

	    $scope.setPasswordProtection = function () {
	      $keychain.setPasswordProtection(!$scope.passwordProtection, function(err, resp){
	        if (err) {
	          $scope.passwordProtection = !$scope.PasswordProtection;
	          //TODO: report errors to user
	        }
	      });
	    };

	    // Add a new server
	    $scope.addServer = function () {
	      // Create a new server line
	      if(!$scope.options.server.servers.isEmptyServer)
	        $scope.options.server.servers.push({isEmptyServer: true, secure: false});

	      // Set editing to true
	      $scope.editing = true;

	    };

	  }]);

	  module.controller('ServerRowCtrl', ['$scope',
	    function ($scope) {
	      $scope.editing = $scope.server.isEmptyServer;

	        // Delete the server
	      $scope.remove = function () {
	        $scope.options.server.servers.splice($scope.index,1);

	        // Save in local storage
	        if (!store.disabled) {
	          store.set('ripple_settings', JSON.stringify($scope.options));
	        }
	      };

	      $scope.hasRemove = function () {
	        return !$scope.server.isEmptyServer && $scope.options.server.servers.length !== 1;
	      };

	      $scope.cancel = function () {
	        if ($scope.server.isEmptyServer) {
	          $scope.remove();
	          return;
	        }

	        $scope.editing = false;
	        $scope.server = $.extend({}, $scope.optionsBackup.server.servers[$scope.index]);

	      };

	      $scope.noCancel = function () {
	        return $scope.server.isEmptyServer && $scope.options.server.servers.length === 1;
	      };

	      $scope.save = function () {
	        $scope.server.isEmptyServer = false;
	        $scope.editing = false;

	        // Save in local storage
	        if (!store.disabled) {
	          store.set('ripple_settings', JSON.stringify($scope.options));
	        }

	        // Reload
	      location.reload();
	      };
	    }
	  ]);
	};

	module.exports = AdvancedTab;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var Tab  = __webpack_require__(76).Tab;

	var SecurityTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(SecurityTab, Tab);

	SecurityTab.prototype.tabName = 'security';
	SecurityTab.prototype.mainMenu = 'security';

	SecurityTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(89)();
	};

	SecurityTab.prototype.angular = function (module) {
	  module.controller('SecurityCtrl', ['$scope', 'rpId', 'rpOldBlob', 'rpTracker',
	                                     'rpKeychain', '$timeout', 'rpAuthFlow', 'rpPopup',
	                                     function ($scope, $id, $blob, $rpTracker,
	                                               keychain, $timeout, authflow, popup)
	  {
	    if (!$id.loginStatus) return $id.goId();

	    $scope.settingsPage = 'security';

	    $scope.showComponent = [];


	    $scope.isUnlocked = true; //hiding the dialog for now
	    //$scope.isUnlocked = keychain.isUnlocked($id.account);
	    $scope.loading2FA      = false;
	    $scope.loaded2FA       = false;
	    $scope.errorLoading2FA = false;
	    $scope.requirePasswordChanged = false;

	    $scope.validation_pattern_phone = /^[0-9]*$/;

	    $scope.$on('$blobUpdate', onBlobUpdate);
	    onBlobUpdate();

	    $scope.security = {};

	    function onBlobUpdate()
	    {
	      if ("function" === typeof $scope.userBlob.encrypt) {
	        $scope.enc = $scope.userBlob.encrypt();
	      }


	      $scope.requirePassword = !$scope.userBlob.data.persistUnlock;

	      if (!$scope.loaded2FA && "function" === typeof $scope.userBlob.get2FA) {
	        $scope.loading2FA      = true;
	        $scope.errorLoading2FA = false;
	        $scope.userBlob.get2FA(function(err, resp) {
	          $scope.$apply(function(){
	            $scope.loading2FA = false;
	            if (err) {
	              $scope.errorLoading2FA = true;
	              return;
	            }

	            $scope.loaded2FA          = true;
	            $scope.enabled2FA         = resp.enabled;
	            $scope.currentPhone       = resp.phone;
	            $scope.currentCountryCode = resp.country_code;
	          });
	        });
	      }
	    }

	    $scope.restoreSession = function() {

	      if (!$scope.sessionPassword) {
	        $scope.unlockError = true;
	        return;
	      }

	      $scope.isConfirming = true;
	      $scope.unlockError  = null;

	      keychain.getSecret($id.account, $id.username, $scope.sessionPassword, function(err, secret) {
	        $scope.isConfirming = false;
	        $scope.sessionPassword = '';

	        if (err) {
	          $scope.unlockError = err;
	          return;
	        }

	        $scope.isUnlocked = keychain.isUnlocked($id.account);
	      });

	    };


	    $scope.unmaskSecret = function () {
	      keychain.requestSecret($id.account, $id.username, 'showSecret', function (err, secret) {
	        if (err) {
	          // XXX Handle error
	          return;
	        }

	        $scope.security.master_seed = secret;
	      });
	    };


	    $scope.setPasswordProtection = function () {
	      $scope.editUnlock = false;

	      //ignore it if we are not going to change anything
	      if (!$scope.requirePasswordChanged) return;
	      $scope.requirePasswordChanged = false;
	      $scope.requirePassword        = !$scope.requirePassword;

	      keychain.setPasswordProtection($scope.requirePassword, function(err, resp){
	        if (err) {
	          console.log(err);
	          $scope.requirePassword = !$scope.requirePassword;
	          //TODO: report errors to user
	        }
	      });
	    };

	    $scope.cancelUnlockOptions = function () {
	      $scope.editUnlock = false;
	    };

	    $scope.changePassword = function() {
	      $scope.loading = true;
	      $scope.error = false;

	      // Get the master key
	      keychain.getSecret($id.account, $id.username, $scope.password,
	          function (err, masterkey) {
	            if (err) {
	              console.log("client: account tab: error while " +
	                  "unlocking wallet: ", err);

	              $scope.error = 'wrongpassword';
	              $scope.loading = false;
	              return;
	            }

	            // Change password
	            $id.changePassword({
	              username: $id.username,
	              password: $scope.password1,
	              masterkey: masterkey,
	              blob: $scope.userBlob
	            }, function(err){
	              if (err) {
	                console.log('client: account tab: error while ' +
	                    'changing the account password: ', err);
	                $scope.error = true;
	                $scope.loading = false;
	                return;
	              }

	              $scope.success = true;
	              reset();
	            });
	          }
	      );
	    };

	    $scope.open2FA = function() {
	      $scope.mode2FA        = '';
	      $scope.loading        = false;
	      $scope.error2FA       = false;
	      $scope.disableSuccess = false;
	      $scope.phoneNumber    = $scope.currentPhone;
	      $scope.countryCode    = $scope.currentCountryCode;
	      window.Authy.UI.instance(true, $scope.countryCode); //enables the authy dropdown
	    };

	    $scope.savePhone = function() {
	      $scope.mode2FA     = 'savePhone';
	      $scope.error2FA    = false;
	      $scope.savingPhone = true;

	      keychain.requestSecret($id.account, $id.username, function(err, secret) {
	        if (err) {
	          $scope.mode2FA = '';
	          return;
	        }

	        var options = {
	          masterkey    : secret,
	          phone        : $scope.phoneNumber,
	          country_code : $scope.countryCode
	        };

	        $scope.userBlob.set2FA(options, function(err, resp) {
	          $scope.$apply(function(){
	            $scope.mode2FA = '';
	            if (err) {
	              console.log(err, resp);
	              $scope.error2FA    = true;
	              $scope.savingPhone = false;
	              popup.close();
	            } else {

	              $scope.currentPhone       = options.phone;
	              $scope.currentCountryCode = options.country_code;

	              //request verification token
	              requestToken(false, function(err, resp) {
	                //TODO: handle error

	                $scope.savingPhone = false;
	                $scope.mode2FA     = 'verifyPhone';
	                popup.close();
	              });
	            }
	          });
	        });
	      });
	    };

	    function requestToken (force, callback) {

	      authflow.requestToken($scope.userBlob.url, $scope.userBlob.id, force, function(tokenError, tokenResp) {
	        if (tokenError) {
	          $scope.error2FA = true;
	        } else {
	          $scope.via = tokenResp.via;
	        }

	        callback(tokenError, tokenResp);
	      });
	    }

	    $scope.requestToken = function () {
	      var force = $scope.via === 'app' ? true : false;

	      $scope.isRequesting = true;
	      requestToken(force, function(err, resp) {
	        $scope.isRequesting = false;
	        //TODO: present message of resend success or failure
	      });
	    };


	    $scope.enable2FA = function() {

	      $scope.isVerifying  = true;
	      $scope.invalidToken = false;

	      var options = {
	        url         : $scope.userBlob.url,
	        id          : $scope.userBlob.id,
	        token       : $scope.verifyToken,
	        remember_me : false
	      };

	      authflow.verifyToken(options, function(err, resp){

	        if (err) {
	          $scope.invalidToken = true;
	          $scope.isVerifying  = false;
	          return;
	        }

	        keychain.requestSecret($id.account, $id.username, function(err, secret) {

	          if (err) {
	            $scope.mode2FA     = '';
	            $scope.isVerifying = false;
	            return;
	          }

	          var options = {
	            masterkey : secret,
	            enabled   : true
	          };

	          $scope.userBlob.set2FA(options, function(err, resp) {
	            $scope.$apply(function() {
	              $scope.isVerifying = false;
	              $scope.mode2FA     = '';

	              if (err) {
	                $scope.error2FA = true;
	              } else {

	                //remove old device ID so that
	                //next login will require 2FA
	                store.remove('device_id');
	                $scope.enabled2FA    = true;
	                $scope.enableSuccess = true;
	              }
	            });
	          });
	        });
	      });
	    };

	    $scope.disable2FA = function() {
	      $scope.mode2FA       = 'disable';
	      $scope.error2FA      = false;
	      $scope.enableSuccess = false;

	      keychain.requestSecret($id.account, $id.username, function(err, secret) {
	        if (err) {
	          $scope.mode2FA = '';
	          return;
	        }

	        var options = {
	          masterkey : secret,
	          enabled   : false
	        };

	        $scope.userBlob.set2FA(options, function(err, resp) {
	          $scope.$apply(function(){
	            $scope.mode2FA = '';
	            if (err) {
	              $scope.error2FA   = true;
	            } else {
	              $scope.enabled2FA     = false;
	              $scope.disableSuccess = true;
	            }
	          });
	        });
	      });
	    };

	    $scope.cancel2FA = function () {
	      $scope.mode2FA = '';
	      $scope.invalidToken = false;
	      $scope.error2FA     = false;
	    };


	    var reset = function() {

	      $scope.openFormPassword = false;
	      $scope.password1 = '';
	      $scope.password2 = '';
	      $scope.passwordSet = {};
	      $scope.loading = false;
	      $scope.error = false;

	      if ($scope.changeForm) {
	        $scope.changeForm.$setPristine(true);
	      }
	  };

	  reset();
	  $scope.success = false;

	  }]);
	};

	module.exports = SecurityTab;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    webutil = __webpack_require__(66);
	var Tab = __webpack_require__(76).Tab;

	var KycTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(KycTab, Tab);

	KycTab.prototype.tabName = 'kyc';
	KycTab.prototype.mainMenu = 'kyc';

	KycTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(93)();
	};

	KycTab.prototype.angular = function(module)
	{
	  module.controller('KycCtrl', ['$scope', 'rpId', 'rpKeychain', 'rpAuthFlow', '$timeout',
	    function ($scope, $id, keychain, authflow, $timeout)
	    {
	      if (!$id.loginStatus) return $id.goId();
	      if (!$scope.blockscoreError) $scope.blockscoreError = false;
	      if (!$scope.profile) $scope.profile = {};
	      if (!$scope.profileStatus) $scope.profileStatus = 'loading';
	      if (!$scope.identityStatus) $scope.identityStatus = 'loading';
	      if (!$scope.identityLoading) $scope.identityLoading = false;
	      if (!$scope.questionsLoading) $scope.questionsLoading = false;

	      $scope.load_notification('loading');

	      $scope.$on('$blobUpdate', onBlobUpdate);
	      onBlobUpdate();

	      function onBlobUpdate()
	      {
	        if ("function" === typeof $scope.userBlob.encrypt) {
	          $scope.enc = $scope.userBlob.encrypt();
	        }

	        $scope.requirePassword = !$scope.userBlob.data.persistUnlock;

	        if (!$scope.loaded2FA && "function" === typeof $scope.userBlob.get2FA) {
	          $scope.userBlob.get2FA(function(err, resp) {
	            $scope.$apply(function(){
	              if (err) {
	                console.log('Error: ', err);
	                return;
	              }

	              $scope.enabled2FA = resp.enabled;
	              $scope.phoneNumber = resp.phone;
	              $scope.countryCode = resp.country_code;
	            });
	          });
	        }

	        // Check what step user is on - they may have partially gone through KYC flow
	        if ($scope.userBlob.id) {

	          $scope.options = {
	            url         : $scope.userBlob.url,
	            auth_secret : $scope.userBlob.data.auth_secret,
	            blob_id     : $scope.userBlob.id
	          };

	          authflow.getAttestationSummary($scope.options, function(err, resp) {

	            if (err) {
	              console.log('Error on getAttestationSummary');
	              return;
	            }

	            if (resp.decoded.payload.profile_verified === true && resp.decoded.payload.identity_verified === true) {
	              $scope.currentStep = 'three';
	              $scope.profileStatus = 'complete';
	              $scope.identityStatus = 'complete';
	            }

	            else if (resp.decoded.payload.profile_verified === true && resp.decoded.payload.identity_verified === false) {

	              $scope.profileStatus = 'complete';
	              $scope.identityStatus = 'incomplete';

	              $scope.options.type = 'identity';
	              $scope.getQuestions($scope.options, function() {
	                $scope.currentStep = 'two';
	              });
	            }

	            else if (resp.decoded.payload.profile_verified === false && resp.decoded.payload.identity_verified === false) {
	              $scope.currentStep = 'one';
	              $scope.profileStatus = 'incomplete';
	              $scope.identityStatus = 'incomplete';
	            }

	            else {
	              console.log('Error: KYC flow route not recognized');
	            }

	            $scope.load_notification('clear');
	          });
	        }
	      }


	      // STEP ONE: IDENTITY INFORMATION

	      // $scope.validation_pattern_name = /^[a-zA-Z0-9]{1,}$/;
	      $scope.validation_pattern_month = /^[a-zA-Z][a-zA-Z][a-zA-Z]$/;
	      $scope.validation_pattern_date = /^(0[1-9]|[12]\d|3[0-1])$/;
	      $scope.validation_pattern_year = /^[1-2][0-9][0-9][0-9]$/;
	      $scope.validation_pattern_city = /^[a-zA-Z]+(?:[\s][a-zA-Z]+)*$/;
	      $scope.validation_pattern_state = /^[a-zA-Z][a-zA-Z]$/;
	      $scope.validation_pattern_zip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
	      $scope.validation_pattern_sss = /^[0-9]{4}$/;
	      $scope.validation_pattern_phone = /^[0-9]*$/;

	      var genNum = function(start, end) {
	        var arr = [];
	        for (var i = start; i <= end; i++) {
	          arr.push('' + i);
	        }
	        return arr;
	      };

	      var currentYear = new Date().getFullYear();

	      $scope.years = genNum(currentYear - 100, currentYear);

	      $scope.dates =
	        ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
	         '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
	         '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

	      $scope.months =
	        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	      $scope.states =
	        ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
	         'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'LA', 'MA', 'MD', 'ME', 'MH',
	         'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV',
	         'NY', 'OH', 'OK', 'OR', 'PA', 'PW', 'RI', 'SC', 'SD', 'TN', 'UT', 'VA',
	         'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];

	      $scope.saveIdentityInfo = function () {
	        $scope.identityLoading = true;
	        webutil.scrollToTop();

	        $scope.load_notification('verifying');

	        // Parse month correctly
	        $scope.profile.birthdate.month_parsed = $scope.profile.birthdate.month.toLowerCase();

	        switch($scope.profile.birthdate.month_parsed) {
	          case 'jan':
	            $scope.profile.birthdate.month_parsed = '01';
	            break;
	          case 'feb':
	            $scope.profile.birthdate.month_parsed = '02';
	            break;
	          case 'mar':
	            $scope.profile.birthdate.month_parsed = '03';
	            break;
	          case 'apr':
	            $scope.profile.birthdate.month_parsed = '04';
	            break;
	          case 'may':
	            $scope.profile.birthdate.month_parsed = '05';
	            break;
	          case 'jun':
	            $scope.profile.birthdate.month_parsed = '06';
	            break;
	          case 'jul':
	            $scope.profile.birthdate.month_parsed = '07';
	            break;
	          case 'aug':
	            $scope.profile.birthdate.month_parsed = '08';
	            break;
	          case 'sep':
	            $scope.profile.birthdate.month_parsed = '09';
	            break;
	          case 'oct':
	            $scope.profile.birthdate.month_parsed = '10';
	            break;
	          case 'nov':
	            $scope.profile.birthdate.month_parsed = '11';
	            break;
	          case 'dec':
	            $scope.profile.birthdate.month_parsed = '12';
	            break;
	        }

	        var parsedBirthdate = ''.concat($scope.profile.birthdate.year)
	          .concat('-')
	          .concat($scope.profile.birthdate.month_parsed)
	          .concat('-')
	          .concat($scope.profile.birthdate.date);

	        // US only for now
	        $scope.profile.address.country = 'US';

	        $scope.options.type = 'profile';

	        $scope.options.profile = {
	          name : {
	            given  : $scope.profile.name.given,
	            family : $scope.profile.name.family
	          },
	          ssn_last_4 : $scope.profile.ssn_last_4,
	          birthdate  : parsedBirthdate,
	          address  : {
	            line1       : $scope.profile.address.line1,
	            locality    : $scope.profile.address.locality,
	            region      : $scope.profile.address.region,
	            postal_code : $scope.profile.address.postal_code,
	            country     : $scope.profile.address.country
	          }
	        };

	        authflow.updateAttestation($scope.options, function(err, res) {
	          if (err) {
	            console.log("Error in saveIdentityInfo: ", err);
	            $scope.load_notification('info_error');
	            if ($scope.identityForm) $scope.identityForm.$setPristine(true);
	            $scope.identityLoading = false;
	            return;
	          }

	          if (res.status === "unverified") {
	            $scope.load_notification('info_error');
	            if ($scope.identityForm) $scope.identityForm.$setPristine(true);
	          } else {
	            $scope.load_notification('info_verified');
	            $scope.options.type = 'identity';

	            // Retrieve questions from BlockScore after successfully identifying user
	            $scope.getQuestions($scope.options, function() {
	              $scope.currentStep = 'two';
	            });
	          }

	          $scope.identityLoading = false;
	        });
	      };

	      // STEP TWO: IDENTITY QUESTIONS

	      $scope.getQuestions = function(options, cb) {

	        authflow.updateAttestation(options, function(err, res) {
	          if (err) {
	            console.log("Error in retrieving questions: ", err);
	            if (err.message === "attestation error: Max attempts exceeded. Try again in 24 hours.") {
	              $scope.load_notification('max_attempts_questions_error');
	              return;
	            } else {
	              $scope.blockscoreError = true;
	              return;
	            }
	          } else {
	            console.log('response is: ', res);
	            $scope.questions = res.questions;
	            if ($scope.questions.length === 0) {
	              $scope.load_notification('contact_support');
	              return;
	            }
	          }

	          cb();
	        });
	      };


	      $scope.saveQuestions = function() {
	        $scope.questionsLoading = true;
	        webutil.scrollToTop();

	        $scope.load_notification('verifying');

	        $scope.options.answers = [];
	        $scope.options.type = 'identity';

	        _.each($scope.questions, function(question) {
	          $scope.options.answers.push({ question_id : question.id, answer_id : Number(question.answerId) });
	        });


	        authflow.updateAttestation($scope.options, function(err, res) {
	          if (err) {
	            console.log("Error in saveQuestions: ", err);
	            if (err.message === "attestation error: Max attempts exceeded. Try again in 24 hours.") {
	              $scope.load_notification('max_attempts_questions_error');
	              $scope.questionsLoading = false;
	              return;
	            } else {
	              $scope.load_notification('questions_error');
	              if ($scope.identityForm) $scope.identityForm.$setPristine(true);
	              $scope.questionsLoading = false;
	              return;
	            }

	          }

	          if (res.status === "unverified") {
	            $scope.load_notification('questions_error');
	            if ($scope.questionsForm) $scope.questionsForm.$setPristine(true);
	          } else {
	            $scope.load_notification('questions_verified');
	            $scope.currentStep = 'three';
	          }

	          $scope.questionsLoading = false;
	        });
	      };

	      // STEP THREE: TWO-FACTOR AUTH
	      // TODO: Merge twofa.js and kyc.js
	      // Look at twofa.js

	    }]
	  );
	};

	module.exports = KycTab;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var Tab = __webpack_require__(76).Tab;
	var rewriter = __webpack_require__(69);

	var TxTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(TxTab, Tab);

	TxTab.prototype.tabName = 'tx';

	TxTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(90)();
	};

	TxTab.prototype.angular = function (module)
	{
	  module.controller('TxCtrl', ['$scope', 'rpNetwork', '$routeParams', 'rpId', '$location',
	                               function ($scope, net, $routeParams, $id, $location)
	  {
	    $scope.logoutTx = function () {
	      $id.logout();
	      $location.path('/login');
	    };

	    if (!$id.loginStatus) return $scope.logoutTx();

	    $scope.state = 'loading';
	    $scope.transaction = {
	      hash: $routeParams.id
	    };

	    function loadTx() {
	      // XXX: Dirty, dirty. But it's going to change soon anyway.
	      var request = net.remote.request_ledger_hash();
	      request.message.command = 'tx';
	      request.message.transaction = $routeParams.id;
	      request.on('success', function (res) {
	        $scope.$apply(function () {
	          $scope.state = 'loaded';
	          // XXX This is for the upcoming tx RPC call format change.
	          var tx = res.tx ? res.tx : res;
	          _.extend($scope.transaction, res);

	          $scope.amountSent = rewriter.getAmountSent(tx, tx.meta);
	        });
	      });
	      request.on('error', function (res) {
	        $scope.$apply(function () {
	          $scope.state = 'error';
	          console.log(res);
	        });
	      });
	      request.request();
	    }

	    if (net.connected) loadTx();
	    else var removeListener = $scope.$on('$netConnected', function () {
	      removeListener();
	      loadTx();
	    });
	  }]);
	};

	module.exports = TxTab;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    Tab = __webpack_require__(76).Tab;

	var XrpTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(XrpTab, Tab);

	XrpTab.prototype.tabName = 'xrp';
	XrpTab.prototype.mainMenu = 'fund';

	XrpTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['qr']);

	XrpTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(91)();
	};


	XrpTab.prototype.angular = function (module)
	{
	  module.controller('XrpCtrl', ['$rootScope', 'rpId', 'rpAppManager', 'rpTracker', '$routeParams',
	                                     function ($scope, $id, appManager, rpTracker, $routeParams)
	  {

	    $scope.accountLines = {};
	    $scope.showComponent = [];
	    $scope.fundPage = 'xrp';

	    if (!$id.loginStatus) return $id.goId();


	  }]);
	};

	module.exports = XrpTab;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    Tab = __webpack_require__(76).Tab;

	var BtcTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(BtcTab, Tab);

	BtcTab.prototype.tabName = 'btc';
	BtcTab.prototype.mainMenu = 'fund';

	BtcTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['qr']);

	BtcTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(92)();
	};

	BtcTab.prototype.angular = function (module)
	{
	  module.controller('BtcCtrl', ['$rootScope', 'rpId', 'rpAppManager', 'rpTracker', '$routeParams', 'rpKeychain',
	                                     function ($scope, $id, appManager, rpTracker, $routeParams, keychain)
	  {
	 
	    $scope.accountLines = {};
	    $scope.showComponent = [];

	    if (!$id.loginStatus) return $id.goId();

	    $scope.openPopup = function () {
	      $scope.emailError = false;
	      rpTracker.track('B2R Show Connect');
	    };

	    // B2R Signup
	    $scope.B2RSignup = function () {
	      var fields = {};

	      $scope.loading = true;

	      fields.rippleAddress = $id.account;

	      fields.email = $scope.userBlob.data.email;

	      keychain.requestSecret($id.account, $id.username, function (err, secret) {
	        if (err) {
	          console.log("client: trust profile: error while " +
	            "unlocking wallet: ", err);
	          $scope.mode = "error";
	          $scope.error_type = "unlockFailed";
	          $scope.loading = false;
	          return;
	        }

	        $scope.B2RApp.findProfile('account').signup(fields, function (err, response) {
	          if (err) {
	            console.log('Error', err);
	            $scope.emailError = true;
	            $scope.loading = false;

	            rpTracker.track('B2R SignUp', {
	              result: 'failed',
	              message: err.message
	            });

	            return;
	          }

	          $scope.B2RApp.refresh();

	          $scope.B2RSignupResponse = response;

	          rpTracker.track('B2R SignUp', {
	            result: 'success'
	          });
	        });
	      });

	      $scope.B2R.progress = true;

	      rpTracker.track('B2R Shared Email');
	    };

	  }]);
	};

	module.exports = BtcTab;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    Tab = __webpack_require__(76).Tab;

	var WithdrawTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(WithdrawTab, Tab);

	WithdrawTab.prototype.tabName = 'withdraw';
	WithdrawTab.prototype.mainMenu = 'fund';

	WithdrawTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['qr']);

	WithdrawTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(95)();
	};

	WithdrawTab.prototype.angular = function (module)
	{
	  module.controller('WithdrawCtrl', ['$rootScope', 'rpId', 'rpAppManager',
	                                     function ($scope, $id, appManager)
	  {
	    if (!$id.loginStatus) return $id.goId();



	  }]);
	};

	module.exports = WithdrawTab;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    Tab = __webpack_require__(76).Tab;

	var GoldTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(GoldTab, Tab);

	GoldTab.prototype.tabName = 'gold';
	GoldTab.prototype.mainMenu = 'fund';

	GoldTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['qr']);

	GoldTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(101)();
	};

	GoldTab.prototype.angular = function (module)
	{
	  module.controller('GoldCtrl', ['$rootScope', 'rpId', 'rpAppManager', 'rpTracker', '$routeParams', 'rpKeychain', 'rpNetwork', '$timeout',
	    function ($scope, $id, appManager, rpTracker, $routeParams, keychain, $network, $timeout) {
	      //$scope.show_instructions = true;
	      if (!$id.loginStatus) return $id.goId();
	      if (!$scope.account.Balance){
	        store.set('gbi_connected', false);
	      }

	      $scope.gbiConnected = store.get('gbi_connected');
	      $scope.showInstructions = store.get('show_instructions');

	      $scope.toggle_instructions = function () {
	        $scope.showInstructions = !$scope.showInstructions;
	        store.set('show_instructions', $scope.showInstructions);
	      };

	      $scope.save_account = function () {

	        $scope.loading = true;

	        $scope.load_notification('loading');

	        var amount = ripple.Amount.from_human(
	            Options.gateway_max_limit + ' ' + '0158415500000000C1F76FF6ECB0BAC600000000',
	            {reference_date: new Date(+new Date() + 5*60000)}
	        );

	        amount.set_issuer("rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67");

	        if (!amount.is_valid()) {
	          // Invalid amount. Indicates a bug in one of the validators.
	          console.log('Invalid amount');
	          return;
	        }

	        var tx = $network.remote.transaction();

	        // Add memo to tx
	        tx.addMemo('client', 'rt' + $scope.version);

	        // Flags
	        tx
	            .rippleLineSet($id.account, amount)
	            .on('success', function (res) {
	              $scope.$apply(function () {
	                setEngineStatus(res, true);

	                $scope.loading = false;
	                $scope.load_notification('success');
	                $scope.editing = false;
	              });
	            })
	            .on('error', function (res) {
	              console.log('error', res);
	              setImmediate(function () {
	                $scope.$apply(function () {
	                  $scope.mode = 'error';

	                  $scope.loading = false;
	                  $scope.load_notification("error");
	                  $scope.editing = false;
	                });
	              });
	            });

	        function setEngineStatus(res, accepted) {
	          $scope.engine_result = res.engine_result;
	          $scope.engine_result_message = res.engine_result_message;

	          switch (res.engine_result.slice(0, 3)) {
	            case 'tes':
	              $scope.tx_result = accepted ? 'cleared' : 'pending';
	              break;
	            case 'tem':
	              $scope.tx_result = 'malformed';
	              break;
	            case 'ter':
	              $scope.tx_result = 'failed';
	              break;
	            case 'tec':
	              $scope.tx_result = 'failed';
	              break;
	            case 'tel':
	              $scope.tx_result = "local";
	              break;
	            case 'tep':
	              console.warn('Unhandled engine status encountered!');
	          }
	          if ($scope.tx_result=="cleared"){
	            $scope.gbiConnected = true;
	            $scope.showInstructions = true;

	            // Save in local storage
	            if (!store.disabled) {
	              store.set('gbi_connected', $scope.gbiConnected);
	              store.set('show_instructions', $scope.showInstructions);
	            }

	          }
	          console.log($scope.tx_result);
	        }

	        keychain.requestSecret($id.account, $id.username, function (err, secret) {
	          // XXX Error handling
	          if (err) {
	            $scope.loading = false;
	            $scope.load_notification('error');
	            console.log(err);
	            return;
	          }

	          $scope.mode = 'granting';

	          console.log($scope.tx_result);

	          tx.secret(secret);
	          tx.submit();


	        });

	        $timeout(function(){
	          $scope.mode = 'main';
	        }, 10000);

	      };

	    }]);

	};

	module.exports = GoldTab;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var Tab = __webpack_require__(76).Tab;

	var TouTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(TouTab, Tab);

	TouTab.prototype.tabName = 'tou';
	TouTab.prototype.pageMode = 'single';
	TouTab.prototype.parent = 'main';

	TouTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(97)();
	};

	TouTab.prototype.angular = function (module) {
	  module.controller('TouCtrl', ['$scope', '$element',
	                                  function ($scope, $element)
	  {

	    angular.element('nav').hide();

	  }]);

	};



	module.exports = TouTab;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var Tab = __webpack_require__(76).Tab;

	var PrivacypolicyTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(PrivacypolicyTab, Tab);

	PrivacypolicyTab.prototype.tabName = 'privacypolicy';
	PrivacypolicyTab.prototype.pageMode = 'single';
	PrivacypolicyTab.prototype.parent = 'main';

	PrivacypolicyTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(96)();
	};

	PrivacypolicyTab.prototype.angular = function (module) {
	  module.controller('PrivacypolicyCtrl', ['$scope', '$element',
	    function ($scope, $element)
	    {

	      angular.element('nav').hide();

	    }]);

	};



	module.exports = PrivacypolicyTab;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102);
	var Tab  = __webpack_require__(76).Tab;

	var TwoFATab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(TwoFATab, Tab);

	TwoFATab.prototype.tabName = 'twofa';
	TwoFATab.prototype.mainMenu = 'twofa';

	TwoFATab.prototype.generateHtml = function ()
	{
	  return;
	};

	TwoFATab.prototype.angular = function(module)
	{
	  module.controller('TwoFACtrl', ['$scope', 'rpId', 'rpKeychain', 'rpAuthFlow', '$timeout',
	    function ($scope, $id, keychain, authflow, $timeout)
	    {

	      if (!$scope.twoFAVerify) $scope.twoFAVerify = true;
	      if (!$scope.editNum) $scope.editNum = false;
	      if (!$scope.verificationCode) $scope.verificationCode = '';
	      if (!$scope.editPhone) $scope.editPhone = false;
	      if (!$scope.phoneLoading) $scope.phoneLoading = false;

	      window.Authy.UI.instance(true, $scope.countryCode);

	      $scope.validation_pattern_phone = /^[0-9]*$/;

	      $scope.$on('$blobUpdate', onBlobUpdate);
	      onBlobUpdate();

	      function onBlobUpdate()
	      {
	        if ("function" === typeof $scope.userBlob.encrypt) {
	          $scope.enc = $scope.userBlob.encrypt();
	        }

	        $scope.requirePassword = !$scope.userBlob.data.persistUnlock;

	        if (!$scope.loaded2FA && "function" === typeof $scope.userBlob.get2FA) {
	          $scope.userBlob.get2FA(function(err, resp) {
	            $scope.$apply(function(){
	              if (err) {
	                console.log('Error: ', err);
	                return;
	              }

	              $scope.phoneNumber = resp.phone;
	              $scope.countryCode = resp.country_code;
	            });
	          });
	        }
	      }

	      $scope.edit_toggle = function() {
	        $scope.twoFAVerify = !$scope.twoFAVerify;
	        $scope.editNum = !$scope.editNum;
	      };

	      $scope.requestToken = function(force, callback) {
	        authflow.requestToken($scope.userBlob.url, $scope.userBlob.id, force, function(tokenError, tokenResp) {
	          if (tokenError) {
	            $scope.load_notification('request_token_error');
	            $scope.phoneLoading = false;
	            return;
	          } else {
	            if (callback) {
	              callback(tokenError, tokenResp);
	            }
	          }

	        });
	      };

	      $scope.savePhone = function() {
	        $scope.phoneLoading = true;
	        $scope.load_notification('loading');

	        $scope.savingPhone = true;

	        keychain.requestSecret($id.account, $id.username, function(err, secret) {
	          if (err) {
	            $scope.savingPhone = false;
	            $scope.load_notification('general_error');
	            console.log('Error: ', err);
	            $scope.phoneLoading = false;
	            return;
	          }

	          var options = {
	            masterkey    : secret,
	            phone        : $scope.phoneNumber,
	            country_code : $scope.countryCode
	          };

	          $scope.userBlob.set2FA(options, function(err, resp) {
	            $scope.$apply(function(){
	              if (err) {
	                if (err.message === 'invalid phone') {
	                  $scope.load_notification('phone_error');
	                }

	                $scope.savingPhone = false;
	                console.log(err, resp);
	                $scope.phoneLoading = false;
	                return;
	              } else {

	                $scope.currentPhone       = options.phone;
	                $scope.currentCountryCode = options.country_code;

	                //request verification token
	                $scope.requestToken(false, function(err, resp) {
	                  if (err) {
	                    $scope.savingPhone = false;
	                    $scope.load_notification('general_error');
	                    console.log("Error: ", err);
	                    $scope.phoneLoading = false;
	                    return;
	                  }
	                  $scope.load_notification('clear');
	                  $scope.twoFAVerify = false;
	                  $scope.savingPhone = false;
	                  $scope.phoneLoading = false;
	                });
	              }
	            });
	          });
	        });
	      };

	      $scope.enable2FA = function() {

	        $scope.load_notification('loading');
	        $scope.isVerifying  = true;

	        var options = {
	          url         : $scope.userBlob.url,
	          id          : $scope.userBlob.id,
	          token       : $scope.verificationCode,
	          remember_me : false
	        };

	        authflow.verifyToken(options, function(err, resp){

	          if (err) {
	            $scope.load_notification('invalid_token');
	            $scope.isVerifying  = false;
	            console.log('Error: ', err);
	            return;
	          }

	          keychain.requestSecret($id.account, $id.username, function(err, secret) {

	            if (err) {
	              $scope.load_notification('general_error');
	              $scope.isVerifying = false;
	              consoe.log('Error: ', err);
	              return;
	            }

	            var options = {
	              masterkey : secret,
	              enabled   : true
	            };

	            $scope.userBlob.set2FA(options, function(err, resp) {

	              $scope.$apply(function() {
	                $scope.isVerifying = false;

	                if (err) {
	                  $scope.load_notification('general_error');
	                  $scope.error2FA = true;
	                  console.log("Error: ", err);
	                } else {
	                  $scope.load_notification('2fa_done');

	                  //remove old device ID so that
	                  //next login will require 2FA
	                  store.remove('device_id');

	                  $timeout(function() {
	                    location.href = "#/usd";
	                  }, 2000);
	                }
	              });
	            });
	          });
	        });
	      };

	    }]
	  );
	};

	module.exports = TwoFATab;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    Tab = __webpack_require__(76).Tab;

	   

	var NotFoundTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(NotFoundTab, Tab);

	NotFoundTab.prototype.tabName = '404';
	NotFoundTab.prototype.mainMenu = 'none';

	NotFoundTab.prototype.angularDeps = Tab.prototype.angularDeps.concat(['qr']);

	NotFoundTab.prototype.generateHtml = function ()
	{

	  return __webpack_require__(98)();
	};

	NotFoundTab.prototype.angular = function (module)
	{
	  

	  module.controller('NotFoundCtrl', ['$rootScope', 'rpId', 'rpNetwork', '$filter', '$http', 'rpAppManager',
	                                     function ($scope, $id, $network, $filter, $http, appManager)
	  {

	  }]);

	  
	};


	module.exports = NotFoundTab;
	  



/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    webutil = __webpack_require__(66),
	    Tab = __webpack_require__(76).Tab,
	    Amount = ripple.Amount,
	    Base = ripple.Base;

	var AppsTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(AppsTab, Tab);

	AppsTab.prototype.tabName = 'apps';
	AppsTab.prototype.mainMenu = 'apps';

	AppsTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(99)();
	};

	AppsTab.prototype.angular = function (module)
	{
	  module.controller('AppsCtrl', ['$scope', 'rpId', 'rpAppManager',
	    function ($scope, $id, $appManager)
	  {
	    if (!$id.loginStatus) return $id.goId();

	    /**
	     * Add an app
	     */
	    $scope.add = function(){
	      $scope.loading = true;

	      if ($scope.app && $scope.app.rippleAddress) {
	        $appManager.getApp($scope.app.rippleAddress, function(err, app){
	          if (err) {
	            console.log('err',err);
	            $scope.error = err.message;
	            return;
	          }

	          $scope.app.name = app.name;
	          $scope.userBlob.unshift("/apps", $scope.app);
	          $scope.success = true;

	          $scope.loading = false;
	        });
	      }
	    };

	    /**
	     * Remove app
	     *
	     * @param index
	     */
	    $scope.remove = function (rippleAddress) {
	      // TODO this should also close/remove account, disconnect from an app.

	      // Update blob
	      $scope.userBlob.filter('/apps', 'rippleAddress', rippleAddress, 'unset', '');
	    };
	  }]);
	};

	module.exports = AppsTab;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    webutil = __webpack_require__(66),
	    Tab = __webpack_require__(76).Tab,
	    Amount = ripple.Amount,
	    Base = ripple.Base;

	var SuTab = function ()
	{
	  Tab.call(this);
	};

	util.inherits(SuTab, Tab);

	SuTab.prototype.tabName = 'su';
	SuTab.prototype.mainMenu = 'su';

	SuTab.prototype.generateHtml = function ()
	{
	  return __webpack_require__(100)();
	};

	SuTab.prototype.angular = function (module)
	{
	  module.controller('SuCtrl', ['$scope', '$routeParams', 'rpId',
	                               'rpNetwork', 'rpDomainAlias', 'rpKeychain',
	    function ($scope, $routeParams, id, net, aliasService, keychain)
	  {
	    if (!id.loginStatus) return id.goId();

	    $scope.account = {};

	    // Get account
	    $scope.$on('$idAccountLoad', function (e, data) {
	      var alias = aliasService.getAliasForAddress(data.account);

	      alias.then(
	        function(domain){
	          $scope.account.domain = domain;
	        },
	        function(reason){
	          console.log('error', reason);
	        }
	      );
	    });

	    $scope.accountSet = function() {
	      var tx = net.remote.transaction();

	      tx.accountSet(id.account);
	      tx.tx_json.Domain = sjcl.codec.hex.fromBits(sjcl.codec.utf8String.toBits($scope.account.domain));
	      tx.on('success', function(){
	        console.log('Cool!');
	      });

	      keychain.requestSecret(id.account, id.username, function (err, secret) {
	        // TODO Error handling
	        if (err) return;

	        tx.secret(secret);
	        tx.submit();
	      });
	    };
	  }]);
	};

	module.exports = SuTab;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	
	var Base58Utils = (function () {
	  var alphabets = {
	    'ripple':  "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz",
	    'bitcoin': "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
	  };

	  var SHA256  = function (bytes) {
	    return sjcl.codec.bytes.fromBits(sjcl.hash.sha256.hash(sjcl.codec.bytes.toBits(bytes)));
	  };

	  return {
	    // --> input: big-endian array of bytes.
	    // <-- string at least as long as input.
	    encode_base: function (input, alphabetName) {
	      var alphabet = alphabets[alphabetName || 'ripple'],
	          base     = new sjcl.bn(alphabet.length),
	          bi       = sjcl.bn.fromBits(sjcl.codec.bytes.toBits(input)),
	          buffer   = [];

	      while (bi.greaterEquals(base)) {
	        var mod = bi.mod(base);
	        buffer.push(alphabet[mod.limbs[0]]);
	        bi = bi.div(base);
	      }
	      buffer.push(alphabet[bi.limbs[0]]);

	      // Convert leading zeros too.
	      for (var i = 0; i != input.length && !input[i]; i += 1) {
	        buffer.push(alphabet[0]);
	      }

	      return buffer.reverse().join("");
	    },

	    // --> input: String
	    // <-- array of bytes or undefined.
	    decode_base: function (input, alphabetName) {
	      var alphabet = alphabets[alphabetName || 'ripple'],
	          base     = new sjcl.bn(alphabet.length),
	          bi       = new sjcl.bn(0);

	      var i;
	      while (i != input.length && input[i] === alphabet[0]) {
	        i += 1;
	      }

	      for (i = 0; i != input.length; i += 1) {
	        var v = alphabet.indexOf(input[i]);

	        if (v < 0) {
	          return null;
	        }

	        bi = bi.mul(base).addM(v);
	      }

	      var bytes = sjcl.codec.bytes.fromBits(bi.toBits()).reverse();

	      // Remove leading zeros
	      while(bytes[bytes.length-1] === 0) {
	        bytes.pop();
	      }

	      // Add the right number of leading zeros
	      for (i = 0; input[i] === alphabet[0]; i++) {
	        bytes.push(0);
	      }

	      bytes.reverse();

	      return bytes;
	    },

	    // --> input: Array
	    // <-- String
	    encode_base_check: function (version, input, alphabet) {
	      var buffer  = [].concat(version, input);
	      var check   = SHA256(SHA256(buffer)).slice(0, 4);
	      return Base58Utils.encode_base([].concat(buffer, check), alphabet);
	    },

	    // --> input : String
	    // <-- NaN || BigInteger
	    decode_base_check: function (version, input, alphabet) {
	      var buffer = Base58Utils.decode_base(input, alphabet);

	      if (!buffer || buffer[0] !== version || buffer.length < 5) {
	        return NaN;
	      }

	      var computed = SHA256(SHA256(buffer.slice(0, -4))).slice(0, 4),
	          checksum = buffer.slice(-4);

	      var i;
	      for (i = 0; i != 4; i += 1)
	        if (computed[i] !== checksum[i])
	          return NaN;

	      return buffer.slice(1, -4);
	    }
	  };
	})();

	module.exports = Base58Utils;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// returns the raw address after removing any parameters
	exports.stripRippleAddress = function (addr)
	{
	  if(typeof(addr)=='string')
	  {
	    var index=addr.indexOf("?");
	    if(index>=0)
	    {
	      return(addr.slice(0,index));
	    }
	  }
	  return(addr);
	};
	//returns the destination tag of an address if there is one
	exports.getDestTagFromAddress = function (addr)
	{
	  var index=addr.indexOf("?");
	  if(index>=0)
	  {
	    addr=addr.slice(index,addr.length);
	    index=addr.indexOf("dt=");
	    if(index>=0)
	    {
	      addr=addr.slice(index+3,addr.length);
	      index=addr.indexOf("&");
	      if(index>0) return( addr.slice(0,index) );
	      else return(addr);
	    }
	    index=addr.indexOf("d=");
	    if(index>=0)
	    {
	      addr=addr.slice(index+2,addr.length);
	      index=addr.indexOf("&");
	      if(index>0) return( addr.slice(0,index) );
	      else return(addr);
	    }
	  }
	  return(undefined);
	};

	exports.removeClassPrefix = function (el, group)
	{
	  var $el = $(el);
	  var classes = $el.attr("class");

	  if (!classes || !classes.length) return;

	  classes = classes.split(" ").map(function(item) {
	    return item.indexOf(group) === 0 ? "" : item;
	  });
	  $el.attr("class", classes.join(" "));
	};

	/**
	 * Error handler for jQuery.ajax requests.
	 *
	 * @example
	 *   $.get('http://acme.com/')
	 *    .success(...)
	 *    .error(webutil.getAjaxErrorHandler(callback, "Acme GET"));
	 */
	exports.getAjaxErrorHandler = function (callback, context)
	{
	  return function (request, type, errorThrown)
	  {
	    switch (type) {
	      case 'timeout':
	        message = "The request timed out.";
	        break;
	      case 'notmodified':
	        message = "The request was not modified but was not retrieved from the cache.";
	        break;
	      case 'parsererror':
	        message = "XML/Json format is bad.";
	        break;
	      default:
	        message = "HTTP Error (" + request.status + " " + request.statusText + ").";
	    }
	    callback(new Error(message));
	  };
	};

	exports.scrollToTop = function ()
	{
	  $("html, body").animate({ scrollTop: 0 }, "fast");
	};

	exports.findIssuer= function(lines, currency)
	{
	  var maxIssuer=null;
	  var maxLimit=0;

	  for (var n in lines) {
	    if (lines.hasOwnProperty(n)) {
	      if (lines[n].currency === currency) {
	        var limit = +lines[n].limit.to_text();
	        if (limit > maxLimit) {
	          maxLimit = limit;
	          maxIssuer = lines[n].account;
	        }
	      }
	    }
	  }
	  return maxIssuer;
	};

	exports.getContact = function (contacts,value)
	{
	  if (!value) return false;

	  for (var i=0;i<contacts.length;i++) {
	    if (contacts[i].name === value || contacts[i].address === value) {
	      return contacts[i];
	    }
	  }

	  return false;
	};

	/**
	 * Given an address, return the contact name.
	 */
	exports.isContact = function (contacts, address) {
	  try {
	    for (var i = 0, l = contacts.length; i < l; i++) {
	      if (contacts[i].address === address) {
	        return contacts[i].name;
	      }
	    }
	  } catch (e) {}
	};

	/**
	 * Return the address of a contact.
	 *
	 * Pass in an address or a contact name and get an address back.
	 */
	exports.resolveContact = function (contacts, value)
	{
	  for (var i = 0, l = contacts.length; i < l; i++) {
	    if (contacts[i].name === value) {
	      return contacts[i].address;
	    }
	  }

	  if (ripple.UInt160.is_valid(value)) {
	    return ripple.UInt160.json_rewrite(value);
	  }

	  return '';
	};

	/**
	 * Given an address, return the contact name.
	 *
	 * If a contact is not found with the given address, simply return the address
	 * again.
	 */
	exports.unresolveContact = function (contacts, address)
	{
	  var contact;
	  return (contact = exports.isContact(contacts, address)) ? contact : address;
	};

	/**
	 * Creates a combobox query function out of a contacts list.
	 *
	 * @param options {array} An array of select options like {name: '', value: ''}.
	 */
	exports.queryFromContacts = function (contacts)
	{
	  return exports.queryFromOptions(
	    _.map(contacts, function (entry) {
	      return {
	        name: entry.name,
	        additional: entry.view || entry.address
	      };
	    })
	  );
	};

	/**
	 * Creates a combobox query function out of a select options array.
	 *
	 * @param options {array} An array of select options like {name: '', value: ''}.
	 */
	exports.queryFromOptions = function (options)
	{
	  var opts = _.map(options, function (entry) {
	    if ("object" === typeof entry || "string" === typeof entry ) {
	      return entry;
	    } else {
	      return null;
	    }
	  });
	  return exports.queryFromArray(opts);
	};

	exports.queryFromOptionsIncludingKeys = function (options)
	{
	  var opts = _.map(options, function (entry) {
	    if ("object" === typeof entry &&
	        entry.value && "string" === typeof entry.value && entry.name && "string" === typeof entry.name)
	    {
	      return entry.value + " - " + entry.name;
	    } else if ("object" === typeof entry || "string" === typeof entry) {
	      return entry;
	    } else {
	      return null;
	    }
	  });

	  return exports.queryFromArray(opts);
	};

	/**
	 * Creates a combobox query function out of a plain array of strings.
	 *
	 * @param options {array} An array of options, e.g. ['First choice', '2nd']
	 */
	exports.queryFromArray = function (options)
	{
	  return function (match, re) {
	    if (re instanceof RegExp) {
	      return options.filter(function (item) {
	        return "string" === typeof item
	          ? item.match(re)
	          : (item.name ? item.name.match(re) : false);
	      });
	    } else return options;
	  };
	};

	/**
	 * Escapes a string for use as a literal inside of a regular expression.
	 *
	 * From: http://stackoverflow.com/questions/3446170
	 */
	exports.escapeRegExp = function (str)
	{
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	};

	/**
	 * Regex check if the string is a valid ripple name
	 *
	 * @param str
	 */
	exports.isRippleName = function (str)
	{
	  var nameRegex = /^~[a-zA-Z0-9]([\-]?[a-zA-Z0-9]){0,19}$/;

	  return nameRegex.test(str);
	};

	/**
	 * Convert base64 encoded data into base64url encoded data.
	 *
	 * @param {String} base64 Data
	 */
	exports.base64ToBase64Url = function (encodedData) {
	  return encodedData.replace(/\+/g, '-').replace(/\//g, '_').replace(/[=]+$/, '');
	};

	/**
	 * Convert base64url encoded data into base64 encoded data.
	 *
	 * @param {String} base64 Data
	 */
	exports.base64UrlToBase64 = function (encodedData) {
	  encodedData = encodedData.replace(/-/g, '+').replace(/_/g, '/');
	  while (encodedData.length % 4) {
	    encodedData += '=';
	  }
	  return encodedData;
	};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Print an exception for debug purposes.
	 *
	 * Includes some logic to try and log a stack in various browsers.
	 */
	exports.exception = function (exception) {
	  console.log("function" === typeof exception.getStack ? exception.getStack() : exception.stack);
	};



/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<div rp-snapper="rp-snapper" class="mobile-nav"><a href="#/balance" ng-class="{active: $route.current.tabName == \'balance\'}" class="wallet"><span class="nav-icon nav-icon-wallet"></span><span>残高</span></a><a href="#/history" ng-class="{active: $route.current.tabName == \'history\'}" class="sub">入出金明細</a><a href="#/contacts" ng-class="{active: $route.current.tabName == \'contacts\'}" class="sub">相手先</a><a href="#/send" ng-class="{active: $route.current.tabName == \'send\'}" class="send"><span class="nav-icon nav-icon-send"></span><span>送金</span></a><a href="#/exchange" ng-class="{active: $route.current.tabName == \'exchange\'}" class="exchange"><span class="nav-icon nav-icon-exchange"></span><span>両替</span></a><a href="#/trade" ng-class="{active: $route.current.tabName == \'trade\'}" class="sub">取引</a><a href="#/xrp" ng-class="{active: $route.current.tabName == \'xrp\'}" class="fund"><span class="nav-icon nav-icon-advanced"></span><span>資金</span></a><a href="#/trust" ng-class="{active: $route.current.tabName == \'trust\'}" class="sub">ゲートウェイ</a><a href="#/account/public" ng-class="{active: $route.current.tabName == \'account\'}" class="advanced"><img src="img/profile-gray.png"/><span>アカウント</span></a><a href="#/security" ng-class="{active: $route.current.tabName == \'security\'}" class="advanced"><img src="img/settings-gray.png"/><span>設定</span></a><a href="#" ng-click="logout()" class="advanced"><img src="img/logout-gray.png"/><span>ログアウト</span></a></div><!-- Wrapper--><div id="wrapper"><!-- Header--><header><h1 ng-show="[\'t-login\',\'t-recover\',\'t-register\',\'t-migrate\'].indexOf($route.current.tabClass) !== -1">ようこそ{{productName}}さん、グローバルな価値の取引所へ</h1>');
	var __val__ = __webpack_require__(104)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</header><div class="container"><!-- Main--><div id="{{$route.current.tabClass}}" role="main" ng-view="ng-view" class="row main"></div><!-- Footer--><footer class="row"><div class="col-xs-12 col-sm-3"><a href="https://ripple.com/wiki/index.php?title=Ripple_Client_Release_Notes" target="_blank">バージョン: {{version}}</a></div><div class="col-xs-12 col-sm-9 right-links"><a href="https://rippletrade.com/#/tou" target="_blank">Terms of Use</a><a href="https://rippletrade.com/#/privacypolicy" target="_blank">Privacy Policy</a><a href="https://support.ripplelabs.com" target="_blank">サポート</a><a href="https://ripplelabs.atlassian.net/browse/WC" target="_blank">エラー報告</a><a href="#/lang/en">English</a><a href="#/lang/zh_CN">中文</a><a href="#/lang/ja">日本語</a><!-- Language selector--><rp-popup><a href="" rp-popup-link="rp-popup-link" class="last">もっと...</a><div rp-popup-content="rp-popup-content" class="languageSelector"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">&times;</button><div class="modal-title">言語環境を設定</div></div><div class="modal-body row list"><div class="col-sm-6"><a href="#/lang/en">English</a></div><div class="col-sm-6"><a href="#/lang/zh_CN">中文</a></div><div class="col-sm-6"><a href="#/lang/nl_NL">Nederlands</a></div><div class="col-sm-6"><a href="#/lang/it">Italiano</a></div><div class="col-sm-6"><a href="#/lang/pl">Polski</a></div><div class="col-sm-6"><a href="#/lang/es">Español</a></div><div class="col-sm-6"><a href="#/lang/pt">Português</a></div><div class="col-sm-6"><a href="#/lang/de">Deutsch</a></div><div class="col-sm-6"><a href="#/lang/nb_NO">Norsk</a></div><div class="col-sm-6"><a href="#/lang/sk">Slovenská</a></div><div class="col-sm-6"><a href="#/lang/ca">Català</a></div><div class="col-sm-6"><a href="#/lang/he_IL">עברית</a></div><div class="col-sm-6"><a href="#/lang/ru">Русский</a></div><div class="col-sm-6"><a href="#/lang/ro">Român</a></div><div class="col-sm-6"><a href="#/lang/ja">日本語</a></div><div class="col-sm-6"><a href="#/lang/tr">Türkçe</a></div></div></div></rp-popup></div></footer></div></div>');
	}
	return buf.join("");
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var pairs = __webpack_require__(73);

	/**
	 * Calculate executed order price
	 *
	 * @param effect
	 * @returns {*}
	 */
	var getPrice = function(effect, referenceDate){
	  var g = effect.got ? effect.got : effect.gets;
	  var p = effect.paid ? effect.paid : effect.pays;
	  var price;

	  if (!p.is_zero() && !g.is_zero()) {
	    _.find(pairs, function(pair){
	      if (pair.name == g.currency().to_human() + '/' + p.currency().to_human()) {
	        price = p.ratio_human(g, {reference_date: referenceDate});
	      }
	    });

	    if (!price) {
	      price = g.ratio_human(p, {reference_date: referenceDate});
	    }
	  }

	  return price || 0;
	};

	/**
	 * Determine if the transaction is a "rippling" transaction based on effects
	 *
	 * @param effects
	 */
	var isRippling = function(effects){
	  if (
	    effects
	    && effects.length
	    && 2 === effects.length
	    && 'trust_change_balance' == effects[0].type
	    && 'trust_change_balance' == effects[1].type
	    && effects[0].currency == effects[1].currency
	    && !effects[0].amount.compareTo(effects[1].amount.negate())
	  ) {
	    return true;
	  }
	};

	/**
	 * Simple static class for processing server-side JSON.
	 */
	var JsonRewriter = module.exports = {
	  /**
	   * Filter affected nodes by type.
	   *
	   * If affectedNodes is not a valid set of nodes, returns an empty array.
	   */
	  filterAnodes: function (affectedNodes, type) {
	    if (!affectedNodes) return [];

	    return affectedNodes.filter(function (an) {
	      an = an.CreatedNode ? an.CreatedNode :
	          an.ModifiedNode ? an.ModifiedNode :
	          {};

	      return an.LedgerEntryType === type;
	    });
	  },

	  /**
	   * Returns resulting (new or modified) fields from an affected node.
	   */
	  getAnodeResult: function (an) {
	    an = an.CreatedNode ? an.CreatedNode :
	        an.ModifiedNode ? an.ModifiedNode :
	        {};

	    var fields = $.extend({}, an.NewFields, an.FinalFields);

	    return fields;
	  },

	  /**
	   * Takes a metadata affected node and returns a simpler JSON object.
	   *
	   * The resulting object looks like this:
	   *
	   *   {
	   *     // Type of diff, e.g. CreatedNode, ModifiedNode
	   *     diffType: 'CreatedNode'
	   *
	   *     // Type of node affected, e.g. RippleState, AccountRoot
	   *     entryType: 'RippleState',
	   *
	   *     // Index of the ledger this change occurred in
	   *     ledgerIndex: '01AB01AB...',
	   *
	   *     // Contains all fields with later versions taking precedence
	   *     //
	   *     // This is a shorthand for doing things like checking which account
	   *     // this affected without having to check the diffType.
	   *     fields: {...},
	   *
	   *     // Old fields (before the change)
	   *     fieldsPrev: {...},
	   *
	   *     // New fields (that have been added)
	   *     fieldsNew: {...},
	   *
	   *     // Changed fields
	   *     fieldsFinal: {...}
	   *   }
	   */
	  processAnode: function (an) {
	    var result = {};

	    ["CreatedNode", "ModifiedNode", "DeletedNode"].forEach(function (x) {
	      if (an[x]) result.diffType = x;
	    });

	    if (!result.diffType) return null;

	    an = an[result.diffType];

	    result.entryType = an.LedgerEntryType;
	    result.ledgerIndex = an.LedgerIndex;

	    result.fields = $.extend({}, an.PreviousFields, an.NewFields, an.FinalFields);
	    result.fieldsPrev = an.PreviousFields || {};
	    result.fieldsNew = an.NewFields || {};
	    result.fieldsFinal = an.FinalFields || {};

	    return result;
	  },

	  /**
	   * Takes a transaction and its metadata and returns the amount sent as:
	   *
	   * If XRP, value sent as String
	   *
	   * If not XRP,
	      {
	       value: value sent as String,
	       currency: currency code of value sent
	      }
	    *
	    * If unable to determine, returns undefined
	    *
	    * If the caller needs the issuer of sent currency as well, try tx.sendMax.issuer
	   */
	  getAmountSent: function (tx, meta) {
	    var sender = tx.Account;
	    var difference = null;
	    var cur = null;
	    var i;
	    var affectedNode;
	    var amtSent;

	    if (tx.TransactionType === "Payment") {
	      if (meta.DeliveredAmount) {
	        return meta.DeliveredAmount;
	      }

	      if (meta.AffectedNodes) {
	        // Find the metadata node with entry type == "RippleState"
	        // and either HighLimit.issuer == [sender's account] or
	        // LowLimit.issuer == [sender's account] and
	        // Balance.currency == [currency of SendMax || Amount]
	        if (tx.SendMax && tx.SendMax.currency) {
	          for (i = 0; i < meta.AffectedNodes.length; i++) {
	            affectedNode = meta.AffectedNodes[i];
	            if (affectedNode.ModifiedNode && affectedNode.ModifiedNode.LedgerEntryType === "RippleState" &&
	              (affectedNode.ModifiedNode.FinalFields.HighLimit.issuer === sender ||
	                affectedNode.ModifiedNode.FinalFields.LowLimit.issuer === sender) &&
	              affectedNode.ModifiedNode.FinalFields.Balance.currency === tx.SendMax.currency) {

	              // Calculate the difference before/after. If HighLimit.issuer == [sender's account] negate it.
	              difference = affectedNode.ModifiedNode.PreviousFields.Balance.value - affectedNode.ModifiedNode.FinalFields.Balance.value;
	              if (affectedNode.ModifiedNode.FinalFields.HighLimit.issuer === sender) difference *= -1;
	              cur = affectedNode.ModifiedNode.FinalFields.Balance.currency;
	              break;
	            }
	          }
	        }

	        if (difference === null) {
	          // Find the metadata node with entry type == "AccountRoot" and Account == [sender's account].
	          for (i = 0; i < meta.AffectedNodes.length; i++) {
	            affectedNode = meta.AffectedNodes[i];
	            if (affectedNode.ModifiedNode && affectedNode.ModifiedNode.LedgerEntryType === "AccountRoot" &&
	              affectedNode.ModifiedNode.FinalFields && affectedNode.ModifiedNode.FinalFields.Account === sender) {

	              // Calculate the difference minus the fee
	              difference = affectedNode.ModifiedNode.PreviousFields.Balance - affectedNode.ModifiedNode.FinalFields.Balance - tx.Fee;
	              break;
	            }
	          }
	        }

	        if (difference) {  // calculated and non-zero
	          var diff = String(difference);
	          amtSent = cur ? {value: diff, currency:cur} : diff;
	        }
	      }
	    }

	    return amtSent;
	  },

	  /**
	   * Convert transactions into a more useful (for our purposes) format.
	   *
	   * The main operation this function performs is to change the view on the
	   * transaction from a neutral view to a subjective view specific to our
	   * account.
	   *
	   * For example, rather than having a sender and receiver, the transaction has
	   * a counterparty and a flag whether it is incoming or outgoing.
	   *
	   * processTxn returns main purpose of transaction and side effects.
	   *
	   * Main purpose
	   *  Real transaction names
	   *  - Payment (sent/received/exchange)
	   *  - TrustSet (trusting/trusted)
	   *  - OfferCreate (offernew)
	   *  - OfferCancel (offercancel)
	   *
	   *  Virtual transaction names
	   *  - Failed
	   *  - Rippling
	   *
	   * Side effects
	   *  - balance_change
	   *  - Trust (trust_create_local, trust_create_remote, trust_change_local,
	   *          trust_change_remote, trust_change_balance, trust_change_no_ripple)
	   *  - Offer (offer_created, offer_funded, offer_partially_funded,
	   *          offer_cancelled, offer_bought)
	   */
	  processTxn: function (tx, meta, account) {
	    try {
	      return JsonRewriter._processTxn(tx, meta, account);
	    } catch (err) {
	      var transaction = {};
	      transaction.type = 'error';
	      if (tx && 'object' === typeof tx) {
	        transaction.hash = tx.hash;
	        transaction.date = ripple.utils.toTimestamp(tx.date);
	        transaction.dateRaw = tx.date;
	      } else {
	        transaction.hash = 'unknown';
	        transaction.date = new Date().getTime();
	        transaction.dateRaw = ripple.utils.fromTimestamp(fromTimestamp);
	      }
	      return {transaction: transaction, error: err};
	    }
	  },

	  _processTxn: function (tx, meta, account) {
	    var obj = {};

	    // Currency balances that have been affected by the transaction
	    var affected_currencies = [];

	    // Main transaction
	    if (tx.Account === account
	        || (tx.Destination && tx.Destination === account)
	        || (tx.LimitAmount && tx.LimitAmount.issuer === account)) {

	      var transaction = {};

	      if ('tesSUCCESS' === meta.TransactionResult) {
	        switch (tx.TransactionType) {
	          case 'Payment':
	            var amount = ripple.Amount.from_json(tx.Amount);

	            if (tx.Account === account) {
	              if (tx.Destination === account) {
	                transaction.type = 'exchange';
	                transaction.spent = ripple.Amount.from_json(tx.SendMax);
	              }
	              else {
	                transaction.type = 'sent';
	                transaction.counterparty = tx.Destination;
	              }
	            }
	            else {
	              transaction.type = 'received';
	              transaction.counterparty = tx.Account;
	            }

	            if (typeof tx.SendMax === 'object') transaction.sendMax = tx.SendMax;

	            var amtSent = JsonRewriter.getAmountSent(tx, meta);
	            if (amtSent) transaction.amountSent = amtSent;

	            transaction.amount = amount;
	            transaction.currency = amount.currency().to_human();
	            break;

	          case 'TrustSet':
	            transaction.type = tx.Account === account ? 'trusting' : 'trusted';
	            transaction.counterparty = tx.Account === account ? tx.LimitAmount.issuer : tx.Account;
	            transaction.amount = ripple.Amount.from_json(tx.LimitAmount);
	            transaction.currency = tx.LimitAmount.currency;
	            break;

	          case 'OfferCreate':
	            transaction.type = 'offernew';
	            transaction.pays = ripple.Amount.from_json(tx.TakerPays);
	            transaction.gets = ripple.Amount.from_json(tx.TakerGets);
	            transaction.sell = tx.Flags & ripple.Transaction.flags.OfferCreate.Sell;
	            break;

	          case 'OfferCancel':
	            transaction.type = 'offercancel';
	            break;

	          case 'AccountSet':
	            // Ignore empty accountset transactions. (Used to sync sequence numbers)
	            if (meta.AffectedNodes.length === 1 && _.size(meta.AffectedNodes[0].ModifiedNode.PreviousFields) === 2)
	              break;

	            transaction.type = 'accountset';
	            break;

	          default:
	            console.log('Unknown transaction type: "'+tx.TransactionType+'"', tx);
	        }

	        if (tx.Flags) {
	          transaction.flags = tx.Flags;
	        }
	      } else {
	        transaction.type = 'failed';
	      }

	      if (!$.isEmptyObject(transaction)) {
	        obj.transaction = transaction;
	      }
	    }

	    // Side effects
	    if ('tesSUCCESS' === meta.TransactionResult) {
	      meta.AffectedNodes.forEach(function (n) {
	        var node = JsonRewriter.processAnode(n);
	        var feeEff;
	        var effect = {};

	        // AccountRoot - Current account node
	        if (node.entryType === "AccountRoot" && node.fields.Account === account) {
	          obj.accountRoot = node.fields;

	          if (node.fieldsPrev.Balance) {
	            var balance = ripple.Amount.from_json(node.fields.Balance);

	            // Fee
	            if(tx.Account === account && tx.Fee) {
	              feeEff = {
	                type: "fee",
	                amount: ripple.Amount.from_json(tx.Fee).negate(),
	                balance: balance
	              };
	            }

	            // Updated XRP Balance
	            if (tx.Fee != node.fieldsPrev.Balance - node.fields.Balance) {
	              if (feeEff)
	                balance = balance.subtract(feeEff.amount);

	              effect.type = "balance_change";
	              effect.amount = balance.subtract(node.fieldsPrev.Balance);
	              effect.balance = balance;

	              // balance_changer is set to true if the transaction / effect has changed one of the account balances
	              obj.balance_changer = effect.balance_changer = true;
	              affected_currencies.push('XRP');
	            }
	          }
	        }

	        // RippleState - Ripple Lines
	        if (node.entryType === "RippleState"
	            && (node.fields.HighLimit.issuer === account || node.fields.LowLimit.issuer === account)) {

	          var high = node.fields.HighLimit;
	          var low = node.fields.LowLimit;

	          var which = high.issuer === account ? 'HighNoRipple' : 'LowNoRipple';

	          // New trust line
	          if (node.diffType === "CreatedNode") {
	            effect.limit = ripple.Amount.from_json(high.value > 0 ? high : low);
	            effect.limit_peer = ripple.Amount.from_json(high.value > 0 ? low : high);

	            if ((high.value > 0 && high.issuer === account)
	                || (low.value > 0 && low.issuer === account)) {
	              effect.type = "trust_create_local";
	            } else {
	              effect.type = "trust_create_remote";
	            }
	          }

	          // Modified trust line
	          else if (node.diffType === "ModifiedNode" || node.diffType === "DeletedNode") {
	            var highPrev = node.fieldsPrev.HighLimit;
	            var lowPrev = node.fieldsPrev.LowLimit;

	            // Trust Balance change
	            if (node.fieldsPrev.Balance) {
	              effect.type = "trust_change_balance";

	              var issuer =  node.fields.Balance.value > 0 || node.fieldsPrev.Balance.value > 0
	                  ? high.issuer : low.issuer;

	              effect.amount = high.issuer === account
	                  ? effect.amount = ripple.Amount.from_json(
	                  node.fieldsPrev.Balance.value
	                      + "/" + node.fieldsPrev.Balance.currency
	                      + "/" + issuer).subtract(node.fields.Balance)
	                  : effect.amount = ripple.Amount.from_json(
	                  node.fields.Balance.value
	                      + "/" + node.fields.Balance.currency
	                      + "/" + issuer).subtract(node.fieldsPrev.Balance);

	              obj.balance_changer = effect.balance_changer = true;
	              affected_currencies.push(high.currency.toUpperCase());
	            }

	            // Trust Limit change
	            else if (highPrev || lowPrev) {
	              if (high.issuer === account) {
	                effect.limit = ripple.Amount.from_json(high);
	                effect.limit_peer = ripple.Amount.from_json(low);
	              } else {
	                effect.limit = ripple.Amount.from_json(low);
	                effect.limit_peer = ripple.Amount.from_json(high);
	              }

	              if (highPrev) {
	                effect.prevLimit = ripple.Amount.from_json(highPrev);
	                effect.type = high.issuer === account ? "trust_change_local" : "trust_change_remote";
	              }
	              else if (lowPrev) {
	                effect.prevLimit = ripple.Amount.from_json(lowPrev);
	                effect.type = high.issuer === account ? "trust_change_remote" : "trust_change_local";
	              }
	            }

	            // Trust flag change (effect gets this type only if nothing else but flags has been changed)
	            else if (node.fieldsPrev.Flags) {
	              // Account set a noRipple flag
	              if (node.fields.Flags & ripple.Remote.flags.state[which] &&
	                  !(node.fieldsPrev.Flags & ripple.Remote.flags.state[which])) {
	                effect.type = "trust_change_no_ripple";
	              }

	              // Account removed the noRipple flag
	              else if (node.fieldsPrev.Flags & ripple.Remote.flags.state[which] &&
	                  !(node.fields.Flags & ripple.Remote.flags.state[which])) {
	                effect.type = "trust_change_no_ripple";
	              }

	              if (effect.type)
	                effect.flags = node.fields.Flags;
	            }
	          }

	          if (!$.isEmptyObject(effect)) {
	            effect.counterparty = high.issuer === account ? low.issuer : high.issuer;
	            effect.currency = high.currency;
	            effect.balance = high.issuer === account
	                ? ripple.Amount.from_json(node.fields.Balance).negate(true)
	                : ripple.Amount.from_json(node.fields.Balance);

	            if (obj.transaction && obj.transaction.type === "trust_change_balance") {
	              obj.transaction.balance = effect.balance;
	            }

	            // noRipple flag
	            if (node.fields.Flags & ripple.Remote.flags.state[which]) {
	              effect.noRipple = true;
	            }
	          }
	        }

	        // Offer
	        else if (node.entryType === "Offer") {

	          // For new and cancelled offers we use "fields"
	          var fieldSet = node.fields;

	          // Current account offer
	          if (node.fields.Account === account) {

	            // Partially funded offer [and deleted.. no more funds]
	            /* Offer has been partially funded and deleted (because of the luck of funds)
	             if the node is deleted and the TakerGets/TakerPays field has been changed */
	            if (node.diffType === "ModifiedNode" ||
	                (node.diffType === "DeletedNode"
	                    && node.fieldsPrev.TakerGets
	                    && !ripple.Amount.from_json(node.fieldsFinal.TakerGets).is_zero())) {
	              effect.type = 'offer_partially_funded';

	              if (node.diffType !== "DeletedNode") {
	                effect.remaining = ripple.Amount.from_json(node.fields.TakerGets);
	              }
	              else {
	                effect.cancelled = true;
	              }
	            }
	            else {
	              // New / Funded / Cancelled offer
	              effect.type = node.diffType === "CreatedNode"
	                  ? 'offer_created'
	                  : node.fieldsPrev.TakerPays
	                  ? 'offer_funded'
	                  : 'offer_cancelled';

	              // For funded offers we use "fieldsPrev".
	              if (effect.type === 'offer_funded')
	                fieldSet = node.fieldsPrev;

	              // We don't count cancelling an offer as a side effect if it's
	              // already the primary effect of the transaction.
	              if (effect.type === 'offer_cancelled' &&
	                  obj.transaction &&
	                  obj.transaction.type === "offercancel") {

	                // Fill in remaining information about offer
	                obj.transaction.gets = fieldSet.TakerGets;
	                obj.transaction.pays = fieldSet.TakerPays;
	              }
	            }

	            effect.seq = +node.fields.Sequence;
	          }

	          // Another account offer. We care about it only if our transaction changed the offer amount (we bought currency)
	          else if(tx.Account === account && !$.isEmptyObject(node.fieldsPrev) /* Offer is unfunded if node.fieldsPrev is empty */) {
	            effect.type = 'offer_bought';
	          }

	          if (effect.type) {
	            effect.gets = ripple.Amount.from_json(fieldSet.TakerGets);
	            effect.pays = ripple.Amount.from_json(fieldSet.TakerPays);

	            if ('offer_partially_funded' === effect.type || 'offer_bought' === effect.type) {
	              effect.got = ripple.Amount.from_json(node.fieldsPrev.TakerGets).subtract(node.fields.TakerGets);
	              effect.paid = ripple.Amount.from_json(node.fieldsPrev.TakerPays).subtract(node.fields.TakerPays);
	            }
	          }

	          if (effect.gets && effect.pays) {
	            effect.price = getPrice(effect, tx.date);
	          }

	          // Flags
	          if (node.fields.Flags) {
	            effect.flags = node.fields.Flags;
	            effect.sell = node.fields.Flags & ripple.Remote.flags.offer.Sell;
	          }
	        }

	        if (!$.isEmptyObject(effect)) {
	          if (node.diffType === "DeletedNode") {
	            effect.deleted = true;
	          }

	          if (!obj.effects) obj.effects = [];
	          obj.effects.push(effect);
	        }

	        // Fee effect
	        if (feeEff) {
	          if (!obj.effects) obj.effects = [];
	          obj.effects.push(feeEff);
	        }
	      });
	    }

	    // Balance after the transaction
	    if (obj.accountRoot && obj.transaction && "undefined" === typeof obj.transaction.balance) {
	      obj.transaction.balance = ripple.Amount.from_json(obj.accountRoot.Balance);
	    }

	    if ($.isEmptyObject(obj))
	      return;

	    // If the transaction didn't wind up cancelling an offer
	    if (tx.TransactionType === 'OfferCancel' && obj.transaction &&
	      (!obj.transaction.gets || !obj.transaction.pays)) {
	      return;
	    }

	    // Rippling transaction
	    if (isRippling(obj.effects)) {
	      if (!obj.transaction) {
	        obj.transaction = {};
	      }
	      obj.transaction.type = 'rippling';
	    }

	    obj.tx_type = tx.TransactionType;
	    obj.tx_result = meta.TransactionResult;
	    obj.fee = tx.Fee;
	    obj.date = ripple.utils.toTimestamp(tx.date);
	    obj.dateRaw = tx.date;
	    obj.hash = tx.hash;
	    obj.affected_currencies = affected_currencies ? affected_currencies : [];
	    obj.ledger_index = tx.ledger_index;

	    return obj;
	  }
	};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Description: Combines 2 arrays removing duplicates based on a object key
	 * @param arr1: Array of objects
	 * @param arr2: Array of objects
	 * @param key:  object key to be unique
	 *
	 * @return array of unique objects based on key
	 */
	exports.uniqueObjArray = function(arr1, arr2, key) {
	  var obj = {};
	  _.each(arr1, function(v) {
	    obj[v[key]] = v;
	  });

	  _.each(arr2, function(v) {
	    if (!(v[key] in obj)) {
	      obj[v[key]] = v;
	    }
	  });

	  return _.values(obj);
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	switch (tx.type){
	case "sent":
	buf.push('<div class="type-info"><span title="{{tx.counterparty}}">{{tx.counterparty | rpcontactname}}</span> さんに <span class="number">{{tx.amount | rpamount}}</span> <span class="currency">{{tx.currency}}</span> を送金しました。</div>');
	  break;
	case "received":
	buf.push('<div class="type-success"><span title="{{tx.counterparty}}">{{tx.counterparty | rpcontactname}}は以下を送金しました。</span>&#32;<span class="number">{{tx.amount | rpamount}}</span>&#32;<span class="currency">{{tx.currency}}</span></div>');
	  break;
	case "trusted":
	buf.push('<div class="type-success"><span title="{{tx.counterparty}}">{{tx.counterparty | rpcontactname}} は以下の金額のため、信用を与えました。</span>&#32;<span class="number">{{tx.amount | rpamount}}</span>&#32;<span class="currency">{{tx.currency}}</span></div>');
	  break;
	case "trusting":
	buf.push('<div class="type-success"><span title="{{tx.counterparty}}">あなたは今、ゲートウェイ <span>{{tx.counterparty | rpcontactname}}</span><span l10n-inc="l10n-inc"> for </span><span><span class="number">{{tx.amount | rpamount}}</span>&#32;<span class="currency">{{tx.currency}}</span></span>に接続しました</span></div>');
	  break;
	}
	}
	return buf.join("");
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Ripple default external currency list.
	 *
	 * Important: XRP must be the first entry in this list.
	 */
	module.exports = [

	  // XRP - IMPORTANT: XRP must be first entry in this list
	  {value: 'XRP', name: 'Ripple', standard_precision: 4, order: 5},

	  // Fiat - Official ISO-4217
	  // display used for dropdown menu
	  {value: 'USD', name: 'USD - US Dollar', display: true, standard_precision: 2, order: 4},
	  {value: 'EUR', name: 'EUR - Euro', display: true, standard_precision: 2, order: 3},
	  {value: 'JPY', name: 'JPY - Japanese Yen', display: true, standard_precision: 2, order: 0},
	  {value: 'CNY', name: 'CNY - Chinese Yuan', display: true, standard_precision: 2, order: 0},
	  {value: 'INR', name: 'INR - Indian Rupee', display: true, standard_precision: 2, order: 0},
	  {value: 'RUB', name: 'RUB - Russian Ruble', display: true, standard_precision: 2, order: 0},
	  {value: 'GBP', name: 'GBP - British Pound', display: true, standard_precision: 2, order: 0},
	  {value: 'CAD', name: 'CAD - Canadian Dollar', display: true, standard_precision: 2, order: 0},
	  {value: 'BRL', name: 'BRL - Brazilian Real', display: true, standard_precision: 2, order: 0},
	  {value: 'CHF', name: 'CHF - Swiss Franc', display: true, standard_precision: 2, order: 0},
	  {value: 'DKK', name: 'DKK - Danish Krone', display: true, standard_precision: 2, order: 0},
	  {value: 'NOK', name: 'NOK - Norwegian Krone', display: true, standard_precision: 2, order: 0},
	  {value: 'SEK', name: 'SEK - Swedish Krona', display: true, standard_precision: 2, order: 0},
	  {value: 'CZK', name: 'CZK - Czech Koruna', display: true, standard_precision: 2, order: 0},
	  {value: 'PLN', name: 'PLN - Polish Zloty', display: true, standard_precision: 2, order: 0},
	  {value: 'AUD', name: 'AUD - Australian Dollar', display: true, standard_precision: 2, order: 0},
	  {value: 'MXN', name: 'MXN - Mexican Peso', display: true, standard_precision: 2, order: 0},
	  {value: 'KRW', name: 'KRW - South Korean Won', display: true, standard_precision: 2, order: 0},
	  {value: 'TWD', name: 'TWD - New Taiwan Dollar', display: true, standard_precision: 2, order: 0},
	  {value: 'HKD', name: 'HKD - Hong Kong Dollar', display: true, standard_precision: 2, order: 0},
	  {value: 'KES', name: 'KES - Kenyan Shilling', display: true, standard_precision: 2, order: 0},
	  {value: 'AMD', name: 'AMD - Armenian Drams', display: true, standard_precision: 2, order: 0},
	  {value: 'RUR', name: 'RUR - Russian Rubles', display: true, standard_precision: 2, order: 0},
	  {value: 'RON', name: 'RON - Romanian Leu', display: true, standard_precision: 2, order: 0},
	  {value: 'NZD', name: 'NZD - New Zealand Dollar', display: true, standard_precision: 2, order: 0},
	  {value: 'TRY', name: 'TRY - Turkish Lira', display: true, standard_precision: 2, order: 0},

	  // Fiat currencies NOT SHOWN
	  {value: 'AFN', name: 'AFN - Afghan Afghani', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'ALL', name: 'ALL - Albanian Lek', display: false, standard_precision: 2, order: 0 },
	  {value: 'DZD', name: 'DZD - Algerian Dinar', display: false, standard_precision: 2, order: 0 },
	  {value: 'AOA', name: 'AOA - Angolan Kwanza Readjustado', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'XCD', name: 'XCD - East Caribbean Dollar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'ARS', name: 'ARS - Argentine peso', display: false, standard_precision: 2, order: 0 },
	  {value: 'AWG', name: 'AWG - Aruban Florin', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'AZN', name: 'AZN - Azerbaijani Manat', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'BSD', name: 'BSD - Bahamian Dollar', display: false, standard_precision: 2, order: 0 },
	  {value: 'BHD', name: 'BHD - Bahraini Dinar', display: false, standard_precision: 3, order: 0 },
	  {value: 'BDT', name: 'BDT - Taka', display: false, standard_precision: 2, order: 0 },
	  {value: 'BBD', name: 'BBD - Barbados Dollar', display: false, standard_precision: 2, order: 0 },
	  {value: 'BYR', name: 'BYR - Belarussian Ruble', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'BZD', name: 'BZD - Belize Dollar', display: false, standard_precision: 2, order: 0 },
	  {value: 'XOF', name: 'XOF - CFA Franc BCEAO', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'BMD', name: 'BMD - Bermudian Dollar', display: false, standard_precision: 2, order: 0 },
	  {value: 'BTN', name: 'BTN - Ngultrum', display: false, standard_precision: 2, order: 0 },
	  {value: 'BOB', name: 'BOB - Boliviano', display: false, standard_precision: 2, order: 0 },
	  {value: 'BOV', name: 'BOV - Mvdol', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'BAM', name: 'BAM - Convertible Mark', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'BWP', name: 'BWP - Pula', display: false, standard_precision: 2, order: 0 },
	  {value: 'BND', name: 'BND - Brunei Dollar', display: false, standard_precision: 2, order: 0 },
	  {value: 'BGN', name: 'BGN - Bulgarian Lev', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'BIF', name: 'BIF - Burundi Franc', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'KHR', name: 'KHR - Riel', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'XAF', name: 'XAF - CFA Franc BEAC', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'CVE', name: 'CVE - Cabo Verde Escudo', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'KYD', name: 'KYD - Cayman Islands Dollar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'CLF', name: 'CLF - Chilean Unidad de Formentos', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'CLP', name: 'CLP - Chilean Peso', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'COP', name: 'COP - Colombian Peso', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'COU', name: 'COU - Unidad de Valor Real', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'KMF', name: 'KMF - Comoro Franc', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'CDF', name: 'CDF - Congolese Franc', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'CRC', name: 'CRC - Costa Rican Colon', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'HRK', name: 'HRK - Croatian Kuna', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'CUC', name: 'CUC - Peso Convertible', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'CUP', name: 'CUP - Cuban Peso', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'ANG', name: 'ANG - Netherlands Antillean Guilder', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'DJF', name: 'DJF - Djibouti Franc', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'DOP', name: 'DOP - Dominican Peso', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'EGP', name: 'EGP - Egyptian Pound', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SVC', name: 'SVC - El Salvador Colon', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'ERN', name: 'ERN - Nakfa', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'ETB', name: 'ETB - Ethiopian Birr', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'FKP', name: 'FKP - Falkland Islands Pound', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'FJD', name: 'FJD - Fiji Dollar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'XPF', name: 'XPF - CFP Franc', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'GMD', name: 'GMD - Dalasi', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'GEL', name: 'GEL - Lari', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'GHS', name: 'GHS - Ghana Cedi', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'GIP', name: 'GIP - Gibraltar Pound', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'GTQ', name: 'GTQ - Quetzal', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'GNF', name: 'GNF - Guinea Franc', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'GYD', name: 'GYD - Guyana Dollar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'HTG', name: 'HTG - Gourde', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'HNL', name: 'HNL - Lempira', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'HUF', name: 'HUF - Forint', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'ISK', name: 'ISK - Iceland Krona', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'IDR', name: 'IDR - Indonesia Rupiah', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'IRR', name: 'IRR - Iranian Rial', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'IQD', name: 'IQD - Iraqi Dinar', display: false, standard_precision: 3, order: 0 }, 
	  {value: 'ILS', name: 'ILS - New Israeli Sheqel', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'JMD', name: 'JMD - Jamaican Dollar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'JOD', name: 'JOD - Jordanian Dinar', display: false, standard_precision: 3, order: 0 }, 
	  {value: 'KZT', name: 'KZT - Tenge', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'KPW', name: 'KPW - North Korean Won', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'KWD', name: 'KWD - Kuwaiti Dinar', display: false, standard_precision: 3, order: 0 }, 
	  {value: 'KGS', name: 'KGS - Som', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'LAK', name: 'LAK - Kip', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'LVL', name: 'LVL - Latvian Lats', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'LBP', name: 'LBP - Lebanese Pound', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'LSL', name: 'LSL - Loti', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'ZAR', name: 'ZAR - Rand', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'LRD', name: 'LRD - Liberian Dollar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'LYD', name: 'LYD - Libyan Dinar', display: false, standard_precision: 3, order: 0 }, 
	  {value: 'LTL', name: 'LTL - Lithuanian Litas', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MOP', name: 'MOP - Pataca', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MKD', name: 'MKD - Denar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MGA', name: 'MGA - Malagasy Ariary', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MWK', name: 'MWK - Kwacha', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MYR', name: 'MYR - Malaysian Ringgit', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MVR', name: 'MVR - Rufiyaa', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MRO', name: 'MRO - Ouguiya', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MUR', name: 'MUR - Mauritius Rupee', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MXV', name: 'MXV - Mexican Unidad de Inversion (UDI)', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MDL', name: 'MDL - Moldovan Leu', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MNT', name: 'MNT - Tugrik', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MAD', name: 'MAD - Moroccan Dirham', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MZN', name: 'MZN - Mozambique Metical', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'MMK', name: 'MMK - Kyat', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'NAD', name: 'NAD - Namibia Dollar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'NPR', name: 'NPR - Nepalese Rupee', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'NIO', name: 'NIO - Cordoba Oro', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'NGN', name: 'NGN - Naira', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'OMR', name: 'OMR - Rial Omani', display: false, standard_precision: 3, order: 0 }, 
	  {value: 'PKR', name: 'PKR - Pakistan Rupee', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'PAB', name: 'PAB - Balboa', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'PGK', name: 'PGK - Kina', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'PYG', name: 'PYG - Guarani', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'PEN', name: 'PEN - Nuevo Sol', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'PHP', name: 'PHP - Philippine Peso', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'QAR', name: 'QAR - Qatari Rial', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'RWF', name: 'RWF - Rwanda Franc', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'SHP', name: 'SHP - Saint Helena Pound', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'WST', name: 'WST - Tala', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'STD', name: 'STD - Dobra', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SAR', name: 'SAR - Saudi Riyal', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'RSD', name: 'RSD - Serbian Dinar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SCR', name: 'SCR - Seychelles Rupee', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SLL', name: 'SLL - Leone', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SGD', name: 'SGD - Singapore Dollar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SBD', name: 'SBD - Solomon Islands Dollar', display: false, standard_precision: 2, order: 0 },
	  {value: 'SOS', name: 'SOS - Somali Shilling', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SSP', name: 'SSP - South Sudanese Pound', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'LKR', name: 'LKR - Sri Lanka Rupee', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SDG', name: 'SDG - Sudanese Pound', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SRD', name: 'SRD - Surinam Dollar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SZL', name: 'SZL - Lilangeni', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'CHE', name: 'CHE - WIR Euro', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'CHW', name: 'CHW - WIR Franc', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'SYP', name: 'SYP - Syrian Pound', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'TJS', name: 'TJS - Somoni', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'TZS', name: 'TZS - Tanzanian Shilling', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'THB', name: 'THB - Thai Baht', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'TOP', name: 'TOP - Pa’anga', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'TTD', name: 'TTD - Trinidad and Tobago Dollar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'TND', name: 'TND - Tunisian Dinar', display: false, standard_precision: 3, order: 0 }, 
	  {value: 'TMT', name: 'TMT - Turkmenistan New Manat', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'UGX', name: 'UGX - Uganda Shilling', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'UAH', name: 'UAH - Hryvnia', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'AED', name: 'AED - UAE Dirham', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'USN', name: 'USN - US Dollar (Next day)', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'USS', name: 'USS - US Dollar (Same day)', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'UYI', name: 'UYI - Uruguay Peso en Unidades Indexadas (URUIURUI)', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'UYU', name: 'UYU - Peso Uruguayo', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'UZS', name: 'UZS - Uzbekistan Sum', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'VUV', name: 'VUV - Vatu', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'VEF', name: 'VEF - Bolivar', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'VND', name: 'VND - Dong', display: false, standard_precision: 0, order: 0 }, 
	  {value: 'YER', name: 'YER - Yemeni Rial', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'ZMK', name: 'ZMK - Zambian Kwacha', display: false, standard_precision: 2, order: 0 }, 
	  {value: 'ZWL', name: 'ZWL - Zimbabwean Dollar', display: false, standard_precision: 2, order: 0 },

	  // Precious Metals
	  {value: 'XAU', name: 'XAU - Gold', display: true, standard_precision: 2, order: 0},
	  {value: 'XAU (-0.5%pa)', name: 'XAU - Gold (GBI)', display: true, standard_precision: 2, order: 0},
	  {value: 'XAG', name: 'XAG - Silver', display: false, standard_precision: 2, order: 0},
	  {value: 'XPT', name: 'XPT - Platinum', display: false, standard_precision: 2, order: 0},

	  // Cryptocurrencies
	  {value: 'BTC', name: 'BTC - Bitcoin', display: true, standard_precision: 4, order: 2},
	  {value: 'LTC', name: 'LTC - Litecoin', display: true, standard_precision: 4, order: 1}
	];


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Ripple trading default currency pairs.
	 *
	 * This list is a bit arbitrary, but it's basically the Majors [1] from forex
	 * trading with some XRP pairs added.
	 *
	 * [1] http://en.wikipedia.org/wiki/Currency_pair#The_Majors
	 */

	var DEFAULT_PAIRS = [
	  {name: 'XAU (-0.5%pa)/XRP', last_used: 2},
	  {name: 'XAU (-0.5%pa)/USD', last_used: 2},
	  {name: 'BTC/XRP', last_used: 1},
	  {name: 'XRP/USD', last_used: 1},
	  {name: 'XRP/EUR', last_used: 1},
	  {name: 'XRP/JPY', last_used: 0},
	  {name: 'XRP/GBP', last_used: 0},
	  {name: 'XRP/AUD', last_used: 0},
	  {name: 'XRP/CHF', last_used: 0},
	  {name: 'XRP/CAD', last_used: 0},
	  {name: 'XRP/CNY', last_used: 0},
	  {name: 'XRP/MXN', last_used: 0},
	  {name: 'BTC/USD', last_used: 0},
	  {name: 'BTC/EUR', last_used: 0},
	  {name: 'EUR/USD', last_used: 0},
	  {name: 'USD/JPY', last_used: 0},
	  {name: 'GBP/USD', last_used: 0},
	  {name: 'AUD/USD', last_used: 0},
	  {name: 'USD/MXN', last_used: 0},
	  {name: 'USD/CHF', last_used: 0}
	];

	module.exports = DEFAULT_PAIRS;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<div ng-switch on="engine_result | rptruncate:3" class="transaction-error"><group ng-switch-when="tes"><group ng-hide="accepted" class="pending"><h2 class="tx-status">支払いは保留中です。</h2></group><group ng-show="accepted" class="result-success"><h2 class="tx-status">支払は成功しました。</h2></group></group><group ng-switch-when="tem" class="result-malformed"><h2 class="tx-status">支払いは失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-default="ng-switch-default">エラーコード: {{engine_result}} - {{engine_result_message}}</span></p></group><group ng-switch-when="tef" class="result-malformed"><div ng-switch on="engine_result"><div ng-switch-when="tefMAX_LEDGER"><h2 class="tx-status">支払いは失敗しました。</h2><p ng-switch on="engine_result"><span>あなたの支払いはタイムアウトしました、どうか再び試みてください。</span></p></div><div ng-switch-default="ng-switch-default"><h2 class="tx-status">支払いは失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="tefDST_TAG_NEEDED">エラーコード:相手先が必要です[tefDST_TAG_NEEDED]</span></p></div></div></group><group ng-switch-when="tel" class="result-failed"><h2 class="tx-status">支払いは失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="telINSUF_FEE_P">エラーコード: ネットワーク手数料の最大値を超過しているため、このトランザクションは失敗しました。後ほど再度お試しください[telINSUF_FEE_P]。</span></p></group><group ng-switch-when="tec" class="result-malformed"><h2 class="tx-status">支払いは失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="tecNO_DST">エラーコード:宛先がありません[tecNO_DST].</span><span ng-switch-when="tecNO_DST_INSUF_XRP">エラーコード: 宛先に送金するために必要なXRPが不足しています [tecNO_DST_INSUF_XRP]。</span><span ng-switch-default="ng-switch-default">エラー:{{engine_result_message}}</span></p></group><group ng-switch-when="ter" class="result-failed"><h2 class="tx-status">支払いは失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="terNO_LINE">エラーコード:あなたはこの通貨にトラストラインを持っていません [terNO_LINE]</span></p><span ng-switch-default="ng-switch-default">支払いは失敗した:: {{engine_result}} - {{engine_result_message}}</span></group><group ng-switch-when="tej" class="result-failed"><h2 class="tx-status">支払いは失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="tejLost">エラーコード:取引処理は出すことができませんでした [tejLost]</span><span ng-switch-when="tejMaxFeeExceeded">This transaction failed because the current network fee is higher than your account limit. You can adjust your maximum network fee in Settings &gt Advanced, or try again later. <br>\nError code: Network fee exceeded [tejMaxFeeExceeded].</span></p><span ng-switch-default="ng-switch-default">支払は送信できませんでした。: {{engine_result}} - {{engine_result_message}}</span></group></div>');
	}
	return buf.join("");
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<form role="form" ng-submit="confirm()"><div class="modal-header">アカウントのロックを解除</div><div class="modal-body"><div class="form-group"><label for="popup_unlock_password">パスワード</label><input id="popup_unlock_password" type="password" name="popup_unlock_password" ng-model="unlock.password" rp-focus="rp-focus" class="form-control"/></div><p ng-switch on="unlock.purpose" class="help-block"><span ng-switch-when="showSecret">シークレット・キーを表示するには、パスワードを入力してください。</span><span ng-switch-default="ng-switch-default">取引を確認するには、パスワードを入力してください。</span></p><div ng-show="unlock.error == \'password\'" class="alert alert-danger">パスワードに誤りがあります。再実行してください。</div><p ng-show="unlock.isConfirming" rp-spinner="4" class="literal">パスワードを確認中</p></div><div class="modal-footer"><div class="unlock-btns-wrapper"><button type="submit" ng-disabled="isConfirming" class="btn btn-primary modal-submit-btn">送信</button><button type="button" ng-click="cancel()" class="btn btn-default modal-close-btn">閉じる</button></div></div></form>');
	}
	return buf.join("");
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(102),
	    webutil = __webpack_require__(66),
	    log = __webpack_require__(67);

	var Tab = function (config)
	{
	};

	Tab.prototype.pageMode = 'default';

	Tab.prototype.mainMenu = 'none';

	/**
	 * AngularJS dependencies.
	 *
	 * List any controllers the tab uses here.
	 */
	Tab.prototype.angularDeps = [
	  // Directives
	  'charts',
	  'effects',
	  'events',
	  'fields',
	  'formatters',
	  'directives',
	  'validators',
	  'datalinks',
	  // Filters
	  'filters'
	];

	/**
	 * Other routes this tab should handle.
	 */
	Tab.prototype.aliases = [];

	exports.Tab = Tab;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="RegisterCtrl" class="col-xs-12 content"><div class="row"><div class="welcome-wrapper col-xs-12"><h3 class="platform">Ripple Trade は、法定通貨・暗号通貨・貴金属などに渡る、価値の記録をトレードできる唯一のプラットフォームです。</h3></div></div><div ng-show="mode==&quot;form&quot;" class="row auth-form-container"><div class="auth-form-wrapper col-xs-12 col-sm-8 col-md-7"><form name="registerForm" ng-submit="submitForm()"><h2 ng-hide="oldUserBlob">登録</h2><h2 ng-show="oldUserBlob">移行する</h2><div class="sign-up-steps-list"><li class="active">ステップ <span> 1</span></li><li>ステップ <span> 2</span></li><li>ステップ <span> 3</span></li></div><div class="form-group"><label for="register_username" ng-hide="oldUserBlob">Ripple 名を作成</label><div ng-show="oldUserBlob" class="auth-attention">以下から Ripple 名を選択してください。この Ripple 名は Ripple Trade にログインする際に必要となりますので、忘れないようにしてください！ Ripple 名は現在の Ripple アドレスのように固有であり、公開されます。 <a href="https://support.ripplelabs.com/hc/en-us/articles/202507548-Understanding-Ripple-Names">もっと詳しく</a></div><div class="input-group"><span class="input-group-addon ripple-addon">~</span><input id="register_username" name="register_username" type="text" ng-model="username" required="required" rp-focus="rp-focus" autocomplete="off" maxlength="20" rpDest="rpDest" rp-available-name="rp-available-name" rp-available-name-invalid-reason="usernameInvalidReason" rp-available-name-reserved-for="usernameReservedFor" rp-loading="usernameLoading" class="form-control"/></div><div rp-errors="register_username" ng-hide="usernameLoading" class="errorGroup"><div rp-error-valid="rp-error-valid" class="success">Available</div><div rp-error-on="rpAvailableName" class="error"><span ng-switch on="usernameInvalidReason"><span ng-switch-when="exists">既に使われています！</span><span ng-switch-when="reserved">{{usernameReservedFor}}<span>&#32;</span><i rp-popover="rp-popover" rp-popover-placement="bottom" rp-popover-title="Reserved domain" rp-popover-trigger="click" ng-switch-when="reserved" data-content="This name belongs to a high-traffic website and has been reserved to prevent phishing." class="fa fa-question-circle"></i> のため保留</span><span ng-switch-when="tooshort">2文字以上でなければなりません。</span><span ng-switch-when="toolong">20文字以下でなければなりません。</span><span ng-switch-when="charset">以下の文字のみを利用することができます: a-z, 0-9 およびハイフン (-)</span><span ng-switch-when="starthyphen">ハイフン (-) は先頭に設定できません。 </span><span ng-switch-when="endhyphen">ハイフン (-) は後尾に設定できません。 </span><span ng-switch-when="multhyphen">ハイフンを重ねて (--) 使用することはできません</span></span></div></div><span ng-show="usernameLoading">チェック中...</span></div><div ng-class="{\'field-error\': \'weak\' === strength || \'match\' === strength}" class="form-group"><label for="register_password">パスワード</label><input id="register_password" name="register_password1" type="password" autocomplete="off" ng-model="password1" rp-strong-password="rp-strong-password" required="required" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="strength==\'weak\'"><span>パスワードが脆弱です。文字、数字、シンボルが混合されていないか、または短すぎます。</span></p><p ng-show="strength==\'match\'"><span>Ripple 名とパスワードは一致してはなりません。別のパスワードを作成してください。</span></p></div><div ng-class="{\'field-error\': registerForm.register_password1.$error.rpSameInSet &amp;&amp; registerForm.register_password2.$dirty}" class="form-group"><label for="register_password2">パスワードを確認</label><input id="register_password2" name="register_password2" autocomplete="off" type="password" ng-model="password2" required="required" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="registerForm.register_password1.$error.rpSameInSet &amp;&amp; registerForm.register_password2.$dirty"><span>パスワードが一致しません</span></p></div><div ng-show=""><div class="form-group"><div class="strength {{strength}}">{{strength}}</div></div></div><div ng-class="{\'field-error\': registerForm.register_email.$error.email &amp;&amp; registerForm.register_email.$dirty}" class="form-group"><label for="register_email">Email</label><input id="register_email" type="email" name="register_email" placeholder="" ng-model="email" required="required" class="form-control"/><p ng-show="registerForm.register_email.$error.email &amp;&amp; registerForm.register_email.$dirty"><span>無効なメールアドレスです。</span></p></div><div ng-show="showMasterKeyInput" ng-class="{\'field-error\': (registerForm.register_masterkey.$error.rpMasterKey || registerForm.register_masterkey.$error.rpMasterAddressExists)  &amp;&amp; registerForm.register_masterkey.$dirty}" class="form-group"><label for="register_masterkey">シークレット・キー</label><a href="" ng-click="showMasterKeyInput=false">隠す</a><div class="register_masterkey"><input id="register_masterkey" name="register_masterkey" type="text" autocomplete="off" ng-model="masterkey" rp-master-key="rp-master-key" rp-master-address-exists="rp-master-address-exists" rp-focus="rp-focus" rp-spinner="{{checkingMasterkey ? 4 : null}}" class="form-control"/><p ng-show="registerForm.register_masterkey.$error.rpMasterKey"><span>シークレット・アカウント・キーが無効です。</span></p><div ng-show="registerForm.register_masterkey.$error.rpMasterAddressExists &amp;&amp; masterkeyAddress" class="auth-attention"> <div>アカウント~<span>{{ masterkeyUsername }} </span><span>({{ masterkeyAddress }})</span>は既にこのシークレット・キーを使って作られています。</div><a ng-href="#/recover/{{masterkeyUsername}}" class="btn btn-primary recovery">アカウントを復元する</a></div></div></div><div ng-hide="showMasterKeyInput || oldUserBlob">シークレット・キーを使う必要がありますか？<a href="" ng-click="showMasterKeyInput=true">キーを使用する</a></div><div class="form-group"><div class="checkbox"><label for="terms">I agree to the {{productName}}&#32;<a href="#tou" target="_blank" l10n-inc="l10n-inc">Terms of Use</a></label><input id="terms" type="checkbox" name="terms" ng-model="terms" required="required"/></div></div><div class="see-privacy-text"> 個人情報の取得、利用目的や共有については <a href="#privacypolicy" target="_blank">privacy policy</a> までアクセスしてください。</div><div class="submit-btn-container"><button type="submit" ng-disabled="registerForm.$invalid || submitLoading" rp-spinner="{{submitLoading ? 4 : null}}" class="btn btn-block btn-success"><span ng-hide="oldUserBlob">登録</span><span ng-show="oldUserBlob">アカウントを移行する</span></button></div></form></div><div ng-hide="$routeParams.action === \'migrate\'" class="switch-mode-link-container">既に ripple.com/client アカウントをお持ちですか？ <a ng-hide="$routeParams.action === \'migrate\'" href="#/migrate" l10n-inc="l10n-inc">移行する</a></div><div class="switch-mode-link-container">アカウントを持っていますか？ <a href="#login" l10n-inc="l10n-inc">ログインする</a></div></div><div ng-show="mode==&quot;failed&quot;" class="row mode-masterkeyerror"><div class="col-xs-12 col-md-10 col-md-offset-1"><p class="literal">登録中にエラーが発生しました。しばらく待ってから再実行してください。</p><p class="literal">報告されたエラーは <span ng-bind="error_detail"></span> でした。</p><p><button ng-click="mode=&quot;form&quot;" class="btn btn-primary">戻る</button></p></div></div><div ng-show="mode==&quot;alreadyexists&quot;" class="row mode-masterkeyerror"><div class="col-xs-12 col-md-10 col-md-offset-1"><p class="literal">既にこのユーザー名を使用しているウォレットがあります。別のユーザー名を入力し、再実行してください。</p><p><button ng-click="mode=&quot;form&quot;" class="btn btn-primary">戻る</button></p></div></div><div ng-show="mode==&quot;secret&quot;" class="row auth-form-container"><div class="auth-form-wrapper col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6"><h2 ng-hide="oldUserBlob">登録</h2><h2 ng-show="oldUserBlob">移行する</h2><div class="sign-up-steps-list"><li>Step<span> 1</span></li><li class="active">ステップ <span> 2</span></li><li>ステップ <span> 3</span></li></div><div ng-hide="oldUserBlob" class="alert alert-info">続行する前に、Ripple Trade はパスワードやシークレット・キーの復活機構を提供しないことをご理解ください。もし Ripple 名やパスワード、シークレット・キーを忘れてしまった場合には、この Ripple アカウントにはアクセスできなくなります。</div><div ng-show="oldUserBlob" class="alert alert-info">あなたのアカウントを統合する準備ができました ― これは ripple.com/client からあなたのアカウントにアクセスできなくなることを意味しています。口座残高、連絡先、アカウント履歴はすべて維持されます。あなたのアカウントは以前と同じシークレット・キーを利用します。シークレット・キーを既に保存している場合には、統合作業をそのまま続行してください。</div><div class="secret-key-container"><div ng-hide="oldUserBlob">シークレット・キーにより、Ripple 名やパスワードを失ってしまった場合にアカウントのすべての残高のロックを解除することができます。メモを取り、人目につかない安全な場所に保管してください。キーとウォレットの安全性については<a href="https://support.ripplelabs.com/hc/en-us/articles/201823366-Password-Recovery-and-Your-Secret-Key" target="_blank" l10n-inc="l10n-inc">こちらをご覧ください</a>。</div><div ng-show="oldUserBlob">シークレット・キーをまだ保存していない場合には、メモを取り、人目につかない安全な場所に保管してください。Ripple 名やパスワードを喪失してしまった場合には、このシークレット・キーを使用して資金を復活させることができます。</div><div class="secret-key"><span class="fa fa-key"></span><span ng-hide="showSecret">•••••••••••••••••••••••••••••</span><span ng-show="showSecret">{{keyOpen}}</span></div><a href="" ng-click="showSecret=!showSecret"><span ng-hide="showSecret">シークレット・キーを表示</span><span ng-show="showSecret">シークレット・キーを隠す</span></a></div><div class="submit-btn-container"><button ng-click="mode=&quot;verification&quot;" class="btn btn-block btn-success"><span>メールの検証を続ける</span></button></div></div></div><div ng-show="mode==&quot;verification&quot;" class="row auth-form-container mode-verification"><div class="auth-form-wrapper col-sm-8 col-md-6"><h2 ng-hide="oldUserBlob">登録</h2><h2 ng-show="oldUserBlob">移行する</h2><ul class="sign-up-steps-list"><li class="completed">ステップ <span> 1</span></li><li class="completed">ステップ <span> 2</span></li><li class="active">ステップ <span> 3</span></li></ul><div class="auth-attention"><span> {{userBlob.data.email}}</span> へメールを送信しました。登録を完了するには、メール内のリンクをクリックしてください。</div><div ng-show="resendSuccess" class="auth-attention">メールトークンが再送信されました。</div><form name="resendForm" class="row"><div class="col-xs-12"><label>Eメールアドレス：</label></div><div class="col-xs-9 col-sm-8"><div class="change-email-bar"><input type="email" ng-model="newEmail" placeholder="{{userBlob.data.email}}" class="form-control"/></div></div><div class="col-xs-3 col-sm-4"><button ng-click="resendEmail()" type="submit" ng-disabled="resendForm.$invalid || resendLoading" rp-spinner="{{resendLoading ? 4 : null}}" class="btn btn-success btn-block">メールを再送信</button></div></form></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="RecoverCtrl" class="col-xs-12 content"><div class="row auth-form-container col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6"><div class="auth-form-wrapper"><form name="recoverForm" ng-submit="submitForm()" ng-show="mode === \'recover\'"><h2>アカウント復元</h2><div class="auth-attention text-center"><div class="status">Ripple Trade アカウントは、シークレット・キーのみで復元できます。その際、アカウントの Ripple 名や相手先などが復元されます。</div></div><div class="form-group"><label for="recover_username">Ripple 名</label><div class="input-group"><span class="input-group-addon ripple-addon">~</span><input id="recover_username" name="recover_username" type="text" ng-model="username" required="required" rp-focus="rp-focus" autocomplete="off" maxlength="20" rpDest="rpDest" class="form-control"/></div></div><div class="form-group"><label for="recover_masterkey">シークレット・キー</label><input id="recover_masterkey" name="recover_masterkey" type="password" autocomplete="off" required="required" ng-model="masterkey" class="form-control"/></div><div ng-show="recoverError" class="error text-center"><div>アカウントを復元できませんでした。</div><div ng-bind="recoverError"></div></div><div class="submit-btn-container"><button type="submit" ng-disabled="recoverForm.$invalid || submitLoading" rp-spinner="{{submitLoading ? 4 : null}}" class="btn btn-block btn-success"><span ng-show="submitLoading">ロード中...</span><span ng-hide="submitLoading">アカウントを復元する</span></button></div></form><form name="setPasswordForm" ng-submit="submitForm()" ng-show="mode === \'setPassword\'"><h2>パスワードを設定</h2><div class="auth-attention text-center"><div class="status">アカウントの復元に成功しました。新しいパスワードを入力し、暗号化を再実行してください。</div></div><div class="form-group"><label>Ripple 名</label><div class="rippleName"><span>~</span><span ng-bind="username"></span></div></div><div ng-class="{\'field-error\': \'weak\' === strength || \'match\' === strength}" class="form-group"><label for="password1">パスワード</label><input id="password1" name="password1" type="password" autocomplete="off" ng-model="password1" rp-strong-password="rp-strong-password" required="required" rp-focus="rp-focus" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="strength==\'weak\'"><span>パスワードが脆弱です。文字、数字、シンボルが混合されていないか、または短すぎます。</span></p><p ng-show="strength==\'match\'"><span>Ripple 名とパスワードは一致してはなりません。別のパスワードを作成してください。</span></p></div><div ng-class="{\'field-error\': setPasswordForm.password1.$error.rpSameInSet &amp;&amp; setPasswordForm.password2.$dirty}" class="form-group"><label for="password2">パスワードを確認</label><input id="password2" name="password2" autocomplete="off" type="password" ng-model="password2" required="required" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="setPasswordForm.password1.$error.rpSameInSet &amp;&amp; setPasswordForm.password2.$dirty"><span>パスワードが一致しません</span></p></div><div ng-show="passwordError" class="error text-center"><div>アカウントパスワードを変更できませんでした。</div><div ng-bind="passwordError"></div></div><div class="submit-btn-container"><button type="submit" ng-disabled="setPasswordForm.$invalid || submitLoading" rp-spinner="{{submitLoading ? 4 : null}}" class="btn btn-block btn-success"><span ng-show="submitLoading">更新中...</span><span ng-hide="submitLoading">パスワードを設定</span></button></div></form></div><div class="switch-mode-link-container">パスワードを思い出しました？ <a href="#login" l10n-inc="l10n-inc">ログイン</a></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="MigrateCtrl" class="col-xs-12 content"><div class="row auth-form-container"><div class="auth-form-wrapper col-sm-8 col-md-7 col-xs-12"><form name="loginForm" ng-submit="submitForm()"><h2>移行する</h2><div class="auth-attention">統合を行うには、ripple.com/client のウォレットの暗号化に使用したユーザ名とパスワードを以下に入力してください。統合を行うと ripple.com/client にログインできなくなります。</div><div class="form-group"><label for="login_username">既存の ripple.com/client ウォレット名</label><input id="login_username" name="login_username" type="text" ng-model="username" required="required" autofocus="autofocus" rp-focus-on-empty="rp-focus-on-empty" rp-autofill="$routeParams.username" class="form-control"/></div><div class="form-group"><label for="login_password">パスワード</label><input id="login_password" name="login_password" type="password" ng-model="password" required="required" rp-focus="rp-focus" class="form-control"/></div><div ng-show="status" class="text-status"><span>{{status}}</span><br/><span id="error">{{error}}</span><br/><div ng-repeat="message in backendMessages" class="backend"><b>{{message.backend}} &#32;</b><span>{{message.message}}</span></div></div><div class="submit-btn-container"><button type="submit" rp-spinner="{{ajax_loading ? 4 : null}}" ng-disabled="ajax_loading || loginForm.$invalid" class="btn btn-submit btn-block btn-success"><span>移行を開始</span></button></div></form></div><div class="switch-mode-link-container">{{productName}} のご使用は初めてですか？ <a href="#register" l10n-inc="l10n-inc">登録</a></div><div class="switch-mode-link-container"> {{productName}} のアカウントをお持ちですか？<a href="#login" l10n-inc="l10n-inc">ログイン</a></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="ContactsCtrl" class="col-xs-12 content"><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><div class="row row-padding-small head hidden-xs"><div class="col-xs-3 col-sm-3 col-md-3">相手先</div><div ng-show="\'web\' === client" class="col-xs-6 col-sm-5 col-md-7">Ripple 名またはアドレス</div><div ng-show="\'desktop\' === client" class="col-xs-6">Ripple アドレス</div><div class="col-xs-12 col-sm-4 col-md-2 text-right"><a ng-click="toggle_form()" ng-disabled="addform_visible" class="btn btn-block btn-success btn-sm sign">相手先を追加</a></div></div><hr/><div class="row head visible-xs"><div class="col-xs-12 col-sm-2"><a ng-click="toggle_form()" ng-disabled="addform_visible" class="btn btn-success btn-block btn-sm sign custom-btn">相手先を追加</a></div></div><div ng-show="addform_visible" class="row row-padding-small addForm"><div class="col-xs-12 col-md-6 col-sm-8"><form id="addForm" name="addForm" ng-submit="create()" rp-unique-scope="rp-unique-scope"><div class="form-group"><label for="Name">相手先</label><input id="name" name="name" type="text" step="any" maxlength="70" ng-model="contact.name" rp-unique="userBlob.data.contacts" rp-unique-field="name" rp-autofill="$routeParams.name" rp-autofill-on="addform_visible = true" required="required" rp-focus="rp-focus" class="form-control input-lg name"/><div rp-errors="name" class="errorGroup"><div rp-error-on="required" class="error">相手先を入力してください。</div><div rp-error-on="rpUnique" class="error">この相手先は既に存在します。</div></div></div><div class="form-group"><div ng-show="\'web\' === client"><label for="address_web">Ripple 名またはアドレス</label><div class="spinnerEnabledInput"><input id="address_web" name="address_web" type="text" step="any" ng-model="contact.view" rp-dest="rp-dest" rp-dest-address="rp-dest-address" rp-dest-bitcoin="rp-dest-bitcoin" rp-dest-ripple-name="rp-dest-ripple-name" rp-dest-ripple-name-no-tilde="rp-dest-ripple-name-no-tilde" rp-dest-model="contact.address" rp-dest-loading="address_loading" rp-unique="userBlob.data.contacts" rp-unique-field="address" rp-unique-group="address-dt-web" rp-spinner="{{address_loading ? 4 : null}}" rp-autofill="$routeParams.to" rp-autofill-on="addform_visible = true" required="required" class="form-control input-lg address"/></div><div rp-errors="address_web" class="errorGroup"><div rp-error-on="required" class="error">Ripple 名を入力してください。</div><div rp-error-on="rpUnique" class="error">既に同じRipple名および（または）同じ宛先タグが存在します</div><div rp-error-on="rpDest" class="error">有効な Ripple 名またはアドレスではありません。</div></div></div><div ng-show="\'desktop\' === client"><label for="address_desktop">Ripple アドレス</label><div class="spinnerEnabledInput"><input id="address_desktop" name="address_desktop" type="text" step="any" ng-model="contact.view" rp-dest="rp-dest" rp-dest-address="rp-dest-address" rp-dest-bitcoin="rp-dest-bitcoin" rp-dest-ripple-name="rp-dest-ripple-name" rp-dest-ripple-name-no-tilde="rp-dest-ripple-name-no-tilde" rp-dest-model="contact.address" rp-dest-loading="address_loading" rp-unique="userBlob.data.contacts" rp-unique-field="address" rp-unique-group="address-dt-desktop" rp-spinner="{{address_loading ? 4 : null}}" rp-autofill="$routeParams.to" rp-autofill-on="addform_visible = true" required="required" class="form-control input-lg address"/></div><div rp-errors="address_desktop" class="errorGroup"><div rp-error-on="required" class="error">Ripple アドレスを入力してください。</div><div rp-error-on="rpUnique" class="error">既に同じRipple アドレスおよび（または）同じ宛先タグが存在します</div><div rp-error-on="rpDest" class="error">有効な Ripple アドレスではありません。</div></div></div></div><div class="form-group"><div ng-show="\'web\' === client"><label for="dt_web">宛先タグ</label><input id="dt_web" name="dt_web" type="text" step="any" placeholder="Leave blank if not applicable" ng-model="contact.dt" rp-unique="userBlob.data.contacts" rp-unique-field="dt" rp-unique-group="address-dt-web" rp-stdt="rp-stdt" rp-autofill="$routeParams.dt" class="form-control input-lg dt"/><div rp-errors="dt_web" class="errorGroup"><div rp-error-on="rpStdt" class="error">無効な宛先タグ</div><div rp-error-on="rpUnique" class="error">既に同じRipple名および（または）同じ宛先タグが存在します</div></div></div><div ng-show="\'desktop\' === client"><label for="dt_desktop">宛先タグ</label><input id="dt_desktop" name="dt_desktop" type="text" step="any" placeholder="Leave blank if not applicable" ng-model="contact.dt" rp-unique="userBlob.data.contacts" rp-unique-field="dt" rp-unique-group="address-dt-desktop" rp-stdt="rp-stdt" rp-autofill="$routeParams.dt" class="form-control input-lg dt"/><div rp-errors="dt_desktop" class="errorGroup"><div rp-error-on="rpStdt" class="error">無効な宛先タグ</div><div rp-error-on="rpUnique" class="error">既に同じRipple アドレスおよび（または）同じ宛先タグが存在します</div></div></div></div><div class="row"><div class="col-xs-8 col-sm-8 col-md-9 text-left"><button type="submit" ng-disabled="addForm.$invalid" class="btn btn-success btn-block submit custom-btn">相手先を追加</button></div><div class="col-xs-4 col-sm-4 col-md-3 text-center"><button type="button" ng-click="addform_visible = false" class="btn btn-default btn-block custom-btn btn-cancel">キャンセル</button></div></div></form></div></div><div ng-repeat="entry in userBlob.data.contacts" ng-class="{editing: editing}" ng-controller="ContactRowCtrl" class="row row-padding-small contact"><div ng-hide="editing" class="col-xs-3 col-md-3 col-sm-3"><span ng-hide="editing" class="name">{{entry.name}}</span></div><div ng-hide="editing" class="col-xs-12 col-sm-6 col-md-6"><div><b class="hidden-xs">{{entry.address | rpaddressorigin}}: {{entry.address}}</b></div></div><div ng-hide="editing" class="col-xs-6 col-sm-3 col-md-3 text-right pull-right"><div class="row"><div ng-hide="editing" class="col-xs-4 col-md-4 col-sm-4"><button ng-click="edit($index)" class="edit btn btn-block btn-default btn-sm btn-link">編集</button></div><div ng-hide="editing" class="col-xs-8 col-md-8 col-sm-8"><button ng-click="send($index)" class="send btn btn-block btn-primary btn-sm">送金</button></div></div></div><div class="col-xs-12"><div ng-show="editing" class="row"><div class="col-md-3 col-sm-4 col-xs-12 contact-input-wrapper"><ng-form name="inlineName" class="inline-name-form"><input name="editname" type="text" maxlength="70" ng-model="editname" rp-unique="userBlob.data.contacts" rp-unique-field="name" rp-unique-orig="entry.name" ng-enter="update($index)" class="form-control inline"/><div rp-errors="editname" class="errorGroup"><div rp-error-on="rpUnique" class="error">既に同じ名前の相手先がいます。</div></div></ng-form></div><div class="col-md-4 col-sm-4 col-xs-12 address-wrapper"><ng-form name="inlineAddress"><input name="editaddress" type="text" ng-model="editaddress" rp-unique="userBlob.data.contacts" rp-unique-field="address" rp-unique-orig="entry.address" rp-dest="rp-dest" rp-dest-address="rp-dest-address" rp-dest-bitcoin="rp-dest-bitcoin" ng-enter="update($index)" class="form-control inline"/><div rp-errors="editaddress" class="errorGroup"><div rp-error-on="rpUnique" class="error">このアドレスは既に保存されています。</div><div rp-error-on="rpDest" class="error">有効なアドレスではありません。</div></div><div class="form-group"><label for="contact_dt">宛先タグ</label><input id="contact_dt" name="dt" type="text" step="any" placeholder="Leave blank if not applicable" ng-model="editdt" rp-stdt="rp-stdt" rp-autofill="$routeParams.dt" ng-enter="update($index)" class="form-control dt inline"/><div rp-errors="dt" class="errorGroup"><div rp-error-on="rpStdt" class="error">無効な宛先タグ</div></div></div></ng-form></div><div class="col-md-5 col-sm-4 col-xs-12"><div class="row"><div class="col-xs-4 col-md-4"><button ng-disabled="inlineAddress.editaddress.$error.rpDest" ng-click="update($index)" class="save btn btn-block btn-success">保存</button></div><div class="col-xs-4 col-md-4"><rp-confirm action-text="Are you sure you want to delete this contact?" action-button-text="Delete" action-button-css="btn btn-default btn-danger delete-contact-btn" action-function="remove($index)" cancel-button-css="btn btn-default cancel-btn btn-cancel" cancel-button-text="Cancel" ng-hide="showPassword==true"><a href="" class="btn btn-danger btn-block">削除</a></rp-confirm></div><div ng-show="editing" class="col-xs-4 col-md-4"><button ng-click="cancel($index)" class="editing btn-block btn btn-default btn-sm btn-cancel">キャンセル</button></div></div></div></div></div></div><div ng-hide="userBlob.data.contacts.length">相手先をまだ持っていません。 新しい相手先を加えるには、右上隅の「相手先を加える」ボタンをクリックしてください</div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="BalanceCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><group ng-hide="!connected || loadState.account" class="disconnected"><p class="literal">ロード中...</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><group ng-show="connected &amp;&amp; loadState.account"><div ng-show="showAnnouncement" class="auth-attention banner"><h4 id="announcement">私達のチームがリップル・トレードを改良するのにご協力ください！&#32<a href="https://docs.google.com/a/ripple.com/forms/d/1_P0JPl1QOFQ_UMmkpxPFHNXsJTQdDb9yBsqr0RMt85Y/viewform" target="_blank" l10n-inc="l10n-inc">Take a quick user survey.</a></h4><a id="hide" href="" ng-click="dismissBanner()" class="dismiss"> ×</a><br/></div><div class="row"><div class="col-xs-12"><div ng-show="account.Balance" class="currency-overview"><div class="balancebox col-xs-12 col-sm-8"><div class="lbl">トータル残高<div class="desc">最新のトレード価格から見積る</div></div><div ng-show="exchangeRatesNonempty" class="total amount"><span class="amount">{{ aggregateValueDisplayed }}</span><span class="amountDecimal">{{  aggregateValueDisplayedDecimal }}</span><select rp-flat-select="rp-flat-select" ng-model="selectedValueMetric" ng-change="changeMetric(this)" ng-options="metric.code as metric.text for metric in valueMetrics" class="currency"></select></div><p l10n ng-hide="exchangeRatesNonempty" class="literal">Loading...</p><div ng-show="hasNegative" class="lbl"><div class="desc">(マイナス残高を除く)</div></div></div><div ng-class="{ \'blank\' : !exchangeRatesNonempty }" class="col-xs-12 col-sm-4"><rp-pie-chart rp-size="120" rp-drops="account.Balance" rp-ious="balances" rp-exchange-rates="exchangeRates"></rp-pie-chart></div></div><div class="currency-summary"><div class="balancebox currency-xrp"><div class="total row"><div class="lbl col-xs-8"><a href="" ng-click="entry.show=!entry.show"><i class="icon-ripple-logo"></i>XRP – Ripple</a></div><div class="balance col-xs-2"><span ng-show="account.Balance">{{ account.Balance | rpamount }}</span><span ng-hide="account.Balance">0</span></div></div><div ng-show="entry.show" class="component row"><div class="lbl col-xs-8"><span>利用可能</span><i rp-popover="rp-popover" rp-popover-placement="bottom" rp-popover-title="Available amount" rp-popover-trigger="hover" data-content="Total amount of XRP in your account minus the reserve amount." class="fa fa-question-circle"></i></div><div class="balance col-xs-2"><span ng-show="account.max_spend">{{account.max_spend | rpamount }}</span><span ng-hide="account.max_spend">0</span></div></div><div ng-show="entry.show" class="component row"><div class="lbl col-xs-8"><span>準備金</span><i rp-popover="rp-popover" rp-popover-placement="bottom" rp-popover-title="Reserve amount" rp-popover-trigger="hover" data-content="Minimum amount of XRP required to fund your account. You cannot spend the reserve." class="fa fa-question-circle"></i></div><div class="balance col-xs-2"><span ng-show="account.reserve">{{ account.reserve | rpamount }}</span><span ng-hide="account.reserve">0</span></div></div></div><div ng-repeat="entry in balances" ng-class="\'currency-\' + (entry.total | rpcurrency | lowercase)" class="balancebox currency-non-native"><div class="total row"><div class="lbl col-xs-8"><a href="" ng-click="entry.show=!entry.show"><i ng-class="\'fa-\' + (entry.total | rpcurrency | lowercase)" class="icon fa fa-money"></i><span rp-currency="entry.total" rp-currency-full="rp-currency-full"></span></a></div><div class="balance col-xs-2"><a href="" ng-click="entry.show=!entry.show">{{ entry.total | rpamount }}</a></div></div><div ng-repeat="(issuer, component) in entry.components" ng-show="entry.show" class="component row"><div class="head"><div ng-show="component.gateway.app" class="lbl col-xs-8">{{component.gateway.app.name}}<span ng-hide="true" class="status unverified">未認証</span></div><div ng-hide="component.gateway.app" class="lbl balance-text-wrapper col-xs-8"><span rp-pretty-identity="issuer"></span></div><div class="balance col-xs-2">{{ component | rpamount }}</div></div><form ng-show="component.window == \'withdraw\'" class="withdraw"><div ng-show="!step || step==1" class="step1"><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><label for="send_destination">ビットコインアドレスを入力してください。</label><input id="send_destination" name="send_destination" type="text" class="form-control"/></div><div class="col-xs-12 col-sm-6 col-md-6"><label for="send_amount">引き出しの金額を入力してください。</label><input id="send_amount" name="send_amount" type="text" class="form-control"/></div></div><div class="row errorGroups"><div rp-errors="send_destination" class="col-xs-12 col-sm-6 col-md-6 errorGroup"><div rp-error-valid="rp-error-valid" class="success"></div><div rp-error-on="required" class="error">有効なビットコインアドレスを入力してください。</div><div rp-error-on="invalid" class="error">有効なビットコインアドレスを入力してください。</div></div><div rp-errors="send_amount" class="col-xs-12 col-sm-6 col-md-6 errorGroup"><div rp-error-valid="rp-error-valid" class="success"></div><div rp-error-on="invalid" class="error">有効な金額を入力してください。</div></div></div><div class="row"><div class="col-xs-12 col-sm-4 col-md-3"><button type="submit" ng-disabled="" ng-click="step=2" class="btn btn-block btn-success submit">引き出す</button></div></div></div><div ng-show="step==2" class="step2"><label><span class="amount"> 1.2345</span> BTC の受取人:</label><div class="btc_address">1agizZ31TmpachYAuG3n56XCb1R5vc3cTQ</div><div class="row"><div class="col-xs-12 col-sm-3"><button ng-click="step=1" class="btn btn-block btn-default">戻る</button></div><div class="col-xs-12 col-sm-3"><button type="submit" ng-disabled="" ng-click="step=3" class="btn btn-block btn-success submit">確認</button></div></div></div><div ng-show="step==3" class="step3"><div class="row"><div class="col-xs-12 col-sm-6"><div class="message type-offline">Ripple networkに再接続しています</div><div class="message type-success">取引は成功しました。</div><div class="message type-warning">注意</div><div class="message type-error">取引は失敗しました。</div><div class="message type-info">メッセージ</div></div></div><div class="row"><div class="col-xs-12 col-sm-3"><button ng-click="step=1" class="btn btn-block btn-default">戻る</button></div></div></div></form></div></div></div></div></div></group></section>');
	}
	return buf.join("");
	}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="AccountCtrl" class="col-xs-12 content"><div ng-show="connected" class="row"><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><div class="col-sm-3"><div class="accountPage"><a href="#/account/public" ng-class="{active: $routeParams.route == \'public\'}">パブリックインフォメーション</a><a href="#/account/private" ng-class="{active: $routeParams.route == \'private\'}">Private Information</a></div></div><div class="col-sm-9 list"><div ng-show="\'web\' === client"><div ng-show="$routeParams.route == \'public\'" class="showPublic"><div ng-show="loading" class="alert alert-warning">Ripple 名を変更しています...</div><div ng-show="success" class="alert alert-success">Ripple 名の変更に成功しました。</div><h4>アカウント設定</h4><div class="section"><div class="descriptor">Ripple 名</div><div class="row public-account-row"><div class="col-xs-9 col-sm-6 username">~{{userCredentials.username}}</div><div class="col-xs-3 col-sm-3 edit-account-btn-wrapper"><a href="" ng-click="openForm=!openForm; success=false" ng-hide="openForm" class="btn btn-cancel btn-block">編集</a></div><form id="renameForm" name="renameForm" ng-show="openForm" ng-submit="rename()"><div id="open_name_change" class="form-group"><label for="name">新規 Ripple 名</label><div class="input-group"><span class="input-group-addon ripple-addon">~</span><input id="username" name="username" type="text" ng-model="username" required="required" rp-focus="rp-focus" autocomplete="off" maxlength="20" rpDest="rpDest" rp-available-name="rp-available-name" rp-available-name-invalid-reason="usernameInvalidReason" rp-available-name-reserved-for="usernameReservedFor" rp-loading="usernameLoading" class="form-control"/></div><div rp-errors="username" ng-hide="usernameLoading" class="errorGroup"><div rp-error-valid="rp-error-valid" class="success">利用可能</div><div rp-error-on="rpAvailableName" class="error"><span ng-switch on="usernameInvalidReason"><span ng-switch-when="exists">既に使われています！</span><span ng-switch-when="reserved">{{usernameReservedFor}}<span>&#32;</span><i rp-popover="rp-popover" rp-popover-placement="bottom" rp-popover-title="Reserved domain" rp-popover-trigger="click" ng-switch-when="reserved" data-content="This name belongs to a high-traffic website and has been reserved to prevent phishing." class="fa fa-question-circle"></i> のため保留</span><span ng-switch-when="tooshort">2文字以上でなければなりません。</span><span ng-switch-when="toolong">20文字以下でなければなりません。</span><span ng-switch-when="charset">半角英数字とハイフン (-) のみ使用できます。</span><span ng-switch-when="starthyphen">ハイフン (-) は先頭に設定できません。 </span><span ng-switch-when="endhyphen">ハイフン (-) は後尾に設定できません。 </span><span ng-switch-when="multhyphen">ハイフン (--) を羅列して設定できません。</span></span></div></div><span ng-show="usernameLoading">チェック中...</span><div class="form-group"><label type="password" for="password">現在のパスワード</label><input id="password" type="password" name="password" ng-model="password" required="required" class="form-control"/></div><div ng-show="error" ng-switch on="error" class="alert alert-danger"><span ng-switch-when="wrongpassword">パスワードに誤りがあります。</span><span ng-switch-when="cantlogin">Ripple 名は変更されました。再びログインしてください。</span><span ng-switch-default="ng-switch-default">Ripple 名を変更することができませんでした。しばらく待ってから再実行してください。</span></div><div class="row"><div class="col-xs-12 col-sm-6"><button type="submit" ng-disabled="renameForm.$invalid || loading" class="btn btn-success btn-block"><span ng-hide="loading">送信</span><span ng-show="loading">ロード中...</span></button></div><div class="col-xs-12 col-sm-6"><a href="" ng-click="openForm=!openForm" class="btn btn-cancel btn-block">キャンセル</a></div></div></div></form></div></div><div class="section"><div id="address" class="descriptor">Ripple アドレス</div><div>{{address}}</div></div></div><div ng-show="$routeParams.route == \'private\'" ng-controller="KycCtrl" class="showPublic"><h4>プロフィールインフォーメーション</h4><div class="section"><div class="descriptor">アイデンティティインフォメーション</div><div class="row public-account-row"><div class="col-xs-12 col-sm-9"><span ng-switch on="profileStatus"><span ng-switch-when="loading">ロード中...</span><span ng-switch-when="complete">作成しました</span><span ng-switch-when="incomplete">作成していません</span><a ng-switch-when="incomplete" href="#/kyc">プロフィールを作成しました</a></span></div></div></div><div class="section"><div class="descriptor">本人確認の質問</div><div class="row public-account-row"><div class="col-xs-12 col-sm-9"><span ng-switch on="identityStatus"><span ng-switch-when="loading">ロード中...</span><span ng-switch-when="complete">作成しました</span><span ng-switch-when="incomplete">作成していません</span><a ng-switch-when="incomplete" href="#/kyc">プロフィールを作成しました</a></span></div></div></div></div></div></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="HistoryCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><group ng-hide="!connected || loadState.transactions" class="disconnected"><p class="literal">履歴を読み込み中...</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div><p class="literal">アカウント履歴はありません。</p></div><group ng-show="connected &amp;&amp; loadState.transactions &amp;&amp; account.Balance" class="row"><div class="filters row-padding-small col-md-3 col-sm-5 col-xs-12"><div class="filter type-filter row"><div class="col-xs-12 filters-wrapper"><a href="" ng-click="showFilterTxTypes=!showFilterTxTypes" class="filter-title">取引タイプ: <div ng-show="showFilterTxTypes" class="fa fa-caret-right"></div><div ng-hide="showFilterTxTypes" class="fa fa-caret-down"></div></a><div ng-hide="showFilterTxTypes" class="filter-choices"><div ng-repeat="name in orderedTypes"><label ng-class="{active: types[name].checked}"><i ng-show="types[name].checked" class="fa fa-plus"></i><i ng-hide="types[name].checked" class="fa fa-minus"></i><span class="name">{{name}}</span><!--span.count {{typeUsage[name] || 0}}--><input type="checkbox" name="type-filter" ng-model="types[name].checked"/></label></div></div></div></div><div class="filter date-filter row"><div class="col-xs-12 filters-wrapper"><a href="" ng-click="showFilterDate=!showFilterDate" class="filter-title">日付: <div ng-show="showFilterDate" class="fa fa-caret-right"></div><div ng-hide="showFilterDate" class="fa fa-caret-down"></div></a><div ng-hide="showFilterDate" class="row"><div class="col-xs-12"><div class="filter-description">特定の日付範囲内の取引履歴をロードする</div><div class="filter-form-wrapper"><form ng-submit="submitDateRangeForm()" class="filter-choices"><div class="input-group inline-inputs-group"><div class="input-group-addon"><i class="fa fa-calendar"></i><span>から</span></div><div class="input-wrapper"> <input type="text" rp-datepicker="rp-datepicker" ng-model="dateMinView" readonly="readonly" class="form-control"/></div></div><div class="input-group inline-inputs-group"><div class="input-group-addon"><i class="fa fa-calendar"></i><span>まで</span></div><div class="input-wrapper"> <input type="text" rp-datepicker="rp-datepicker" ng-model="dateMaxView" readonly="readonly" class="form-control"/></div></div><button type="submit" class="btn btn-block btn-primary submit">フィルター</button></form></div></div></div></div></div></div><div class="transactions col-md-9 col-sm-7 col-xs-12"><div class="head row hidden-xs"><div class="col-md-9 hidden-sm"><div class="type"></div><div class="i"></div><div class="dt">日付</div><div class="desc">説明</div></div><div class="visible-sm col-sm-5"></div><div class="col-md-3 col-sm-7 export-btn-wrapper text-right"><a id="csv" href="" ng-click="exportCsv()" rp-download="historyCsv" rp-download-csv="true" rp-download-filename="ripple_historic.csv" class="btn btn-primary btn-block btn-sm">CSVへエクスポート</a></div></div><div ng-hide="historyState==\'loading\' || historyShow" class="message">申し訳ありません。現在のフィルターと一致する取引はありません。</div><div class="head row visible-xs"><div class="col-xs-12 export-btn-wrapper text-right"><a id="csv" href="" ng-click="exportCsv()" rp-download="historyCsv" rp-download-csv="true" rp-download-filename="ripple_historic.csv" class="btn btn-primary btn-block btn-sm">CSVへエクスポート</a></div></div><ul><li ng-repeat="entry in historyShow track by entry.hash" ng-click="details[entry.hash] = !details[entry.hash]" ng-class="{open: details[entry.hash]}" ng-class-odd="\'odd\'" rp-pretty-amount-date="entry.dateRaw" class="{{entry.transaction.type}}"><div class="info"><span class="type">&nbsp;</span><span ng-hide="entry.details" class="i"><i ng-show="entry.transaction.type==\'received\'" class="fa fa-arrow-down"></i><i ng-show="entry.transaction.type==\'sent\'" class="fa fa-arrow-up"></i><i ng-show="entry.transaction.type==\'trusted\'" class="fa fa-download fa-rotate-90"></i><i ng-show="entry.transaction.type==\'trusting\'" class="fa fa-download fa-rotate-270"></i><i ng-show="!entry.transaction.type || entry.transaction.type==\'offernew\' || entry.transaction.type==\'offercancel\' || entry.transaction.type==\'exchange\' || entry.transaction.type==\'rippling\'" class="fa fa-exchange"></i><i ng-show="entry.transaction.type==\'accountset\'" class="fa fa-cogs"></i><i ng-show="entry.transaction.type==\'failed\'" class="fa fa-exclamation-triangle"></i></span><span ng-show="entry.details" class="i"><i class="fa fa-arrow-down"></i></span><span class="dt">{{entry.date | date:\'EEE, MMM d, h:mm:ss a\'}}</span><span ng-hide="entry.details" ng-switch on="entry.transaction.type" class="desc"><span ng-switch-when="sent"><span rp-span-spacing="rp-span-spacing"><span rp-pretty-identity="entry.transaction.counterparty" class="address"></span> さんに <span rp-pretty-amount="entry.transaction.amountSent || entry.transaction.amount" class="amount"></span> を送金しました。</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="received"><span rp-span-spacing="rp-span-spacing"><span rp-pretty-identity="entry.transaction.counterparty" class="address"></span>sent you<span rp-pretty-amount="entry.transaction.amount" class="amount"></span></span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="exchange"><span rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="entry.transaction.spent" class="amount"></span> を <span rp-pretty-amount="entry.transaction.amount" class="amount"></span> に両替するよう要求しました。</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="trusted"><span rp-span-spacing="rp-span-spacing"><span title="{{entry.transaction.counterparty}}" class="address">{{entry.transaction.counterparty | rpcontactname}}</span>now trusts you for<span rp-pretty-amount="entry.transaction.amount" class="amount"></span></span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="trusting"><span rp-span-spacing="rp-span-spacing">あなたは今、ゲートウェイ <span rp-pretty-identity="entry.transaction.counterparty" class="address"></span><span ng-show="advanced_feature_switch" l10n-inc="l10n-inc"> for </span><span ng-show="advanced_feature_switch" rp-pretty-amount="entry.transaction.amount" class="amount"></span>に接続しました</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="offernew"><span ng-show="entry.transaction.sell" rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="entry.transaction.gets" class="amount"></span> を <span rp-pretty-amount="entry.transaction.pays" class="amount"></span> で売る注文をしました。</span><span ng-hide="entry.transaction.sell" rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="entry.transaction.pays" class="amount"></span> を <span rp-pretty-amount="entry.transaction.gets" class="amount"></span> で買う注文をしました。</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="offercancel"><span rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="entry.transaction.pays" class="amount"></span> を <span rp-pretty-amount="entry.transaction.gets" class="amount"></span> で受け取る注文をキャンセルしました。</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="accountset"><span>アカウントの詳細が更新されました</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="rippling"><span>Rippling</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="failed">取引に失敗しました</span><span ng-switch-when="error"><strong>未知の取引</strong><ul rp-if="details[entry.hash]" class="effects"><li><span>クライアントはこの処理を解析しませんでした。開発者は問題についての通知を受けました。</span></li></ul></span><span ng-switch-default="ng-switch-default">');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span></span><span ng-show="entry.details" ng-switch on="entry.details.type" class="desc"><span ng-switch-when="giveaway"><span rp-span-spacing="rp-span-spacing"><span>{{entry.details.app.name}}</span> sent you<span rp-pretty-amount="entry.transaction.amount" class="amount"></span> and activated your account!</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span><span ng-switch-when="deposit"><span rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="entry.transaction.amount" class="amount"></span> を {{entry.details.app.name}} を使って入金しました。</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</span></span></div><div ng-if="details[entry.hash]" class="details"><div ng-show="entry.balanceEffects" class="effects"><div class="title">残高変更</div><div class="effect header"><span class="description">説明</span><span class="issuer">発行者</span><span class="amount">金額</span><span class="balance">最終残高</span></div><div ng-repeat="effect in entry.balanceEffects" class="effect"><span class="description"><span ng-show="effect.type == \'balance_change\'" data-label="Description">XRP残高変更</span><span ng-show="effect.type == \'trust_change_balance\'" data-label="Description">{{effect.currency}}残高変更</span><span ng-show="effect.type == \'fee\'" data-label="Description">手数料</span></span><span rp-pretty-issuer="effect.amount.issuer().to_json()" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-default="-" data-label="Issuer" class="issuer"></span><span data-label="Amount" rp-pretty-amount="effect.amount" class="amount"></span><span data-label="Final balance" rp-pretty-amount="effect.balance" class="balance"></span></div></div><div class="links"><a rp-link-tx="entry.hash" class="txLink">取引詳細</a><a href="#/contact?to={{entry.transaction.counterparty}}" rp-no-propagate="rp-no-propagate" ng-show="entry.transaction.counterparty &amp;&amp; !(entry.transaction.counterparty | rponlycontactname)" class="addLink">相手先に <strong> {{entry.transaction.counterparty | rpcontactname}}</strong> を追加</a></div></div></li></ul><div class="foot"><div ng-show="historyState==\'loading\'">ロード中...</div><a ng-show="historyState==\'ready\'" href="" ng-click="loadMore()" class="loadmore">もっと読む</a><div ng-show="historyState==\'full\'">現在、取引予約はありません。</div></div></div></group></section><!-- TODO filter calendar: High/low limits.--><!-- TODO filter calendar: High limit calculation after the low limit--><!-- TODO we loose history after tab Change--><!-- TODO problem when manually editing date filter input field--><!-- TODO currency filter to work with also trust type--><!-- TODO optimization.. double (triple on load more) update history-->');
	}
	return buf.join("");
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="TrustCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><group ng-hide="!connected || loadState.lines" class="disconnected"><p class="literal">ロード中...</p></group><group ng-show="connected &amp;&amp; loadState.lines"><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><div class="row"><div class="col-sm-12"><group ng-show="mode==&quot;granted&quot; &amp;&amp; account.Balance" class="mode-granted wide"><group ng-show="tx_result==&quot;pending&quot;" class="pending"><h2 class="tx-status">あなたの Ripple アカウントにゲートウェイを接続する...</h2></group><group ng-show="tx_result==&quot;cleared&quot;" class="result-success"><h2 class="tx-status">ゲートウェイを接続しました</h2></group><group ng-show="tx_result==&quot;error&quot;" class="result-error"><h2 class="tx-status">ゲートウェイの接続に失敗しました！</h2><p>ゲートウェイへの接続の際に問題が発生しました。後ほど再度お試しください。</p></group><group ng-show="tx_result==&quot;malformed&quot;" class="result-malformed"><h2 class="tx-status">ゲートウェイへの接続の際に問題が発生しました。後ほど再度お試しください。</h2><p>要求は無効です。理由: {{engine_result}} - {{engine_result_message}}</p></group><group ng-show="tx_result==&quot;failed&quot;" class="result-failed"><h2 class="tx-status">ゲートウェイの接続に失敗しました！</h2><p ng-switch on="engine_result"><span ng-switch-when="terNO_LINE">この通貨に対してゲートウェイが接続されていません。</span><span ng-switch-when="tecINSUF_RESERVE_LINE">ゲートウェイに接続するために必要な準備金が不足しています。</span><span ng-switch-when="tecNO_LINE_INSUF_RESERVE">ゲートウェイに接続するためには少なくとも {{account.reserve_to_add_trust | rpamount:0}} XRP を保有していなければなりません。 <a href="http://ripple.com/help/#reserve">もっと読む</a></span><span ng-switch-default="ng-switch-default">ゲートウェイ接続の解除に失敗しました。理由: {{engine_result_message}}</span></p></group><group ng-show="tx_result==&quot;local&quot;" class="result-failed"><h2 class="tx-status">取引処理は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="telINSUF_FEE_P">取引処理を送信したサーバーが混雑していたため、処理することができませんでした。</span></p></group></group></div><div class="col-sm-12"><group ng-show="notif !== &quot;clear&quot;" class="mode-granted wide"><group ng-switch on="notif">         <group ng-switch-when="loading" class="pending"><h2 class="tx-status">変更点を保存しています...</h2></group><group ng-switch-when="success" class="result-success"><h2 class="tx-status">変更点を保存しました！</h2></group><group ng-switch-when="error" class="result-error"><h2 class="tx-status">変更点を保存する際にエラーが発生しました。</h2><p>後で再実行してください。</p></group></group></group></div><div class="col-sm-12">         <group ng-show="notif !== &quot;clear&quot;" class="mode-granted wide"><group ng-switch on="notif">         <group ng-switch-when="remove_gateway" class="pending"><h2 class="tx-status">ゲートウェイを削除しています...</h2></group><group ng-switch-when="gateway_removed" class="result-success"><h2 class="tx-status">ゲートウェイを削除しました！</h2></group><group ng-switch-when="error" class="result-error"><h2 class="tx-status">変更点を保存する際にエラーが発生しました。</h2><p>後で再実行してください。</p></group></group></group></div><div ng-show="addform_visible &amp;&amp; !can_add_trust" class="col-sm-12"><div class="alert alert-warning">新しい与信枠を与えるために最低 <strong> {{account.reserve_to_add_trust | rpamount:0}} XRP</strong> を所有していなければなりません。<a href="https://ripple.com/wiki/Reserves" target="_blank">More information</a></div></div></div><div ng-show="connected" class="row"><div class="col-sm-3"><div class="currencies"><a href="#/xrp" ng-class="{active: $route.current.tabName == \'xrp\'}">XRP</a><a href="#/btc" ng-class="{active: $route.current.tabName == \'btc\'}" ng-show="\'web\' === client">BTC</a><!--a(href="#/usd", ng-class="{active: $route.current.tabName == \'usd\'}", l10n) USD (US only)--><a href="#/gold" ng-class="{active: $route.current.tabName == \'gold\'}">Gold</a><a href="#/trust" ng-class="{active: $route.current.tabName == \'trust\'}">ゲートウェイ</a></div><a href="https://support.ripplelabs.com/hc/en-us/articles/202847686-Gateway-Information" target="_blank">ゲートウェイについてより学んでください</a></div><div class="col-sm-9 trust-menu"><div ng-hide="true" class="row row-padding-small head"><div class="col-sm-5">名前・アドレス</div><div class="col-sm-2"><a href="" ng-click="sorting.predicate = \'currency\'; sorting.reverse=!sorting.reverse">通貨</a></div><div class="col-sm-2"><a href="" ng-click="sorting.predicate = \'balance\'; sorting.reverse=!sorting.reverse">残高</a></div><div class="col-sm-2">与信限度額</div></div><div class="row"><div class="col-xs-12"><form id="trustForm" name="trustForm" ng-show="mode==&quot;main&quot; &amp;&amp; (addform_visible &amp;&amp; can_add_trust)" class="row-padding-small"><div class="row"><div ng-show="\'web\' === client" class="col-xs-12 col-sm-10 col-md-9 form-group"><label for="trust_counterparty">ゲートウェイの Ripple 名またはアドレス</label><input id="trust_counterparty" name="trust_counterparty" type="text" rp-combobox="counterparty_query" rp-combobox-value-as-ripple-name="rp-combobox-value-as-ripple-name" ng-model="counterparty_view" rp-dest="rp-dest" rp-dest-address="rp-dest-address" rp-dest-contact="rp-dest-contact" rp-not-me="rp-not-me" rp-dest-email="rp-dest-email" rp-dest-ripple-name="rp-dest-ripple-name" rp-dest-model="counterparty" rp-dest-loading="counterparty_loading" required="required" rp-autofill="$routeParams.to" rp-autofill-counterparty_view="rp-autofill-counterparty_view" rp-autofill-on="addform_visible = true" rp-focus="rp-focus" rp-spinner="{{counterparty_loading ? 4 : null}}" class="form-control"/><div rp-errors="trust_counterparty" class="errorGroup"><div rp-error-valid="rp-error-valid"><div ng-show="counterparty != counterparty_address &amp;&amp; counterparty_name &amp;&amp; !error_account_reserve" class="success">{{counterparty_address}}</div><div ng-show="error_account_reserve" class="error"><span>アカウントは最低 XRP 準備金を満たしていません。</span><a href="https://ripple.com/wiki/Account_Creation" target="_blank">詳細</a></div></div><div rp-error-on="required" class="error">Ripple 名、連絡先、またはアドレスを入力してください。</div><div rp-error-on="rpNotMe" class="error">ご自分のアドレスを入力しました。</div><div rp-error-on="rpDest" class="error">有効な Ripple 名、連絡先、またはアドレスを入力してください。</div></div></div></div><div rp-errors="trust_amount" class="errorGroup"><div rp-error-on="required" class="error">金額フィールドは必須です</div></div><div rp-errors="trust_amount_currency" class="errorGroup"><div rp-error-on="rpNotXrp" class="error">XRP は信用を与えなくても送ることができます。XRPを信用したい場合、XRR通貨コードを使ってください。</div><div rp-error-on="required" class="error">通貨フィールドは必須です</div><div ng-show="\'desktop\' === client" class="col-xs-12 form-group"><input id="trust_counterparty" name="trust_counterparty" type="text" rp-combobox="counterparty_query" rp-combobox-value-as-ripple-name="rp-combobox-value-as-ripple-name" placeholder="ゲートウェイの Ripple 名またはアドレス" ng-model="counterparty_view" rp-dest="rp-dest" rp-dest-address="rp-dest-address" rp-dest-contact="rp-dest-contact" rp-not-me="rp-not-me" rp-dest-email="rp-dest-email" rp-dest-ripple-name="rp-dest-ripple-name" rp-dest-model="counterparty" rp-dest-loading="counterparty_loading" required="required" rp-autofill="$routeParams.to" rp-autofill-counterparty_view="rp-autofill-counterparty_view" rp-autofill-on="addform_visible = true" rp-focus="rp-focus" rp-spinner="{{counterparty_loading ? 4 : null}}" class="form-control"/><div rp-errors="trust_counterparty" class="errorGroup"><div rp-error-valid="rp-error-valid"><div ng-show="counterparty != counterparty_address &amp;&amp; counterparty_name &amp;&amp; !error_account_reserve" class="success">{{counterparty_address}}</div><div ng-show="error_account_reserve" class="error"><span>アカウントは最低 XRP 準備金を満たしていません。</span><a href="https://ripple.com/wiki/Account_Creation" target="_blank">詳細</a></div></div><div rp-error-on="required" class="error">Ripple アドレスまたは連絡先を入力してください。</div><div rp-error-on="rpNotMe" class="error">ご自分のアドレスを入力しました。</div><div rp-error-on="rpDest" class="error">有効な Ripple アドレスまたは相手先を入力してください。</div></div></div></div><div class="row"><div class="col-xs-12 form-group"><label for="trust_amount" ng-show="advanced_feature_switch">金額</label><label for="trust_amount" ng-hide="advanced_feature_switch">通貨</label><div ng-show="advanced_feature_switch" class="row"><div ng-init="amount = $routeParams.amount ? \'\' : 1000000000" class="col-md-3 col-sm-4 col-xs-3"><input id="trust_amount" name="trust_amount" type="number" step="any" ng-model="amount" ng-pattern="validation_pattern" rp-autofill="$routeParams.amount" rp-autofill-amount="rp-autofill-amount" rp-autofill-on="addform_visible = true" class="form-control value"/></div><div class="col-md-6 col-sm-6 col-xs-9"><input id="trust_amount_currency" name="trust_amount_currency" type="text" ng-model="currency" rp-combobox="currency_query" rp-combobox-select="rp-combobox-select" rp-autofill="$routeParams.currency || $routeParams.amount" rp-autofill-currency="rp-autofill-currency" rp-autofill-on="addform_visible = true" rp-not-xrp="rp-not-xrp" required="required" class="form-control currency-field"/></div></div><div ng-hide="advanced_feature_switch" class="row"><div class="col-md-9 col-sm-10 col-xs-12"><input id="trust_amount_currency" name="trust_amount_currency" type="text" ng-model="currency" rp-combobox="currency_query" rp-combobox-select="rp-combobox-select" rp-autofill="$routeParams.currency || $routeParams.amount" rp-autofill-currency="rp-autofill-currency" rp-autofill-on="addform_visible = true" rp-not-xrp="rp-not-xrp" required="required" class="form-control currency-field"/></div></div><div rp-errors="trust_amount" class="errorGroup"><div rp-error-on="required" class="error">金額フィールドは必須です</div></div><div rp-errors="trust_amount_currency" class="errorGroup"><div rp-error-on="rpNotXrp" class="error">XRP は信用を与えなくても送ることができます。XRPを信用したい場合、XRR通貨コードを使ってください。</div><div rp-error-on="required" class="error">通貨フィールドは必須です</div></div></div></div><div ng-show="advanced_feature_switch" class="row"><div class="col-xs-12 allow-rippling"><label for="trust_allowrippling" class="checkbox"><input id="trust_allowrippling" name="trust_allowrippling" type="checkbox" ng-model="allowrippling"/><span>Ripple の使用を許可</span></label><i rp-popover="rp-popover" rp-popover-placement="bottom" rp-popover-title="Ripple の使用を許可" rp-popover-trigger="click" data-content="Allow this trust line\'s balances to be transferred to another issuer you connect to. &lt;a href=https://ripple.com/wiki/No_Ripple target=_blank&gt;More information&lt;/a&gt;" class="fa fa-question-circle help-icon"></i></div></div><div class="row"><div class="col-xs-8 col-sm-7 col-md-6"><rp-popup rp-popup-on-open="grant()"> <a href="" rp-popup-link="rp-popup-link" ng-disabled="trustForm.$invalid || verifying" class="btn btn-block btn-primary submit">保存</a><div rp-popup-content="rp-popup-content" class="connectModal"><div class="modal-header"><div id="logo" class="navbar-brand hidden-sm modal-logo"></div><div class="modal-title">接続</div></div><div class="modal-body"><div class="modal-prompt"> <div l10n-inc="l10n-inc">You are connecting a gateway, which means</div><div l10n-inc="l10n-inc">{{ counterparty_address | rpripplename:{tilde: true} }} can:</div></div><div ng-show="advanced_feature_switch" class="grey-focus"><span l10n-inc="l10n-inc" class="modal-permissions">- Hold up to&#32;</span><span rp-pretty-amount="amount_feedback"></span><span l10n-inc="l10n-inc" class="modal-permissions"> on your behalf</span></div><div ng-hide="advanced_feature_switch" class="grey-focus"><span l10n-inc="l10n-inc" class="modal-permissions">- Hold&#32;</span><span>{{ currency }}</span><span l10n-inc="l10n-inc" class="modal-permissions"> on your behalf</span></div><div class="modal-buttons"><button data-dismiss="modal" ng-click="grant_confirmed()" rp-spinner="{{loading ? 4 : null}}" ng-disabled="loading" class="modal-btn btn btn-default btn-success btn-md"><span ng-show="loading">ロード中...</span><span ng-hide="loading">確認</span></button><button data-dismiss="modal" ng-click="toggle_form()" ng-hide="loading" class="modal-btn btn btn-cancel btn-md btn-cancel">キャンセル</button></div></div></div></rp-popup></div><div class="col-xs-4 col-sm-3 col-md-3"><button type="button" ng-click="toggle_form()" class="btn btn-block btn-cancel">キャンセル</button></div></div><div class="row delete-trust"><div ng-show="balance !== &quot;0&quot; &amp;&amp; orderbookStatus === &quot;exists&quot;" class="col-xs-6 col-sm-6 col-md-8 col-lg-9"><rp-confirm action-text="Are you sure you want to remove this gateway? Ripple Trade will attempt to convert the remaining balance of {{ trust.balance }} {{ trust.currency }} into XRP. This action can\'t be undone." action-button-text="Convert balance and remove" action-button-css="btn btn-default btn-danger" action-function="delete_line()" cancel-button-css="btn btn-cancel" cancel-button-text="cancel" ng-hide="showPassword==true"><button type="button" ng-click="load_orderbook()" class="btn btn-block btn-danger btn-xs submit">削除</button></rp-confirm></div><div ng-show="balance !== &quot;0&quot; &amp;&amp; orderbookStatus === &quot;not&quot;" class="col-xs-6 col-sm-6 col-md-8 col-lg-9"><rp-confirm action-text="Are you sure you want to remove this gateway? Ripple Trade will return the balance of {{ trust.balance }} {{ trust.currency }} to the issuer. This action can\'t be undone." action-button-text="Return balance and remove" action-button-css="btn btn-default btn-danger" action-function="delete_line()" cancel-button-css="btn btn-cancel" cancel-button-text="cancel" ng-hide="showPassword==true"><button type="button" ng-click="load_orderbook()" class="btn btn-block btn-danger btn-xs submit">削除</button></rp-confirm></div><div ng-show="balance === &quot;0&quot;" class="col-xs-6 col-sm-6 col-md-8 col-lg-9"><rp-confirm action-text="Are you sure you want to remove this gateway? This action can\'t be undone." action-button-text="Remove" action-button-css="btn btn-default btn-danger" action-function="delete_line()" cancel-button-css="btn btn-cancel" cancel-button-text="cancel" ng-hide="showPassword==true"><button type="button" ng-click="load_orderbook()" class="btn btn-block btn-danger btn-xs submit">削除</button></rp-confirm></div></div><div class="row"><div class="col-xs-12"><p ng-show="verifying" class="literal throbber verifying">アドレスを確認中</p></div></div></form></div><div ng-show="addform_visible &amp;&amp; !can_add_trust" class="col-xs-12"><div class="alert alert-warning">新しい与信枠を与えるために最低 <strong> {{account.reserve_to_add_trust | rpamount:0}} XRP</strong> を所有していなければなりません。<a href="https://ripple.com/wiki/Reserves" target="_blank">More information</a></div></div></div><div class="row"><div ng-hide="account.Balance" class="unfunded literal">ゲートウェイアカウントを追加する前にあなたのアカウントを<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank" l10n-inc="l10n-inc">有効化</a>しなければなりません。</div></div><div class="row"><div class="col-xs-12 col-sm-4 col-md-3 actions btn-add-trust"><a ng-click="toggle_form()" ng-show="!addform_visible &amp;&amp; account.Balance" ng-disabled="addform_visible" class="btn btn-primary btn-sm btn-block sign">ゲートウェイへ接続する</a></div></div><div ng-hide="true" ng-repeat="(key, line) in linesArray | orderBy:sorting.sort:sorting.reverse" class="row row-padding-small line padding-vertical-xs"><div class="col-sm-5">{{line.account | rpcontactnamefull }}</div><div rp-currency="line.balance" class="col-sm-2"></div><div class="col-sm-2"><span rp-tooltip="{{line.balance | rpamount }}">{{line.balance | rpamount:{rel_precision: 0} }}</span></div><div class="col-sm-2"><rp-trust-line rp-line-data="line"></rp-trust-line></div><div class="col-sm-1 actions"><button href="" ng-click="edit_line()" class="btn btn-default btn-sm">編集</button></div></div><div ng-repeat="entry in accountLines" ng-class="\'currency-\' + (entry.components[0].currency | lowercase)" class="currencyBox"><div class="row currencyTitle"><div class="col-xs-12"><i ng-class="\'fa-\' + (entry.components[0].currency | lowercase)" class="icon fa fa-money"></i><span rp-currency="entry.components[0].limit" rp-currency-full="rp-currency-full" class="currency"></span></div></div><div class="row head"><div ng-class="{ \'col-sm-3 col-xs-2\': advanced_feature_switch, \'col-sm-4 col-xs-4 col-md-5\': !advanced_feature_switch }">ゲートウェイ</div><div ng-class="{ \'col-xs-2 col-sm-2\': advanced_feature_switch, \'col-xs-4\': !advanced_feature_switch }">残高</div><div ng-show="advanced_feature_switch" ng-class="{ \'col-xs-2\': advanced_feature_switch }">上限</div><div ng-show="advanced_feature_switch" class="col-xs-2 col-sm-1">下限</div><div ng-show="advanced_feature_switch" class="col-xs-2">Rippling</div><div ng-class="{\'col-xs-2\' : advanced_feature_switch, \'col-xs-4 col-md-3\': !advanced_feature_switch }">編集</div></div><hr id="divider"/><div class="lines"><div ng-controller="AccountRowCtrl" ng-repeat="component in entry.components" class="line"><div ng-class="{ \'frozen-account\': component.freeze_peer }" class="row"><div ng-class="{ \'col-sm-3 col-xs-2\': advanced_feature_switch, \'col-md-5 col-sm-4 col-xs-4\': !advanced_feature_switch }" rp-pretty-identity="component.account" rp-pretty-identity-filters="rpcontactnamefull | rpripplename: {tilde: true}" class="gateway"> </div><div ng-class="{ \'col-xs-2 col-sm-2\': advanced_feature_switch, \'col-xs-4\': !advanced_feature_switch }">{{ component.balance | rpamount:{rel_precision: 2} }}</div><div ng-show="advanced_feature_switch" ng-class="{ \'col-xs-1\': advanced_feature_switch }" class="col-xs-2"><div>{{ component.limit | rpamount }}</div></div><div ng-show="advanced_feature_switch &amp;&amp; component.limit_peer._offset == \'-100\'" class="col-sm-1 col-xs-2">{{ component.limit_peer | rpamount }}</div><div ng-show="advanced_feature_switch &amp;&amp; component.limit_peer._offset !== \'-100\'" ng-hide="component.limit_peer._offset == \'-100\' || !advanced_feature_switch" class="col-sm-1 col-xs-2">-{{ component.limit_peer | rpamount }}</div><div ng-show="advanced_feature_switch" class="col-sm-2 col-xs-2"><div ng-show="component.no_ripple">オフ</div><div ng-hide="component.no_ripple">オン</div></div><div ng-hide="component.freeze_peer" ng-class="{ \'col-xs-2\': advanced_feature_switch, \'col-xs-4 col-md-3\': !advanced_feature_switch }"><a href="" ng-hide="editing" ng-click="edit_account()">編集</a><span ng-show="editing &amp;&amp; !advanced_feature_switch"><span ng-hide="trust.loading"><div class="row row-padding-small"><div class="col-md-7 col-sm-7 col-xs-6"><span ng-show="trust.balance !== &quot;0&quot; &amp;&amp; orderbookStatus === &quot;exists&quot;"><rp-confirm action-text="Are you sure you want to remove this gateway? Ripple Trade will attempt to convert the remaining balance of {{ trust.balance }} {{ trust.currency }} into XRP. This action can\'t be undone." action-button-text="Convert balance and remove" action-button-css="btn btn-default btn-danger custom-btn" action-function="delete_account()" cancel-button-css="btn btn-cancel" cancel-button-text="cancel" ng-hide="showPassword==true"><button type="button" ng-click="load_orderbook()" class="btn btn-block btn-danger submit">削除</button></rp-confirm></span><span ng-show="trust.balance !== &quot;0&quot; &amp;&amp; orderbookStatus === &quot;not&quot;"><rp-confirm action-text="Are you sure you want to remove this gateway? Ripple Trade will return the balance of {{ trust.balance }} {{ trust.currency }} to the issuer. This action can\'t be undone." action-button-text="Return balance and remove" action-button-css="btn btn-default btn-danger custom-btn" action-function="delete_account()" cancel-button-css="btn btn-cancel" cancel-button-text="cancel" ng-hide="showPassword==true"><button type="button" ng-click="load_orderbook()" class="btn btn-block btn-danger submit">削除</button></rp-confirm></span><span ng-show="trust.balance === &quot;0&quot;"><button type="button" ng-click="delete_account()" class="btn btn-block btn-danger submit">削除</button></span></div><div class="col-md-5 col-sm-5 col-xs-6"><a href="" ng-click="cancel()" ng-disabled="trust.loading" class="btn btn-block btn-cancel">キャンセル</a></div></div></span></span></div><div ng-show="component.freeze_peer" class="col-xs-2"><i rp-popover="rp-popover" rp-popover-placement="bottom" rp-popover-title="Account Frozen" rp-popover-trigger="click" data-content="This account has been frozen. Please contact the issuer to unfreeze your account. &lt;a href=https://ripple.com/wiki/Freeze target=_blank&gt;More about freezing&lt;/a&gt;" class="fa fa-lock"></i></div></div><div ng-show="editing &amp;&amp; advanced_feature_switch" class="row row-padding-small-xs editBox"><form ng-class="{ \'frozen-account\': component.freeze_peer }" ng-submit="save_account()"><ng-form name="accountForm"><div class="col-sm-1 col-md-1 inputPadding">上限</div><div class="col-sm-2 col-md-3"><input name="limit" type="text" ng-model="trust.limit" ng-pattern="validation_pattern" ng-disabled="trust.loading" required="required" class="form-control"/></div><div class="col-sm-2 col-md-2 inputPadding"><div class="rippling-checkbox"><label>リップリング <input name="rippling" type="checkbox" ng-model="trust.rippling"/></label></div></div><div class="col-sm-7 col-md-6"><div class="row row-padding-small"><div class="col-xs-6 col-sm-5"><button id="save" type="submit" ng-disabled="accountForm.$invalid || trust.loading" class="btn btn-block btn-primary"><span ng-hide="trust.loading">保存</span><span ng-show="trust.loading">保存中...</span></button></div><div ng-hide="trust.loading" class="col-xs-3 col-sm-4 col-md-3"> <div class="row text-right"><div ng-show="trust.balance !== &quot;0&quot; &amp;&amp; orderbookStatus === &quot;exists&quot;" class="col-xs-12"><rp-confirm action-text="Are you sure you want to remove this gateway? Ripple Trade will attempt to convert the remaining balance of {{ trust.balance }} {{ trust.currency }} into XRP. This action can\'t be undone." action-button-text="Convert balance and remove" action-button-css="btn btn-default btn-danger" action-function="delete_account()" cancel-button-css="btn btn-cancel" cancel-button-text="cancel" ng-hide="showPassword==true"><button type="button" ng-click="load_orderbook()" class="btn btn-block btn-danger btn-xs submit">削除</button></rp-confirm></div><div ng-show="trust.balance !== &quot;0&quot; &amp;&amp; orderbookStatus === &quot;not&quot;" class="col-xs-12"><rp-confirm action-text="Are you sure you want to remove this gateway? Ripple Trade will return the balance of {{ trust.balance }} {{ trust.currency }} to the issuer. This action can\'t be undone." action-button-text="Return balance and remove" action-button-css="btn btn-default btn-danger" action-function="delete_account()" cancel-button-css="btn btn-link" cancel-button-text="cancel" ng-hide="showPassword==true"><button type="button" ng-click="load_orderbook()" class="btn btn-block btn-danger btn-xs submit">削除</button></rp-confirm></div><div ng-show="trust.balance === &quot;0&quot;" class="col-xs-12"><button type="button" ng-click="delete_account()" class="btn btn-block btn-danger btn-xs submit">削除</button></div></div></div><div class="col-xs-3"><a href="" ng-click="cancel()" ng-disabled="trust.loading" class="btn btn-block btn-cancel">キャンセル</a></div></div></div></ng-form></form></div></div></div></div></div></div></group></section>');
	}
	return buf.join("");
	}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="LoginCtrl" class="col-xs-12 content"><div ng-hide="$routeParams.tab" class="row auth-form-container"><div class="auth-form-wrapper col-xs-12 col-sm-8 col-md-7"><form name="loginForm" ng-submit="submitForm()"><h2>ログイン</h2><div ng-show="verifyStatus" class="auth-attention text-center"><div ng-show="\'verifying\' === verifyStatus" class="status">確認中...</div><div ng-show="\'verified\' === verifyStatus" class="status">メールアドレスの確認に成功しました。</div><div ng-show="\'error\' === verifyStatus" class="status">電子メール確認トークンは無効です。 それは期限切れになったか、再送されています。 最近の電子メールの受信箱を確認してください。</div></div><div ng-hide="twoFactor" class="form-group"><label for="login_username">Ripple 名</label><div class="input-group"><span class="input-group-addon ripple-addon">~</span><input id="login_username" name="login_username" type="text" ng-model="username" required="required" rp-focus-on-empty="rp-focus-on-empty" rp-autofill="$routeParams.username" class="form-control"/></div></div><div ng-hide="twoFactor" class="form-group"><label for="login_password">パスワード</label><input id="login_password" name="login_password" type="password" ng-model="password" required="required" rp-focus="rp-focus" class="form-control"/></div><div ng-show="twoFactor" class="row row-padding-small"><div class="form-group col-xs-12"><span ng-show="twoFactor.via === \'sms\'" class="status">お使いのデバイスに送信されたSMSメッセージの検証コードを入力してください：</span><span ng-show="twoFactor.via === \'app\'" class="status">お使いのデバイスにインストールされているAuthyアプリの検証コードを入力してください：</span><span ng-bind="maskedPhone" class="maskedPhone"> </span></div><div class="label-wrapper col-xs-12"><label for="token">検証コード</label></div><div class="form-group col-xs-12 col-sm-5 col-md-6 col-lg-7"><input id="login_password" name="token" ng-model="token" rp-focus="rp-focus" class="form-control"/></div><div class="form-group col-xs-12 col-sm-7 col-md-6 col-lg-5"><div class="row"><div class="col-xs-6"><button type="button" ng-click="requestToken()" class="btn btn-block btn-primary btn-nomargin-xs"> <span ng-show="twoFactor.via === \'sms\'">再送する</span><span ng-show="twoFactor.via === \'app\'">SMS経由で送信</span></button></div><div class="col-xs-6">   <a ng-click="cancel2FA()" class="btn btn-block btn-cancel">キャンセル</a></div></div></div><div class="input-group col-xs-12"><label><input name="rememberMe" type="checkbox" ng-model="rememberMe" class="rememberMe"/><span for="rememberMe">30日間このデバイス上パスワードを記憶する</span></label></div></div><div ng-show="status" class="text-status"><span>{{status}}</span><br/><div ng-repeat="message in backendMessages" class="backend"><b>{{message.backend}} &#32;</b><span>{{message.message}}</span></div></div><div class="submit-btn-container"><button type="submit" rp-spinner="{{ajax_loading ? 4 : null}}" ng-disabled="ajax_loading || loginForm.$invalid" ng-hide="twoFactor" class="btn btn-submit btn-block btn-success"><span>ログイン</span></button><button type="submit" rp-spinner="{{ajax_loading ? 4 : null}}" ng-disabled="ajax_loading || !token" ng-show="twoFactor" class="btn btn-submit btn-block btn-success"><span>確認</span></button></div><div class="submit-btn-container-recovery"><a href="#recover/{{username}}" ng-show="showRecover" class="recover-btn"><button ng-click="" class="btn btn-block btn-primary"><span>アカウント復元</span></button></a></div><a ng-href="#/recover/{{username}}" ng-hide="showRecover" class="recover">アカウント復元</a></form></div></div><div class="row switch-mode-wrapper">     <div class="switch-mode-link-container">既に ripple.com/client アカウントをお持ちですか？ <a href="#migrate" l10n-inc="l10n-inc">移行する</a></div><div class="switch-mode-link-container">{{productName}} のご使用は初めてですか？ <a href="#register" l10n-inc="l10n-inc">登録</a></div></div><div ng-show="$routeParams.tab" class="row action-login"><div class="col-xs-12 col-sm-6 col-md-6"><div ng-show="\'send\' == $routeParams.tab" class="info"><p class="literal">{{$routeParams.label}}</p><div ng-hide="$routeParams.amount"><p l10n-inc="l10n-inc">You\'re sending money to</p><div class="address">{{ $routeParams.to | rpripplename:{tilde:true} }}</div>.</div><div ng-show="$routeParams.amount"><p l10n-inc="l10n-inc">You\'re sending</p><div ng-show="$routeParams.amount" class="amount"><span class="number">{{$routeParams.amount | rpamount:{xrp_human: true} }}</span><span class="currency">{{$routeParams.amount | rpcurrency}}</span></div><p l10n-inc="l10n-inc">&#32;to&#32;</p><div class="address">{{ $routeParams.to | rpripplename:{tilde:true} }}</div>.</div></div><div ng-show="\'trust\' == $routeParams.tab" class="info"><p class="literal">{{$routeParams.label}}</p><div><p l10n-inc="l10n-inc">You\'re connecting to the gateway</p><div class="address">{{ $routeParams.to | rpripplename:{tilde:true} }}</div><div ng-show="$routeParams.currency" l10n-inc="l10n-inc">for<div class="amount"><span class="currency">{{$routeParams.currency}}</span></div></div><div ng-show="$routeParams.amount" l10n-inc="l10n-inc">with a limit of<div class="amount"><span class="currency">{{$routeParams.amount | rpamount}} {{$routeParams.amount | rpcurrency}}</span></div></div>.</div></div><div ng-show="\'contacts\' == $routeParams.tab" class="info"><p class="literal">{{$routeParams.label}}</p><span><p l10n-inc="l10n-inc">You\'re adding</p><div class="address">{{ $routeParams.to | rpripplename:{tilde:true} }}</div><p l10n-inc="l10n-inc">to your contacts list</p></span></div></div><div class="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-lg-offset-1"><form name="loginForm" ng-submit="submitForm()"><div ng-hide="twoFactor" class="form-group"><label for="login_username">Ripple 名</label><div class="input-group"><span class="input-group-addon ripple-addon">~</span><input id="login_username" name="login_username" type="text" ng-model="username" required="required" rp-focus-on-empty="rp-focus-on-empty" rp-autofill="$routeParams.username" class="form-control"/></div></div><div ng-hide="twoFactor" class="form-group"><label for="login_password">パスワード</label><input id="login_password" name="login_password" type="password" ng-model="password" required="required" rp-focus="rp-focus" class="form-control"/></div><div ng-show="twoFactor" class="row row-padding-small"><div class="form-group col-xs-12"><span ng-show="twoFactor.via === \'sms\'" class="status">お使いのデバイスに送信されたSMSメッセージの検証コードを入力してください：</span><span ng-show="twoFactor.via === \'app\'" class="status">お使いのデバイスにインストールされているAuthyアプリの検証コードを入力してください：</span><span ng-bind="maskedPhone" class="maskedPhone"> </span></div><div class="label-wrapper col-xs-12"><label for="token">検証コード</label></div><div class="form-group col-xs-12 col-sm-5 col-md-6 col-lg-7"><input id="login_password" name="token" ng-model="token" rp-focus="rp-focus" class="form-control"/></div><div class="form-group col-xs-12 col-sm-7 col-md-6 col-lg-5"><div class="row"><div class="col-xs-6"><button type="button" ng-click="requestToken()" class="btn btn-block btn-primary btn-nomargin-xs"> <span ng-show="twoFactor.via === \'sms\'">再送する</span><span ng-show="twoFactor.via === \'app\'">SMS経由で送信</span></button></div><div class="col-xs-6">   <a ng-click="cancel2FA()" class="btn btn-block btn-cancel">キャンセル</a></div></div></div><div class="input-group col-xs-12"><label><input name="rememberMe" type="checkbox" ng-model="rememberMe" class="rememberMe"/><span for="rememberMe">30日間このデバイス上パスワードを記憶する</span></label></div></div><div class="row"><div ng-show="status" class="col-xs-12 text-status"><span>{{status}}</span><br/><div ng-repeat="message in backendMessages" class="backend"><b>{{message.backend}} &#32;</b><span>{{message.message}}</span></div></div></div><div class="row"><div class="col-xs-12"><button type="submit" ng-disabled="loginForm.$invalid || ajax_loading" rp-spinner="{{ajax_loading ? 4 : null}}" class="btn btn-lg btn-submit btn-block btn-primary">ログイン</button></div></div><p class="literal hint">次のページでこの取引を確認できます。</p><p class="literal">{{productName}} のご使用は初めてですか？ <a href="#/register" l10n-inc="l10n-inc">ウォレットを作成</a></p></form></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="AdvancedCtrl" class="col-xs-12 content"><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><div ng-show="connected" class="row"><div class="col-sm-3"><div class="settingPage"><a href="#/security" ng-class="{active: $route.current.tabName == \'security\'}">セキュリティー</a><a href="#/advanced" ng-class="{active: $route.current.tabName == \'advanced\'}">詳細</a></div></div><div class="col-sm-9 list"><section id="servers" class="content"><h4>設定</h4><form name="blobForm" ng-submit="saveBlob()"><div ng-show="\'web\' === client" class="descriptor">Blob vault</div><div ng-hide="editBlob" class="row advanced-form-row"><div class="col-xs-9 col-sm-8 col-md-6"><div class="description">{{options.blobvault}}</div></div><div class="col-xs-1"></div><div class="col-xs-3 col-sm-3 col-md-2"><a href="" ng-click="editBlob = true" class="btn btn-block btn-cancel">編集</a></div></div><div ng-show="editBlob" class="row row-padding-small field-edit-row"><div class="col-xs-12 col-sm-9 col-md-6"><input id="blobIp" name="blobIp" type="text" ng-model="options.blobvault" class="form-control blobIp"/></div><div class="col-xs-6 col-sm-6 col-md-3"><button id="saveBlob" type="submit" ng-disabled="blobForm.$invalid" class="btn btn-block btn-success btn-xs submit">保存</button></div><div class="col-xs-3 col-sm-3 col-md-2"><button id="deleteBlob" type="button" ng-click="deleteBlob()" class="btn btn-block btn-danger btn-xs submit">削除</button></div><div id="cancel" class="col-xs-3 col-sm-3 col-md-1 text-center"><a href="" ng-click="cancelEditBlob()" class="btn btn-cancel btn-block">キャンセル</a></div></div></form><form name="bridgeForm" ng-submit="saveBridge()"><div class="descriptor">ビットコインブリッジ</div><div ng-hide="editBridge" class="row advanced-form-row"><div class="col-xs-9 col-sm-8 col-md-6"><div class="description">{{options.bridge.out.bitcoin}}</div></div><div class="col-xs-1"></div><div class="col-xs-3 col-sm-3 col-md-2"><a href="" ng-click="editBridge = true" class="btn btn-block btn-cancel">編集</a></div></div><div ng-show="editBridge" class="row row-padding-small field-edit-row"><div class="col-xs-12 col-sm-9 col-md-6"><input id="btcDomain" name="btcDomain" type="text" ng-model="options.bridge.out.bitcoin" class="form-control btcDomain"/></div><div class="col-xs-6 col-sm-6 col-md-3"><button id="saveBridge" type="submit" ng-disabled="bridgeForm.$invalid" class="btn btn-block btn-success btn-xs submit">保存</button></div><div class="col-xs-3 col-sm-3 col-md-2"><button id="deleteBridge" type="button" ng-click="deleteBridge()" class="btn btn-block btn-danger btn-xs submit">削除</button></div><div id="cancel" class="col-xs-3 col-sm-3 col-md-1 text-center"><a href="" ng-click="cancelEditBridge()" class="btn btn-cancel btn-block">キャンセル</a></div></div></form><form name="accountsAdvForm" ng-submit="saveAcctOptions()" class="trust-line-form"><div ng-show="\'web\' === client" class="descriptor">与信限度額</div><div ng-hide="editAcctOptions" class="row advanced-form-row"><div class="col-xs-6 col-sm-5 col-md-3"><div class="description">Advanced settings</div></div><div class="col-xs-3 col-sm-4 col-md-4"><div ng-show="advanced_feature_switch" class="description">表示</div><div ng-hide="advanced_feature_switch" class="description">隠す</div></div><div class="col-xs-3 col-sm-3 col-md-2"><a href="" ng-click="editAcctOptions = true" class="btn btn-cancel btn-block">編集</a></div></div><div ng-show="editAcctOptions" class="row row-padding-small edit-trust-line"><div class="col-xs-6 col-sm-5 col-md-3"><div class="description">Advanced settings</div></div><div class="col-xs-4 col-sm-4 col-md-3"><div class="helperInput"><label><input type="checkbox" name="acct_adv" ng-model="options.advanced_feature_switch"/><span>表示</span></label></div></div><div class="col-xs-6 col-sm-6 col-md-3"><button id="save" type="submit" ng-disabled="serverForm.$invalid" class="btn btn-block btn-success btn-xs submit">保存</button></div><div ng-show="hasRemove()" class="col-xs-3"><button id="delete" type="button" ng-click="remove()" ng-show="hasRemove()" class="btn btn-block btn-danger btn-xs submit">削除</button></div><div id="cancel" class="col-xs-3 col-sm-3 col-md-2 text-center"><a href="" ng-click="cancelEditAcctOptions()" class="btn btn-cancel btn-block">キャンセル</a></div></div></form><h4 id="networkSettings">Network settings</h4><form name="maxnetworkfeeForm" ng-submit="saveMaxNetworkFee()"><div class="descriptor">Maximum network fee</div><div ng-hide="editMaxNetworkFee" class="row advanced-form-row"><div class="col-xs-9 col-sm-8 col-md-6"><div class="description">{{max_tx_network_fee_human}}</div></div><div class="col-xs-1"></div><div class="col-xs-3 col-sm-3 col-md-2"><a href="" ng-click="editMaxNetworkFee = true" class="btn btn-block btn-cancel">編集</a></div></div><div ng-show="editMaxNetworkFee" class="row row-padding-small field-edit-row"><div class="col-xs-12 col-sm-9 col-md-6 input-group currency_force"><input id="maxNetworkFee" name="maxNetworkFee" type="text" ng-model="max_tx_network_fee_human" required="required" //ng-disabled="!!send.force_amount" //rp-autofill="$routeParams.amount" //rp-autofill-amount="//rp-autofill-amount" //rp-amount="//rp-amount" rp-amount-positive="rp-amount-positive" rp-amount-xrp-limit="rp-amount-xrp-limit" rp-amount-xrp-limit-currency="{{xrp.name}}" class="form-control maxNetworkFee"/><span ng-bind="xrp.name" class="input-group-addon"></span></div><div class="col-xs-6 col-sm-6 col-md-3"><button id="saveMaxNetworkFee" type="submit" ng-disabled="maxnetworkfeeForm.$invalid" class="btn btn-block btn-success btn-xs submit">保存</button></div><div id="cancel" class="col-xs-3 col-sm-3 col-md-1 text-center"><a href="" ng-click="cancelEditMaxNetworkFee()" class="btn btn-cancel btn-block">キャンセル</a></div></div></form><h4 id="serverSettings">サーバー設定</h4><form ng-controller="ServerRowCtrl" ng-repeat="(index, server) in options.server.servers" ng-submit="save()" class="server-row-form"><ng-form name="serverForm"><div class="row"><div class="col-xs-6 col-sm-5 col-md-3"><div class="descriptor">WebSocket host名</div></div><div class="port col-xs-4 col-sm-7 col-md-9"><div class="descriptor portNumber">ポート・ナンバー</div></div></div><div ng-show="editing" class="row row-padding-small"><div class="col-xs-6 col-sm-5 col-md-3 hostname-wrapper"><input name="host" type="text" ng-model="server.host" rp-hostname="rp-hostname" class="form-control host"/><div class="errorGroup"><div rp-errors="host"><div rp-error-on="rpHostname" class="error">Socket IP及びホスト名が無効です。</div></div><div rp-errors="port"><div rp-error-on="rpPortNumber" class="error">ポートナンバーが無効です。</div></div></div></div><div class="col-xs-3 col-sm-2 col-md-2"><input name="port" type="text" ng-model="server.port" rp-port-number="rp-port-number" class="form-control socketPort"/></div><div id="secureSocket" class="col-xs-3 col-md-1 col-sm-2 editable"><div class="helperInput"><label><input type="checkbox" name="secure" ng-model="server.secure"/><span>安全</span></label></div></div><div class="col-xs-6 col-sm-6 col-md-3"><button id="save" type="submit" ng-disabled="serverForm.$invalid" class="btn btn-block btn-success btn-xs submit">保存</button></div><div ng-show="hasRemove()" class="col-xs-3 col-sm-3 col-md-2"><button id="delete" type="button" ng-click="remove()" ng-show="hasRemove()" class="btn btn-block btn-danger btn-xs submit">削除</button></div><div id="cancel" class="col-xs-3 col-sm-3 col-md-1 text-center"><a href="" ng-click="cancel()" ng-hide="noCancel()" class="btn btn-cancel btn-block">キャンセル</a></div></div><div ng-hide="editing" class="row advanced-form-row"><div class="col-xs-6 col-sm-5 col-md-3"><div class="description">{{server.host}}</div></div><div class="col-xs-3 col-sm-3 col-md-2 port-wrapper"><div class="description">{{server.port}}</div></div><div id="secureSocket" class="col-xs-3 col-sm-2 col-md-2"><div ng-show="server.secure" class="description">安全</div><div ng-hide="server.secure" class="description">安全でない</div></div><div class="col-xs-3 col-sm-2 col-md-2"><a href="" ng-click="editing = true" class="btn btn-cancel btn-block">編集</a></div></div></ng-form></form><div class="row"><div class="col-xs-12 col-sm-6 col-md-3"><button id="newServer" type="button" ng-click="addServer()" class="btn btn-block btn-primary">新しいサーバーを追加</button></div></div></section></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="SendCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div><p class="literal">送金する前に資金を供給する必要があります。</p></div><div ng-show="connected" class="row"><div class="widgets hidden-xs col-sm-4 col-md-4 col-lg-3"><div class="widget widget-balances"><h4>Balances</h4><ul class="fa-ul"><li class="currency-xrp"><i class="fa-li"></i><h5>XRP</h5><div ng-show="account.Balance">{{ account.Balance | rpamount }}</div><div ng-hide="account.Balance">0.00</div></li><li ng-repeat="entry in balances" ng-class="\'currency-\' + (entry.total | rpcurrency | lowercase)"><i ng-class="\'fa-\' + (entry.total | rpcurrency | lowercase)" class="fa-li fa-money"></i><h5>{{ entry.total | rpcurrency }}</h5><div>{{ entry.total | rpamount }}</div><dl ng-repeat="(issuer, component) in entry.components"><dt ng-show="component.gateway.app">{{rp-currency}}.{{component.gateway.app.name}}</dt><dt ng-hide="component.gateway.app" rp-pretty-identity="issuer" rp-pretty-issuer-contacts="userBlob.data.contacts"></dt><dd>{{ component | rpamount }}</dd></dl></li></ul></div></div><div class="col-xs-12 col-sm-8 col-md-8 col-lg-9"><form id="sendForm" name="sendForm" role="form" ng-show="mode==&quot;form&quot; &amp;&amp; account.Balance" ng-submit="send_prepared()" class="row-padding-small mode-form"><div ng-if="\'web\' === client" class="row form-group"><div class="col-xs-12 col-sm-8 col-md-6"><label for="send_destination">相手先</label><input id="send_destination" name="send_destination" type="text" rp-combobox="recipient_query" rp-combobox-value-as-ripple-name="rp-combobox-value-as-ripple-name" placeholder="Enter a Ripple name or contact" ng-model="send.recipient" rp-dest="rp-dest" rp-dest-address="rp-dest-address" rp-dest-contact="rp-dest-contact" rp-dest-bitcoin="rp-dest-bitcoin" rp-dest-email="rp-dest-email" rp-dest-ripple-name="rp-dest-ripple-name" rp-dest-loading="recipient_loading" required="required" rp-autofill="$routeParams.to" rp-focus="rp-focus" rp-spinner="{{recipient_loading ? 4 : null}}" class="form-control"/><div rp-errors="send_destination" class="errorGroup"><div rp-error-valid ng-show="send.recipient != send.recipient_address" class="success">{{send.recipient_address}}</div><div rp-error-on="required" class="error">相手先を入力してください。</div><div rp-error-on="rpDest" class="error">受取人は Ripple 名、相手先、または Ripple か ビットコインアドレスでなければなりません。</div><div rp-error-on="federation" class="error">このメールアドレスは、Ripple に対応していません。</div></div></div></div><div ng-if="\'desktop\' === client" class="row form-group"><div class="col-xs-12 col-sm-6 col-md-5"><label for="send_destination">相手先</label><input id="send_destination" name="send_destination" type="text" rp-combobox="recipient_query" rp-combobox-value-as-ripple-name="rp-combobox-value-as-ripple-name" placeholder="Enter a Ripple address or contact" ng-model="send.recipient" rp-dest="rp-dest" rp-dest-address="rp-dest-address" rp-dest-contact="rp-dest-contact" rp-dest-bitcoin="rp-dest-bitcoin" rp-dest-email="rp-dest-email" rp-dest-ripple-name="rp-dest-ripple-name" rp-dest-loading="recipient_loading" required="required" rp-autofill="$routeParams.to" rp-focus="rp-focus" rp-spinner="{{recipient_loading ? 4 : null}}" class="form-control"/><div rp-errors="send_destination" class="errorGroup"><div rp-error-valid ng-show="send.recipient != send.recipient_address" class="success">{{send.recipient_address}}</div><div rp-error-on="required" class="error">相手先を入力してください。</div><div rp-error-on="rpDest" class="error">受取人は相手先、または Ripple かビットコインアドレスでなければなりません。</div><div rp-error-on="federation" class="error">このメールアドレスは、Ripple に対応していません。</div></div></div></div><ul class="tagsLinks"><li><a href="" ng-click="send.show_dt_field = true" ng-hide="send.show_dt_field || send.bitcoin || send.federation">宛先タグを見る</a></li></ul><div ng-show="send.show_dt_field" class="row form-group"><div class="col-xs-12 col-sm-8 col-md-6"><label for="send_dt">宛先タグ</label><a href="" ng-click="send.show_dt_field = false">隠す</a><input id="send_dt" name="send_dt" type="text" ng-model="send.dt" rp-stdt="rp-stdt" rp-autofill="$routeParams.dt" ng-required="send.recipient_info.dest_tag_required" class="form-control"/><div rp-errors="send_dt" class="errorGroup"><div rp-error-on="rpStdt" class="error">無効な宛先タグ</div><div rp-error-on="required" class="error">宛先は空欄にできません</div></div><div ng-show="send.recipient_info.dest_tag_required">受取人は、処理するために宛先タグが指定される必要があります。\n宛先タグを知らない場合は、取引を行う前に受取人と連絡をとってください。</div></div></div><div ng-show="$routeParams.st || send.st" class="row form-group"><div class="col-xs-12 col-sm-6 col-md-5"><label for="send_st">ソースタグ</label><input id="send_st" name="send_st" type="text" ng-model="send.st" rp-stdt="rp-stdt" rp-autofill="$routeParams.st" class="form-control"/><div rp-errors="send_st" class="errorGroup"><div rp-error-on="rpStdt" class="error">無効のソースタグ</div></div></div></div><div ng-repeat="field in send.extra_fields" ng-switch="field.type" class="row form-group"><div ng-switch-when="text" class="col-xs-12 col-sm-6 col-md-5"><label ng-bind="field.label"></label><p ng-show="field.hint" ng-bind="field.hint" class="field-hint"></p><input type="text" ng-model="field.value" ng-required="{{field.required}}" class="form-control"/></div><div ng-switch-when="select" class="col-xs-12 col-sm-6 col-md-5"><label ng-bind="field.label"></label><p ng-show="field.hint" ng-bind="field.hint" class="field-hint"></p><select type="text" ng-model="field.value" ng-required="{{field.required}}" class="form-control"><option ng-repeat="option in field.options" ng-bind="option.label" value="{{option.value}}" ng-selected="option.selected" ng-disabled="option.disabled"></option></select></div></div><div ng-show="send.currency_choices.length" class="form-group"><label for="send_amount">相手先が受け取る金額</label><div ng-if="!send.currency_force" class="row amount"><div class="col-xs-3 col-sm-2 col-md-2"><input id="send_amount" name="send_amount" type="text" ng-model="send.amount" required="required" rp-autofill="$routeParams.amount" rp-autofill-amount="rp-autofill-amount" rp-amount="rp-amount" rp-amount-positive="rp-amount-positive" rp-amount-xrp-limit="rp-amount-xrp-limit" rp-amount-xrp-limit-currency="{{send.currency}}" class="form-control"/></div><div class="col-xs-9 col-sm-6 col-md-4"><input id="send_amount_currency" name="send_amount_currency" type="text" rp-combobox="{{send.currency_choices}}" rp-combobox-select="rp-combobox-select" ng-model="send.currency" rp-autofill="$routeParams.amount" rp-autofill-currency="rp-autofill-currency" rp-autofill-currency-fullname="rp-autofill-currency-fullname" rp-restrict-currencies="{{send.restrict_currencies}}" class="form-control currency"/></div></div><div ng-if="send.currency_force" class="row"><div class="col-xs-12 col-sm-6 col-md-3 input-group currency_force"><input id="send_amount" name="send_amount" type="text" ng-model="send.amount" required="required" ng-disabled="!!send.force_amount" rp-autofill="$routeParams.amount" rp-autofill-amount="rp-autofill-amount" rp-amount="rp-amount" rp-amount-positive="rp-amount-positive" rp-amount-xrp-limit="rp-amount-xrp-limit" rp-amount-xrp-limit-currency="{{send.currency}}" class="form-control"/><span ng-bind="send.currency_force" class="input-group-addon"></span></div></div><div rp-errors="send_amount_currency" class="errorGroup"><div rp-error-on="rpRestrictCurrencies" class="error">{{send.recipient | rpcontactname}} はこの通貨を受け取ることができません。</div></div><div rp-errors="send_amount" class="errorGroup"><div rp-error-on="required" class="error">金額を入力してください。</div><div rp-error-on="rpAmount" class="error">無効な金額です。</div><div rp-error-on="rpAmountPositive" class="error">金額はゼロより大きくなければなりません。</div><div rp-error-on="rpMaxAmount" class="error">この取引は、あなたの残高を超えています。最大 {{account.max_spend | rpamount:{rel_precision: 0} }} XRPを送金できます。</div><div ng-show="send.recipient_info.disallow_xrp &amp;&amp; send.currency_code==\'XRP\'" class="error">相手先は、XRP での支払いを許可していません。XRP を送金してもよろしいですか？</div><div ng-show="send.trust_limit" class="notice">{{send.recipient | rpcontactname}} は、{{send.trust_limit | rpamount}} {{send.trust_limit | rpcurrency}} のため、あなたに信用を与えています。</div></div></div><div class="row"><div ng-show="send.currency_code == \'XRP\'" class="col-xs-12 col-sm-6 col-md-4"><button id="sendXrpButton" type="submit" ng-disabled="sendForm.$invalid || send.self || !send.recipient_resolved || account.max_spend.to_number() &lt; send.amount * 1000000" class="btn btn-block btn-success submit">XRPを送金する</button></div></div><div class="remote"><p ng-show="send.fund_status == \'insufficient-xrp\'" class="literal">送金先アカウントには資金がありません。資金を提供するには、最低 {{send.xrp_deficiency | rpamount}} XRPを送金してください。<a href="https://ripple.com/wiki/Reserves" target="_blank">詳細</a></p><p ng-show="send.path_status == \'checking\'" rp-spinner="4" class="literal">チェック中</p><p ng-show="send.path_status == \'fed-check\'" rp-spinner="4" class="literal">アドレスを検証中</p><p ng-show="send.path_status == \'account-currencies\'" rp-spinner="4" class="literal">受け取った通貨を読み込んでいます</p><p ng-show="send.path_status == \'bridge-quote\'" rp-spinner="4" class="literal">引用符を要求中</p><p ng-show="send.path_status == \'pending\' &amp;&amp; send.currency_code != \'XRP\'" rp-spinner="4" class="literal">経路を検索中</p><p ng-show="send.path_status == \'pending\' &amp;&amp; send.currency_code == \'XRP\'" rp-spinner="4" class="literal">代案を計算中</p><p ng-show="send.path_status == \'no-path\' &amp;&amp; send.currency_code != \'XRP\'" class="literal">{{send.amount}} {{send.currency}} を {{send.recipient}} へ送金できません。アカウントの残高が不足しているか、{{send.recipient}} は {{send.currency}} を受け付けていません。</p><p ng-show="send.path_status == \'no-path\' &amp;&amp; send.currency_code == \'XRP\' &amp;&amp; send.sender_insufficient_xrp" class="literal">{{send.amount}} {{send.currency}} を {{send.recipient}} へ送金できません。アカウントの残高が不足しています。</p><p ng-show="send.path_status == \'error-no-currency\'" class="literal">この宛先に対する有効な通貨の選択肢がありません。</p><p ng-show="send.path_status == \'error-quote\'" class="literal">送金の引用符を取得する際にエラーが発生しました。<span ng-show="send.quote_error"> The outbound bridge reported: "{{send.quote_error | rpheavynormalize}}"</span></p><p ng-show="send.path_status == \'error\'" class="literal">経路計算中にエラーが発生しました</p><div ng-if="send.path_status == \'done\'" class="currency_sets"><div class="row row-padding-small"><div class="col-xs-12"><p ng-show="send.currency_code != \'XRP\' || send.bitcoin" class="literal">以下の金額を送金する</p><p ng-show="send.currency_code == \'XRP\' &amp;&amp; !send.bitcoin" class="literal">もしくは、以下の金額を送金する</p></div></div><div ng-show="send.alternatives.length" class="row row-padding-small alternatives"><div ng-repeat="alt in send.alternatives" class="col-xs-12 col-sm-6 col-md-4 col-lg-4"><div class="margin"><div class="am"><span class="amnt">{{alt.amount | rpamount:{rel_precision: 4, rel_min_precision: 2} }}</span><span ng-hide="alt.amount.is_native() || alt.amount.issuer().to_json() == account.Account"><span rp-pretty-issuer="alt.amount.issuer().to_json()" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></span></span><span class="currency"> {{alt.amount | rpcurrency }}</span><div class="ex">(<span class="rate">{{alt.rate | rpamount:{rel_precision: 4, rel_min_precision: 2 } }}</span><span class="pair">{{send.currency_code}}/{{alt.amount | rpcurrency}}</span>)</div></div><button type="submit" ng-disabled="sendForm.$invalid" ng-click="send.alt = alt" class="btn btn-block btn-success">{{ alt.amount | rpcurrency }} <span ng-hide="alt.amount.is_native() || alt.amount.issuer().to_json() == account.Account"> (<span rp-pretty-issuer="alt.amount.issuer().to_json()" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></span>)</span> を送金する</button></div></div></div><div ng-show="send.alternatives.length &amp;&amp; lastUpdate" class="row row-padding-small pathupdate"><div class="col-xs-12"><span> {{lastUpdate}}</span> <span ng-show="lastUpdate &gt; \'1\'" l10n-inc="l10n-inc"> seconds</span> <span ng-show="lastUpdate == \'1\'" l10n-inc="l10n-inc"> second</span> 前に経路が更新されました</div></div></div></div></form><group ng-show="mode==&quot;wait_path&quot; &amp;&amp; account.Balance" class="mode-wait-path"><p rp-spinner="4" class="literal">支払いの経路を計算しています。</p></group><group ng-show="mode==&quot;confirm&quot; &amp;&amp; account.Balance" class="mode-confirm"><p class="literal"><span> {{ (send.alt.amount || send.currency) | rpcurrency}}</span> の受取人</p><div class="dest_feedback"><div ng-show="send.recipient_name" class="recipient">{{send.recipient_name}}</div><div ng-hide="send.recipient_name" class="recipient">{{send.recipient_address}}</div><div href="" ng-show="send.recipient != send.recipient_address || send.recipient_name" class="extra"> {{send.recipient_address}}</div><div ng-show="send.dt" class="dt">宛先タグ: {{send.dt}}</div></div><p class="literal">相手先が受信する金額</p><p rp-pretty-amount="send.amount_feedback" class="amount_feedback"></p><group ng-show="send.indirect"><p class="literal">あなたの最大支払金額</p><p class="sendmax_feedback"><span class="value">{{send.alt.amount | rpamount}}&#32;</span><span class="currency">{{send.alt.amount | rpcurrency}} &#32;</span><span>&plusmn; 1%</span></p></group><form ng-submit="send_confirmed()" class="call-to-action"><p ng-show="send.secret" class="literal">続けてもよろしいですか？</p><p ng-hide="send.secret" class="literal">取引を確認するには、パスワードを入力してください。</p><div ng-if="!send.secret" class="row row-padding-small"><div class="col-xs-12 col-sm-8 col-md-6"><input id="send_unlock_password" name="send_unlock_password" type="password" required="required" ng-model="send.unlock_password" class="form-control"/></div></div><div class="row row-padding-small"><div class="col-xs-8 col-sm-4 col-md-3 col-lg-3"><button id="confirmButton" type="submit" ng-disabled="confirm_wait" class="btn btn-block btn-success submit">確認</button></div><div class="col-xs-6 col-sm-4 col-md-3 col-lg-2"><button type="button" ng-click="cancelConfirm()" class="btn btn-link back">キャンセル</button></div></div></form></group><group ng-show="mode==&quot;sending&quot; &amp;&amp; account.Balance" class="mode-sending"><!-- Waiting message for the send and convert tabs--><p rp-spinner="4" class="literal">取引情報をRipple Networkに送信する。</p><hr/></group><group ng-show="mode==&quot;error&quot; &amp;&amp; account.Balance" class="mode-error"><!-- Error messages for the send and convert tabs--><group ng-switch on="error_type"><group ng-switch-when="noDest" class="result-error"><h2 class="tx-status">取引は失敗しました。</h2><p>エラーコード： あなたが送ろうとしている口座が存在しません [noDest]</p></group><group ng-switch-when="noPath" class="result-error"><h2 class="tx-status">取引は失敗しました。</h2><p>エラーコード： リップルは、あなたと宛先アカウントの間で経路を見つけることができませんでした[noPath]</p></group><group ng-switch-when="maxFeeExceeded" class="result-error"><h2 class="tx-status">取引は失敗しました。</h2><p>エラーコード:最大のネットワークフィーを超過したので、この取引処理は失敗しました。[maxfeeExceeded]</p></group><group ng-switch-when="invalidTransaction" class="result-error"><h2 class="tx-status">取引は失敗しました。</h2><p>エラーコードは：トランザクションはリップルネットワークによって拒否されました[invalidTransaction]</p></group><group ng-switch-when="unlockFailed" class="result-error"><h2 class="tx-status">アカウントのアンロックに失敗しました。</h2><p>アカウントをアンロックできませんでした。しばらく待ってから再実行してください。</p></group><group ng-switch-default="ng-switch-default"><p class="literal">申し訳ありません。送信中にエラーが発生しました。インターネットの接続を確認し、しばらく待ってから再実行してください。</p><p class="literal">再実行する前に、取引処理が既に実行されていないかを確認してください。</p></group></group><p><button ng-click="cancelConfirm()" class="btn btn-link btn-default">キャンセル</button></p></group><group ng-show="mode==&quot;rippleerror&quot; &amp;&amp; account.Balance" class="mode-ripplerror"><rp-transaction-status rp-engine-result="{{engine_result}}" rp-engine-result-message="{{engine_result_message}}" rp-accepted="{{engine_status_accepted}}"></rp-transaction-status><group class="actions"><hr/><div ng-show="addressSaved" class="text-success actionLink">相手先を保存しました！</div><div ng-hide="contact" class="save-address-form actionLink"><a href="" ng-click="show_save_address_form = true">相手先にこのアドレスを追加</a><form name="saveAddressForm" ng-class="{ show: show_save_address_form }" ng-submit="saveAddress()"><div class="address">{{send.recipient_address}}</div><label for="save_address_name">このユーザーに名を付ける</label><input id="contact_name" name="save_address_name" type="text" ng-model="saveAddressName" unique="unique" required="required" rp-autofill="$routeParams.name" class="form-control"/><div ng-show="saveAddressForm.save_address_name.$error.unique" class="error">既に同じ名前の相手先がいます。</div><div><button type="submit" ng-disabled="addressSaving" class="btn btn-success"><span ng-show="addressSaving">保存中...</span><span ng-hide="addressSaving">保存</span></button><a href="" ng-click="show_save_address_form = false">キャンセル</a></div><hr/></form></div><div class="actionLink"><a href="" ng-click="reset()">別の支払いを送金</a></div><div class="actionLink"><a href="" ng-click="reset_goto(\'balance\')">残高に戻る</a></div><hr/></group></group><group ng-show="mode==&quot;status&quot; &amp;&amp; account.Balance" class="mode-status"><!-- Confirmation messages for the send and convert tabs--><group ng-show="tx_result==&quot;pending&quot;" class="pending"><h2 class="tx-status">保留中の取引</h2></group><group ng-show="tx_result==&quot;cleared&quot;" class="result-success"><h2 class="tx-status">取引は成功しました。</h2></group><group ng-show="tx_result==&quot;error&quot;" class="result-error"><h2 class="tx-status">取引は失敗しました。</h2><p>後で再実行してください。</p></group><group ng-show="tx_result==&quot;malformed&quot;" class="result-malformed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-default="ng-switch-default">エラーコード: {{engine_result}} - {{engine_result_message}}</span></p></group><group ng-show="tx_result==&quot;failure&quot;" class="result-malformed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="tefDST_TAG_NEEDED">エラーコード:相手先が必要です[tefDST_TAG_NEEDED]</span></p></group><group ng-show="tx_result==&quot;claim&quot;" class="result-malformed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="tecNO_DST">エラーコード： 宛先アカウントが、存在しません [tecNO_DST]</span><span ng-switch-when="tecNO_DST_INSUF_XRP">エラーコード: 宛先に送金するために必要なXRPが不足しています [tecNO_DST_INSUF_XRP]。</span><span ng-switch-default="ng-switch-default">エラー:{{engine_result_message}}</span></p></group><group ng-show="tx_result==&quot;failed&quot;" class="result-failed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="terNO_LINE">エラーコード:あなたはこの通貨にトラストラインを持っていません [terNO_LINE]</span><span ng-switch-default="ng-switch-default">取引処理は失敗しました: {{engine_result_message}}</span></p></group><group ng-show="tx_result==&quot;local&quot;" class="result-failed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="telINSUF_FEE_P">エラーコード: ネットワーク手数料の最大値を超過しているため、このトランザクションは失敗しました。後ほど再度お試しください[telINSUF_FEE_P]。</span></p></group><group class="actions"><hr/><div ng-show="addressSaved" class="text-success actionLink">相手先を保存しました！</div><div ng-hide="contact" class="save-address-form actionLink"><a href="" ng-click="show_save_address_form = true">相手先にこのアドレスを追加</a><form name="saveAddressForm" ng-class="{ show: show_save_address_form }" ng-submit="saveAddress()"><div class="address">{{send.recipient_address}}</div><label for="save_address_name">このユーザーに名を付ける</label><input id="contact_name" name="save_address_name" type="text" ng-model="saveAddressName" unique="unique" required="required" rp-autofill="$routeParams.name" class="form-control"/><div ng-show="saveAddressForm.save_address_name.$error.unique" class="error">既に同じ名前の相手先がいます。</div><div class="row add-contact-btns-wrapper"><div class="col-md-3 col-sm-4 col-xs-8"><button type="submit" ng-disabled="addressSaving || saveAddressForm.$invalid" class="btn btn-success btn-block"><span ng-show="addressSaving">保存中...</span><span ng-hide="addressSaving">保存</span></button></div><div class="col-md-1 col-sm-2 col-xs-4"><a href="" ng-click="show_save_address_form = false" class="btn btn-block">キャンセル</a></div></div><hr/></form></div><div class="actionLink"><a href="" ng-click="reset()">別の支払いを送金</a></div><div class="actionLink"><a href="" ng-click="reset_goto(\'balance\')">残高に戻る</a></div><hr/></group></group></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="TradeCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><group ng-hide="!connected || loadState.offers" class="disconnected"><p class="literal">オーダーブックをロード中...</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><div ng-show="connected" class="row"><div class="widgets hidden-xs col-sm-4 col-md-4 col-lg-3"><div class="widget widget-balances"><h4>Balances</h4><ul class="fa-ul"><li class="currency-xrp"><i class="fa-li"></i><h5>XRP</h5><div ng-show="account.Balance">{{ account.Balance | rpamount }}</div><div ng-hide="account.Balance">0.00</div></li><li ng-repeat="entry in balances" ng-class="\'currency-\' + (entry.total | rpcurrency | lowercase)"><i ng-class="\'fa-\' + (entry.total | rpcurrency | lowercase)" class="fa-li fa-money"></i><h5>{{ entry.total | rpcurrency }}</h5><div>{{ entry.total | rpamount }}</div><dl ng-repeat="(issuer, component) in entry.components"><dt ng-show="component.gateway.app">{{rp-currency}}.{{component.gateway.app.name}}</dt><dt ng-hide="component.gateway.app" rp-pretty-identity="issuer" rp-pretty-issuer-contacts="userBlob.data.contacts"></dt><dd>{{ component | rpamount }}</dd></dl></li></ul></div></div><div class="col-xs-12 col-sm-8 col-md-8 col-lg-9"><group ng-show="loadState.offers"><div class="settings"><div class="row"><div class="col-sm-4 col-md-4 col-xs-9 currency-config"><input id="currency_pair" name="currency_pair" type="text" rp-combobox="pairs_query" rp-combobox-select="rp-combobox-select" ng-model="order.currency_pair" class="form-control currency"/></div><div class="col-sm-2 col-md-2 col-xs-3 currency-flip"><button href="" ng-disabled="order.valid_settings != true" ng-click="flip_issuer()" class="btn btn-default btn-block btn-link">反転</button></div><div class="col-sm-6 col-md-6 col-xs-12 issuers-wrapper"><ul ng-hide="order.first_currency.is_native()" class="issuers inline"><li class="label">基準通貨</li><li class="value">{{order.first_currency | rpcurrency}}&ensp;<span rp-pretty-issuer="order.first_issuer" rp-pretty-issuer-contacts="userBlob.data.contacts">???</span></li><li><a href="" ng-show="show_issuer_form != &quot;first&quot;" ng-click="edit_first_issuer()">ゲートウェイを変更</a></li><li><a href="" ng-show="show_issuer_form == &quot;first&quot;" ng-click="show_issuer_form = false">キャンセル</a></li></ul><ul ng-show="order.first_currency.is_native()" class="issuers inline"><li class="label">基準通貨</li><li class="value">XRP</li></ul><ul ng-hide="order.second_currency.is_native()" class="issuers inline"><li class="label">決済通貨</li><li class="value">{{order.second_currency | rpcurrency}}&ensp;<span rp-pretty-issuer="order.second_issuer" rp-pretty-issuer-contacts="userBlob.data.contacts">???</span></li><li><a href="" ng-show="show_issuer_form != &quot;second&quot;" ng-click="edit_second_issuer()">ゲートウェイを変更</a></li><li><a href="" ng-show="show_issuer_form == &quot;second&quot;" ng-click="show_issuer_form = false">キャンセル</a></li></ul><ul ng-show="order.second_currency.is_native()" class="issuers inline"><li class="label">決済通貨</li><li class="value">XRP</li></ul></div></div></div><form name="first_issuer_form" ng-show="show_issuer_form == &quot;first&quot;" class="issuerSelector first-issuer"><label for="first_issuer">基準通貨発行者 ({{order.first_currency}})</label><div class="row"><div class="col-xs-12 col-sm-8 col-md-5"><input id="first_issuer" name="first_issuer" type="text" rp-combobox="issuer_query" rp-combobox-value-as-ripple-name="rp-combobox-value-as-ripple-name" placeholder="Ripple name or contact" ng-model="order.first_issuer_edit_name" rp-dest="rp-dest" rp-dest-address="rp-dest-address" rp-dest-contact="rp-dest-contact" rp-dest-ripple-name="rp-dest-ripple-name" rp-dest-model="order.first_issuer_edit" class="form-control"/><div rp-errors="first_issuer" class="errorGroup"><div rp-error-on="rpDest" class="error">無効な Ripple アドレスもしくは相手先です。</div></div></div><div class="col-xs-12 col-sm-4 col-md-2"><button type="submit" ng-click="save_first_issuer()" ng-disabled="first_issuer_form.$invalid" class="btn btn-block btn-success submit">確認</button></div></div></form><form name="second_issuer_form" ng-show="show_issuer_form == &quot;second&quot;" class="issuerSelector second-issuer"><label for="second_issuer">決済通貨発行者 ({{order.second_currency}})</label><div class="row"><div class="col-xs-9 col-sm-4 col-md-4"><input id="second_issuer" name="second_issuer" type="text" rp-combobox="issuer_query" rp-combobox-value-as-ripple-name="rp-combobox-value-as-ripple-name" placeholder="Contact name or Ripple address" ng-model="order.second_issuer_edit_name" rp-dest="rp-dest" rp-dest-address="rp-dest-address" rp-dest-contact="rp-dest-contact" rp-dest-ripple-name="rp-dest-ripple-name" rp-dest-model="order.second_issuer_edit" class="form-control"/><div rp-errors="second_issuer" class="errorGroup"><div rp-error-on="rpDest" class="error">有効なRipple名やアドレスではありません</div></div></div><div class="col-xs-3 col-sm-2 col-md-2"><button type="submit" ng-click="save_second_issuer()" ng-disabled="second_issuer_form.$invalid" class="btn btn-block btn-success submit">確認</button></div></div></form><div ng-hide="order.valid_settings" class="message-select-issuer">トレードを行う通貨のゲートウェイを選択する必要があります。上の「ゲートウェイを変更する」リンクをクリックし、ゲートウェイのアドレスもしくは Ripple 名を入力してください。 <a href="https://support.ripplelabs.com/hc/en-us/articles/202847686-Gateway-Information" target="_blank" l10n-inc="l10n-inc">ゲートウェイを探す</a></div><group ng-if="order.valid_settings"><ul class="ticker"><div class="row"><li class="col-xs-6 col-sm-3"><span>買う</span><span>&#32&#61;&#32;</span><span class="value">{{book.bids[0].TakerGets | rpamountratio:book.bids[0].TakerPays | rpamount:{rel_precision: 5, rel_min_precision: 5} }}</span></li><li class="col-xs-6 col-sm-3"><span>買値</span><span>&#32&#61;&#32;</span><span class="value">{{book.asks[0].TakerPays | rpamountratio:book.asks[0].TakerGets | rpamount:{rel_precision: 5, rel_min_precision: 5} }}</span></li><li class="col-xs-6 col-sm-3"><span>スプレッド</span><span>&#32&#61;&#32;</span><span class="value">{{book.asks[0].TakerPays | rpamountratio:book.asks[0].TakerGets | rpamountsubtract:(book.bids[0].TakerGets | rpamountratio:book.bids[0].TakerPays) | rpamount:{rel_precision: 5, rel_min_precision: 5} }}</span></li><li class="col-xs-6 col-sm-3"><span>現在の価格</span><span>&#32&#61;&#32;</span><span class="value">{{book.last_price | rpamount:{rel_precision: 5, rel_min_precision: 5} }}</span></li></div></ul><div ng-hide="account.Balance" class="unfunded"><p class="literal">取引する前に資金を供給する必要があります。</p></div><group ng-show="account.Balance" class="row send-widgets"><div ng-repeat="type in [\'buy\',\'sell\']" class="col-xs-12 col-sm-6"><div ng-switch="order[type].mode" class="trade-widget"><div class="head"><span ng-show="type == \'buy\'"><span ng-hide="order.first_currency.is_native()" rp-pretty-issuer="order.first_issuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></span> {{order.first_currency | rpcurrency}} を買う</span><span ng-show="type == \'sell\'"><span ng-hide="order.first_currency.is_native()" rp-pretty-issuer="order.first_issuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></span> {{order.first_currency | rpcurrency}} を売る</span><span ng-show="type == \'buy\'" class="available"><span class="amount"><span ng-show="order.second_currency.is_native()">{{account.Balance | rpamount}} XRP</span><span ng-hide="order.second_currency.is_native()">{{lines[order.second_issuer+order.second_currency.to_json()].balance || "0" | rpamount}}&#32;<span rp-pretty-issuer="order.second_issuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short"></span> {{order.second_currency | rpcurrency}}</span></span> available</span><span ng-show="type == \'sell\'" class="available"><span class="amount"><span ng-show="order.first_currency.is_native()">{{account.Balance | rpamount}} XRP</span><span ng-hide="order.first_currency.is_native()">{{lines[order.first_issuer+order.first_currency.to_json()].balance || "0" | rpamount}}&#32;<span rp-pretty-issuer="order.first_issuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short"></span> {{order.first_currency | rpcurrency}}</span></span> available</span></div><div ng-switch-when="trade"><form name="tradeForm" ng-submit="place_order(type)" ng-show="order[type].showWidget" class="mode-form"><div class="row order-values"><div class="col-xs-12"><div class="value-field"><label ng-show="type == \'buy\'">購入金額</label><label ng-show="type == \'sell\'">売却金額</label><div class="input-group"><input name="amount" type="text" ng-model="order[type].first" ng-change="calc_second(type)" rp-amount="rp-amount" rp-amount-positive="rp-amount-positive" rp-amount-xrp-limit="rp-amount-xrp-limit" rp-amount-xrp-limit-currency="{{order.first_currency}}" required="required" class="form-control"/><div class="input-group-addon">{{order.first_currency | rpcurrency}}<div ng-hide="order.first_currency.is_native()" rp-pretty-issuer="order.first_issuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></div></div></div><div rp-errors="amount" class="errorGroup"><div rp-error-on="required" class="error">必須</div><div rp-error-on="rpAmount" class="error">無効な金額です。</div><div rp-error-on="rpAmountPositive" class="error">0より大きな数字を入力してください</div><div rp-error-on="rpAmountXrpLimit" class="error">最小値は 0.000001XRP 、最大値は１千億 XRP です</div></div></div></div><div class="col-xs-12"><div class="value-field"><label>各々の価格</label><div class="input-group"><input name="price" type="text" ng-model="order[type].price" ng-change="calc_second(type)" rp-amount="rp-amount" rp-amount-positive="rp-amount-positive" rp-amount-xrp-limit="rp-amount-xrp-limit" rp-amount-xrp-limit-currency="{{order.second_currency}}" required="required" class="form-control"/><div class="input-group-addon">{{order.second_currency | rpcurrency}}<div ng-hide="order.second_currency.is_native()" rp-pretty-issuer="order.second_issuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></div></div></div><div rp-errors="price" class="errorGroup"><div rp-error-on="required" class="error">必須</div><div rp-error-on="rpAmount" class="error">無効な金額です。</div><div rp-error-on="rpAmountPositive" class="error">0より大きな数字を入力してください</div><div rp-error-on="rpAmountXrpLimit" class="error">最小値は 0.000001XRP 、最大値は１千億 XRP です</div></div></div></div><div class="col-xs-12"><div class="value-field"><label>注文価格（最大）</label><div class="input-group"><input name="value" type="text" ng-model="order[type].second" ng-change="calc_first(type)" rp-amount="rp-amount" rp-amount-positive="rp-amount-positive" rp-amount-xrp-limit="rp-amount-xrp-limit" rp-amount-xrp-limit-currency="{{order.second_currency}}" required="required" class="form-control"/><div class="input-group-addon">{{order.second_currency | rpcurrency}}<div ng-hide="order.second_currency.is_native()" rp-pretty-issuer="order.second_issuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></div></div></div><div rp-errors="value" class="errorGroup"><div rp-error-on="required" class="error">必須</div><div rp-error-on="rpAmount" class="error">無効な金額です。</div><div rp-error-on="rpAmountPositive" class="error">0より大きな数字を入力してください</div><div rp-error-on="rpAmountXrpLimit" class="error">最小値は 0.000001XRP 、最大値は１千億 XRP です</div></div></div></div></div><div class="message"><p ng-show="tradeForm.$valid &amp;&amp; type == \'buy\'">あなたは <span> {{order[type].second_amount | rpamount:{precision: 10} }} {{order[type].second_amount | rpcurrency}}</span> を <span> {{order[type].first_amount | rpamount:{precision: 10} }} {{order[type].first_amount | rpcurrency}}</span> で買うのを待っています(<span> {{order[type].first_amount | rpcurrency}}</span>あたり<span>{{order[type].price_amount | rpamount:{precision: 10} }} {{order[type].second_amount | rpcurrency}}</span>)</p><p ng-show="tradeForm.$valid &amp;&amp; type == \'sell\'">あなたは <span> {{order[type].second_amount | rpamount:{precision: 10} }} {{order[type].second_amount | rpcurrency}}</span> を <span> {{order[type].first_amount | rpamount:{precision: 10} }} {{order[type].first_amount | rpcurrency}}</span> で売るのを待っています(<span> {{order[type].first_amount | rpcurrency}}</span>あたり<span>{{order[type].price_amount | rpamount:{precision: 10} }} {{order[type].second_amount | rpcurrency}}</span>)</p></div><div class="row btns-row"><div class="col-xs-12 col-md-6 col-sm-8 btns-wrapper"><button type="submit" ng-disabled="tradeForm.$invalid" class="btn btn-success btn-block submit"><span ng-show="type == \'buy\'">買う</span><span ng-show="type == \'sell\'">売る</span> {{order.first_currency | rpcurrency}}<span ng-hide="order.first_currency.is_native()"> (<span rp-pretty-issuer="order.first_issuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></span>)</span></button></div></div></form><div ng-hide="order[type].showWidget"><p class="literal">注文するのに十分な資金がありません。</p></div></div><form ng-switch-when="confirm" ng-submit="order_confirmed(type)" class="mode-confirm"><p class="title literal"><span>You are about to create an order to<span ng-show="type == \'buy\'" l10n-inc="l10n-inc"> buy</span><span ng-show="type == \'sell\'" l10n-inc="l10n-inc"> sell</span><div class="amount_feedback"><span class="value">{{order[type].first_amount | rpamount}}&#32;</span><span ng-show="(order[type].first_amount | rpcurrency) !== \'XRP\'" rp-pretty-issuer="order[type].first_amount | rpissuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></span><span class="currency"> {{order[type].first_amount | rpcurrency}}</span></div><div l10n-inc="l10n-inc" class="literal">for</div><div class="dest_feedback"><span class="value">{{order[type].second_amount | rpamount}}&#32;</span><span ng-show="(order[type].second_amount | rpcurrency) !== \'XRP\'" rp-pretty-issuer="order[type].second_amount | rpissuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></span><span class="currency"> {{order[type].second_amount | rpcurrency}}</span></div><div class="rate_feedback">(<span class="rate">{{order[type].price}}</span><span class="pair">{{order[type].first_amount | rpcurrency}}/{{order[type].second_amount | rpcurrency}}</span>)</div><p l10n-inc="l10n-inc" class="literal">Are you sure?</p><p ng-show="fatFingerErr" class="order-warning">警告: あなたの注文は現在の市場価格から大きく乖離しています。</p></span><div class="row row-padding-small"><div class="col-xs-6 col-sm-offset-2 col-sm-4 col-md-offset-3 col-md-3"><button type="button" ng-click="order[type].mode = \'trade\'" class="btn btn-block btn-default back">戻る</button></div><div class="col-xs-6 col-sm-4 col-md-3"><button type="submit" ng-disabled="confirm_wait" class="btn btn-block btn-success submit">確認</button></div></div></p></form><group ng-switch-when="sending" class="mode-sending"><p class="throbber literal">Ripple Network に注文を送信中...</p></group><group ng-switch-when="done" class="mode-done"><group ng-show="order[type].tx_result==&quot;pending&quot;" class="pending"><h2 class="tx-status">注文は送信されました。</h2></group><group ng-show="\'order[type].tx_result==cleared\' &amp;&amp; executedOnOfferCreate==\'none\'" class="result-success"><h2 class="tx-status">あなたの注文は有効となりました。</h2></group><group ng-show="\'order[type].tx_result==cleared\' &amp;&amp; executedOnOfferCreate==\'all\'" class="result-success"><h2 class="tx-status">Your order has been filled.</h2></group><group ng-show="\'order[type].tx_result==cleared\' &amp;&amp; executedOnOfferCreate==\'partial\'" class="result-success"><h2 class="tx-status">Your order has been partially filled. The remaining amount is now active.</h2></group><group ng-show="order[type].tx_result==&quot;error&quot;" class="result-error"><h2 class="tx-status">要求は拒否されました。</h2><p>リクエストは送信できませんでした。しばらく待ってから再実行してください。</p></group><group ng-show="order[type].tx_result==&quot;malformed&quot;" class="result-malformed"><h2 class="tx-status">要求は不正です。</h2><p>この要求は無効です。理由: {{order[type].engine_result}} - {{order[type].engine_result_message}}</p></group><group ng-show="order[type].tx_result==&quot;claim&quot;" class="result-malformed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="order[type].engine_result"><span ng-switch-when="tecUNFUNDED_ORDER">この注文をするのに十分な {{(type == \'buy\' ? order.second_currency : order.first_currency) | rpcurrency}}  を持っていません。</span><span ng-switch-when="tecINSUF_RESERVE_OFFER">注文するのに最低 {{account.reserve_to_add_trust | rpamount}} XRP を所有しなければなりません。 <a href="https://ripple.com/wiki/Reserves" target="_blank">詳細</a></span><span ng-switch-default="ng-switch-default">エラー: {{order[type].engine_result_message}}</span></p></group><group ng-show="order[type].tx_result==&quot;failed&quot;" class="result-failed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="order[type].engine_result"><span ng-switch-default="ng-switch-default">取引に失敗しました。理由: {{order[type].engine_result_message}}</span></p></group><group ng-show="order[type].tx_result==&quot;local&quot;" class="result-failed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="order[type].engine_result"><span ng-switch-when="telINSUF_FEE_P">取引処理を送信したサーバーが混雑していたため、処理することができませんでした。</span></p></group><group ng-show="order[type].tx_result==&quot;unknown&quot;" class="result-failed"><h2 class="tx-status">{{order[type].engine_result}}</h2><p ng-switch on="order[type].engine_result"><span ng-switch-default="ng-switch-default">{{order[type].engine_result_message}}</span></p></group><hr/><div class="actionLink"><a href="#trade" ng-click="reset_widget(type)">別の注文を送信</a></div></group></div></div></group><h3>私の注文<span>&#32;({{offersCount}})</span><small ng-hide="isEmpty(offers)" ng-click="hideOffers = !hideOffers" class="toggle">{{hideOffers ? "show" : "hide"}}</small></h3><div ng-class="{show : !hideOffers}" class="listings offers"><div class="my"><div ng-hide="isEmpty(offers)"><div class="row head hidden-xs"><div class="col-sm-1 type">タイプ</div><div class="col-sm-4">通貨 <span l10n-inc="l10n-inc" class="issuer"> (発行者)</span></div><div class="col-sm-2 price">価格</div><div class="col-sm-3 amount">金額</div><div class="col-sm-2 action">アクション</div></div></div><div ng-repeat="entry in offers" ng-class="{cancelling: cancelling}" class="row"><div data-label="Type" class="col-sm-1 type">{{entry.type | rpucfirst}}</div><div data-label="Currencies" class="col-sm-4"><a href="" ng-click="goto_order_currency()"><span>{{entry.first | rpcurrency}}</span><span ng-show="entry.first.issuer().to_json()" class="issuer">&nbsp;(<span rp-pretty-issuer="entry.first.issuer().to_json()" rp-pretty-issuer-contacts="userBlob.data.contacts">???</span>)</span><span ng-show="\'buy\' == entry.type">で</span><span ng-show="\'sell\' == entry.type">で</span><span> {{entry.second | rpcurrency}}</span><span ng-show="entry.second.issuer().to_json()" class="issuer">&nbsp;(<span rp-pretty-issuer="entry.second.issuer().to_json()" rp-pretty-issuer-contacts="userBlob.data.contacts">???</span>)</span></a></div><div data-label="Price" class="col-sm-2 price rpamount">{{entry.second | rpamountratio:entry.first | rpamount:{precision: 5, min_precision: 5} }}<span class="currency"> {{entry.second | rpcurrency}}</span></div><div data-label="Amount" class="col-sm-3 amount rpamount">{{entry.first | rpamount}}<span class="currency"> {{entry.first | rpcurrency}}</span></div><div rp-spinner="{{cancelling ? 4 : null}}" class="col-sm-2 action"><rp-confirm action-text="Are you sure you want to cancel this order?" action-button-text="Cancel order" action-button-css="btn btn-default btn-danger" action-function="cancel_order()" cancel-button-css="btn btn-default" cancel-button-text="Keep order"><a href="" class="danger">キャンセル</a></rp-confirm></div></div><div ng-show="isEmpty(offers)" class="emptyMessage"><p class="literal">まだ注文をしていません。</p></div></div></div><div ng-show="cancelError" class="alert alert-danger"><span>注文をキャンセルできませんでした。</span><span>エラー: {{cancelError}}</span><a href="" ng-click="dismissCancelError()" class="dismiss">隠す</a></div><h3><span>オーダーブック</span><small ng-click="hideOrderBook = !hideOrderBook" class="toggle"><span ng-show="hideOrderBook">開く</span><span ng-hide="hideOrderBook">隠す</span></small></h3><div ng-hide="hideOrderBook"><div class="listings orders"><div class="row orderbook"><div class="bids col-xs-12 col-sm-6"><div class="title">売値</div><div ng-show="book.bids.length" class="row head"><div class="col-xs-4 sum">合計<div class="currency">{{book.bids[0].TakerPays | rpcurrency}}</div><div ng-show="(book.bids[0].TakerPays | rpcurrency) !== \'XRP\'" rp-pretty-issuer="book.bids[0].TakerPays | rpissuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></div></div><div class="col-xs-4 size">サイズ<div class="currency">{{book.bids[0].TakerPays | rpcurrency}}</div><div ng-show="(book.bids[0].TakerPays | rpcurrency) !== \'XRP\'" rp-pretty-issuer="book.bids[0].TakerPays | rpissuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></div></div><div class="col-xs-4 price">買い値<div class="currency">{{book.bids[0].TakerGets | rpcurrency}}</div><div ng-show="(book.bids[0].TakerGets | rpcurrency) !== \'XRP\'" rp-pretty-issuer="book.bids[0].TakerGets | rpissuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></div></div></div><div ng-repeat="order in book.bids" ng-class="{my: order.my, cancelling: cancelling}" title="{{order.Account}}" class="row"><div class="col-xs-4 rpamount sum"><a href="" ng-click="fill_widget(\'sell\',order,true)"><span rp-bind-color-amount="order.showSum"></span></a></div><div rp-bind-color-amount="order.showTakerPays" class="col-xs-4 rpamount size"></div><div class="col-xs-4 rpamount price"><a href="" ng-click="fill_widget(\'sell\',order)"><span rp-bind-color-amount="order.showPrice"></span></a></div></div><div ng-show="!book.bids.length" class="message">現在、この通貨ペアには入札がありません。</div></div><div class="asks col-xs-12 col-sm-6"><div class="title">買値</div><div ng-show="book.asks.length" class="row head"><div class="col-xs-4 price">売り値 <div class="currency">{{book.asks[0].TakerPays | rpcurrency}}</div><div ng-show="(book.asks[0].TakerPays | rpcurrency) !== \'XRP\'" rp-pretty-issuer="book.asks[0].TakerPays | rpissuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></div></div><div class="col-xs-4 size">サイズ<div class="currency">{{book.asks[0].TakerGets | rpcurrency}}</div><div ng-show="(book.asks[0].TakerGets | rpcurrency) !== \'XRP\'" rp-pretty-issuer="book.asks[0].TakerGets | rpissuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></div></div><div class="col-xs-4 sum">合計<div class="currency">{{book.asks[0].TakerGets | rpcurrency}}</div><div ng-show="(book.asks[0].TakerGets | rpcurrency) !== \'XRP\'" rp-pretty-issuer="book.asks[0].TakerGets | rpissuer" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></div></div></div><div ng-repeat="order in book.asks" ng-class="{my: order.my, cancelling: cancelling}" title="{{order.Account}}" class="row"><div class="col-xs-4 rpamount price"><a href="" ng-click="fill_widget(\'buy\',order)"><span rp-bind-color-amount="order.showPrice"></span></a></div><div rp-bind-color-amount="order.showTakerGets" class="col-xs-4 rpamount size"></div><div class="col-xs-4 rpamount sum"><a href="" ng-click="fill_widget(\'buy\',order,true)"><span rp-bind-color-amount="order.showSum"></span></a></div></div><div ng-show="!book.asks.length" class="message">現在、この通貨ペアの買値はありません。</div></div></div></div><div class="foot"><a ng-show="orderbookState==\'ready\'" href="" ng-click="loadMore()" class="loadmore">もっと読む</a><div ng-show="orderbookState==\'full\'">これ以上注文はありません</div></div></div></group></group></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="SecurityCtrl" class="col-xs-12 content"><div ng-show="connected" class="row"><div ng-hide="isUnlocked" class="col-xs-12"><div class="auth-attention sessionUnlock"><h5>アクティブセッションのタイムアウト</h5><div class="status">あなたのセキュリティ設定を見るか、編集するためには、あなたには現在、アクティブなセッションを持っていなければなりません</div><div class="row"><div class="col-xs-12 col-sm-5"><form ng-submit="restoreSession()"><label for="sessionPassword">パスワード</label><input id="sessionPassword" type="password" name="sessionPassword" ng-model="sessionPassword" rp-focus="rp-focus" class="form-control"/><button type="submit" ng-disabled="isConfirming" rp-spinner="{{isConfirming ? 4 : null}}" class="btn btn-primary btn-block"><span>セッションの復元</span></button></form></div></div></div><div ng-show="unlockError" class="alert alert-danger"><span>パスワードに誤りがあります。</span></div></div><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected" class="col-xs-12"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><div class="col-sm-12 error-wrapper"><div ng-show="error" ng-switch on="error" class="alert alert-danger"><span ng-switch-when="wrongpassword">パスワードに誤りがあります。</span><span ng-switch-when="cantlogin">Ripple パスワードは変更されました。再びログインしてください。</span><span ng-switch-default="ng-switch-default">Rippleパスワードを変更することができませんでした。しばらく待ってから再実行してください。</span></div></div><div class="col-sm-12 notification-wrapper"><div ng-show="loading" class="alert alert-warning">あなたのRippleパスワードを変更しています...</div><div ng-show="success" class="alert alert-success">Ripple パスワードの変更に成功しました。</div><div ng-show="errorLoading2FA" class="alert alert-danger">2段階認証の設定をロードできません。</div><div ng-show="error2FA" class="alert alert-danger">2段階認証の設定保存時のエラー</div><div ng-show="invalidToken" class="alert alert-danger">検証コードは無効です。</div><div ng-show="enableSuccess" class="alert alert-success">２段階認証が正常に有効になりました。</div><div ng-show="disableSuccess" class="alert alert-success">2段階認証が正常に無効になりました。</div></div><div ng-show="isUnlocked" class="col-sm-4 col-md-3 col-xs-12"><div class="settingPage"><a href="#/security" ng-class="{active: $route.current.tabName == \'security\'}">セキュリティー</a><a href="#/advanced" ng-class="{active: $route.current.tabName == \'advanced\'}">詳細</a></div></div><div ng-show="isUnlocked" class="col-sm-8 col-md-9 col-xs-12 list"><div ng-show="settingsPage == \'security\'" class="showSecurity"><div ng-show="\'web\' === client"><h4>セキュリティー設定</h4><div class="section"><div class="descriptor">Two-factor authentication</div><div ng-show="loading2FA" class="row"><div class="col-xs-12 col-sm-9"><div rp-spinner="4">2段階認証の設定を読み込んでいます...</div></div></div><div ng-hide="loading2FA || errorLoading2FA || mode2FA === \'verifyPhone\'" class="row"><div class="col-xs-9 col-sm-8 col-md-6"><span ng-show="enabled2FA">有効</span><span ng-hide="enabled2FA">無効</span></div><div class="col-xs-3 col-sm-4 col-md-6"><a href="" ng-show="enabled2FA" ng-click="disable2FA()">無効化</a><rp-popup onOpen="open2FA"><a href="" rp-popup-link="rp-popup-link" ng-hide="enabled2FA">有効化</a><div rp-popup-content="rp-popup-content" class="connectModal modal2FA"><div class="modal-header"><div id="logo" class="navbar-brand hidden-sm modal-logo"></div><div class="modal-title">接続</div></div><div class="modal-body"><div class="modal-prompt">Authy は Ripple Trade に対して２段階認証を提供しています。２段階認証を有効化するためには、一部の情報を Authy と共有する必要があります。</div><div class="grey-focus"><div class="row modal-permissions"><div class="col-xs-12 col-sm-4">- あなたの電子メールアドレス:</div><div class="col-xs-12 col-sm-8 email">{{userBlob.data.email}}</div></div><div class="row modal-permissions"><div class="col-xs-12 col-sm-4">- あなたの電話番号:</div><div class="col-xs-12 col-sm-8"><div class="form-group authy-control"><label>国コード</label><input ng-model="countryCode" class="authy-countries form-control"/></div><div class="form-group authy-control"><label>電話番号</label><input name="phoneNumber" ng-model="phoneNumber" ng-pattern="validation_pattern_phone" class="form-control"/></div></div></div></div><div class="modal-agreement">続行すると、Authy の<a href="https://www.authy.com/terms" target="_blank" l10n-inc="l10n-inc">利用規約</a>に同意したことになります。</div><div class="modal-buttons"><button ng-click="savePhone()" ng-disabled="savingPhone" class="modal-btn btn btn-default btn-primary btn-md"><span>共有</span></button><button data-dismiss="modal" ng-hide="savingPhone" class="modal-btn btn btn-default btn-md btn-link btn-cancel">キャンセル</button></div></div></div></rp-popup></div></div><div ng-hide="!mode2FA || mode2FA === \'verifyPhone\'" class="row confirm2FA"><div class="col-xs-12 col-sm-9"><div class="status"><div rp-spinner="4" ng-show="mode2FA === \'savePhone\'">設定を保存しています...</div><div rp-spinner="4" ng-show="mode2FA === \'disable\'">2段階認証を無効化しています...</div><div rp-spinner="4" ng-show="mode2FA === \'enable\'">2段階認証を有効化しています...</div></div></div></div><form ng-show="mode2FA === \'verifyPhone\'" class="verify2FA"><div class="row"><div class="col-xs-12"><div class="status"><span ng-hide="via === \'app\'">お使いのデバイスに送信されたSMSメッセージの検証コードを入力してください：</span><span ng-show="via === \'app\'">お使いのデバイスにインストールされているAuthyアプリの検証コードを入力してください：</span><span> +{{currentCountryCode}} {{currentPhone}}</span><div l10n-inc="l10n-inc">Enter the code below to complete the process.</div></div></div></div><div class="row"><div class="col-xs-12 col-sm-8"><label for="verifyToken">検証コード</label></div></div><div class="row"><div class="col-xs-9 col-md-5 col-sm-9"><input id="verifyToken" name="verifyToken" ng-model="verifyToken" class="form-control"/></div><div class="col-xs-3 col-md-3 col-sm-3"><button type="button" ng-disabled="isRequesting" rp-spinner="{{isRequesting ? 4 : null}}" ng-click="requestToken()" class="btn btn-block btn-cancel"><span ng-hide="via === \'app\'">コードを再送する</span><span ng-show="via === \'app\'">SMS経由で送信</span></button></div></div><div class="row"><div class="col-xs-8 col-sm-3"><button type="button" ng-disabled="isVerifying" ng-click="enable2FA()" rp-spinner="{{isVerifying ? 4 : null}}" class="btn btn-primary btn-block"><span>有効</span></button></div><div class="col-xs-4 col-sm-2"><a ng-click="cancel2FA()" class="btn btn-block btn-cancel">キャンセル</a></div></div></form></div><div class="section"><div class="descriptor">Ripple パスワード</div><div class="row"><div class="col-xs-9 col-sm-8 col-md-6">*****************</div><div class="col-xs-3 col-sm-4 col-md-6"><a href="" ng-click="openFormPassword=!openFormPassword" ng-hide="openFormPassword">編集</a></div></div><div class="row"><div class="auth-form-container col-xs-12 col-md-8 col-lg-6"><form id="renameForm" name="changeForm" ng-show="openFormPassword" ng-submit="changePassword()"><div class="form-group"><label type="password" for="password">現在のパスワード</label><input id="password" type="password" name="password" rp-focus="rp-focus" ng-model="password" required="required" class="form-control"/></div><div ng-class="{\'field-error\': \'weak\' === strength || \'match\' === strength}" class="form-group"><label for="change_password">新しいパスワード</label><input name="change_password1" type="password" autocomplete="off" ng-model="password1" rp-strong-password="rp-strong-password" required="required" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="strength==\'weak\'"><span>パスワードが脆弱です。文字、数字、シンボルが混合されていないか、または短すぎます。</span></p><p ng-show="strength==\'match\'"><span>Ripple 名とパスワードは一致してはなりません。別のパスワードを作成してください。</span></p></div><div ng-class="{\'field-error\': changeForm.change_password1.$error.rpSameInSet &amp;&amp; changeForm.change_password2.$dirty}" class="form-group"><label for="change_password2">パスワードを確認</label><input name="change_password2" autocomplete="off" type="password" ng-model="password2" required="required" rp-same-in-set="passwordSet" class="form-control"/><p ng-show="changeForm.change_password1.$error.rpSameInSet &amp;&amp; changeForm.change_password2.$dirty"><span>パスワードが一致しません</span></p></div><div ng-show=""><div class="form-group"><div class="strength {{strength}}">{{strength}}</div></div></div><div class="row"><div class="col-xs-6 col-sm-6"><button type="submit" ng-disabled="changeForm.$invalid || loading" class="btn btn-success btn-block"><span ng-hide="loading">送信</span><span ng-show="loading">ロード中...</span></button></div><div class="col-xs-6 col-sm-6"><a href="" ng-click="openFormPassword=!openFormPassword" class="btn btn-block btn-cancel">キャンセル</a></div></div></form></div></div></div><div class="section"><div class="descriptor">シークレット・キー</div><div class="row"></div><label>シークレット・キーによりあなたの資金へのアクセスを解除することができます。メモを取り、人目につかない安全な場所に保管してください。Ripple 名やパスワードを忘れた場合には、このシークレット・キーを使って資金を復活させることができます。</label><div class="row"><div class="col-xs-9 col-sm-8 col-md-6"><span ng-show="security.master_seed" class="value">{{security.master_seed}}</span><span ng-hide="security.master_seed" class="value">••••••••••••••••••••••••••••••••••••••••••••</span></div><div class="col-xs-3 col-sm-4 col-md-3"><a href="" ng-click="unmaskSecret()" ng-hide="security.master_seed">表示</a><a href="" ng-click="security.master_seed = null" ng-show="security.master_seed">隠す</a></div></div></div><div class="descriptor">トランザクションに対するパスワード保護</div><div class="row"><div class="col-xs-12"><div class="description">パスワード要求をやめたとしても、ページを新しく読み込んだ場合には毎回パスワードを入力する必要があります。</div><div class="helperInput"><form name="persistUnlock" ng-submit="setPasswordProtection()"><div ng-hide="editUnlock" class="row"><div class="col-xs-6 col-sm-5 col-md-4"><div class="description">Require password</div></div><div class="col-xs-3 col-sm-3 col-md-2"><div class="description"><div ng-show="requirePassword">はい</div><div ng-hide="requirePassword">いいえ</div></div></div><div class="col-xs-3 col-sm-4 col-md-6"><div class="description"><a id="edit" href="" ng-click="editUnlock = true">編集</a></div></div></div><div ng-show="editUnlock" class="row edit-security-pswd"><div class="col-xs-6 col-sm-5 col-md-4"><div class="description">Require password</div></div><div class="col-xs-6 col-sm-3 col-md-2"><div class="helperInput description"><label><input type="checkbox" name="unlock" ng-checked="requirePassword" ng-click="requirePasswordChanged = true"/></label></div></div><div class="col-xs-12 col-sm-4 col-md-4 save-btn-wrapper"><div class="description"><button id="save" type="submit" ng-disabled="serverForm.$invalid" class="btn btn-block btn-success btn-xs submit">保存</button></div></div></div></form></div></div></div></div></div></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="TxCtrl" ng-switch on="state" class="single ddpage content"><group ng-switch-when="loading"><p class="literal throbber">取引明細をロード中...</p></group><group ng-switch-when="error"><p class="literal">取引明細のロード中にエラーが発生しました。</p></group><group ng-switch-when="loaded"><p class="literal hash"><span>取引 #</span><span>{{transaction.hash}}</span><div><a href="{{\'https://ripplecharts.com/#/graph/\' + transaction.hash}}" target="_blank">グラフを表示</a></div></p><hr/><p class="literal type">取引タイプ: <strong> {{transaction.TransactionType}}</strong></p><group ng-switch on="transaction.TransactionType"><group ng-switch-when="Payment"><group class="clearfix"><dl class="details half"><dt><span>送金アドレス</span><span>:</span></dt><dd>{{transaction.Account}}</dd><dt><span>送金された金額</span><span>:</span></dt><dd>{{amountSent | rpamount}} {{amountSent | rpcurrency}}</dd><dt><span>送金された通貨</span><span>:</span></dt><dd>{{amountSent | rpcurrencyfull}}</dd></dl><dl class="details half"><dt><span>受信アドレス</span><span>:</span></dt><dd>{{transaction.Destination}}</dd><dt><span>受信した金額</span><span>:</span></dt><dd>{{transaction.Amount | rpamount}} {{transaction.Amount | rpcurrency}}</dd><dt><span>受信した通貨</span><span>:</span></dt><dd>{{transaction.Amount | rpcurrencyfull}}</dd></dl></group><hr/><group class="clearfix"><dl class="details half"><dt><span>ネットワーク手数料は支払われました。</span><span>:</span></dt><dd>{{transaction.Fee | rpamount}} XRP</dd></dl><dl class="details half"><group ng-show="transaction.DestinationTag !== null &amp;&amp; transaction.DestinationTag !== undefined"><dt><span>宛先タグ</span><span>:</span></dt><dd>{{transaction.DestinationTag}}</dd></group></dl></group><hr/><dl class="details"><dt><span>元帳番号</span><span>:</span></dt><dd>{{transaction.inLedger}}</dd></dl></group><group ng-switch-default="ng-switch-default"><group class="clearfix"><dl class="details half"><dt>送金アドレス:</dt><dd>{{transaction.Account}}</dd></dl><dl class="details half"></dl></group><hr/><p class="literal">申し訳ありません。まだこの取引処理タイプの情報ページは存在しません。</p></group></group></group></section>');
	}
	return buf.join("");
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="XrpCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><div ng-show="connected" class="row"><div class="col-sm-3"><div class="currencies"><a href="#/xrp" ng-class="{active: $route.current.tabName == \'xrp\'}">XRP</a><a href="#/btc" ng-class="{active: $route.current.tabName == \'btc\'}" ng-show="\'web\' === client">BTC</a><!--a(href="#/usd", ng-class="{active: $route.current.tabName == \'usd\'}", l10n) USD (US only)--><a href="#/gold" ng-class="{active: $route.current.tabName == \'gold\'}">Gold</a><a href="#/trust" ng-class="{active: $route.current.tabName == \'trust\'}">ゲートウェイ</a></div><a href="https://support.ripplelabs.com/hc/en-us/articles/202847686-Gateway-Information" target="_blank">ゲートウェイについてより学んでください</a></div><div class="col-sm-9 list"><div ng-show="fundPage == \'xrp\'" class="fundXrp"><div ng-show="\'web\' === client"><div class="nameLine">Ripple 名: <span ng-show="userCredentials.username" class="name">~{{userCredentials.username}}</span><span ng-hide="userCredentials.username">ロード中...</span><div class="address"><a href="" ng-click="showRippleAddress=true" ng-hide="showRippleAddress">アドレスを見る</a><div ng-show="showRippleAddress">{{address}}</div></div></div><div class="description">Ripple 名は Ripple の新しい機能です！Ripple 名(~{{userCredentials.username}}) を使って送金を受け取ることができます。なお、 Ripple アドレスもまだ使用できます。現在 Ripple 名に移行中なので、フルアドレスを要求するゲートウェイもあるかもしれません。</div></div><div ng-show="\'desktop\' === client"><div class="nameLine">Ripple アドレス <div class="address">{{address}}</div></div></div></div></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="BtcCtrl" class="col-xs-12 content"><group class="connected"><div class="row"><div class="col-xs-12"><div class="notification-wrapper"><div class="alert alert-success">Success! You can deposit BTC via your generated BTC receiving address.</div></div></div></div></group><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><div ng-show="connected" class="row"><div class="col-sm-4 col-md-3 col-xs-12"><div class="currencies"><a href="#/xrp" ng-class="{active: $route.current.tabName == \'xrp\'}">XRP</a><a href="#/btc" ng-class="{active: $route.current.tabName == \'btc\'}" ng-show="\'web\' === client">BTC</a><!--a(href="#/usd", ng-class="{active: $route.current.tabName == \'usd\'}", l10n) USD (US only)--><a href="#/gold" ng-class="{active: $route.current.tabName == \'gold\'}">Gold</a><a href="#/trust" ng-class="{active: $route.current.tabName == \'trust\'}">ゲートウェイ</a></div><a href="https://support.ripplelabs.com/hc/en-us/articles/202847686-Gateway-Information" target="_blank">ゲートウェイについてより学んでください</a></div><div class="col-sm-8 col-md-9 col-xs-12 list"><div class="fundBtc"><div class="nameLine">ビットコイン入金</div><div class="btc-tab-description row"><div class="col-md-3"><h4>ゲートウェイ</h4><div class="description">btc2ripple, powered by <a href="https://www.snapswap.us/" target="_blank">Snapswap</a></div></div><div class="col-md-3"><h4>Availability</h4><div class="description">All countries</div></div><div class="col-md-3"><h4>Fees</h4><div class="description">0% </div></div><div class="col-md-3"><h4>Rating</h4><div class="description">We get the ratings from <a href="https://coinist.co/" target="_blank">Coinist</a></div></div></div><div class="row btc-tab-description"><div class="col-md-6"><div ng-show="!gbiConnected" class="description">Ripple Trade has partnered with GBI to provide easy access to XAU.\nBy continuing, you agree to GBI\'s terms of service. Following this action will\nadd XAU to your accounts.</div></div></div><div class="row btc-tab-description"><div class="col-xs-9 col-sm-5 col-md-4"><rp-popup><a href="" rp-popup-link="rp-popup-link" ng-click="openPopup()" class="btn btn-success btn-sm btn-block sign">Add btc2ripple</a><div rp-popup-content="rp-popup-content" class="connectModal"><div class="modal-header"><div id="logo" class="navbar-brand hidden-sm modal-logo"></div><div class="modal-title">接続</div></div><div class="modal-body"><div class="modal-prompt">btc2ripple は、以下の情報を受け取ります。</div><div class="grey-focus"><div class="modal-permissions">- Receive your email address&#32;<span class="modal-email">({{userBlob.data.email}})</span></div><div class="modal-permissions">- あなたにかわっで BTC を入金</div></div><div class="modal-agreement">続行することによりあなたは、btc2ripple <a href="https://btc2ripple.com/#/terms/of/service" target="_blank"> terms of service.</a> に同意します。</div><div class="modal-buttons"><button ng-click="B2RSignup()" rp-spinner="{{loading ? 4 : null}}" ng-disabled="loading" class="modal-btn btn btn-default btn-success btn-md"><span ng-show="loading">ロード中...</span><span ng-hide="loading">確認</span></button><button data-dismiss="modal" ng-hide="loading" class="modal-btn btn btn-default btn-link btn-cancel">キャンセル</button></div><span ng-show="emailError" class="modal-error">現在、SnapSwap の btc2ripple サービスが利用できません。しばらく待ってから再実行してください。</span></div></div></rp-popup><button class="btn btn-block btn-primary">Hide instructions</button><button class="btn btn-block btn-primary">Show instructions</button></div><div class="connect col-md-2"><div class="description"><i class="fa fa-times"></i>Not connected</div><div 10n="10n" class="description"><i class="fa fa-check"></i>Connected</div></div></div><div ng-show="loadState.B2RApp" class="B2R row">        <div ng-show="B2R.active" class="active col-xs-12"><div ng-show="loadState.B2RInstructions"><div class="instructions">{{B2R.instructions.instruction}}</div><div class="btc-address">{{B2R.instructions.instructionParams[0].value}}</div><div class="qr-code"><rp-qrcode data="bitcoin:{{B2R.instructions.instructionParams[0].value}}" size="100"></rp-qrcode></div><div ng-hide="account.Balance" class="about">初めての入金の一部 (~.001 BTC) がウォレットのアクティベーションのため XRP に両替されます。<a href="https://ripple.com/wiki/Reserves" target="_blank" l10n-inc="l10n-inc" class="why">なぜ？</a></div><div ng-show="B2R.limit" class="limit"><span>現在の入金制限:</span><rp-inbound-bridge-limit limit="B2R.limit"></rp-inbound-bridge-limit><a href="https://btc2ripple.com/#/my/setup" target="_blank" class="remove">制限を取り除く</a></div></div><div ng-hide="loadState.B2RInstructions">Loading...</div></div><div ng-hide="B2R.active" class="inactive"><span ng-show="loading"><label>SnapSwapサービスから応答を待っています</label></span><span ng-hide="loading"><label>入金するには、SnapSwap の <a href="https://btc2ripple.com" target="_blank">btc2ripple</a> サービスを利用してビットコイン受信アドレスを作成してください。</label><div class="row action"><div class="col-xs-12 col-sm-6 col-md-4"><rp-popup><a href="" rp-popup-link="rp-popup-link" ng-click="openPopup()" class="btn btn-success btn-sm btn-block sign">ビットコインアドレスを作成</a><div rp-popup-content="rp-popup-content" class="connectModal"><div class="modal-header"><div id="logo" class="navbar-brand hidden-sm modal-logo"></div><div class="modal-title">接続</div></div><div class="modal-body"><div class="modal-prompt">btc2ripple は、以下の情報を受け取ります。</div><div class="grey-focus"><div class="modal-permissions">- Receive your email address&#32;<span class="modal-email">({{userBlob.data.email}})</span></div><div class="modal-permissions">- あなたにかわっで BTC を入金</div></div><div class="modal-agreement">続行することによりあなたは、btc2ripple <a href="https://btc2ripple.com/#/terms/of/service" target="_blank"> terms of service.</a> に同意します。</div><div class="modal-buttons"><button ng-click="B2RSignup()" rp-spinner="{{loading ? 4 : null}}" ng-disabled="loading" class="modal-btn btn btn-default btn-success btn-md"><span ng-show="loading">ロード中...</span><span ng-hide="loading">確認</span></button><button data-dismiss="modal" ng-hide="loading" class="modal-btn btn btn-default btn-link btn-cancel">キャンセル</button></div><span ng-show="emailError" class="modal-error">現在、SnapSwap の btc2ripple サービスが利用できません。しばらく待ってから再実行してください。</span></div></div></rp-popup></div></div></span></div></div></div></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="KycCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><div ng-hide="hideUsOnlyBanner" class="auth-attention banner"><h4 id="announcement">Profile completion is only available to US residents.</h4><a id="hide" href="" ng-click="hideUsOnlyBanner=!hideUsOnlyBanner" class="dismiss"> ×</a><br/></div><group ng-show="notif !== &quot;clear&quot;" class="mode-granted wide"><group ng-switch on="notif">         <group ng-switch-when="verifying" class="pending"><h2 class="tx-status">あなたの情報の確認をしています。どうかお待ちください...</h2></group><group ng-switch-when="info_verified" class="result-success"><h2 class="tx-status">あなたの身元情報は確認されました。</h2></group><group ng-switch-when="questions_verified" class="result-success"><h2 class="tx-status">あなたの身元確認の質問が確認されました。</h2></group><group ng-switch-when="2fa_done" class="result-success"><h2 class="tx-status">おめでとうございます、あなた身元を確認しました!今、あなたはインスタント入金ページに転送されるでしょう。</h2></group><group ng-switch-when="general_error" class="result-error"><h2 class="tx-status">あなたのリクエストにおいてエラーがありました。後で再び実行してください。</h2></group><group ng-switch-when="phone_error" class="result-error"><h2 class="tx-status">あなたのリクエストにエラーが発生しました。 あなたの電話番号が有効なことを確認して、もう一度ためしてください。</h2></group><group ng-switch-when="invalid_token" class="result-error"><h2 class="tx-status">あなたの検証コードを確認してから、もう一度お試しください。</h2></group><group ng-switch-when="request_token_error" class="result-error"><h2 class="tx-status">検証コードを要求している間にエラーが発生しました。後で再び実行してください。</h2></group><group ng-switch-when="info_error" class="result-error"><h2 class="tx-status">私達はあなたの身元情報を検証することはできません。あなたの情報を確認してからもう一度お試しください。</h2></group><group ng-switch-when="questions_error" class="result-error"><h2 class="tx-status">私たちはあなたの本人確認の質問を有効にすることができません。 答えをチェックして、再試行してください。</h2></group><group ng-switch-when="max_attempts_questions_error" class="result-error"><h2 class="tx-status">Sorry, you\'ve reached your maximum number of verification attempts. Please try again in 24 hours.</h2></group><group ng-switch-when="contact_support" class="result-error"><h2 class="tx-status">私たちはあなたの身元を確認することができません。support@ripple.comで連絡してください。</h2></group><group ng-switch-when="loading"><h2 class="tx-status">ロード中...</h2></group></group></group><group ng-show="connected &amp;&amp; loadState.account &amp;&amp; notif !== \'loading\'"><div class="row"><h3 class="text-center">プロフィール完成</h3><div class="col-xs-12"><div class="row"><div class="col-md-4 text-center steps"><span ng-class="{ \'selected\': currentStep == \'one\' }">STEP 1: 身元情報</span></div><div class="col-md-4 text-center steps"><span ng-class="{ \'selected\': currentStep == \'two\' }">STEP 2:本人確認の質問</span></div><div class="col-md-4 text-center steps"><span ng-class="{ \'selected\': currentStep == \'three\' }">STEP 3: 2段階認証</span></div></div><hr/></div><group ng-switch on="currentStep" class="col-xs-12"><form name="identityForm" ng-switch-when="one" ng-submit="saveIdentityInfo()" class="row row-padding-small"><div class="col-sm-9"><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><label for="firstName">名前</label><input id="firstName" name="firstName" type="text" ng-model="profile.name.given" required="required" class="form-control firstName"/></div></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><label for="lastName">氏名</label><input id="lastName" name="lastName" type="text" ng-model="profile.name.family" required="required" class="form-control lastName"/></div></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><label for="address">番地・建物名</label><br/><input id="address1" name="address1" type="text" ng-model="profile.address.line1" required="required" class="form-control address1"/></div></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><label for="city">市町村名</label><input id="city" name="city" type="text" ng-model="profile.address.locality" ng-pattern="validation_pattern_city" required="required" class="form-control city"/></div></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><label for="state">都道府県名</label><input id="state" name="state" type="text" rp-combobox="states" rp-combobox-select="rp-combobox-select" ng-model="profile.address.region" ng-pattern="validation_pattern_state" required="required" class="form-control state"/></div></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><label for="zip">郵便番号</label><input id="zip" name="zip" type="text" ng-model="profile.address.postal_code" ng-pattern="validation_pattern_zip" required="required" class="form-control zip"/></div></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><label>誕生日</label><br/></div></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-2"><label for="month">月<input id="month" name="month" type="text" rp-combobox="months" rp-combobox-select="rp-combobox-select" ng-model="profile.birthdate.month" ng-pattern="validation_pattern_month" required="required" class="form-control line1"/></label></div><div class="col-xs-12 col-sm-6 col-md-2"><label for="date">日<input id="date" name="date" type="text" rp-combobox="dates" rp-combobox-select="rp-combobox-select" ng-model="profile.birthdate.date" ng-pattern="validation_pattern_date" required="required" class="form-control line1"/></label></div><div class="col-xs-12 col-sm-6 col-md-2"><label for="year">年<input id="year" name="year" type="text" rp-combobox="years" rp-combobox-select="rp-combobox-select" ng-model="profile.birthdate.year" ng-pattern="validation_pattern_year" required="required" class="form-control line1"/></label></div></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><div>Last 4 digits of Social Security Number</div></div></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-2"><div class="ssn-hidden">&#149;&#149;&#149; - &#149;&#149; -</div></div><div class="col-xs-12 col-sm-6 col-md-2"><input id="ssn" name="ssn" type="ssn" ng-model="profile.ssn_last_4" ng-pattern="validation_pattern_sss" required="required" class="form-control ssn"/></div></div><div class="row"><div class="col-xs-5"><button type="submit" rp-spinner="{{identityLoading ? 4 : null}}" ng-disabled="identityForm.$invalid || identityLoading" class="btn btn-block btn-primary submit"><span ng-hide="identityLoading">本人確認の質問に進みます</span><span ng-show="identityLoading">確認中...</span></button></div><div class="col-xs-5"><a href="#/xrp" class="button btn btn-link">キャンセル</a></div></div></div></form><form name="questionsForm" ng-switch-when="two" ng-submit="saveQuestions()" class="row-padding-small"><div class="row"><div class="col-xs-4"> <div ng-repeat="q in questions" class="question">{{ q.question }}<div ng-repeat="a in q.answers"><input id="q{{ q.id }}a{{ a.id }}" name="q{{ q.id }}" value="{{ a.id }}" type="radio" ng-model="q.answerId" required="required"/><label for="q{{ q.id }}a{{ a.id }}" class="answer">{{ a.answer }}</label></div></div></div></div><div class="row"><div class="col-xs-5"><button type="submit" rp-spinner="{{questionsLoading ? 4 : null}}" ng-disabled="identityForm.$invalid || questionsLoading" class="btn btn-block btn-primary submit"><span ng-hide="questionsLoading">2段階認証を続ける</span><span ng-show="questionsLoading">確認中...</span></button></div><div class="col-xs-5"><a href="#/xrp" class="button btn btn-link">キャンセル</a></div></div></form><group ng-switch-when="three" ng-controller="TwoFACtrl"><div class="row twoFAInfo"><div class="icon-wrapper"><i class="fa fa-lock fa-3x"></i></div><div class="col-xs-10 col-sm-4"><span class="two-factor-desc">2段階認証はあなたのアカウントに格段に優れたセキュリティを提供します。</span></div></div><form name="twoFA" ng-submit="savePhone()" ng-show="twoFAVerify" class="section"><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><div class="row"><div class="col-xs-12 col-sm-8"><div class="form-group authy-control"><label>国コード</label><input ng-model="countryCode" class="authy-countries form-control"/></div><div class="form-group authy-control"><label>電話番号</label><input name="phoneNumber" ng-model="phoneNumber" ng-pattern="validation_pattern_phone" class="form-control"/></div></div></div></div></div><div class="row kyc-align"><div class="col-xs-12 col-sm-6 col-md-6"><span>RippleTradeは、より堅固なセキュリティをあなたのアカウントに提供するために、Authyを利用します。 続けると、あなたはAuthyのセキュリティー<a href="https://www.authy.com/terms" target="blank" l10n-inc="l10n-inc">Terms of Service</a>に同意します</span></div></div><div class="row kyc-align"><div class="col-xs-12 col-sm-6 col-md-3"><button type="submit" rp-spinner="{{phoneLoading ? 4 : null}}" ng-disabled="identityForm.$invalid || phoneLoading" class="modal-btn btn btn-default btn-primary btn-md btn-block"><span ng-hide="phoneLoading">電話番号を確認する</span><span ng-show="phoneLoading">確認中...</span></button></div><div class="col-xs-12 col-sm-2 col-md-1 text-center"><a href="#/xrp" ng-hide="editNum" class="button btn btn-link">キャンセル</a><a ng-click="edit_toggle()" ng-show="editNum" class="button btn btn-link">キャンセル</a></div></div></form><div ng-hide="twoFAVerify" class="section"><div class="row"><div class="col-xs-12 col-sm-4"><div class="form-group authy-control"><div>電話番号</div><div class="phone-number-wrapper">+{{ currentCountryCode }} {{ phoneNumber }}<span ng-click="edit_toggle()" class="btn-link">変更</span></div></div></div></div><div class="row"><div class="col-xs-12 col-sm-8"><div class="form-group authy-control"><span>検証コードは、+{{ currentCountryCode }} {{ phoneNumber }}に送信されました</span></div></div></div><form><div class="row"><div class="col-xs-12 col-sm-12"><label>検証コード</label></div></div><div class="row"><div class="col-xs-12 col-sm-4"><div class="form-group"><input ng-model="verificationCode" class="form-control"/></div></div><div class="col-xs-12 col-sm-3"><button ng-click="requestToken()" class="btn btn-default btn-md btn-block">Resend Code                  </button></div></div></form><div class="row kyc-align"><div class="col-xs-12 col-sm-6 col-md-3"><button ng-click="enable2FA()" rp-spinner="{{phoneLoading ? 4 : null}}" ng-disabled="isVeryifying || phoneLoading" class="modal-btn btn btn-default btn-primary btn-md btn-block"><span ng-hide="phoneLoading">Submit code</span><span ng-show="phoneLoading">確認中...</span></button></div><div class="col-xs-12 col-sm-2 col-md-1 text-center"><a href="#/xrp" class="button btn btn-link">キャンセル</a></div></div></div></group></group></div></group></section>');
	}
	return buf.join("");
	}

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="ExchangeCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><group ng-hide="!connected || loadState.account" class="disconnected"><p class="literal">ロード中...</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div><p class="literal">両替する前に資金を供給する必要があります。</p></div><div ng-show="connected" class="row"><div class="widgets hidden-xs col-sm-4 col-md-4 col-lg-3"><div class="widget widget-balances"><h4>Balances</h4><ul class="fa-ul"><li class="currency-xrp"><i class="fa-li"></i><h5>XRP</h5><div ng-show="account.Balance">{{ account.Balance | rpamount }}</div><div ng-hide="account.Balance">0.00</div></li><li ng-repeat="entry in balances" ng-class="\'currency-\' + (entry.total | rpcurrency | lowercase)"><i ng-class="\'fa-\' + (entry.total | rpcurrency | lowercase)" class="fa-li fa-money"></i><h5>{{ entry.total | rpcurrency }}</h5><div>{{ entry.total | rpamount }}</div><dl ng-repeat="(issuer, component) in entry.components"><dt ng-show="component.gateway.app">{{rp-currency}}.{{component.gateway.app.name}}</dt><dt ng-hide="component.gateway.app" rp-pretty-identity="issuer" rp-pretty-issuer-contacts="userBlob.data.contacts"></dt><dd>{{ component | rpamount }}</dd></dl></li></ul></div></div><div class="col-xs-12 col-sm-8 col-md-8 col-lg-9"><form id="exchangeForm" name="exchangeForm" ng-show="mode==&quot;form&quot; &amp;&amp; account.Balance" ng-submit="exchange_prepared()" class="mode-form"><div class="form-group"><label for="amount">受け取る</label><div class="row row-padding-small amount"><div class="col-sm-2 col-md-2 col-xs-3"><input id="amount" name="amount" type="text" ng-model="exchange.amount" required="required" rp-autofill="$routeParams.amount" rp-autofill-amount="rp-autofill-amount" rp-amount="rp-amount" rp-amount-positive="rp-amount-positive" class="value form-control"/></div><div class="col-sm-6 col-md-4 col-xs-9"><input id="amount_currency" name="amount_currency" type="text" rp-combobox="currency_choices" rp-combobox-select="rp-combobox-select" ng-model="exchange.currency_name" rp-autofill="$routeParams.amount" rp-autofill-currency="rp-autofill-currency" class="currency form-control"/></div></div><div rp-errors="amount" class="errorGroup"><div rp-error-on="required" class="error">金額を入力してください。</div><div rp-error-on="rpAmount" class="error">無効な金額です。</div><div rp-error-on="rpAmountPositive" class="error">０より大きな金額を入力してください。</div></div><p ng-show="exchange.path_status == \'waiting\'" class="literal"></p><p ng-show="exchange.path_status == \'pending\'" class="literal throbber">計算中...</p><p ng-show="exchange.path_status == \'no-path\' &amp;&amp; exchange.currency_code != \'XRP\'" class="literal">{{exchange.amount}} {{exchange.currency_name}} に変換できません。あなたのアカウントに十分な残高があること、および {{exchange.currency_name}} ゲートウェイへの <a href="https://support.ripplelabs.com/hc/en-us/categories/200194186-Gateways" target="_blank">connection</a> があることをご確認ください。</p><p ng-show="exchange.path_status == \'no-path\' &amp;&amp; exchange.currency_code == \'XRP\'" class="literal">申し訳ありません!\n{{convert.amount}}{{convert.currency}}を両替することができません。\nあなたのアカウントに十分な資金があるかを確認してください。</p><p ng-show="exchange.path_status == \'error\'" class="literal">経路計算中にエラーが発生しました</p></div><div class="currency_sets"><div ng-if="exchange.path_status == \'done\'" class="row row-padding-small"><div class="col-xs-12">両替</div></div><div class="row row-padding-small alternatives"><div ng-repeat="alt in exchange.alternatives" class="col-xs-12 col-sm-6 col-md-4"><div class="am"><span class="amnt">{{alt.amount | rpamount:{rel_precision: 4, rel_min_precision: 2} }}</span><span ng-hide="alt.amount.is_native() || alt.amount.issuer().to_json() == account.Account"><span rp-pretty-issuer="alt.amount.issuer().to_json()" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></span></span><span class="currency"> {{alt.amount | rpcurrency }}</span><div class="ex">(<span class="rate">{{alt.rate | rpamount:{rel_precision: 4, rel_min_precision: 2} }}</span><span class="pair">{{exchange.currency_code}}/{{alt.amount | rpcurrency}}</span>)</div></div><button type="submit" ng-disabled="exchangeForm.$invalid" ng-click="exchange.alt = alt" class="btn btn-block btn-success">{{ alt.amount | rpcurrency }} <span ng-hide="alt.amount.is_native() || alt.amount.issuer().to_json() == account.Account"> (<span rp-pretty-issuer="alt.amount.issuer().to_json()" rp-pretty-issuer-contacts="userBlob.data.contacts" rp-pretty-issuer-or-short="rp-pretty-issuer-or-short" class="issuer"></span>)</span> を交換する</button></div></div><div ng-show="exchange.alternatives.length &amp;&amp; lastUpdate" class="row pathupdate"><div class="col-xs-12"><span> {{lastUpdate}}</span> <span ng-show="lastUpdate &gt; \'1\'" l10n-inc="l10n-inc"> seconds</span> <span ng-show="lastUpdate == \'1\'" l10n-inc="l10n-inc"> second</span> 前に経路が更新されました</div></div></div></form><group ng-show="mode==&quot;wait_path&quot; &amp;&amp; account.Balance" class="mode-wait-path"><p class="throbber literal">交換経路の計算を行っています。</p></group><group ng-show="mode==&quot;confirm&quot; &amp;&amp; account.Balance" class="mode-confirm"><span><p l10n-inc="l10n-inc" class="literal">You are exchanging</p><p class="amount_feedback"><span class="value">{{exchange.alt.amount | rpamount}}&#32;</span><span class="currency">{{exchange.alt.amount | rpcurrency}}</span></p><p l10n-inc="l10n-inc" class="literal">to</p><p class="amount_feedback"><span class="value">{{exchange.amount_feedback | rpamount}}&#32;</span><span class="currency">{{exchange.amount_feedback | rpcurrency}}</span></p><p l10n-inc="l10n-inc" class="literal">You will pay at most</p><p class="amount_feedback"><span class="value">{{exchange.alt.amount | rpamount}}&#32;</span><span class="currency">{{exchange.alt.amount | rpcurrency}} &#32;</span><span>&plusmn; 1%</span></p><p l10n-inc="l10n-inc" class="literal">Are you sure?</p></span><div class="row row-padding-small"><div class="col-xs-6 col-sm-4 col-md-3 col-lg-2"><button type="submit" ng-click="exchange_confirmed()" ng-disabled="confirm_wait" class="btn btn-block btn-success submit">確認</button></div><div class="col-xs-6 col-sm-4 col-md-3 col-lg-2"><button ng-click="cancelConfirm()" class="btn btn-link btn-default back">キャンセル</button></div></div></group><group ng-show="mode==&quot;sending&quot; &amp;&amp; account.Balance" class="mode-sending"><!-- Waiting message for the send and convert tabs--><p rp-spinner="4" class="literal">取引情報をRipple Networkに送信する。</p><hr/></group><group ng-show="mode==&quot;error&quot; &amp;&amp; account.Balance" class="mode-error"><!-- Error messages for the send and convert tabs--><group ng-switch on="error_type"><group ng-switch-when="noDest" class="result-error"><h2 class="tx-status">取引は失敗しました。</h2><p>エラーコード： あなたが送ろうとしている口座が存在しません [noDest]</p></group><group ng-switch-when="noPath" class="result-error"><h2 class="tx-status">取引は失敗しました。</h2><p>エラーコード： リップルは、あなたと宛先アカウントの間で経路を見つけることができませんでした[noPath]</p></group><group ng-switch-when="maxFeeExceeded" class="result-error"><h2 class="tx-status">取引は失敗しました。</h2><p>エラーコード:最大のネットワークフィーを超過したので、この取引処理は失敗しました。[maxfeeExceeded]</p></group><group ng-switch-when="invalidTransaction" class="result-error"><h2 class="tx-status">取引は失敗しました。</h2><p>エラーコードは：トランザクションはリップルネットワークによって拒否されました[invalidTransaction]</p></group><group ng-switch-when="unlockFailed" class="result-error"><h2 class="tx-status">アカウントのアンロックに失敗しました。</h2><p>アカウントをアンロックできませんでした。しばらく待ってから再実行してください。</p></group><group ng-switch-default="ng-switch-default"><p class="literal">申し訳ありません。送信中にエラーが発生しました。インターネットの接続を確認し、しばらく待ってから再実行してください。</p><p class="literal">再実行する前に、取引処理が既に実行されていないかを確認してください。</p></group></group><p><button ng-click="cancelConfirm()" class="btn btn-link btn-default">キャンセル</button></p></group><group ng-show="mode==&quot;status&quot; &amp;&amp; account.Balance" class="mode-status"><!-- Confirmation messages for the send and convert tabs--><group ng-show="tx_result==&quot;pending&quot;" class="pending"><h2 class="tx-status">保留中の取引</h2></group><group ng-show="tx_result==&quot;cleared&quot;" class="result-success"><h2 class="tx-status">取引は成功しました。</h2></group><group ng-show="tx_result==&quot;error&quot;" class="result-error"><h2 class="tx-status">取引は失敗しました。</h2><p>後で再実行してください。</p></group><group ng-show="tx_result==&quot;malformed&quot;" class="result-malformed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-default="ng-switch-default">エラーコード: {{engine_result}} - {{engine_result_message}}</span></p></group><group ng-show="tx_result==&quot;failure&quot;" class="result-malformed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="tefDST_TAG_NEEDED">エラーコード:相手先が必要です[tefDST_TAG_NEEDED]</span></p></group><group ng-show="tx_result==&quot;claim&quot;" class="result-malformed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="tecNO_DST">エラーコード： 宛先アカウントが、存在しません [tecNO_DST]</span><span ng-switch-when="tecNO_DST_INSUF_XRP">エラーコード: 宛先に送金するために必要なXRPが不足しています [tecNO_DST_INSUF_XRP]。</span><span ng-switch-default="ng-switch-default">エラー:{{engine_result_message}}</span></p></group><group ng-show="tx_result==&quot;failed&quot;" class="result-failed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="terNO_LINE">エラーコード:あなたはこの通貨にトラストラインを持っていません [terNO_LINE]</span><span ng-switch-default="ng-switch-default">取引処理は失敗しました: {{engine_result_message}}</span></p></group><group ng-show="tx_result==&quot;local&quot;" class="result-failed"><h2 class="tx-status">取引は失敗しました。</h2><p ng-switch on="engine_result"><span ng-switch-when="telINSUF_FEE_P">エラーコード: ネットワーク手数料の最大値を超過しているため、このトランザクションは失敗しました。後ほど再度お試しください[telINSUF_FEE_P]。</span></p></group><group class="actions"><hr/><div class="actionLink"><a href="" ng-click="reset()">別の両替をする</a></div><div class="actionLink"><a href="" ng-click="reset_goto(\'balance\')">残高に戻る</a></div><hr/></group></group></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="WithdrawCtrl" class="single content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><div ng-show="connected"></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="PrivacypolicyCtrl" class="content"><h1>Ripple Trade Privacy Policy</h1><hr/><p><strong>Last Updated:</strong> October 23, 2014</p><p>This Privacy Policy explains how information about you is collected, used and disclosed by XRP II,\nLLC (“<strong>Company</strong>,” “<strong>we</strong>” or “<strong>us</strong>”).  This Privacy Policy\napplies to information we collect when you use our website (<a href="http://www.rippletrade.com">www.rippletrade.com</a>)\nand the online services made available via our website (collectively,\n“<strong>Ripple Trade</strong>”).  Ripple Trade allows you to interact directly with the decentralized\nRipple transaction protocol payment network (“<strong>Ripple Protocol</strong>”) to create a\nRipple Protocol wallet (“<strong>Ripple Wallet</strong>”)</p><p>We may change this Privacy Policy from time to time.  If we make changes, we will notify you by revising the date\nat the top of the policy and, in some cases, we may provide you with additional notice (such as by\nadding a statement to the homepage of our website or by sending you a notification).</p><br/><h4>Collection of Information</h4><p><strong> Information You Provide to Us</strong></p><p>The information you provide via Ripple Trade is stored in a hosted data storage service\n(“<strong>Blobvault</strong>”).  The Blobvault has three separate components:</p><p>(1) a public storage component, which contains the Ripple name you create when setting up a Ripple\nWallet via Ripple Trade;</p><p>(2) a restricted storage component, which contains the information you provide about any recipient (such as the\nRipple name or Ripple public address of the recipient) when you send a balance via Ripple Trade; and</p><p>(3) an ID storage component, which includes contact and other identifiable information you provide about yourself\nvia Ripple Trade, including the email address you provide when first setting up a Ripple Wallet and any\ninformation you submit for identity verification purposes.</p><p><strong>Information We Collect Automatically via Ripple Trade</strong></p><p>When you use Ripple Trade, we automatically collect information about you, including:</p><li><strong>Log Information</strong>:  We collect log files that contain the type of browser you use, access times, pages\nviewed, your IP address and the page you visited before navigating to our websites.</li><br/><li><strong>Information Collected by Cookies and Other Tracking Technologies</strong>:  We and our service providers use\nvarious technologies to collect information about you when you use Ripple Trade, including cookies.  Cookies are small\ndata files stored on your hard drive or in device memory.  For information about how to disable cookies, please see “Your\nChoices” below.  Through these technologies, we may collect information about your interactions with Ripple Trade,\nincluding Ripple Protocol transactions you submit via Ripple Trade.  For instance, we may collect the currency\ninvolved in a transaction, the time and date of a transaction, your approximate location based on your IP address at the\ntime of a transaction and other related information.</li><br/><li><strong>Ripple Wallet Information</strong>: When you create a Ripple Wallet via Ripple Trade, Ripple Trade generates a\npublic address and private key pair for you.  The public address is automatically added to the Blobvault\npublic storage component and the private key is automatically added to the Blobvault restricted storage component.</li><br/><p><strong>Information We Collect From Other Sources</strong></p><p>We may also obtain information from other sources and combine that with information we collect through Ripple Trade.\nFor instance, when you submit information for identity verification purposes, we may receive information about you from\nour fraud prevention service providers, including information about you and the results of any identity verification check.</p><br/><h4>Use of Information</h4><p>We may use information about you for various purposes, including to:</p><li>Provide, maintain and improve Ripple Trade;</li><br/><li>Provide and deliver the services you request, facilitate Ripple Protocol transactions and send you related\ninformation, including confirmations and informational notifications;</li><br/><li>Verify your identity, monitor suspicious activity and prevent fraudulent or other illegal activities;</li><br/><li>Send you technical notices, security alerts, and other support and informational messages;</li><br/><li>Respond to your comments and questions and provide customer service;</li><br/><li>Communicate with you about products, services, offers, promotions, rewards, and events offered by Company and others,\nand provide news and information we think will be of interest to you;</li><br/><li>Analyze Ripple Trade trends and usage;</li><br/><li>Process and deliver contest entries and rewards;</li><br/><li>Link or combine any information we collect about you; and</li><br/><li>Carry out any other purpose for which you provided the information.</li><br/><h4><strong>Sharing of Information</strong></h4><p>We may share information about you as follows or as otherwise described in this Privacy Policy:</p><p><strong>With the Ripple Protocol and Users of the Ripple Protocol</strong></p><li>We will share your Blobvault public storage component data and any transaction details with the Ripple Protocol to\nfacilitate a transaction request you submit via Ripple Trade.  This information will be publicly viewable via the\nRipple Protocol public ledger; and</li><br/><li>At your direction, we will share information from the Blobvault ID storage component with other parties.  For instance,\nyou may direct us to send this information to a Ripple Protocol gateway or other third-party service accessible via Ripple Trade.\nUse of your information by these third parties will be subject to their privacy policies.</li><br/><p><strong>Other Important Sharing</strong></p><li>With service providers who need access to such information to carry out work on our behalf;</li><br/><li>In response to a request for information if we believe disclosure is in accordance with, or as otherwise required by, any\napplicable law, regulation or legal process;</li><br/><li>If we believe your actions are inconsistent with the spirit or language of our user agreements or policies, or to\nprotect the rights, property and safety of Company or others;</li><br/><li>Between and among Company, and its current and future parents, subsidiaries and affiliates;</li><br/><li>In connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all\nor a portion of our business to another company; and</li><br/><li>With your consent or at your direction, including if we notify you through Ripple Trade that the information you\nprovide will be shared in a particular manner and you provide such information.</li><p>We may also share aggregated or de-identified information, which cannot reasonably be used to identify you.</p><br/><h4>Your Choices</h4><p><strong>Blobvault Data</strong></p><p>You may correct or delete information maintained in the Blobvault ID storage component at any time by logging into\nRipple Trade.  Please note that we may retain deleted information to comply with applicable laws and for our\nlegitimate business purposes.</p><p><strong>Promotional Communications</strong></p><p>You may opt out of receiving promotional messages from Company by following the instructions in those messages.\nIf you opt out, we may still send you transactional or relationship messages.</p><p><strong>Cookies</strong></p><p>Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to\nremove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect\nthe availability and functionality of Ripple Trade.</p><br/><h4>Contact Us</h4><p>If you have any questions about this Privacy Policy, please contact us at <a href="support@ripple.com">support@ripple.com</a>.</p></section>');
	}
	return buf.join("");
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="TouCtrl" class="content"><h1>Ripple Trade Terms of Use</h1><hr/><p><strong>Last Updated</strong>: October 28, 2014</p><p>Welcome to the <strong>Ripple Trade</strong> site and services \nprovided by XRP II, LLC, Inc. (“we” or “us”).  Ripple Trade is a hosted version of the open source\nRipple software client that allows users to access the decentralized Ripple transaction protocol\npayment network ("Ripple Protocol").  Ripple Trade also provides a data storage service (“Blobvault”) \nthat facilitates Ripple Trade transactions and allows users to store and share information with gateways\nand other users of the Ripple Protocol. Source code for Ripple Trade and related software is \ndeveloped by Ripple Labs, Inc. and available\nfree of charge under open source software license agreements at <a href="https://github.com/ripple">https://github.com/ripple</a>.  We hope\nyou find Ripple Trade to be useful as a tool to access and use the Ripple Protocol.</p><p>Please read these Terms of Use <strong>"Terms"</strong> carefully as they explain your and\nour respective rights and responsibilities associated with your access to, and use of, Ripple Trade.\nWe reserve the right to change or modify these Terms at any time and in our sole discretion. \nIf we make changes to these Terms, we will provide notice of such changes by posting the revised \nTerms to the Ripple Trade website and updating the “Last Updated” date above.  We may also, \nin our sole discretion, provide additional notice, such as by sending an email notification \nand/or by posting a notice on the homepage of the Ripple Trade website. Your continued use \nof Ripple Trade following our provision of any such notice will confirm your acceptance \nof the revised Terms. If you do not agree to the amended Terms, you may not continue accessing\nor using Ripple Trade.</p><p>1. <strong>RIPPLE PROTOCOL</strong>. You understand that Ripple Trade allows you to interact directly\nwith the Ripple Protocol to create a Ripple Protocol wallet (“Ripple Wallet”), initiate payments\npostings to the Ripple Protocol as well as view transaction histories and balances available via the\nRipple Protocol.  You understand that Ripple Trade itself does not process payments, or hold\ntransaction histories and balances and is merely a tool for initiating actions that occur within the\nRipple Protocol and viewing the record of those actions.  You understand that actual payments are\nprocessed via the Ripple Protocol, not Ripple Trade, and that resulting balances shown in Ripple\nTrade are (i) actually held by third parties or (ii) in the case of XRP, held through a chain of\ncustody documented on the Ripple Protocol public ledger (“The Ledger”).  You acknowledge and agree\nthat we have no control, responsibility or authority over such third parties.  Ripple Trade merely\ninteroperates with such entities via the Ripple Protocol.  For more information about the Ripple\nProtocol, including Ripple Protocol transaction fees, please visit the <a href="https://ripple.com/wiki/">Ripple Wiki</a>.  You further\nacknowledge and agree that transactions you initiate within the Ripple Protocol will be available to\nthe public on the Internet via The Ledger.  Ripple Trade allows you to view the public payments data\nposted for Ripple Wallets – including your own Ripple Wallet.  Once data is shared to the Ripple\nProtocol, neither Ripple Trade nor any third party may selectively censor or blacklist access to, and\nsubsequent use of, such data.</p><p>1. <strong>BLOBVAULT; PRIVACY POLICY</strong>. The Blobvault is Ripple Trade’s hosted data storage \nservice.  The Blobvault has three separate components: (a) a publicly available component, which \ncontains the public address associated with a Ripple Wallet and the associated Ripple name; \n(b) an encrypted storage component, which contains the private key associated with a Ripple \nWallet and the contact field information of any recipient of a balance sent via Ripple Trade \n(such as the Ripple name or Ripple public address of the recipient); and (c) an identification \ndatabase, which includes personal information about the Ripple Trade user (such as email address\n provided when registering for Ripple Trade and any personal information submitted via Ripple Trade\n for identity verification purposes).  For information about how we collect, use and share\n Blobvault data, please refer to the Ripple Trade Privacy Policy.   </p><p>2. <strong>THIRD-PARTY SERVICES</strong>. You may be able to access and use third-party content and\nservices displayed via Ripple Trade, such as gateway services (“Third-Party Services”), including\nThird-Party Services that allow you to fund your Ripple Wallet by purchasing and sending balances \nof digital and real currencies directly to your Ripple Wallet.  When using any Third-Party\nServices, you are interacting directly with such services, not us, and you agree to comply with any\nterms and conditions applicable to such services.  Ripple Trade may display or otherwise highlight\ncertain Third-Party Services for your convenience, but we do not endorse any Third-Party Services.\nYou are solely responsible for your use of any Third-Party Services.  We are not a party to, make no\nrepresentations or warranties as to, and have no responsibility or liability with respect to any of\nyour communications, transactions, interactions, disputes or any relations whatsoever between you and\nany third party providing the Third-Party Services, including any fees that may be charged to you in\nconnection with your use of any Third-Party Services.</p><p>3. <strong>SECRET KEY AND PASSWORD</strong>. Your Ripple Wallet and your Blobvault are protected from \nunauthorized access and use by others via a secret key and password held by you \nand not Ripple Trade. RIPPLE TRADE CANNOT ASSIST YOU IN RECOVERING YOUR SECRET KEY AND PASSWORD. \nIT IS YOUR SOLE RESPONSIBILITY TO KEEP YOUR SECRET KEY AND PASSWORD PROTECTED FROM UNAUTHORIZED \nDISCOVERY. Ripple Trade is not responsible for the consequences of another party accessing and\n using your Ripple Wallet or your Blobvault data because it is your sole responsibility to keep \nyour secret key and password from being accessed and used by unauthorized third parties.</p><p>4. <strong>BLOCKING</strong>. You understand and agree that we may block excessive or abusive use of\nRipple Trade from a particular IP address at any point in time and for any length of time, in our\nsole discretion.  Even if we block access to Ripple Trade, you may still access your Ripple Wallet\nvia other Ripple client software.</p><p>5. <strong>ACCEPTABLE USE</strong>. You agree not to use Ripple Trade to violate any applicable law,\ncontract, or third-party right or to engage in any transaction involving illegal products or\nservices.  You further agree not to:</p><p>- Use Ripple Trade in any manner that could interfere with, disrupt, negatively affect or inhibit\nother users from fully enjoying Ripple Trade, or that could damage, disable, overburden or impair\nthe functioning of Ripple Trade in any manner;</p><p>- Attempt to circumvent any security techniques we employ, or attempt to access any service or area\nof Ripple Trade that you are not authorized to access;</p><p>- Introduce to Ripple Trade any virus, trojan worms, logic bombs or other harmful material; and</p><p>- Encourage or induce any third party to engage in any of the activities prohibited under this Section.</p><p>6. <strong>COPYRIGHT COMPLAINTS</strong>. If you believe anything on Ripple Trade infringes upon any\ncopyright which you own or control, you may file a notification of such infringement with our\nDesignated Agent as set forth below.</p><p>Name of Designated Agent: Anna See</p><p>Full Address of Designated Agent: 300 Montgomery St. 12th floor, San Francisco, CA 94104-3503</p><p>Telephone Number of Designated Agent: 415.967.1836</p><p>Facsimile Number of Designated Agent: 415.520.5585</p><p>E-Mail Address of Designated Agent: anna@ripple.com</p><p>7. <strong>DISCLAIMER</strong>. MANY JURISDICTIONS HAVE LAWS PROTECTING CONSUMERS AND OTHER CONTRACT\nPARTIES, LIMITING THEIR ABILITY TO WAIVE CERTAIN RIGHTS AND RESPONSIBILITIES. WE RESPECT SUCH LAWS;\nNOTHING HEREIN IS INTENDED TO WAIVE RIGHTS OR RESPONSIBILITIES THAT CANNOT BE WAIVED.</p><p>To the extent permitted by applicable law, (a) we make no promises as to Ripple Trade, its\ncompleteness, accuracy, availability, timeliness, propriety, security or reliability; (b) your\naccess and use are at your own risk, and Ripple Trade is provided “AS IS” and “AS AVAILABLE”; and\n(c) WE, OUR PARENT COMPANY AND AFFILIATES, AND OUR AND THEIR OFFICERS, DIRECTORS, EMPLOYEES\n(“XRP II, LLC ENTITIES”), DISCLAIM ALL WARRANTIES & CONDITIONS, EXPRESS OR IMPLIED, INCLUDING, BUT\nNOT LIMITED, TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR PARTICULAR PURPOSE, OR\nNON-INFRINGEMENT.</p><p>8. <strong>LIMITATION ON LIABILITY</strong>.</p><p>(A) TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL THE XRP II, LLC ENTITIES BE\nLIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS\n(E.G. OF PROFIT, REVENUE, DATA, OR GOODWILL).  Some jurisdictions do not allow the limitation or\nexclusion of liability for incidental or consequential damages, so some of the limitations of this\nsection may not apply to you.</p><p>(B) TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL THE AGGREGATE LIABILITY OF\nTHE XRP II, LLC ENTITIES, WHETHER IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE, WHETHER ACTIVE,\nPASSIVE OR IMPUTED), PRODUCT LIABILITY, STRICT LIABILITY OR OTHER THEORY, ARISING OUT OF OR RELATING\nTO THE USE OF, OR INABILITY TO USE RIPPLE TRADE OR TO THESE TERMS EXCEED $100 U.S. DOLLARS.</p><p>9. <strong>DISPUTES; INDEMNITY</strong>.  You agree (a) that any claim, cause of action and dispute\n(“Claim”) arising out of or related to these Terms or your Ripple Trade use is governed by California\nlaw regardless of your location or any conflict or choice of law principle; (b) that any Claim must\nbe resolved exclusively by state or federal court in San Francisco, California (except we may seek\ninjunctive remedy anywhere); (c) to submit to personal jurisdiction of said courts; (d) any Claim\nfiled later than 1 year after the facts giving rise to such Claim occurred are hereby waived and shall\nbe forever barred; and (e) (except government agencies) to defend, indemnify and hold harmless each\nand all of the XRP II, LLC Entities for any damage, loss, and expense (including, but not limited to,\nattorneys’ fees) arising from any Claim related to these Terms or your Ripple Trade use.</p><p>10. <strong>OTHER TERMS</strong>. These Terms contains the entire agreement, and supersedes all prior\nand contemporaneous understandings between the parties regarding Ripple Trade.  These Terms do not alter\nthe terms or conditions of any other agreement you may have with us for any other product or service\nor otherwise.  In the event of any conflict between these Terms and any other agreement you may have with\nus, the terms of that other agreement will control only if these Terms is specifically identified and\ndeclared to be overridden by such other agreement.  Our failure or delay in exercising any right, power\nor privilege under these Terms will not operate as a waiver thereof.  The invalidity or unenforceability\nof any term in these Terms will not affect the validity or enforceability of any other term of these Terms,\nall of which will remain in full force and effect.</p></section>');
	}
	return buf.join("");
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="NotFoundCtrl" class="col-xs-12 content"><div class="not-found-wrapper-row row"><div class="col-xs-12 text-center"><h3 class="not-found-title">404</h3><p class="not-found-text">Page cannot be found</p><hr/><p><a');
	buf.push(attrs({ 'href':(location.pathname) }, {"href":true}));
	buf.push('>Return to Ripple Trade homepage</a></p></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="AppsCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><group ng-hide="!connected || loadState.account" class="disconnected"><p class="literal">ロード中...</p></group><div ng-show="connected &amp;&amp; loadState.account"><div class="row"><div class="col-xs-12"><p class="literal">Ripple Apps</p><hr/></div></div><div ng-show="userBlob.data.apps" ng-repeat="app in userBlob.data.apps"><div class="row"><div class="col-sm-10">{{app.name}}</div><div class="col-sm-2"><button ng-click="remove(app.rippleAddress)" class="btn btn-sm btn-block btn-danger">Remove</button></div></div><div class="row"><div class="col-xs-12"><hr/></div></div></div><form name="addForm" ng-submit="add()" class="row row-padding-small"><div class="col-xs-12"><label for="rippleAddress">Add an app</label></div><div class="col-sm-4"><input id="rippleAddress" name="rippleAddress" type="text" placeholder="App Ripple Address" ng-model="app.rippleAddress" required="required" rp-dest="rp-dest" rp-dest-address="rp-dest-address" class="form-control"/><div rp-errors="rippleAddress" class="errorGroup"><div rp-error-on="required" class="error">Ripple アドレスを入力してください。</div><div rp-error-on="rpDest" class="error">有効な Ripple アドレスを入力してください。</div></div></div><div class="col-sm-2"><button type="submit" ng-disabled="addForm.$invalid" class="btn btn-block btn-success">Add</button></div><div ng-show="success &amp;&amp; !error" class="col-sm-2 success">Awesome!</div><div ng-show="error" class="col-sm-2 error">{{error}}</div></form></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="SuCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><group ng-hide="!connected || loadState.account" class="disconnected"><p class="literal">ロード中...</p></group><div ng-show="connected &amp;&amp; loadState.account"><h3>Welcome Super User</h3><p class="literal">アカウント</p><hr/><form name="accountForm" ng-submit="accountSet()"><div class="row"><div class="col-sm-6"><input name="domain" ng-model="account.domain" class="form-control"/></div><div class="col-sm-3"><button type="submit" class="btn btn-block btn-success">Change Domain</button></div></div></form></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<section ng-controller="GoldCtrl" class="col-xs-12 content"><group ng-hide="connected" class="disconnected"><p class="literal">この画面を見るにはオンラインでなければなりません。</p></group><div ng-show="\'web\' === client &amp;&amp; !loadingAccount &amp;&amp; !account.Balance &amp;&amp; loadState.account &amp;&amp; connected"><div class="auth-attention banner"><h4>Welcome to Ripple Trade! Your account needs to be activated. You can activate it in 3 ways:</h4><ul><li>Have another user send XRP to your Ripple name (~{{userCredentials.username}}).&#32<a href="https://support.ripplelabs.com/hc/en-us/articles/202964876-Activating-Your-Wallet" target="_blank">Suggestions for getting XRP.</a></li><li><a href="#/btc">Deposit BTC</a></li><!--li(l10n)<a href="#/usd">Deposit USD (US users only)</a>--></ul></div></div><div ng-show="connected" class="row"><div class="col-sm-12"><group ng-show="mode==&quot;granting&quot; &amp;&amp; account.Balance" class="mode-granted wide"><group ng-show="tx_result!==&quot;cleared&quot;" class="pending"><h2 class="tx-status">Connecting the GBI gateway to your Ripple account...</h2></group><group ng-show="tx_result==&quot;cleared&quot;" class="result-success"><h2 class="tx-status">ゲートウェイを接続しました</h2></group><group ng-show="tx_result==&quot;error&quot;" class="result-error"><h2 class="tx-status">ゲートウェイの接続に失敗しました！</h2><p>ゲートウェイへの接続の際に問題が発生しました。後ほど再度お試しください。</p></group><group ng-show="tx_result==&quot;malformed&quot;" class="result-malformed"><h2 class="tx-status">ゲートウェイへの接続の際に問題が発生しました。後ほど再度お試しください。</h2><p>要求は無効です。理由: {{engine_result}} - {{engine_result_message}}</p></group><group ng-show="tx_result==&quot;failed&quot;" class="result-failed"><h2 class="tx-status">ゲートウェイの接続に失敗しました！</h2><p ng-switch on="engine_result"><span ng-switch-when="terNO_LINE">この通貨に対してゲートウェイが接続されていません。</span><span ng-switch-when="tecINSUF_RESERVE_LINE">ゲートウェイに接続するために必要な準備金が不足しています。</span><span ng-switch-when="tecNO_LINE_INSUF_RESERVE">You must have at\nleast {{account.reserve_to_add_trust | rpamount:0}} XRP to connect a gateway.&#32;<a href="http://ripple.com/help/#reserve">もっと読む</a></span><span ng-switch-default="ng-switch-default">Gateway connection failed to clear,\nreason: {{engine_result_message}}</span></p></group></group></div><div class="col-sm-3"><div class="currencies"><a href="#/xrp" ng-class="{active: $route.current.tabName == \'xrp\'}">XRP</a><a href="#/btc" ng-class="{active: $route.current.tabName == \'btc\'}" ng-show="\'web\' === client">BTC</a><!--a(href="#/usd", ng-class="{active: $route.current.tabName == \'usd\'}", l10n) USD (US only)--><a href="#/gold" ng-class="{active: $route.current.tabName == \'gold\'}">Gold</a><a href="#/trust" ng-class="{active: $route.current.tabName == \'trust\'}">ゲートウェイ</a></div><a href="https://support.ripplelabs.com/hc/en-us/articles/202847686-Gateway-Information" target="_blank">ゲートウェイについてより学んでください</a></div><div class="col-sm-9 list"><div class="nameLine">Gold Deposit</div><div class="gateway row"><div class="col-md-3"><div class="title">ゲートウェイ</div><div class="description">Gold Bullion International (GBI)&#32;<a href="http://www.bullioninternational.com/" target="_blank">www.bullioninternational.com</a></div></div><div class="col-md-3"><div class="title">Availability</div><div class="description">All countries</div></div><div class="col-md-3"><div class="title">Fees</div><div class="description">0.5% per year&#32;</div></div><div class="col-md-3"><div class="title">Rating</div><div class="description"><a href="https://coinist.co/ripple/assets/xau-gbi" target="_blank">read reviews</a></div></div></div><div class="row"><div class="col-xs-12 col-md-8 col-lg-6"><div ng-show="!gbiConnected" class="tos descriptor">Ripple Trade has partnered with GBI to provide easy access to\nXAU. By continuing, you are allowing GBI to hold gold on your behalf.</div></div></div><div class="row"><div class="col-xs-9 col-sm-5 col-md-4"><button ng-show="!gbiConnected &amp;&amp; !loading" type="submit" ng-click="save_account()" ng-disabled="!account.Balance" class="btn btn-large">Add GBI</button><button ng-show="!gbiConnected &amp;&amp; loading" type="submit" ng-disabled="loading" class="btn btn-large">Adding...</button><button ng-show="showInstructions &amp;&amp; gbiConnected" type="submit" ng-click="toggle_instructions()" class="btn btn-large">Hide instructions</button><button ng-show="gbiConnected &amp;&amp; !showInstructions" type="submit" ng-click="toggle_instructions()" class="btn btn-large">Show instructions</button></div><div ng-hide="loading" class="connect col-xs-10 col-sm-8 col-md-8"><div ng-show="!gbiConnected &amp;&amp; account.Balance" class="description fa fa-times">Not connected</div><div ng-show="gbiConnected &amp;&amp; account.Balance" class="description fa fa-check">Connected</div><div ng-show="!account.Balance" class="description">Your account has to be activated before you can add a gateway account.</div></div></div><div ng-show="showInstructions &amp;&amp; gbiConnected" class="row"><div class="instructions col-md-10"><a id="hide" href="" ng-click="toggle_instructions()" class="dismiss"> ×</a><div class="title">Deposit</div><div class="description">GBI does not currently support direct deposits. You can&#32;<a href="#/trade">trade XAU(-.5%pa)</a>&#32;or&#32;<a href="#/exchange">convert some of your current holdings</a>.</div><div class="title">Withdrawal</div><div class="description">You can redeem the physical gold in 1 oz increments.\nTo do so, you\'ll need to&#32;<a href="https://direct.bullioninternational.com/PortalApplyNow/OpenAccount" target="_blank">create an account on GBI\'s website</a>&#32;and arrange to have the gold shipped to you.</div></div></div></div></div></section>');
	}
	return buf.join("");
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(107);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(110);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(109)))

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<nav role="navigation" ng-controller="NavbarCtrl" class="navbar"><div class="mainnav"><div class="container"><div class="navbar-header"><div class="navbar-toggle snapper-toggle"><a href="" class="fa fa-bars"></a></div><a id="logo" href="#/" title="Ripple" class="navbar-brand hidden-xs"></a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav topMenu"><li id="nav-wallet" ng-class="{active: $route.current.mainMenu == \'wallet\'}"><a href="#/balance">アカウント情報</a></li><li id="nav-send" ng-class="{active: $route.current.mainMenu == \'send\'}"><a href="#/send">送金</a></li><li id="nav-exchange" ng-class="{active: $route.current.mainMenu == \'exchange\' || $route.current.mainMenu == \'trade\'}" ng-show="!ripple_exchange_selection_trade"><a href="#/exchange">両替</a></li><li id="nav-exchange" ng-class="{active: $route.current.mainMenu == \'exchange\' || $route.current.mainMenu == \'trade\'}" ng-show="ripple_exchange_selection_trade"><a href="#/trade">両替</a></li><li id="nav-fund" ng-class="{active: $route.current.mainMenu == \'fund\'}"><a href="#/xrp">資金</a></li></ul><ul class="nav navbar-nav navbar-right"><li ng-hide="\'desktop\' === client"><a href="#/account/public">~{{userCredentials.username}}</a></li><li class="dropdown notifications-dropdown"><a ng-click="read()" class="dropdown-toggle fa fa-bell"><div ng-show="unseenNotifications.count" class="number">{{unseenNotifications.count}}</div></a><ul id="notifications" class="dropdown-menu"><li ng-hide="loadState.transactions" class="message">ロード中...</li><li ng-show="loadState.transactions &amp;&amp; !notifications.length" class="message">新着通知はありません。</li><li ng-repeat="entry in notifications" ng-class="{unseen: entry.unseen}" rp-link-tx="entry.hash" ng-show="notifications.length" class="notification"><div ng-switch on="entry.transaction.type" class="desc"><div ng-switch-when="sent" class="transaction"><span><span title="{{entry.transaction.counterparty}}" class="address"> {{entry.transaction.counterparty | rpcontactnamefull | rpripplename: {tilde: true} }}</span> さんに <strong class="nowrap"> {{entry.transaction.amount | rpamount}} {{entry.transaction.amount | rpcurrency}}</strong> を送金しました。</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="received" class="transaction"><span title="{{entry.transaction.counterparty}}" class="address"><span>{{entry.transaction.counterparty | rpcontactnamefull | rpripplename: {tilde: true} }}</span> sent you<strong class="nowrap"> {{entry.transaction.amount | rpamount:{reference_date:entry.dateRaw} }} {{entry.transaction.amount | rpcurrency}}</strong></span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="exchange" class="transaction">');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="trusted" class="transaction"><span title="{{entry.transaction.counterparty}}" class="address">{{entry.transaction.counterparty | rpcontactname}} は以下の金額のため、信用を与えました。</span><strong class="nowrap"> {{entry.transaction.amount | rpamount}}\n{{entry.transaction.amount | rpcurrency}}</strong>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="trusting" class="transaction"><span>あなたは今、ゲートウェイ <span title="{{entry.transaction.counterparty}}" class="address">{{entry.transaction.counterparty | rpcontactname}}</span><span l10n-inc="l10n-inc"> for </span><strong class="nowrap">{{entry.transaction.amount | rpamount:{reference_date:entry.dateRaw} }}\n{{entry.transaction.amount | rpcurrency}}</strong>に接続しました</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="offernew" class="transaction">');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="offercancel" class="transaction"><span><strong class="nowrap">{{entry.transaction.pays | rpamount}}\n{{entry.transaction.pays | rpcurrency}}</strong> を <strong class="nowrap">{{entry.transaction.gets | rpamount}}\n{{entry.transaction.gets | rpcurrency}}</strong> で受け取る注文をキャンセルしました。</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="accountset" class="transaction">アカウントの詳細が更新されました</div><div ng-switch-when="rippling" class="transaction"><span>Rippling</span>');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div><div ng-switch-when="failed" class="transaction">取引に失敗しました</div><div ng-switch-default="ng-switch-default" class="transaction">');
	var __val__ = __webpack_require__(105)()
	buf.push(null == __val__ ? "" : __val__);
	buf.push('</div></div><div class="date">{{entry.date | rpfromnow}}</div></li><li ng-show="notifications.length" class="history"><a href="#/history">全履歴を見る</a></li></ul></li><li class="settings"><a class="dropdown-toggle fa fa-cog"></a><ul class="dropdown-menu"><li><a href="#/account/public"><i class="icon-profile"></i> Account</a></li><li class="divider"></li><li><a href="#/security"><i class="icon-settings"></i> Settings</a></li><li class="divider"></li><li><a ng-click="logout()" class="logout"><i class="icon-logout"></i> Log Out</a></li></ul></li></ul></div></div></div><div ng-show="$route.current.mainMenu == \'wallet\'" class="subnav"><div class="container"><ul><li ng-class="{active: $route.current.tabName == \'balance\'}"><a href="#/balance">残高</a></li><li ng-class="{active: $route.current.tabName == \'history\'}"><a href="#/history">入出金明細</a></li><li ng-class="{active: $route.current.tabName == \'contacts\'}"><a href="#/contacts">相手先</a></li></ul></div></div><div ng-show="$route.current.mainMenu == \'exchange\' || $route.current.mainMenu == \'trade\'" class="subnav"><div class="container"><ul><li ng-class="{active: $route.current.tabName == \'trade\'}"><a href="#/trade">取引</a></li><li ng-class="{active: $route.current.tabName == \'exchange\'}"><a href="#/exchange">両替</a></li></ul></div></div><div ng-if="recovered" ng-show="recovered" class="auth-attention banner text-center"><h4>新しいパスワードを使って、アカウントの復元と暗号化に成功しました！</h4><a href="#" ng-click="recovered = false">閉じる</a></div></nav>');
	}
	return buf.join("");
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(106);

	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
	attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
	var buf = [];
	with (locals || {}) {
	var interp;
	buf.push('<ul ng-show="entry.effects" class="effects"><li ng-repeat="effect in entry.showEffects" ng-switch on="effect.type"><span ng-switch-when="offer_funded"><span ng-show="effect.sell" rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="effect.gets" class="amount"></span> を <span rp-pretty-amount="effect.pays" class="amount"></span> で売りました。</span><span ng-hide="effect.sell" rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="effect.pays" class="amount"></span> を <span rp-pretty-amount="effect.gets" class="amount"></span> で買いました。</span>(<span>価格</span><span>:<strong> {{effect.price | rpamount:{precision: 4} }}</strong></span>).<span>この注文は応じられました。</span></span><span ng-switch-when="offer_partially_funded"><span ng-show="effect.sell" rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="effect.got" class="amount"></span> を <span rp-pretty-amount="effect.paid" class="amount"></span> で売りました。</span><span ng-hide="effect.sell" rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="effect.paid" class="amount"></span> を <span rp-pretty-amount="effect.got" class="amount"></span> で買いました。</span>(<span>価格</span><span>:<strong> {{effect.price | rpamount:{precision: 4} }}</strong></span>).<span ng-show="effect.cancelled">注文の処理されなかった部分は、資金不足のためキャンセルされました。</span><span ng-hide="effect.deleted" rp-span-spacing="rp-span-spacing">この注文は、 <span rp-pretty-amount="effect.remaining"></span> 残っています。</span></span><span ng-switch-when="offer_cancelled">注文 (<span rp-pretty-amount="effect.pays" class="amount"></span> を <span rp-pretty-amount="effect.gets" class="amount"></span> で売る・買う) が資金不足のためキャンセルされました。</span><span ng-switch-when="offer_created"><span ng-show="effect.sell" rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="effect.pays" class="amount"></span> を <span rp-pretty-amount="effect.pays" class="amount"></span> で売る注文をしました。</span><span ng-hide="effect.sell" rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="effect.pays" class="amount"></span> を <span rp-pretty-amount="effect.pays" class="amount"></span> で買う注文をしました。</span></span><span ng-switch-when="offer_bought" rp-span-spacing="rp-span-spacing"><span rp-pretty-amount="effect.got" class="amount"></span> を <span rp-pretty-amount="effect.paid" class="amount"></span> (<span l10n-inc="l10n-inc">値段</span><span>:<strong> {{effect.price | rpamount:{precision: 4} }}</strong></span>) で買いました。</span><span ng-switch-when="trust_create_local">あなたは今、ゲートウェイ <span rp-pretty-identity="effect.counterparty"></span><span l10n-inc="l10n-inc"> for </span><span rp-pretty-amount="effect.limit"></span>に接続しました</span><span ng-switch-when="trust_create_remote" rp-span-spacing="rp-span-spacing"><span rp-pretty-identity="effect.counterparty"></span>is trusting you for<span rp-pretty-amount="effect.limit"></span>.</span><span ng-switch-when="trust_change_local" rp-span-spacing="rp-span-spacing"><span rp-pretty-identity="effect.counterparty"></span> のための <span> {{effect.limit | rpcurrency}}</span> の与信を <span>{{effect.prevLimit | rpamount:{reference_date: entry.dateRaw} }}</span> から <span>{{effect.limit | rpamount:{reference_date: entry.dateRaw} }}</span> へ変更しました。</span><span ng-switch-when="trust_change_remote" rp-span-spacing="rp-span-spacing"><span rp-pretty-identity="effect.counterparty"></span>changed the<span>{{effect.limit | rpcurrency}}</span>trust from<span>{{effect.prevLimit | rpamount:{reference_date: entry.dateRaw} }}</span>to<span>{{effect.limit | rpamount:{reference_date: entry.dateRaw} }}</span>.</span><span ng-switch-when="trust_change_balance" rp-span-spacing="rp-span-spacing">あなたと <span rp-pretty-identity="effect.counterparty"></span> の与信バランスは、<span rp-pretty-amount="effect.amount"></span> によって変更されました。</span><span ng-switch-when="balance_change" rp-span-spacing="rp-span-spacing">残高は <span rp-pretty-amount="effect.amount"></span> によって変更されました。</span></li></ul>');
	}
	return buf.join("");
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * Jade - runtime
	 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	/**
	 * Lame Array.isArray() polyfill for now.
	 */

	if (!Array.isArray) {
	  Array.isArray = function(arr){
	    return '[object Array]' == Object.prototype.toString.call(arr);
	  };
	}

	/**
	 * Lame Object.keys() polyfill for now.
	 */

	if (!Object.keys) {
	  Object.keys = function(obj){
	    var arr = [];
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        arr.push(key);
	      }
	    }
	    return arr;
	  }
	}

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = function merge(a, b) {
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    ac = ac.filter(nulls);
	    bc = bc.filter(nulls);
	    a['class'] = ac.concat(bc).join(' ');
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function nulls(val) {
	  return val != null;
	}

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 * @api private
	 */

	exports.attrs = function attrs(obj, escaped){
	  var buf = []
	    , terse = obj.terse;

	  delete obj.terse;
	  var keys = Object.keys(obj)
	    , len = keys.length;

	  if (len) {
	    buf.push('');
	    for (var i = 0; i < len; ++i) {
	      var key = keys[i]
	        , val = obj[key];

	      if ('boolean' == typeof val || null == val) {
	        if (val) {
	          terse
	            ? buf.push(key)
	            : buf.push(key + '="' + key + '"');
	        }
	      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	        buf.push(key + "='" + JSON.stringify(val) + "'");
	      } else if ('class' == key && Array.isArray(val)) {
	        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
	      } else if (escaped && escaped[key]) {
	        buf.push(key + '="' + exports.escape(val) + '"');
	      } else {
	        buf.push(key + '="' + val + '"');
	      }
	    }
	  }

	  return buf.join(' ');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	exports.escape = function escape(html){
	  return String(html)
	    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;');
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno){
	  if (!filename) throw err;

	  var context = 3
	    , str = __webpack_require__(108).readFileSync(filename, 'utf8')
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var files = {};
	exports.setFile = function(filename, content) { files[filename] = content; }
	exports.readFileSync = function(filename) { return files[filename] || ""; }

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	}

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }
/******/ ])