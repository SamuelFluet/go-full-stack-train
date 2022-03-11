const express = require('express');

const app = express();
const mongoose = require('mongoose');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(express.json())

mongoose.connect('mongodb+srv://Sombrebarman:Azer789@cluster0.gfhyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const Thing = require('./models/thing');


app.get('/api/stuff', (req, res, next) => {
Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});


app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

app.post('/api/stuff', (req, res, next) => {
  
  const thingObjet = req.body
  delete thingObjet._id
  const thing = new Thing(thingObjet)
  thing.save().then(()=>{
    res.status(201).json({message:"stuff bien crée"})
  }).catch((error)=>{
    res.status(500).json(error)
  })
});

app.post('/api/auth/signup ', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
  });
});

app.post('/api/auth/login', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
  });
});
 

app.use(express.json());


module.exports = app;