import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import classes from './style/App.module.css';
import MyRouter from "./router/myRouter"

function App() {
  return (
    <div className={classes.page}>
        <header className={classes.header}><Header/></header>
        <main className={classes.main}><MyRouter/></main>
        <footer className={classes.footer}><Footer/></footer>
    </div>
  )
}

export default App
