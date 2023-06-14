import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">

            <AuthMenu />
            <header>
                <Header />
            </header>
            <aside>
                <Menu />
            </aside>
            <main>
                <Routing />
            </main>
            <footer>
                <Footer />
            </footer>
            <hr />


        </div>
    );
}

export default Layout;
