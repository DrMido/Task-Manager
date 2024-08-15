const User = require('../models/users.js');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: 'User does not exist' });
  }
  const isMatch = (await user.password) === password;
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }
  res.json({ user });
};

module.exports = { login };
