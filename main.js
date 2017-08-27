const Menu = require('./menu.js');
const data = require('./data.js')();

function main() {
	Menu.menu(data);
}

main();