'use strict';
const Menu = require('./menu.js');
const tips = ['请输入学生信息，按回车提交：\n' , '请按正确的格式输入\n' ];

function readInfo(flag) {
	const readlineSync = require('readline-sync');
	const format = `name:"小小" , id:1011 , class:1 , math:66 , chinese:90 , english:67 , progromming:88 `;
	return readlineSync.question(tips[flag] + '\n' + format + '\n');
}

function str2obj(stuInfo) {
	return eval("("+'{'+stuInfo+'}'+")");
}

function isSameKeys(stuInfo) {
	const keys = [ 'name','id','class','math','chinese','english','progromming' ];
	return keys + '' === Object.keys(stuInfo) + '';
}

function isInfo(stuInfo) {

	try{
		stuInfo = str2obj(stuInfo);
	}catch(e){
		return 1;
	}
	if(isSameKeys(stuInfo))
		return 2;
	return 1; 
}

function push(data , stuInfo) {
	stuInfo = str2obj(stuInfo);
	data.push(stuInfo);
	console.log(`学生${stuInfo.name}的成绩被添加`);
}


module.exports = function inputInfo(data) {
	let flag = 0;
	let stuInfo = '';

	while(flag !== 2){
		stuInfo = readInfo(flag);
		flag = isInfo(stuInfo);
	}

	push(data , stuInfo);

	Menu.menu(data);
}
