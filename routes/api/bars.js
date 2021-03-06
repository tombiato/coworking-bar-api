const express = require('express');

// Models
const Bar = require('../../models/Bar');

const router = express.Router();

/**
 * @route   GET api/bars
 * @desc    Get all bars
 * @access  Public
 */
router.get('/', async (req, res) => {
	try {
		const bars = await Bar.find();

		res.status(200).send({ bars });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
});

/**
 * @route   GET api/bars/:id
 * @desc    Get single bars
 * @access  Public
 */
router.get('/:id', async (req, res) => {
	try {
		const bar = await Bar.findById(req.params.id);

		if (!bar)
			return res
				.status(404)
				.send({ msg: `Bar with id: ${req.params.id} not found` });

		res.status(200).send({ bar });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
});

/**
 * @route   POST api/bars
 * @desc    Create new bar
 * @access  Public
 */
router.post('/', async (req, res) => {
	try {
		const newBar = new Bar({
			name: req.body.name,
			description: req.body.description,
			address: req.body.address,
		});

		await newBar.save();

		res.status(200).send({ newBar });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
});

/**
 * @route   PUT api/bars/:id
 * @desc    Update single bar
 * @access  Private
 */
router.put('/:id', async (req, res) => {
	try {
		const bar = await Bar.findById(req.params.id);

		if (!bar)
			return res
				.status(404)
				.send({ msg: `Bar with id: ${req.params.id} not found` });

		const fieldToUpdate = {};

		if (req.body.name) fieldToUpdate.name = req.body.name;
		if (req.body.description) fieldToUpdate.description = req.body.description;
		if (req.body.address) fieldToUpdate.address = req.body.address;

		await bar.update(fieldToUpdate);

		res.status(200).send({ bar });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
});

/**
 * @route   DELETE api/bars/:id
 * @desc    Delete single bar
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
	try {
		const bar = await Bar.findById(req.params.id);

		if (!bar)
			return res
				.status(404)
				.send({ msg: `Bar with id: ${req.params.id} not found` });

		await Bar.findByIdAndRemove(req.params.id);

		res.status(203).send({ msg: 'Ressource deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error...');
	}
});

module.exports = router;
