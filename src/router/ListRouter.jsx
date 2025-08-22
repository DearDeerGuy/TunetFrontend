import { Navigate } from "react-router";
import Main from "../pages/Main/Main.jsx";
import Form from "../pages/Form/Form.jsx";
import Authorization from "../pages/Authorization/Authorization.jsx";
import Registration from "../pages/Registration/Registration.jsx";
import ChangePassword from "../pages/ChangePassword/ChangePassword.jsx";
import PersonalPage from "../pages/PersonalPage/PersonalPage.jsx";

export const ListUser = [
    {id:0,path:"*",element:<Navigate to={"/main"} replace />},
    {id:1,path:"/main",element:<Main/>},
    {id:2,path:"/authorization",element:<Form><Authorization/></Form>},
    {id:3,path:"/registration",element:<Form><Registration/></Form>},
    {id:4,path:"/changePassword",element:<Form><ChangePassword/></Form>},
]

export const ListAuthorizedUser = [
    {id:0,path:"*",element:<Navigate to={"/main"} replace />},
    {id:1,path:"/main",element:<Main/>},
    {id:2,path:"/personal",element:<Form><PersonalPage/></Form>},
]