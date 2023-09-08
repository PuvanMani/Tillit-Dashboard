import InvoicePrintForm from "../forms/InvoicePrintForm";

const FormRoute = [
  { name: "", path: "/invoices/:action/:id", element: <InvoicePrintForm /> },

  // { name: "", path: "/timesheet/create", element: <Timesheetform /> },
  // { name: "", path: "/timesheet/:action/:id", element: <Timesheetform /> },

];
export default FormRoute;