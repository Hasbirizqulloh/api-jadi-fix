import reportService from '../service/reports-service.js';

const createReport = async (req, res, next) => {
  try {
    const result = await reportService.createReport(req.user, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateReport = async (req, res, next) => {
  try {
    const result = await reportService.updateReport(req.user, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getReports = async (req, res, next) => {
  try {
    const result = await reportService.getReports(req.user, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getReportById = async (req, res, next) => {
  try {
    const result = await reportService.getReportById(req.params.reportId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteReport = async (req, res, next) => {
  try {
    const result = await reportService.deleteReport(req.user, req.params.reportId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  createReport,
  updateReport,
  getReports,
  deleteReport,
  getReportById,
};
