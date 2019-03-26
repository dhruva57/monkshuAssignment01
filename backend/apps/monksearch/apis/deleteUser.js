
const userid = require(`${__dirname}/lib/userid.js`);

exports.doService = async jsonReq => {

	let result = await userid.delete(jsonReq.name);


	return {result};

}

