exports.PotatoStorage = class PotatoStorage {
	constructor() {
		// init properties
		this.potatoes = '0';
		this.clickpower = '1';
		this.farms = '1';
		// if LocalStorage has something, retrieve
		if (localStorage.getItem('potatoes') && localStorage.getItem('clickpower') && localStorage.getItem('farms')) {
			this.potatoes = localStorage.getItem('potatoes');
			this.clickpower = localStorage.getItem('clickpower');
			this.farms = localStorage.getItem('farms');
		}
	}
	// how much costs
	calculateCost(type) {
		switch (type) {
			case 'clickpower':
				if (parseInt(this.clickpower) < 100) {
					return 25 * parseInt(this.clickpower);
				} else if (parseInt(this.clickpower) < 1000) {
					return 50 * parseInt(this.clickpower);
				} else if (parseInt(this.clickpower) < 10000) {
					return 100 * parseInt(this.clickpower);
				} else if (parseInt(this.clickpower) < 1000000) {
					return 10000 * parseInt(this.clickpower);
				} else if (parseInt(this.clickpower) < 1000000000) {
					return 1000000 * parseInt(this.clickpower);
				} else if (parseInt(this.clickpower) < 1000000000000) {
					return 1000000000 * parseInt(this.clickpower);
				}
				break;
			case 'farms':
				if (parseInt(this.farms) < 100) {
					return 25 * parseInt(this.farms);
				} if (parseInt(this.farms) < 1000) {
					return 50 * parseInt(this.farms);
				} else if (parseInt(this.farms) < 10000) {
					return 100 * parseInt(this.farms);
				} else if (parseInt(this.farms) < 1000000) {
					return 10000 * parseInt(this.farms);
				} else if (parseInt(this.farms) < 1000000000) {
					return 1000000 * parseInt(this.farms);
				} else if (parseInt(this.farms) < 1000000000000) {
					return 1000000000 * parseInt(this.farms);
				}
				break;
			default:
				return null;
		}
	}
	// self-explanatory
	addPotato() {
		this.potatoes = parseInt(this.potatoes) + parseInt(this.clickpower);
	}
	// self-explanatory
	upgradeClickpower() {
		if (parseInt(this.potatoes) < this.calculateCost('clickpower')) {
			f.modal(`You need ${parseInt(this.calculateCost('clickpower'))} potatoes to upgrade clickpower (${this.calculateCost('clickpower') - parseInt(this.potatoes)} more).`)
		} else {
			this.potatoes = parseInt(this.potatoes) - this.calculateCost('clickpower');
			this.clickpower = parseInt(this.clickpower) + 1;
		}
	}
	// self-explanatory
	addFarm() {
		if (parseInt(this.potatoes) < this.calculateCost('farms')) {
			f.modal(`You need ${parseInt(this.farms * this.calculateCost('farms'))} potatoes to upgrade the farms (${this.calculateCost('farms') - parseInt(this.potatoes)} more).`);
		} else {
			this.potatoes = parseInt(this.potatoes) - this.calculateCost('farms');
			this.farms = parseInt(this.farms) + 1;
			this.potatoes = 0;
			this.clickpower = 1;
		}
	}
	// clear data from LocalStorage and reload
	clearData() {
		if (prompt('Are you sure? This will reset your progress! Type an UPPERCASE letter Y to clear.') === 'Y') {
			clearInterval(saveInterval);
			localStorage.clear();
			location.reload();
		} else {
			alert('Aborted, data not cleared.');
		}
	}
};
