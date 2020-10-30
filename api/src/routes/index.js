const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const authRouter = require('./auth');
const categoryRouter = require('./category.js');
const userRouter = require('./user.js');
const reviewRouter = require('./review.js');
const authGoogleRouter = require('./authgoogle.js');
const cookieSession = require('cookie-session');
const passport = require('passport');
const config = require('../configpassportgoogle/configpassportgoogle.js')


const router = Router();
router.use(cookieSession({
    maxAge: 24*1000,
    keys: ['proyecto']
}));

//iniciar passport
router.use(passport.initialize());
router.use(passport.session());

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/auth' , authGoogleRouter);

router.use('/users', userRouter );
router.use('/review', reviewRouter);



module.exports = router;
