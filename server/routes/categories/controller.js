const mongoose = require('mongoose');
const Category = require('../../models/categories');

const postCategories = (req, res) => {
  Category.find({ name: req.body.name})
  .exec()
  .then(response => {
    if (response.length > 0) {
      res.status(400).json({
        error: 'Category name already exists!'
      });
    }
    const category = new Category(req.body);
    return category.save()
  })
  .then(response => {
    res.status(201).json({
      message: 'Category was created',
      data: {
        _id: response.id,
        name: response.name,
        description: response.description
      }
    });
  })
  .catch(err => {
    if (err.errors.description.message) {
      res.status(400).json({
        error: err.errors.description.message
      });
    }
    res.status(500).json({
      error: 'Category could not be created!'
    });
  });
};

module.exports = { postCategories };