'use strict';
const Menu = require('./menu.js');
const tips = ['请输入要打印的学生的学号\n' , '请按正确的格式输入要打印的学生的学号\n'];

function readId(flag) {
	const readlineSync = require('readline-sync');
	const format = `id , id , ...`;
	return readlineSync.question(tips[flag] + '\n' + format + '\n');
}

function isId(id) {
	if( !isDBCS(id))
		return 2;
	return 1;
}

function isDBCS(str) {
	return str.match(/[^\x00-\xff]/ig);
}

function str2arr(str) {
	return str.split(',').map( i => parseInt(i));
}

function findMid(arr) {
	return arr.length % 2 === 0 ? (arr[parseInt((arr.length-1)/2)] + arr[arr.length/2]) / 2 : arr[(arr.length-1)/2];
}

function countScore(data) {
	let totalScore = {mid:0 , avg:0};
	let sum = 0;
	let score = [];
	data.forEach( (item)=>{
		item['sum'] = item.math + item.chinese + item.english + item.progromming;
		item['avg'] = item.sum / 4;
		sum += item.sum;
		score.push(item.sum);
	})
	score = score.sort();
	totalScore.avg = sum / data.length;
	totalScore.mid = findMid(score); 
	return totalScore;
}

function formatStu(obj) {
	return `${obj.name}|${obj.math}|${obj.chinese}|${obj.english}|${obj.progromming}|${obj.avg}|${obj.sum}\n`;
}

function printInfo(data , id) {
	let totalScore = countScore(data);
	let info = `\n成绩单\n姓名|数学|语文|英语|编程|平均分|总分\n========================\n`;

	id.forEach( (item)=>{
		let site = data.findIndex( (obj)=>{
			return obj.id === item;
		})
		if( site !== -1 )
			info += formatStu(data[site]);
	})
	info += `========================\n`;

	info += `全班总分平均数：${totalScore.avg}\n全班总分中位数：${totalScore.mid}`;
	console.log(info);
}

module.exports = function output(data) {
	let flag = 0;
	let id = '';
	while(flag !== 2){
		id = readId(flag);
		flag = isId(id);
	}
	id = str2arr(id);
	printInfo(data , id);
	Menu.menu(data);
}