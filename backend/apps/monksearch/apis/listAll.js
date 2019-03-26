
const userid = require(`${__dirname}/lib/userid.js`);

exports.doService = async jsonReq => {

	let result = await userid.readAll();

	return {result};
}

