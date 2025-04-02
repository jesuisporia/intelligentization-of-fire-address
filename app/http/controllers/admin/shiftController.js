const Firefighter = require('./../../../models/firefighter');
const Shift = require('./../../../models/shift');
const GuardDuty = require('./../../../models/guardDuty');

// تخصیص شیفت به آتش‌نشان‌ها
exports.assignShift = async (req, res) => {
  const { date, firefighters, shiftType } = req.body; // date: تاریخ شیفت, firefighters: لیست آتش‌نشان‌ها, shiftType: روز یا شب
  try {
    // ابتدا بررسی می‌کنیم که آتش‌نشان‌ها در مرخصی نباشند
    const availableFirefighters = await Firefighter.find({ _id: { $in: firefighters }, leaveStatus: 'active' });
    
    // برای هر آتش‌نشان، یک نگهبانی ثبت می‌کنیم
    const guardDuties = availableFirefighters.map(firefighter => {
      return new GuardDuty({
        firefighter: firefighter._id,
        shiftType,
        shiftStart: new Date(date),
        shiftEnd: new Date(new Date(date).getTime() + (shiftType === 'day' ? 2 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000)), // زمان شیفت
      });
    });

    // ذخیره نگهبانی‌ها
    await GuardDuty.insertMany(guardDuties);

    // شیفت جدید برای آتش‌نشان‌ها ثبت می‌کنیم
    const shift = new Shift({
      shiftDate: date,
      dayShift: shiftType === 'day' ? guardDuties[0]._id : null,
      nightShift: shiftType === 'night' ? guardDuties[0]._id : null,
    });

    await shift.save();

    res.status(201).json({ message: 'شیفت به آتش‌نشان‌ها تخصیص داده شد', shift });
  } catch (error) {
    res.status(500).json({ message: 'خطا در تخصیص شیفت به آتش‌نشان‌ها', error });
  }
};

// دریافت شیفت‌ها برای تاریخ خاص
exports.getShiftsForDate = async (req, res) => {
  const { date } = req.params; // تاریخ به فرمت YYYY-MM-DD
  try {
    const shifts = await Shift.find({ shiftDate: new Date(date) }).populate('dayShift').populate('nightShift');
    res.status(200).json({ shifts });
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت شیفت‌ها', error });
  }
};
