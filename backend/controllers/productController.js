import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc Fetch all products
//@route GET /api/products
//@acces Public
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.json(products);
});

//@desc Fetch single products
//@route GET /api/products/:id
//@acces Public
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

//@desc  Delete a product
//@route DELETE /api/products/:id
//@acces Privates/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

//@desc  Create a product
//@route POST /api/products
//@acces Privates/Admin
export const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		proce: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample Brand',
		category: 'Sample Category',
		countInStock: 0,
		numReviews: 0,
		description: 'SampleDescription',
	});

	const createdProduct = await product.save();
	res.status(200).json(createdProduct);
});

//@desc  Update a product
//@route POST /api/products/:id
//@acces Privates/Admin
export const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.status(200).json({ updatedProduct });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});
