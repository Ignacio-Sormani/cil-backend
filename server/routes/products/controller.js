const Product = require('../../models/product');

const getProducts = (req, res) => {
  Product.find()
    .select('_id name description category price stock isActive')
    .populate('category', 'name description')
    .exec()
    .then(response => {
      if (response.length > 0) {
        res.status(200).json({
          message: 'Products were retrieved!',
          data: response
        });
      } else {
        res.status(404).json({
          error: 'No products found!'
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'Products could not be retrieved!'
      });
    });
};

const postProduct = (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then(response => {
      res.status(201).json({
        message: 'Product was created!',
        data: {
          _id: response.id,
          name: response.name,
          description: response.description,
          category: req.body.fullCategory,
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

const modifyProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })
    .populate('category', 'name description')
    .exec()
    .then(response => {
      if (response) {
        let product = {
          _id: response.id,
          name: response.name,
          description: response.description,
          price: response.price,
          stock: response.stock,
          isActive: response.isActive
        };
        if (req.body.fullCategory) {
          product = {
            ...product,
            category: req.body.fullCategory
          };
        } else {
          product = {
            ...product,
            category: response.category
          };
        }
        res.status(201).json({
          message: 'Product was modified!',
          data: product
        });
      } else {
        res.status(404).json({
          error: 'Product not found!'
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'Product could not be modified!'
      });
    });
};

const deleteProduct = (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.productId })
    .exec()
    .then(response => {
      if (response) {
        res.status(201).json({
          message: 'Product was deleted!',
          data: response
        });
      } else {
        res.status(404).json({
          error: 'Product not found!'
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'Product could not be deleted!'
      });
    });
};

const getActiveProducts = (req, res) => {
  Product.find({ isActive: true })
    .select('_id name description category price stock isActive')
    .populate('category', 'name description')
    .exec()
    .then(response => {
      if (response.length > 0) {
        res.status(200).json({
          message: 'Products were retrieved!',
          data: response
        });
      } else {
        res.status(404).json({
          error: 'No products found!'
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'Products could not be retrieved!'
      });
    });
};

module.exports = {
  postProduct,
  getProducts,
  modifyProduct,
  deleteProduct,
  getActiveProducts
};
