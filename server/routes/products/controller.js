const Category = require('../../models/category');
const Product = require('../../models/product');

const postProduct = (req, res) => {
  Category.findById(req.body.category)
    .then((category) => {
      if (!category) {
        res.status(404).json({
          error: 'Category not found'
        });
      }
      const product = new Product(req.body);
      return product.save();
    })
    .then(response => {
      res.status(201).json({
        message: 'Product was created!',
        data: {
          _id: response.id,
          name: response.name,
          description: response.description,
          category: response.category,
          price: response.price,
          stock: response.stock,
          isActive: response.isActive
        }
      });
    })
    .catch(() => {
      res.status(500).json({
        error: 'Product could not be created!'
      });
    });
};

module.exports = postProduct;