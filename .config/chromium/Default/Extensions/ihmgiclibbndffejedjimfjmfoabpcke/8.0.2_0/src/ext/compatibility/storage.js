(function (undefined) {

    pl.extend(ke.ext.compatibility.storage, {
        isNewUser: function () {
            return !ke.ext.util.storageUtil.isTrueOption('seen_tour');
        },

        sync: function () {
        }
    });

})();