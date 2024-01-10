import { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';

import { candidateData } from '../helpers/constants';
import { labels, t } from '../helpers/dictionary';
import { routes, segments } from '../helpers/routes';

import Title from '../components/structure/Title';

function Candidate() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const candidate = candidateData(slug);

    useEffect(() => {
        if (!candidate) {
            // redirect to home page in case candidate does not have transparent account
            navigate(routes.home());
        }
    }, [candidate, navigate]);

    return (
        <section className="party-page">
            <Title secondaryWords={1}>{candidate.name}</Title>
            <div className="tabs-scrollable">
                <Nav variant="tabs">
                    <Nav.Link
                        as={NavLink}
                        to={routes.candidate(candidate.name)}
                        end
                    >
                        {t(labels.candidates.overview)}
                    </Nav.Link>
                    <Nav.Link
                        as={NavLink}
                        to={routes.candidate(
                            candidate.name,
                            segments.TRANSACTIONS
                        )}
                    >
                        {t(labels.candidates.funding)}
                    </Nav.Link>
                    {(candidate.wp ?? false) && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.candidate(
                                candidate.name,
                                segments.ANALYSIS
                            )}
                        >
                            {t(labels.analysis.navTitle)}
                        </Nav.Link>
                    )}
                    <Nav.Link
                        as={NavLink}
                        to={routes.candidate(candidate.name, segments.ONLINE)}
                    >
                        {t(labels.online.navTitle)}
                    </Nav.Link>
                    {(candidate.wp ?? false) && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.candidate(candidate.name, segments.NEWS)}
                        >
                            {t(labels.news.navTitle)}
                        </Nav.Link>
                    )}
                    {(candidate.wp ?? false) && (
                        <Nav.Link
                            as={NavLink}
                            to={routes.candidate(
                                candidate.name,
                                segments.ASSETS
                            )}
                        >
                            {t(labels.candidates.assets)}
                        </Nav.Link>
                    )}
                </Nav>
            </div>

            <Outlet context={candidate} />
        </section>
    );
}

export default Candidate;
