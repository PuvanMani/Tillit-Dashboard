import Dashboard from '../../Pages/dashboard';
import Orders from '../../Pages/Orders';
import ChangePassword from '../../Pages/changepassword';
import { Navigate } from "react-router-dom";

import NoTFound from "../../Pages/NotFound/notfound";
import Product from '../../Pages/Product';
import Catelouge from '../../Pages/Catelouge';
import InvoiceTable from '../../Pages/Invoice';

const PageRoute = [
  { name: "Home", path: "/dashboard", element: <Dashboard /> },
  {
    name: "Home",
    path: "/",
    element: <Navigate to="/dashboard" replace={true} />,
  },
  { name: "Orders", path: "/orders", element: <Orders /> },
  { name: "Product", path: "/product", element: <Product /> },
  { name: "Product", path: "/catelouge", element: <Catelouge /> },
  { name: "Invoice", path: "/invoice", element: <InvoiceTable /> },
  { name: "", path: "changepassword", element: <ChangePassword /> },
];


export default PageRoute;
