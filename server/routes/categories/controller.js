const Category = require("../../models/category");

const postCategories = (req, res) => {
  Category.find({ name: req.body.name })
    .exec()
    .then(response => {
      if (response.length > 0) {
        res.status(409).json({
          error: "Category name already exists!"
        });
      }
      const category = new Category(req.body);
      return category.save();
    })
    .then(response => {
      res.status(201).json({
        message: "Category was created",
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
        error: "Category could not be created!"
      });
    });
};

const getCategories = (req, res) => {
  Category.find()
    .select("_id name description")
    .exec()
    .then(response => {
      if (response.length > 0) {
        res.status(200).json({
          message: "Categories were retrieved!",
          data: response
        });
      } else {
        res.status(404).json({
          error: "No categories found!"
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "Categories could not be retrieved!"
      });
    });
};

const deleteCategory = (req, res) => {
  //add validation for categories being used in products
  Category.findByIdAndDelete({ _id: req.params.categoryId })
    .exec()
    .then(response => {
      if (response) {
        res.status(201).json({
          message: "Category was deleted!",
          data: {
            _id: response.id,
            name: response.name,
            description: response.description
          }
        });
      } else {
        res.status(404).json({
          error: "Category not found!"
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        // check this status code.
        error: "Category could not be deleted!"
      });
    });
};

module.exports = { postCategories, getCategories, deleteCategory };
