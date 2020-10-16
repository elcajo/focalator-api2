const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '5ff18f1771864a83a41506a44d035c19' 
 // 5ff18f1771864a83a41506a44d035c19 old 'b51b6576f1564abe8b62ec7720925341'
});
const handleApiCall = (req,res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to Work With API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}