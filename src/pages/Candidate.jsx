import { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';

import { candidateProps } from '../helpers/constants';
import { labels, t } from '../helpers/dictionary';
import { decodeSlug, routes, segments } from '../helpers/routes';

import useAccountsData from '../hooks/AccountsData';

import Title from '../components/structure/Title';

function Candidate() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { candidateAccountData } = useAccountsData();

    const name = decodeSlug(slug);
    const candidate = {
        account: candidateAccountData(name),
        props: candidateProps(name),
    };

    useEffect(() => {
        if (!candidate.props) {
            // redirect to home page in case candidate is unknown
            navigate(routes.home());
        }
    }, [candidate, navigate]);

    if (!candidate.props) {
        // stop rendering & let useEffect hook to redirect
        return null;
    }

    return (
        <section className="party-page">
            <Title secondaryWords={1}>{name}</Title>
            <div className="tabs-scrollable">
                <Nav variant="tabs">
                    <Nav.Link as={NavLink} to={routes.candidate(name)} end>
                        {t(labels.candidates.overview)}
                    </Nav.Link>
                    {candidate.account !== false && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.candidate(name, segments.TRANSACTIONS)}
                        >
                            {t(labels.candidates.funding)}
                        </Nav.Link>
                    )}
                    {/* {(candidate.props.wp ?? false) && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.candidate(name, segments.ANALYSIS)}
                        >
                            {t(labels.analysis.navTitle)}
                        </Nav.Link>
                    )} */}
                    {/* <Nav.Link
                        as={NavLink}
                        to={routes.candidate(name, segments.ONLINE)}
                    >
                        {t(labels.online.navTitle)}
                    </Nav.Link> */}
                    {(candidate.props.wp ?? false) && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.candidate(name, segments.NEWS)}
                        >
                            {t(labels.news.navTitle)}
                        </Nav.Link>
                    )}
                    {/* {(candidate.props.wp ?? false) && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.candidate(name, segments.ASSETS)}
                        >
                            {t(labels.candidates.assets)}
                        </Nav.Link>
                    )} */}
                </Nav>
            </div>

            <Outlet context={candidate} />
        </section>
    );
}

export default Candidate;
