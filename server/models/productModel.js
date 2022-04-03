const mongoose = require('mongoose');
// const validator = require('validator');
const slugify = require('slugify');

//Create products Mongoose Schema
const productSchema = new mongoose.Schema(
  //Schema definition object
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true, //not technically a validator, but we can consider it as a validator
      trim: true,
      maxlength: [
        25,
        'A product name must be less than or equal 25 characters',
      ],
      minlength: [4, 'A product name must be more than or equal 4 characters'],
      // validate: [validator.isAlpha, 'A product name must only contain letters'],
    },
    slug: String,

    category: {
      type: String,
      required: [true, 'A product must have a category'],
      //enumIs used to identify only specific values the fields
      enum: {
        values: ['vegetable', 'fruit', 'dairy'],
        default: 'vegetable',
        message: 'category is either: vegetable, fruit, or dairy',
      },
    },
    price: {
      type: Number,
      required: [true, 'A product must have price'],
    },
    description: {
      type: String,
      trim: true,
      default:
        'Must try our fresh products at least once your life, you will never regret it 😉',
    },
    imageCover: {
      type: String, //The name of the image that will be read from the database/file system
      required: [true, 'A product must have a cover image'],
    },

    inStock: {
      type: Boolean,
      default: true,
    },
  }
);

// Adding (COMPOUND INDEX) to the slug field along with price field
productSchema.index({ slug: 1, price: -1 });

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
