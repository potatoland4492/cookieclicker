let Store = {
  cookies: '0',
  clickpower: '1',
  generator: '1',
  addCookie: function () {
    Store.cookies = parseInt(Store.cookies) + parseInt(Store.clickpower);
  },
  upgradeClickpower: function () {
    if (parseInt(Store.cookies) < 50 * parseInt(Store.clickpower)) {
      alert(`You need ${parseInt(Store.clickpower * 50)} cookies to upgrade clickpower (${50 * parseInt(Store.clickpower) - parseInt(Store.cookies)} more).`)
    } else {
      Store.cookies = parseInt(Store.cookies) - 50 * parseInt(Store.clickpower);
      Store.clickpower = parseInt(Store.clickpower) + 1;
    }
  },
  upgradeGenerator: function () {
    if (parseInt(Store.cookies) < 50 * parseInt(Store.generator)) {
      alert(`You need ${parseInt(Store.generator * 50)} cookies to upgrade the generator (${50 * parseInt(Store.generator) - parseInt(Store.cookies)} more).`)
    } else {
      Store.cookies = parseInt(Store.cookies) - 50 * parseInt(Store.generator);
      Store.generator = parseInt(Store.generator) + 1;
    }
  },
};

if (localStorage.getItem('cookies') && localStorage.getItem('clickpower') && localStorage.getItem('generator')) {
  Store.cookies = localStorage.getItem('cookies');
  Store.clickpower = localStorage.getItem('clickpower');
  Store.generator = localStorage.getItem('generator');
}

setInterval(function () {
  localStorage.setItem('cookies', Store.cookies);
  localStorage.setItem('clickpower', Store.clickpower);
  localStorage.setItem('generator', Store.generator);
}, 1);

setInterval(function () {
  document.getElementById('addcookie-btn').innerHTML = `<span class=\"code\">+${parseInt(Store.clickpower)}</span> <img class=\"cookie-img\" src=\"cookie.png\">`
}, 1);
setInterval(function () {
  document.getElementById('cookiecount-span').innerHTML = Store.cookies + ' <img class=\"cookie-img\" src=\"cookie.png\">';
}, 1);
setInterval(function () {
  document.getElementById('addclickpower-btn').innerHTML = 'Upgrade Clickpower (currently <span class=\"code\">Lvl ' + Store.clickpower + '</span>, costs <span class=\"code\">' + parseInt(Store.clickpower) * 50 + '</span> <img class=\"cookie-img\" src=\"cookie.png\"> to upgrade)';
}, 1);
setInterval(function () {
  document.getElementById('addgenerator-btn').innerHTML = 'Upgrade Generator (currently <span class=\"code\">Lvl ' + Store.generator + '</span>, costs <span class=\"code\">' + parseInt(Store.generator) * 50 + '</span> <img class=\"cookie-img\" src=\"cookie.png\"> to upgrade)';
}, 1);
setInterval(function () {
  Store.cookies = parseInt(Store.cookies) + (parseInt(Store.generator));
}, 500);
