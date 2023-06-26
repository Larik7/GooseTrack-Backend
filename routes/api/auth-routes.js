const express = require('express');
const userCtrl = require('../../controllers/auth/user');
const {
  validateBody,
  auth,
  uploder,
  uploadCloud,
  passport,
} = require('../../middlewares');
const {
  registrationSchema,
  loginSchema,
  emailSchema,
  updateUserSchema,
  refreshSchema,
  passSchema,
} = require('../../schemas');

//console.log(userCtrl);

const router = express.Router();
//------------------------google----------------------------------
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  userCtrl.googleAuth
);
//--------------------------------------------------------------------
router.post(
  '/registration',
  validateBody(registrationSchema),
  userCtrl.registration
);

router.post('/login', validateBody(loginSchema), userCtrl.login); //логінимось

router.get('/login/:accessToken', userCtrl.loginWithToken);

router.post('/refresh', validateBody(refreshSchema), userCtrl.refreshToken); // оновлюємо токен

router.get('/verify/:verificationToken', userCtrl.verifyEmail); //верефікація пошти

router.post('/verify', validateBody(emailSchema), userCtrl.resendVerifyEmail);

router.get('/current', auth, userCtrl.getCurrent);

router.post('/logout', auth, userCtrl.logout);

router.patch(
  '/user',
  auth,
  uploder.single('avatar'),
  validateBody(updateUserSchema),
  userCtrl.updateUserCloud
);

router.put(
  '/user',
  auth,
  uploadCloud.single('avatar'),
  validateBody(updateUserSchema),
  userCtrl.updateUserCloud
);

router.patch('/user/pass', auth, validateBody(passSchema), userCtrl.checkPass);

module.exports = router;