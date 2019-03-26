/* 
 * (C) 2015 TekMonks. All rights reserved.
 */

const userid = require(`${__dirname}/lib/userid.js`);

exports.doService = async jsonReq => {
	
	LOG.debug("Got register request for user: " + jsonReq.name);

	let result = await userid.register(jsonReq.mob,jsonReq.email, jsonReq.name,jsonReq.firstName, jsonReq.lastName);

	if (result) LOG.info(`New user registered: ${jsonReq.name}`); 
	else LOG.error(`User registration error for: ${jsonReq.name}`);
	console.log(result);
	return {result};

}

