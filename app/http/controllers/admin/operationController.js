const Operation = require('./../../../models/operation');
const Firefighter = require('./../../../models/firefighter');
const Station = require('./../../../models/station');
const { v4: uuidv4 } = require('uuid'); // برای تولید لینک یکتا

class OperationController {

  // شروع عملیات توسط ایستگاه
  async startOperation(req, res) {
    try {
      const { stationId, description, involvedFirefighters } = req.body;
      
      const station = await Station.findById(stationId);
      if (!station) {
        return res.status(404).json({ message: 'ایستگاه یافت نشد!' });
      }

      const operation = new Operation({
        station: stationId,
        description,
        involvedFirefighters,
        status: 'در حال انجام',
        startTime: new Date()
      });

      await operation.save();

      res.status(201).json({ message: 'عملیات آغاز شد.', operation });
    } catch (error) {
      res.status(500).json({ message: 'خطا در شروع عملیات!', error });
    }
  }

  // پایان عملیات
  async endOperation(req, res) {
    try {
      const { operationId } = req.body;

      const operation = await Operation.findById(operationId);
      if (!operation) {
        return res.status(404).json({ message: 'عملیات یافت نشد!' });
      }

      // تغییر وضعیت عملیات به "پایان یافته"
      operation.status = 'پایان یافته';
      operation.endTime = new Date();
      operation.reportLink = `https://fire-report.com/report/${uuidv4()}`;

      await operation.save();

      res.status(200).json({ message: 'عملیات با موفقیت پایان یافت.', reportLink: operation.reportLink });
    } catch (error) {
      res.status(500).json({ message: 'خطا در پایان عملیات!', error });
    }
  }

  // دریافت لینک گزارش عملیات
  async getOperationReportLink(req, res) {
    try {
      const { operationId } = req.params;

      const operation = await Operation.findById(operationId);
      if (!operation || !operation.reportLink) {
        return res.status(404).json({ message: 'گزارش عملیات یافت نشد!' });
      }

      res.status(200).json({ reportLink: operation.reportLink });
    } catch (error) {
      res.status(500).json({ message: 'خطا در دریافت لینک گزارش عملیات!', error });
    }
  }

  // دریافت گزارش بر اساس لینک یکتا
  async getReportByLink(req, res) {
    try {
      const { linkId } = req.params;

      const operation = await Operation.findOne({ reportLink: `https://fire-report.com/report/${linkId}` });
      if (!operation) {
        return res.status(404).json({ message: 'گزارش یافت نشد!' });
      }

      res.status(200).json({ operation });
    } catch (error) {
      res.status(500).json({ message: 'خطا در دریافت گزارش!', error });
    }
  }
}

module.exports = new OperationController();
