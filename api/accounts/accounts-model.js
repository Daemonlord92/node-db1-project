const db = require('../../data/dbConfig');

module.exports = {
	get,
	getById,
	post,
	//update,
	//remove,
}

async function get() {
	const sql = await db('accounts').toString();
	console.log(sql);

	const accounts = await db('accounts');
	return accounts;
}

async function getById(id) {
	const accounts = await db.first('*').from('accounts').where({id});
	return accounts;
}

async function post(data) {
	const [accountId] = await db.insert(data).into('accounts');
	const account = await getById(accountId);
	return account;
}