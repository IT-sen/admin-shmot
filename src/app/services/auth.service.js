/**
 * Created by Ievgenii Sen on 26.11.16.
 */

(function () {
    'use strict';

    angular
        .module('shmotAdmin')
        .factory('Auth', Auth);

    function Auth($firebaseAuth) {
        return $firebaseAuth();
    }

})();