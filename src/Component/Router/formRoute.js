import Catelouge from "../../Pages/Catelouge";
import AddCategory from "../forms/AddCategory";
import AddSubCategory from "../forms/AddSubCategory";
import InvoicePrintForm from "../forms/InvoicePrintForm";

const FormRoute = [
  { name: "", path: "/invoices/:action/:id", element: <InvoicePrintForm /> },
  { name: "", path: "/category/:action/:id", element: <AddCategory /> },
  { name: "", path: "/category/create", element: <AddCategory /> },
  { name: "", path: "/subcategory/:action/:id", element: <AddSubCategory /> },
  { name: "", path: "/subcategory/create", element: <AddSubCategory /> },

  { name: "", path: "/catelouge/create", element: <Catelouge /> },
  { name: "", path: "/catelouge/:action/:id", element: <Catelouge /> },

];
export default FormRoute;