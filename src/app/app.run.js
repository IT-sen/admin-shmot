/**
 * Created by Ievgenii Sen on 23.11.16.
 */

(function () {
    'use strict';

    angular
        .module('shmotAdmin')
        .run(runFunction);

    function runFunction($rootScope, $state, Auth) {
        $rootScope.user = null;

        $rootScope.$on('$stateChangeStart', checkAuth);

        function checkAuth(event, toState, toParams, fromState, fromParams, options) {
            if (toState.data === undefined || !toState.data.freeAssent) {
                Auth.$onAuthStateChanged(function(user){
                    if (!user)
                        $state.go('main.login');
                });
            }
        }
    }

})();