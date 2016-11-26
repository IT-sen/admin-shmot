/**
 * Created by Ievgenii Sen on 23.11.16.
 */

(function () {
    'use strict';

    angular
        .module('shmotAdmin')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state({
            name: 'main',
            abstract: true,
            templateUrl: 'views/main.html',
        });

        $stateProvider.state({
            name: 'login',
            url: '/login',
            template: '<login></login>',
            data: {
                'freeAssent': true
            }
        });

        $stateProvider.state({
            name: 'register',
            url: '/register',
            template: '<register></register>',
            data: {
                'freeAssent': true
            }
        });

        $stateProvider.state({
            name: 'main.home',
            url: '/',
            templateUrl: 'views/pages/home.html'
        });

        $stateProvider.state({
            name: 'main.finance',
            url: '/finance',
            templateUrl: 'views/pages/finance.html'
        });
    }

})();