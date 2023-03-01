import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);


var onPlay = function(data) {
    console.log(data.seconds);
    localStorage.setItem('videoplayer-current-time', data.seconds);
  };
  player.on('timeupdate', throttle(onPlay, 1000));


player.setCurrentTime(localStorage.getItem('videoplayer-current-time')).then(function(seconds) {
  }).catch(function(error) {
    switch (error.name) {
      case 'RangeError':
          // The time is less than 0 or greater than the video's duration
          break;
      default:
          // Some other error occurred
          break;
    }
});


