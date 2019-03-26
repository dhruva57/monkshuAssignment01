/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */
const bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3");
var mkdirp = require('mkdirp');
var fs = require('fs');
var getDirName = require('path').dirname;
const API_CONSTANTS = require(`${__dirname}/constants.js`);
let usersDB;

exports.getUserHash = data => {
	return new Promise((resolve, reject) => bcrypt.hash(data, API_CONSTANTS.SALT_PW, (err, hash) => {
		if (err) reject("BCRYPT internal error."); else {
			// URL encoding removes characters which are illegal for paths, like "\" or "/" etc.
			let encoded_hash = encodeURIComponent(hash);

			// On Windows directory names can't end with the . character. So replace it with %2E
			// which is its URL encoded notation, if that's the case.
			if (encoded_hash.substr(-1) == '.')
				encoded_hash = encoded_hash.substring(0, encoded_hash.length - 1) + '%2E';
			
			resolve(encoded_hash);		
		}
	}));
}

// exports.register = (id, name) => {
// 	return new Promise((resolve, _) => {
// 		exports.exists(id)
// 		.then(exists => exists?resolve(false):initDB(true))
// 		.then(_ => exports.getUserHash(id))
// 		.then(id => usersDB.run(`INSERT INTO users(name, id) VALUES (?,?)`, [name,id], err => err?resolve(false):resolve(true)) )
// 		.catch(_ => resolve(false));
// 	});
// }


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

exports.exists = exports.login = id => {
	return new Promise((resolve, _) => {
		initDB()
		.then(_ => exports.getUserHash(id))
		.then(id => usersDB.all(`SELECT name, id FROM users WHERE id = '${id}' COLLATE NOCASE;`, (err, rows) => {
			if (err || !rows.length) resolve({result: false});
			else resolve({result: true, name: rows[0].name});
		}))
		.catch(_ => resolve({result: false}));
	});
}

function initDB() {
	return new Promise((resolve, reject) => {
		if (!usersDB) usersDB = new sqlite3.Database(API_CONSTANTS.APP_DB, sqlite3.OPEN_READWRITE, err => {
			if (!err) resolve(); else reject(err);
		}); else resolve();
	});
}