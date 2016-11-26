/**
 * Created by Ievgenii Sen on 26.11.16.
 */

(function () {
    'use strict';

    angular
        .module('shmotAdmin')
        .factory('Finance', Finance);

    function Finance($http, $firebaseObject) {
        var vm = this,
            ref = firebase.database().ref(),
            pbKey = null,
            transactions = {
                items: [
                    {
                        name: 'dsd'
                    }
                ]
            };

        vm.getTransactionsList = getTransactionsList;

        getPbKey();

        function getPbKey() {
            pbKey = $firebaseObject(ref).pbKey;
        }

        loadingTransactionsList();

        function loadingTransactionsList() {
            $http({
                method: 'GET',
                url: 'https://api.privatbank.ua/p24api/rest_fiz',
                data: '<?xml version="1.0" encoding="UTF-8"?>'+
                '<request version="1.0">'+
                    '<merchant>'+
                        '<id>75482</id>'+
                        '<signature>5abf5c7524bc2a835acb3a9e24ce10bc5ba82a99</signature>'+
                    '</merchant>' +
                    '<data>' +
                        '<oper>cmt</oper>' +
                        '<wait>0</wait>' +
                        '<test>0</test>' +
                        '<payment id="">' +
                        '<prop name="sd" value="11.08.2013" />' +
                        '<prop name="ed" value="11.09.2013" />' +
                        '<prop name="card" value="5168742060221193" />' +
                        '</payment>' +
                    '</data>' +
                '</request>'
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });
        }

        function getTransactionsList() {
            return transactions;
        }

        return vm;
    }

})();