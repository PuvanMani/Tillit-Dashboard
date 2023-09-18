import Dashboard from '../../Pages/dashboard';
import Orders from '../../Pages/Orders';
import ChangePassword from '../../Pages/changepassword';
import { Navigate } from "react-router-dom";
import Product from '../../Pages/Product';

import InvoiceTable from '../../Pages/Invoice';
import Category from '../../Pages/Category';
import SubCategory from '../../Pages/SubCategory';
import Banner from '../../Pages/Banner';

const PageRoute = [
  { name: "Home", path: "/dashboard", element: <Dashboard /> },
  {
    name: "Home",
    path: "/",
    element: <Navigate to="/dashboard" replace={true} />,
  },
  { name: "Orders", path: "/orders", element: <Orders /> },
  { name: "Product", path: "/product", element: <Product /> },
  { name: "Invoice", path: "/invoice", element: <InvoiceTable /> },
  { name: "Invoice", path: "/category", element: <Category /> },
  { name: "Invoice", path: "/subcategory", element: <SubCategory /> },
  { name: "Invoice", path: "/banner", element: <Banner /> },
  { name: "", path: "changepassword", element: <ChangePassword /> },
];


export default PageRoute;
