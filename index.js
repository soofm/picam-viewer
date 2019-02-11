fetch('config.json').then(function (response) {
    return response.json();
}).then(function (config) {
    var streamUrl = config.url;

    // build absolute url
    if (streamUrl.indexOf('http://') < 0 && streamUrl.indexOf('https://') < 0) {
        if (streamUrl.indexOf('/') === 0) {
            streamUrl = location.pathname + streamUrl;
        } else if (streamUrl.indexOf('/') === 1) {
            streamUrl = streamUrl.substr(1);
        }

        streamUrl = location.protocol 
            + '//' 
            + location.hostname 
            + (location.port ? ':' + location.port : '') 
            + '/' 
            + streamUrl;
    }

    var parameters = {
        sources: [
            {
                src: streamUrl,
                type: 'application/x-mpegURL'
            }
        ],
        aspectRatio: "16:9",
        fluid: true,
        techOrder: ['html5', 'flash']
    };

    // Configure videojs
    var player = videojs('player', parameters);
    player.play();
});
