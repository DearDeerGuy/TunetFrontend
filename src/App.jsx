import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import classes from './style/App.module.css';
import MyRouter from "./router/myRouter"
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveUser } from "./redux/slice/userSlice";

function App() {
    const location = useLocation();
    const dispatch = useDispatch()
    const hideFooterPaths = ['/authorization','/registration','/changePassword'];
    useEffect(()=>{
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                dispatch(saveUser(parsedUser));
            } catch (e) {
                console.error('Ошибка при чтении user из localStorage', e);
            }
        }
    },[])

    const showFooter = !hideFooterPaths.includes(location.pathname);
    return (
        <div className={classes.page}>
            <header className={classes.header}><Header/></header>
            <main className={classes.main}><MyRouter/></main>
            {showFooter && <footer className={classes.footer}><Footer/></footer>}
        </div>
    )
}

export default App
