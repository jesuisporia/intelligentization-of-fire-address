const jwt = require('jsonwebtoken');
const User = require('./../../models/user');

class AuthMiddleware {
  
  // بررسی اینکه کاربر احراز هویت شده است
  async isAuthenticated(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'دسترسی غیرمجاز! لطفاً وارد حساب خود شوید.' });
    }

    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password'); // دریافت اطلاعات کاربر بدون پسورد
      next();
    } catch (error) {
      return res.status(401).json({ message: 'توکن نامعتبر است!' });
    }
  }

  // بررسی اینکه کاربر رئیس ایستگاه است
  isStationChief(req, res, next) {
    if (!req.user || req.user.role !== 'chief') {
      return res.status(403).json({ message: 'دسترسی غیرمجاز! این عملیات فقط برای رؤسای ایستگاه مجاز است.' });
    }
    next();
  }
}

// خروجی کلاس به‌عنوان یک نمونه singleton
module.exports = new AuthMiddleware();
