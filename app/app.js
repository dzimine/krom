angular.module('App', [])

  .controller('AppCtrl', function($rootScope, appLoading) {
    $rootScope.topScope = $rootScope;
    $rootScope.isOpen = false;
    $rootScope.$on('$routeChangeStart', function() {
      appLoading.loading();
    });
    $rootScope.sysEvents = [
      {type:'Event', target:'Global', message:'Something weirid is happenning in the system', time:1365639036},
      {type:'Task', target:'node 10.20.101.99', message:'Instance powered on: id=if443fis, ip=10.20.30.40', time:1365629036},
      {type:'Event', target:'instance 10.20.30.40', message:'Running out of storage', time:1365639036},
      {type:'Error', target:'node 10.20.101.99', message:'Cant create instance: not enough vCPU', time:1365629036},
    ];
  })

  .controller('AppHomeCtrl', function($scope, appLoading) {
    appLoading.ready();
  })

  .config(function($routeProvider) {
    $routeProvider.when('/home', {
      controller : 'AppHomeCtrl',
      templateUrl : './templates/home.html'
    }).otherwise({
      redirectTo: '/home'
    });
  })

  .factory('appLoading', function($rootScope) {
    var timer;
    return {
      loading : function() {
        clearTimeout(timer);
        $rootScope.status = 'loading';
        if(!$rootScope.$$phase) $rootScope.$apply();
      },
      ready : function(delay) {
        function ready() {
          $rootScope.status = 'ready';
          if(!$rootScope.$$phase) $rootScope.$apply();
        }

        clearTimeout(timer);
        delay = delay == null ? 500 : false;
        if(delay) {
          timer = setTimeout(ready, delay);
        }
        else {
          ready();
        }
      }
    };
  });
