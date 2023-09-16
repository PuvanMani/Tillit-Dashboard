import AddProduct from "../../Component/forms/AddProduct";
import AddBanner from "../forms/AddBanner";
import AddCategory from "../forms/AddCategory";
import AddSubCategory from "../forms/AddSubCategory";
import InvoicePrintForm from "../forms/InvoicePrintForm";

const FormRoute = [
  { name: "", path: "/invoices/:action/:id", element: <InvoicePrintForm /> },
  { name: "", path: "/category/:action/:id", element: <AddCategory /> },
  { name: "", path: "/category/create", element: <AddCategory /> },
  { name: "", path: "/subcategory/:action/:id", element: <AddSubCategory /> },
  { name: "", path: "/subcategory/create", element: <AddSubCategory /> },
  { name: "", path: "/product/create", element: <AddProduct /> },
  { name: "", path: "/product/:action/:id", element: <AddProduct /> },
  { name: "", path: "/banner/create", element: <AddBanner /> },
  { name: "", path: "/banner/:action/:id", element: <AddBanner /> },

];
export default FormRoute;