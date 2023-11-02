import { Router } from "express";

import { salesReportAdmin } from "../../controllers/adminController/adminSalesReportManagement";

const adminSalesReport = Router();

adminSalesReport.get("/fetchreport", salesReportAdmin);

export default adminSalesReport;
