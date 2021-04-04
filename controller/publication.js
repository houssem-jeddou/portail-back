const Publication = require('../models/publications');
exports.CreatePub=(req, res, next) => {
    delete req.body._id;
    const thing = new Publication(
      ...req.body
    );
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.UpdatePub=(req, res, next) => {
    Publication.updateOne({ _id: req.params.id }, ...req.body)
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.DeletePub= (req, res, next) => {
    Publication.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }
exports.GetonePub= (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
}
exports.GetallPub= (req, res, next) => {
    Publication.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  }