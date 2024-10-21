import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { elections } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import {
    getCurrentLanguage,
    languages,
    localizePath,
    routes,
} from '../../helpers/routes';

import SiteSelector from './SiteSelector';
import DonateButton from '../general/DonateButton';
import SearchField from '../general/SearchField';

import logo from '../../../public/img/tis-logo-blue.png';

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="https://volby.transparency.sk">
                    <img src={logo} alt={t(labels.tis)} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-menu" />
                <Navbar.Collapse id="main-menu">
                    <Nav
                        defaultActiveKey={routes.home()}
                        variant="pills"
                        className="me-auto"
                    >
                        <SiteSelector site={elections.p24} />
                        <Nav.Link as={NavLink} to={routes.candidates()}>
                            {t(labels.candidates.navTitle)}
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={routes.online()}>
                            {t(labels.online.navTitle)}
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={routes.news()}>
                            {t(labels.news.navTitle)}
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={routes.analyses()}>
                            {t(labels.analyses.navTitle)}
                        </Nav.Link>
                    </Nav>
                    <SearchField />
                    <Nav variant="pills" className="me-2">
                        <NavDropdown
                            title={getCurrentLanguage()}
                            id="language-menu"
                            align="end"
                            className="text-uppercase"
                        >
                            {Object.keys(languages).map((lang) => (
                                <NavDropdown.Item
                                    key={lang}
                                    as={NavLink}
                                    to={localizePath(lang)}
                                    end
                                >
                                    {lang}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                    <DonateButton xl />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
