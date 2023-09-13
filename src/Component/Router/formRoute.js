import Catelouge from "../../Pages/Catelouge";
import InvoicePrintForm from "../forms/InvoicePrintForm";

const FormRoute = [
  { name: "", path: "/invoices/:action/:id", element: <InvoicePrintForm /> },

  { name: "", path: "/catelouge/create", element: <Catelouge /> },
  { name: "", path: "/catelouge/:action/:id", element: <Catelouge /> },

];
export default FormRoute;