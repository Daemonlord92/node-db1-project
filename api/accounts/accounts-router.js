const express = require('express');

const Account = require('./accounts-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const data = await Account.get()
		res.status(200).json(data)
	} catch (err) {
		next(err)
	}
})

router.get('/:id', checkId, async (req, res, next) => {
	try {
		res.status(200).json(req.account);
	} catch (err) {
		next(err)
	}
})

router.post('/', checkAccountPost, async (req, res, next) => {
	const body = req.body;
	try{
		const data = await Account.post(body);
		res.json(data)
	} catch (err) {
		next(err)
	}
})

router.put('/:id', checkId, checkAccountPost, async (req, res, next) => {
	const { id } = req.params;
	const changes = req.body;
	try {
		const data = await Account.update(id, changes)
		res.json({ count: data });
	} catch (err) {
		next(err)
	}
})

router.delete('/:id', checkId, async (req, res, next) => {
	const { id } = req.params;
	try {
		const data = await Account.remove(id)
		res.json({ count: data });
	} catch (err) {
		next(err)
	}
})

// MIDDLEWARE FUNCTIONS

router.use((err, req, res, next) => {
	err.statusCode = err.statusCode ? err.statusCode : 500;
	res.status(err.statusCode).json({mes: err.message, stack: err.stack})
})

async function checkId(req, res, next) {
	const { id } = req.params;
	try {
		const account = await Account.getById(id);
		if (account) {
			req.account = account;
			next()
		} else {
			const err = new Error('invalid id');
			err.statusCode = 404;
			next(err);
		}
	} catch (err) {
		err.statusCode = 500;
		err.message = 'error retrieving an account';
		next(err);
	}
}

function checkAccountPost(req, res, next) {
	const body = req.body;
	if (!body.name || !body.budget) {
		const err = new Error('body must include a name and a budget');
		err.statusCode = 400;
		next(err);
	} else {
		next();
	}
}

module.exports = router;