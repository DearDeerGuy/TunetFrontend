import { Navigate } from "react-router";
import Main from "../pages/Main/Main.jsx";
import Form from "../pages/Form/Form.jsx";

export const ListUser = [
    {id:0,path:"*",element:<Navigate to={"/main"} replace />},
    {id:1,path:"/main",element:<Main/>},
    {id:2,path:"/auth",element:<Form/>},
]