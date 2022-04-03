const multer = require('multer');
const sharp = require('sharp');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

//Multer file memory to store the image as a buffer
const multerStorage = multer.memoryStorage();

//Multer file filter config
const multerFilter = (req, file, callbackFN) => {
  if (
    file.mimetype.split('/')[0] === 'image' ||
    file.mimetype.startsWith('image')
  ) {
    callbackFN(null, true);
  } else {
    callbackFN(
      new AppError(
        'File you uploaded is not an image! Please upload only images',
        400
      ),
      false
    );
  }
};

//multer function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//middleware created from multer function to be called in the Router
exports.uploadProductImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  //1) CoverImage

  const imageCoverFileName = `product-${
    req.params.id
  }-${Date.now()}-cover.jpeg`;

  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333) //3:2 image ratio
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${imageCoverFileName}`);

  req.body.imageCover = imageCoverFileName;

  //2) Images Loop
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const fileName = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333) //3:2 image ratio
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/products/${fileName}`);

      req.body.images.push(fileName);
    })
  );
  // Todo check this console log
  // console.log('resizeProductImages: ', req.body);
  next();
});

/* USERS ROUTES HANDLERS */
//1. All products GET route handler
exports.getAllProducts = factory.getAll(Product);

//2. Product GET route handler
exports.getProduct = factory.getOne(Product, { path: 'reviews' });

//3. Product POST route handler
exports.createProduct = factory.createOne(Product);

//4. Product PATCH route handler
exports.updateProduct = factory.updateOne(Product);

//5. Product DELETE handler using Function Factory
exports.deleteProduct = factory.deleteOne(Product);
