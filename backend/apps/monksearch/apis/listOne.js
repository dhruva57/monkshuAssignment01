
const userid = require(`${__dirname}/lib/userid.js`);

exports.doService = async jsonReq => {

	let result = await userid.readOne(jsonReq.name);


	return {result};

}

