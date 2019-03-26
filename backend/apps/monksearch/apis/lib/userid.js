/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */

var mkdirp = require('mkdirp');
var fs = require('fs');
var getDirName = require('path').dirname;
const API_CONSTANTS = require(`${__dirname}/constants.js`);






exports.register = (mob,email, name,fn,ln) => {
	return new Promise((resolve, reject) => {
		var temp = __dirname + '/../../db/'.concat(name)+'/data';
		var userdata ="Contact : " + mob + "\r\n" + "First Name : " +  fn+ "\r\n" +"Last Name : " +  ln+ "\r\n" +"Email : " +   email+ "\r\n";

	mkdirp(getDirName(temp), function (err) {
		if (err) reject(err);
		fs.writeFile(temp, userdata, function (err) {
			if (err) reject(err);
			else{
				resolve.ok = true;
				resolve("Created");
			console.log(' Saved!');
			// console.log(jsonRes);
			}
		});
	});
});
}

exports.readAll = () => {
	return new Promise((resolve, reject) => {
		var temp = __dirname + '/../../db/';
		// var userdata = mob + email;


		fs.readdir(temp, function(err, items) {
			if (err) reject(err);
			else {
				console.log(items); resolve(items); }
		 
			for (var i=0; i<items.length; i++) {
				console.log(items[i]);
			}
		});
});
}

exports.delete = (name) => {
	return new Promise((resolve, reject) => {
		var temp = __dirname + '/../../db/'.concat(name);
		// var userdata = mob + email;
		fs.unlink(temp.concat("/data"), function(err,_){
			if(err) reject(err);
			else{
				fs.rmdir(temp, function(err, items) {
					if (err) reject(err);
					else {
						console.log(name.concat(" user deleted")); resolve("Deleted"); }
				 
					
				});
			}
		});

		
});
}

exports.readOne = (name) => {
	return new Promise((resolve, reject) => {
		var temp = __dirname + '/../../db/' + name;
		// var userdata = mob + email;


		fs.readdir(temp, function(err, item) {
			if (err) reject(err);
			else {
				console.log(item); 
				fs.readFile(temp.concat("/data"), function(err,data){
					if (err) reject(err);{
						console.log(data);
						resolve("Data of  ".concat(name+" = ").concat(data));
					} 
				})
				
			 }
		 
			
		});
});
}
