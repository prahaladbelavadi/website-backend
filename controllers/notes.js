const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority"`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err, connection) => {
    if (err) return console.error(err);
    if (connection) console.log('Successfully connected! \n');

    const db = client.db('test');

    exports.addNote = async (req, res) => {
        db.collection('notes')
            .insertOne(req.body, (err, resp) => {

                if (err) return res.json({ status: 500, err });

                res.json({ message: 'insert successful', status: 201 })
            })
    };

    exports.fetchAllNotes = async (req, res) => {
        db.collection('notes')
            .find({}).toArray((err, notes) => {

                if (err) return res.json({ status: 500, err });

                res.send({ notes });
            })
    }

    exports.updateNote = async (req, res) => {
        db.collection('notes')
            .updateOne({ _id: req.body._id }, { $set: req.body.updateObject }, (err, status) => {
                if (err) return res.json({ status: 500, err });

                res.json({ message: 'note updated' })
            })
    }
})
