/* Kumquat Hub Content Render
 * 
 **/

(function (undefined) {

    pl.extend(ke.app.render, {
        organize: {},

        events: {
            listen: function () {
                pl('.' + ke.getPrefix() + 'listen-original').unbind().bind('click', ke.particles.listen.model.playTooltip);
                pl('.' + ke.getPrefix() + 'listen-butt0n').unbind().bind('click', ke.particles.listen.model.playTooltip);
            },

            listenSynonym: function () {
                pl('.' + ke.getPrefix() + 'listen-v-item').unbind().bind('click', ke.particles.listen.model.playTooltipSynonym);
            },

            reverseTranslation: function () {
                pl('.' + ke.getPrefix() + 'show-reversed').unbind().bind('click', ke.app.handlers.reverseTranslation);
            },

            settings: function () {
                pl('.' + ke.getPrefix() + 'settings').unbind().bind('click', ke.app.handlers.settings);
            }
        }
    });

})();