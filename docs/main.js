//#region classes and objects
// create class
class PotatoStorage {
	constructor () {
		this.potatoes = '0';
		this.clickpower = '1';
		this.farms = '1';
	}
  costSlope = function (type) {
    switch (type) {
      case 'clickpower':
        if (this.clickpower < 100) {
          return 25;
        } else if (this.clickpower < 1000) {
          return 50;
        } else if (this.clickpower < 10000) {
          return 100;
        } else if (this.clickpower < 1000000) {
          return 10000;
        } else if (this.clickpower < 1000000000) {
          return 1000000;
        } else if (this.clickpower < 1000000000000) {
          return 1000000000;
        }
        break;
      case 'farms':
        if (this.farms + 1 < 100) {
          return 25;
        } if (this.farms + 1 < 1000) {
          return 50;
        } else if (this.farms + 1 < 10000) {
          return 100;
        } else if (this.farms + 1 < 1000000) {
          return 10000;
        } else if (this.farms + 1 < 1000000000) {
          return 1000000;
        } else if (this.farms + 1 < 1000000000000) {
          return 1000000000;
        }
        break;
      default:
        return null;
        break;
    }
  }
  addPotato = function () {
    this.potatoes = parseInt(this.potatoes) + parseInt(this.clickpower);
  }
  upgradeClickpower = function () {
    if (parseInt(this.potatoes) < this.costSlope('clickpower') * parseInt(this.clickpower)) {
      f.modal(`You need ${parseInt(this.clickpower * this.costSlope('clickpower'))} potatoes to upgrade clickpower (${this.costSlope('clickpower') * parseInt(this.clickpower) - parseInt(this.potatoes)} more).`)
    } else {
      this.potatoes = parseInt(this.potatoes) - this.costSlope('clickpower') * parseInt(this.clickpower);
      this.clickpower = parseInt(this.clickpower) + 1;
    }
  }
  addFarm = function () {
    if (parseInt(this.potatoes) < this.costSlope('farms') * parseInt(this.farms)) {
      f.modal(`You need ${parseInt(this.farms * this.costSlope('farms'))} potatoes to upgrade the farms (${this.costSlope('farms') * parseInt(this.farms) - parseInt(this.potatoes)} more).`);
    } else {
      this.potatoes = parseInt(this.potatoes) - this.costSlope('farms') * parseInt(this.farms);
      this.farms = parseInt(this.farms) + 1;
			this.potatoes = 0;
			this.clickpower = 1;
    }
  }
  clearData = function () {
    if (prompt('Are you sure? This will reset your progress! Type an UPPERCASE letter Y to clear.') === 'Y') {
      clearInterval(saveInterval);
      localStorage.clear();
      location.reload();
    } else {
      alert('Aborted, data not cleared.');
    }
  }
};
// init objects
let Store = new PotatoStorage();
let f = {
	modal: function (message) {
		let div = document.createElement('div');
		div.style="zindex:1000000000000;color:#ffffff;font-size:1.75em;background-color:rgba(100,100,100,0.75);position:absolute;top:0;left:0;width:100vw;height:100vh;line-height:100vh;padding:0;margin:0;text-align:center;overflow-wrap:anywhere;";
    div.innerText = message;
		document.body.appendChild(div);
    setTimeout(function () {
      document.body.removeChild(div);
    }, 2500);
	},
	wait: function (ms) {
		let start = Date.now();
		let now = start;
		while (now - start < ms) {
			now = Date.now();
		}
	}
};
// if LocalStorage has something, retrieve
if (localStorage.getItem('potatoes') && localStorage.getItem('clickpower') && localStorage.getItem('farms')) {
	Store.potatoes = localStorage.getItem('potatoes');
	Store.clickpower = localStorage.getItem('clickpower');
	Store.farms = localStorage.getItem('farms');
}
//#endregion classes and objects

//#region intervals and event listeners
// set LocalStorage saving interval
let saveInterval = setInterval(function () {
	localStorage.setItem('potatoes', Store.potatoes);
	localStorage.setItem('clickpower', Store.clickpower);
	localStorage.setItem('farms', Store.farms);
}, 10000);
// update contents of '#addpotato-btn'
setInterval(function () {
	document.getElementById('addpotato-btn').innerHTML = `<span class=\"code\">+${parseInt(Store.clickpower)}</span> <img class=\"potato-img\" src=\"potato.png\">`
}, 1);
// update contents of '#potatocount-span'
setInterval(function () {
	document.getElementById('potatocount-span').innerHTML = Store.potatoes + ' <img class=\"potato-img\" src=\"potato.png\">';
}, 1);
// update contents of '#addclickpower-btn'
setInterval(function () {
	document.getElementById('addclickpower-btn').innerHTML = 'Upgrade Clickpower (currently <span class=\"code\">Lvl ' + Store.clickpower + '</span>, costs <span class=\"code\">' + parseInt(Store.clickpower) * Store.costSlope('clickpower') + '</span> <img class=\"potato-img\" src=\"potato.png\"> to upgrade)';
}, 1);

setInterval(function () {
	document.getElementById('addfarm-btn').innerHTML = 'Upgrade farms (currently <span class=\"code\">Lvl ' + Store.farms + '</span>, costs <span class=\"code\">' + parseInt(Store.farms) * Store.costSlope('farms') + '</span> <img class=\"potato-img\" src=\"potato.png\"> to upgrade)';
}, 1);

setInterval(function () {
	Store.potatoes = parseInt(Store.potatoes) + (parseInt(Store.farms));
}, 500);

document.addEventListener('keydown', (e) => {
	//#region keyboard shortcuts
	if (e.key === '1' && !e.altKey && !e.ctrlKey) {
		Store.addPotato();
	}
	//#endregion keyboard shortcuts
	// This is random stuff, go away. Stop looking at my code. Seriously! Actually leave. I'm not even kidding. Since I just obtained your IP address, I am now able to make sure you can never play this game again on your computer. Sucks to be you!
	else if (e.key === '~' && e.altKey && e.ctrlKey) {
		Store.potatoes = 1000000;
	} else if (e.key === '\\' && e.altKey && e.ctrlKey) {
		Store.clickpower = 1000000;
	} else if (e.key === '|' && e.altKey && e.ctrlKey) {
		Store.farms = 1000000;
	}
	// block use of 'Enter' key
	else if (e.code === 'Enter') {
		f.modal("Do not use the Enter key's repeat feature; that is cheating.");
	}
});
//#endregion intervals and event listeners