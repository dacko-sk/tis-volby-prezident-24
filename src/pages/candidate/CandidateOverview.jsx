import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { routes, segments } from '../../helpers/routes';
import { wpCat } from '../../helpers/wp';

import { aggregatedKeys as agk } from '../../hooks/AccountsData';
import { csvConfig } from '../../hooks/AdsData';

import AlertWithIcon from '../../components/general/AlertWithIcon';
import HeroNumber from '../../components/general/HeroNumber';
import Posts, { templates } from '../../components/wp/Posts';

import pdfIcon from '../../../public/img/PDF_icon.svg?url';

function CandidateOverview() {
    const candidate = useOutletContext();

    setTitle(candidate.name);

    return (
        <div className="subpage">
            {candidate.account === false ? (
                <AlertWithIcon className="my-4" variant="danger">
                    {t(labels.account.noData)}
                </AlertWithIcon>
            ) : (
                <Row className="my-4">
                    <Col lg={6}>
                        <h2 className="text-center mb-4">
                            {t(labels.candidates.campaign)}
                        </h2>
                        <div className="mb-4">
                            <Link
                                to={routes.candidate(
                                    candidate.name,
                                    segments.TRANSACTIONS
                                )}
                                className="icon-link"
                            >
                                <span>{t(labels.elections.account)}</span>
                            </Link>

                            {candidate.hasReport && (
                                <a
                                    className="icon-link"
                                    href={
                                        candidate[
                                            csvConfig.ACCOUNTS.columns.REPORT
                                        ]
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="download"
                                >
                                    <span>{t(labels.candidates.report)}</span>
                                    <img src={pdfIcon} />
                                </a>
                            )}
                        </div>
                    </Col>
                    <Col lg={6}>
                        <HeroNumber
                            button={t(labels.account.allTransactions)}
                            className="mt-xxl-4"
                            lastUpdate={
                                candidate.account?.[agk.timestamp] ?? null
                            }
                            link={routes.candidate(
                                candidate.name,
                                segments.TRANSACTIONS
                            )}
                            loading={!(candidate.account ?? false)}
                            number={candidate.account?.[agk.outgoing]}
                            title={t(labels.account.candidateSpending)}
                        />
                    </Col>
                </Row>
            )}

            {candidate.hasWp && (
                <>
                    <h2 className="mt-4">{t(labels.news.latest)}</h2>
                    <Posts
                        categories={[wpCat.news]}
                        limit={2}
                        showMoreLink={routes.candidate(
                            candidate.name,
                            segments.NEWS
                        )}
                        tags={[candidate[csvConfig.ACCOUNTS.columns.WP]]}
                        template={templates.condensed}
                    />
                </>
            )}
        </div>
    );
}

export default CandidateOverview;
