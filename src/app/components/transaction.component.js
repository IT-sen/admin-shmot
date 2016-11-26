/**
 * Created by Ievgenii Sen on 26.11.16.
 */

(function () {
    'use strict';

    angular
        .module('shmotAdmin')
        .component('transaction', {
            templateUrl: 'views/components/transaction.html',
            controller: TransactionController,
            controllerAs: 'vm'
        });

    function TransactionController(Finance) {
        var vm = this;

        console.log(Finance.getTransactionsList());
    }

})();