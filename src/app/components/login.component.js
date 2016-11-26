/**
 * Created by Ievgenii Sen on 26.11.16.
 */

(function () {
    'use strict';

    angular
        .module('shmotAdmin')
        .component('login', {
            templateUrl: 'views/components/singin.html',
            controller: LoginController,
            controllerAs: 'vm'
        });

    function LoginController($state, Auth) {
        var vm = this;

        vm.auth = auth;

        function auth() {
            Auth.$signInWithEmailAndPassword(vm.email, vm.password)
                .then(function(firebaseUser) {
                    vm.message = "User created with uid: " + firebaseUser.uid;
                    $state.go('main');
                }).catch(function(error) {
                vm.error = error;
            });
        }
    }

})();