const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '7f580a07a6434a7cb822ee913db81d99'
});

const handleApiCall = () => (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with api'));
}    

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Error getting entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
