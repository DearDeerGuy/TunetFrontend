import { Navigate } from "react-router";
import Main from "../pages/Main/Main.jsx";
import Form from "../pages/Form/Form.jsx";
import Authorization from "../pages/Authorization/Authorization.jsx";
import Registration from "../pages/Registration/Registration.jsx";
import ChangePassword from "../pages/ChangePassword/ChangePassword.jsx";
import PersonalPage from "../pages/PersonalPage/PersonalPage.jsx";
import TariffPage from "../pages/TariffPage/TariffPage.jsx";
import AdminPanelPage from "../pages/AdminPanelPage/AdminPanelPage.jsx";
import AddChangeMovie from "../pages/AddChangeMovie/AddChangeMovie.jsx";
import GalleryPage from "../pages/GalleryPage/GalleryPage.jsx";
import ViewPage from "../pages/ViewPage/ViewPage.jsx";

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
    {id:3,path:"/tariffs",element:<Form><TariffPage/></Form>},
    {id:4,path:"/adminPanel",element:<Form><AdminPanelPage/></Form>},
    {id:5,path:"/addMovie",element:<Form><AddChangeMovie/></Form>},
    {id:6,path:"/changeMovie/:id",element:<Form><AddChangeMovie/></Form>},
    {id:7,path:"/gallery",element:<Form><GalleryPage key="gallery"/></Form>},
    {id:8,path:"/view/:id",element:<Form><ViewPage/></Form>},
    {id:9,path:"/favorite",element:<Form><GalleryPage key="favorite"/></Form>},
]