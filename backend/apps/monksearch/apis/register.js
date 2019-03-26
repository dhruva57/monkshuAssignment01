/* 
 * (C) 2015 TekMonks. All rights reserved.
 */

const userid = require(`${__dirname}/lib/userid.js`);
// var mkdirp = require('mkdirp');
// var fs = require('fs');
// var getDirName = require('path').dirname;

exports.doService = async jsonReq => {
	// if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}
	
	LOG.debug("Got register request for user: " + jsonReq.name);

	let result = await userid.register(jsonReq.mob,jsonReq.email, jsonReq.name,jsonReq.firstName, jsonReq.lastName);

	if (result) LOG.info(`New user registered: ${jsonReq.name}`); 
	else LOG.error(`User registration error for: ${jsonReq.name}`);
	console.log(result);
	return {result};
// [ username, email, firstname, lastname, phoneno ]

	// var temp = __dirname + '/../db/'.concat(jsonReq.name)+'/data';
	// var userdata = jsonReq.mob + jsonReq.email;
	// // fs.writeFile(temp, 'test');
	// mkdirp(getDirName(temp), function (err) {
	// 	if (err) throw err;
	// 	fs.writeFile(temp, userdata, function (err) {
	// 		if (err) throw err;
	// 		else{
	// 		console.log(' Saved!');
	// 		console.log(jsonRes);
	// 		}
	// 	});
	// });
}

// const validateRequest = jsonReq => (jsonReq && jsonReq.id && jsonReq.name);