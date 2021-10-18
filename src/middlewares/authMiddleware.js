const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!authorization) {
      return res.status(400).json({ message: 'Please make sure your request has an Authorization header' });
    }

    if (!token) {
      return res.status(400).json({ message: 'Add token to request' });
    }
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, secret);
    req.user = payload;

    next();
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = authMiddleware;
