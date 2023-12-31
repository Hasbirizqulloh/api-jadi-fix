import { validate } from '../validation/validation.js';
import { createReportValidation, updateReportValidation, getReportValidation } from '../validation/report-validation.js';
import { ResponseError } from '../error/response-error.js';
import { prismaClient } from '../application/database.js';

const createReport = async (user, request) => {
  const report = validate(createReportValidation, request);
  report.userId = user.userId;
  return prismaClient.report.create({
    data: {
      report: report.report,
      status: 'pending',
      userId: report.userId,
    },
    select: {
      id: true,
      report: true,
      status: true,
      user: {
        select: {
          nama: true,
          email: true,
        },
      },
    },
  });
};

const updateReport = async (id) => {
  const report = validate(updateReportValidation, id);
  return prismaClient.report.update({
    where: {
      id: report.id,
    },
    data: {
      status: report.status,
    },
    select: {
      id: true,
      report: true,
      status: true,
      user: {
        select: {
          nama: true,
          email: true,
        },
      },
    },
  });
};

const getReports = async () => {
  return prismaClient.report.findMany({
    select: {
      id: true,
      report: true,
      status: true,
      user: {
        select: {
          nama: true,
          email: true,
        },
      },
    },
  });
};

const getReportById = async (reportId) => {
  reportId = validate(getReportValidation, reportId);
  return prismaClient.report.findFirst({
    where: {
      id: reportId,
    },
    select: {
      id: true,
      report: true,
      status: true,
      user: {
        select: {
          nama: true,
          email: true,
        },
      },
    },
  });
};

const deleteReport = async (reportId) => {
  reportId = validate(getReportValidation, reportId);
  return prismaClient.report.delete({
    where: {
      id: reportId,
    },
  });
};

export default { createReport, updateReport, getReports, deleteReport, getReportById };
