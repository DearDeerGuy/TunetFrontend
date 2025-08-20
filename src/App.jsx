import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import classes from './style/App.module.css';
import MyRouter from "./router/myRouter"
import { useLocation } from "react-router";

function App() {
    const location = useLocation();
    const hideFooterPaths = ['/authorization','/registration','/changePassword'];

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
