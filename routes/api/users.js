const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator'); // İhtiyaç halinde express-validator'ün dökümantasyonunu incele. Baya faydalı bilgiler var.

const User = require('../../models/User');

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; // Destructuring JSON body

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // s is default size
        r: 'pg', // r is rating (pg herkes için uygun görüntü demek(+18 gelmez yani))
        d: 'mm', // d gives you default image
      });

      user = new User({
        // It creates a new instance
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password (using bcrypt)
      const salt = await bcrypt.genSalt(10); // Önce bi saltlıyoruz

      user.password = await bcrypt.hash(password, salt); // Sonra da şifreye buluyoruz :D

      await user.save(); // We saved user to the database

      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id, // Grab user id for encryption
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, // Token ne zaman geçersiz olacak
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
