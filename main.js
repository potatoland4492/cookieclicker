let CookieStore = {
  // stats: {
  //   tenK: false,
  //   million: false,
  //   billion: false,
  //   trillion: false
  // },
  cookies: '0',
  clickpower: '1',
  generator: '1',
  costSlope: function (type) {
    switch (type) {
      case 'clickpower':
        if (Store.clickpower < 100) {
          return 25;
        } else if (Store.clickpower < 1000) {
          return 50;
        } else if (Store.clickpower < 10000) {
          return 100;
        } else if (Store.clickpower < 1000000) {
          return 10000;
        } else if (Store.clickpower < 1000000000) {
          return 1000000;
        } else if (Store.clickpower < 1000000000000) {
          return 1000000000;
        }
        break;
      case 'generator':
        if (Store.generator < 100) {
          return 25;
        } if (Store.generator < 1000) {
          return 50;
        } else if (Store.generator < 10000) {
          return 100;
        } else if (Store.generator < 1000000) {
          return 10000;
        } else if (Store.generator < 1000000000) {
          return 1000000;
        } else if (Store.generator < 1000000000000) {
          return 1000000000;
        }
        break;
      default:
        return null;
        break;
    }
  },
  addCookie: function () {
    Store.cookies = parseInt(Store.cookies) + parseInt(Store.clickpower);
  },
  upgradeClickpower: function () {
    if (parseInt(Store.cookies) < Store.costSlope('clickpower') * parseInt(Store.clickpower)) {
      alert(`You need ${parseInt(Store.clickpower * Store.costSlope('clickpower'))} cookies to upgrade clickpower (${Store.costSlope('clickpower') * parseInt(Store.clickpower) - parseInt(Store.cookies)} more).`)
    } else {
      Store.cookies = parseInt(Store.cookies) - Store.costSlope('clickpower') * parseInt(Store.clickpower);
      Store.clickpower = parseInt(Store.clickpower) + 1;
    }
  },
  upgradeGenerator: function () {
    if (parseInt(Store.cookies) < Store.costSlope('generator') * parseInt(Store.generator)) {
      alert(`You need ${parseInt(Store.generator * Store.costSlope('generator'))} cookies to upgrade the generator (${Store.costSlope('generator') * parseInt(Store.generator) - parseInt(Store.cookies)} more).`)
    } else {
      Store.cookies = parseInt(Store.cookies) - Store.costSlope('generator') * parseInt(Store.generator);
      Store.generator = parseInt(Store.generator) + 1;
    }
  },
  clearData: function () {
    if (prompt('Are you sure? This will reset your progress! Type an UPPERCASE letter Y to clear.') === 'Y') {
      clearInterval(saveInterval);
      localStorage.clear();
      location.reload();
    } else {
      alert('Aborted, data not cleared.');
    }
  }
};

if (localStorage.getItem('cookies') && localStorage.getItem('clickpower') && localStorage.getItem('generator')) {
	Store.cookies = localStorage.getItem('cookies');
	Store.clickpower = localStorage.getItem('clickpower');
	Store.generator = localStorage.getItem('generator');
}

let saveInterval = setInterval(function () {
	localStorage.setItem('cookies', Store.cookies);
	localStorage.setItem('clickpower', Store.clickpower);
	localStorage.setItem('generator', Store.generator);
}, 10000);

setInterval(function () {
	document.getElementById('addcookie-btn').innerHTML = `<span class=\"code\">+${parseInt(Store.clickpower)}</span> <img class=\"cookie-img\" src=\"cookie.png\">`
}, 1);

setInterval(function () {
	document.getElementById('cookiecount-span').innerHTML = Store.cookies + ' <img class=\"cookie-img\" src=\"cookie.png\">';
}, 1);

setInterval(function () {
	document.getElementById('addclickpower-btn').innerHTML = 'Upgrade Clickpower (currently <span class=\"code\">Lvl ' + Store.clickpower + '</span>, costs <span class=\"code\">' + parseInt(Store.clickpower) * Store.costSlope('clickpower') + '</span> <img class=\"cookie-img\" src=\"cookie.png\"> to upgrade)';
}, 1);

setInterval(function () {
	document.getElementById('addgenerator-btn').innerHTML = 'Upgrade Generator (currently <span class=\"code\">Lvl ' + Store.generator + '</span>, costs <span class=\"code\">' + parseInt(Store.generator) * Store.costSlope('generator') + '</span> <img class=\"cookie-img\" src=\"cookie.png\"> to upgrade)';
}, 1);

setInterval(function () {
	Store.cookies = parseInt(Store.cookies) + (parseInt(Store.generator));
}, 500);

// document.addEventListener('keydown', (e) => {
// 	if (e.key === '~' && e.altKey && e.ctrlKey) {
// 		Store.cookies = 1000000;
// 	} else if (e.key === '\\' && e.altKey && e.ctrlKey) {
// 		Store.clickpower = 1000000;
// 	} else if (e.key === '|' && e.altKey && e.ctrlKey) {
// 		Store.generator = 1000000;
// 	}
// });

// setInterval(function () {
// 	let div;
// 	if (Store.stats.tenK === false && Store.cookies >= 10000) {
// 		div = document.createElement('div').setAttribute('class', 'animateStats');
// 		div.innerHTML = "Ten thousand <img class=\"cookie-img\" src=\"cookie.png\">? Wow!";
// 		Store.stats.tenK = true;
// 		setTimeout(function () { div.remove(); }, 2500);
// 	}
// 	if (Store.stats.million === false && Store.cookies >= 1000000) {
// 		div = document.createElement('div').setAttribute('class', 'animateStats');
// 		div.innerHTML = "One million <img class=\"cookie-img\" src=\"cookie.png\">? Nice!";
// 		Store.stats.million = true;
// 		setTimeout(function () { div.remove(); }, 2500);
// 	}
// 	if (Store.stats.billion === false && Store.cookies >= 1000000000) {
// 		div = document.createElement('div').setAttribute('class', 'animateStats');
// 		div.innerHTML = "A billion <img class=\"cookie-img\" src=\"cookie.png\">? Epic!";
// 		Store.stats.billion = true;
// 		setTimeout(function () { div.remove(); }, 2500);
// 	}
// 	if (Store.stats.trillion === false && Store.cookies >= 1000000000000) {
// 		div = document.createElement('div').setAttribute('class', 'animateStats');
// 		div.innerHTML = "ONE MILLION <img class=\"cookie-img\" src=\"cookie.png\">? Keep on clicking!";
// 		Store.stats.trillion = true;
// 		setTimeout(function () { div.remove(); }, 2500);
// 	}
// }, 1);