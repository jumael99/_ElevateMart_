import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

  if (!productId || !rating || !comment) {
    throw new Error('Missing required fields');
  }

  if (!req.user) {
    throw new Error("User not authenticated");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  // Check if the user has already reviewed the product
  const existingReview = await Review.findOne({
    product: productId,
    user: req.user._id,
  });

  if (existingReview) {
    throw new Error("You have already reviewed this product");
  }

  // Use create method to save the review
  const savedReview = await Review.create({
    product: productId,
    user: req.user._id,
    rating: Number(rating),
    comment,
  });

  res.status(201).json(savedReview);
});

// @desc    Get reviews for a specific product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new Error("Product ID is required");
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const reviews = await Review.find({ product: productId })
    .populate({
      path: 'user',
      select: 'name',
    })
    .sort({ createdAt: -1 });

  res.json(reviews);
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  const updatedReview = await review.save();
  res.status(200).json(updatedReview);
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = reviewModel.findById(req.params.id);
  const canDelete = review.user_id.toString() === req.user._id.toString || req.user.isAdmin;
  if(!canDelete){
      throw new error("You are not authorize to perform this action");
  }
  reviewModel.findByIdAndDelete(review._id);
  res.status(204);
})


export { createReview, getProductReviews ,updateReview,deleteReview};