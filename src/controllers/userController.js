const User = require('../models/userModel');

class UserController {
  async getUser(req, res) {
    try {
      const userId = req.user.userId;
      const userInfo = await User.findOne({ _id: userId });

      const userDetails = {
        _id: userInfo._id,
        username: userInfo.username,
        createdDate: userInfo.createdDate,
      };
      res.status(200).send({ user: userDetails });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.user.userId;
      await User.findByIdAndRemove(userId);
      res.status(200).send({ message: 'Success' });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  }

  async changeUserPassword(req, res) {
    try {
      const userId = req.user.userId;
      const { oldPassword, newPassword } = req.body;
      const user = await User.findOne({ _id: userId });

      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isOldPasswordValid) {
        return res.status(400).send({ message: 'Invalid old password' });
      }

      const newHashPassword = await bcrypt.hash(newPassword, 10);

      await User.updateOne({ _id: userId }, { password: newHashPassword });

      res.status(200).send({ message: 'Success' });
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  }
}

module.exports = new UserController();
