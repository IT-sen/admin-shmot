/**
 * Created by Ievgenii Sen on 26.11.16.
 */

(function () {
    'use strict';

    angular
        .module('shmotAdmin')
        .component('register', {
            templateUrl: 'views/components/singup.html',
            controller: LoginController,
            controllerAs: 'vm'
        });

    function LoginController(Auth) {
        var vm = this;

        vm.register = register;

        function register() {
            Auth.$createUserWithEmailAndPassword(vm.email, vm.password)
                .then(function(firebaseUser) {
                    vm.message = "User created with uid: " + firebaseUser.uid;
                }).catch(function(error) {
                vm.error = error;
            });
        }
    }

})();