const express = require('express');

// Model
const User = require('../../models/User');

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Public
 */
router.get('/', async (req, res) => {
	try {
		const users = await User.find();

		res.status(200).send({ users });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
});

/**
 * @route   GET /api/users/:id
 * @desc    Get single users
 * @access  Public
 */
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user)
			return res
				.status(404)
				.send({ msg: `User with id: ${req.params.id} not found` });

		res.status(200).send({ user });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
});

/**
 * @route   POST /api/users
 * @desc    Create new user
 * @access  Public
 */
router.post('/', async (req, res) => {
	try {
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			address: req.body.address,
		});

		await user.save();

		res.status(200).send({ user });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update single user
 * @access  Private
 */
router.put('/:id', async (req, res) => {
	try {
		const user = User.findById(req.params.id);

		if (!user)
			return res
				.status(404)
				.send({ msg: `User with id: ${req.params.id} not found` });

		const fieldToUpdate = {};

		if (req.body.name) fieldToUpdate.name = req.body.name;
		if (req.body.email) fieldToUpdate.email = req.body.email;
		if (req.body.address) fieldToUpdate.address = req.body.address;

		await user.update(fieldToUpdate);

		res.status(200).send({ user });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete single user
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user)
			return res
				.status(404)
				.send({ msg: `User with id: ${req.params.id} not found` });

		await User.findByIdAndRemove(req.params.id);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
});

module.exports = router;
