import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { scrollToTop } from './helpers/browser';

import Header from './components/structure/Header';
import Footer from './components/structure/Footer';
import DonateBanner from './components/general/DonateBanner';
// import DonateModal from './components/general/DonateModal';

import useAccountsData from './hooks/AccountsData';

function Layout() {
    const { pathname } = useLocation();
    const { loadAccountsData } = useAccountsData();

    // load transparent accounts data on first apge load
    useEffect(() => {
        loadAccountsData();
    }, []);

    // send pageview to analytics on route change
    useEffect(() => {
        if (!window.location.href.includes('localhost')) {
            window.dataLayer.push({
                event: 'pageview',
                page: {
                    path: pathname,
                    title: document.title,
                },
            });
        }
    }, [pathname]);

    // scroll to top when route changes
    useEffect(() => {
        scrollToTop();
    }, [pathname]);

    return (
        <div className="layout-default">
            <Header />

            <main className="container mb-4">
                <Outlet />
            </main>

            <DonateBanner />

            <Footer />
            {/* <DonateModal /> */}
        </div>
    );
}

export default Layout;
