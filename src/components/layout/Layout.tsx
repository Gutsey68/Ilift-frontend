import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <Header />
            <div className="wrapper">
                <div className="wrap"></div>
            </div>
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}
