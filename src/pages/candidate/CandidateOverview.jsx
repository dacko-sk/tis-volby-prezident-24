import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { colors } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { currencyFormat } from '../../helpers/helpers';
import { routes, segments } from '../../helpers/routes';
import { wpCat } from '../../helpers/wp';

import { aggregatedKeys as agk } from '../../hooks/AccountsData';

import TisBarChart from '../../components/charts/TisBarChart';
import AlertWithIcon from '../../components/general/AlertWithIcon';
import LastUpdateTag from '../../components/general/LastUpdateTag';
import Loading from '../../components/general/Loading';
import Posts, { templates } from '../../components/wp/Posts';

function CandidateOverview() {
    const candidate = useOutletContext();

    setTitle(candidate.props.name);

    return (
        <div className="subpage">
            {candidate.account === false ? (
                <AlertWithIcon className="my-4" variant="danger">
                    {t(labels.account.noData)}
                </AlertWithIcon>
            ) : (
                <Row className="my-4">
                    <Col lg={6}>
                        <TisBarChart
                            bars={[
                                {
                                    key: agk.outgoing,
                                    name: labels.charts.outgoing,
                                    color: colors.colorOrange,
                                    stackId: 'finance',
                                },
                                {
                                    key: agk.incoming,
                                    name: labels.charts.incoming,
                                    color: colors.colorDarkBlue,
                                    stackId: 'finance',
                                },
                            ]}
                            data={[
                                {
                                    name: t(labels.charts.outgoing),
                                    [agk.outgoing]:
                                        candidate.account?.[agk.outgoing] ?? 0,
                                },
                                {
                                    name: t(labels.charts.incoming),
                                    [agk.incoming]:
                                        candidate.account?.[agk.incoming] ?? 0,
                                },
                            ]}
                            buttonLink={routes.charts}
                            currency
                            lastUpdate={false}
                        />
                    </Col>
                    <Col lg={6} className="text-center">
                        <div className="total-spending">
                            <h2 className="mt-xxl-4">
                                {t(labels.account.candidateSpending)}
                            </h2>
                            <div className="hero-number">
                                {candidate.account ?? false ? (
                                    currencyFormat(
                                        candidate.account[agk.outgoing]
                                    )
                                ) : (
                                    <Loading small />
                                )}
                                <LastUpdateTag
                                    timestamp={
                                        candidate.account?.[agk.timestamp] ??
                                        null
                                    }
                                />
                            </div>
                        </div>

                        <div className="buttons mt-4">
                            <Button
                                as={Link}
                                to={routes.candidate(
                                    candidate.props.name,
                                    segments.TRANSACTIONS
                                )}
                                variant="secondary"
                            >
                                {t(labels.account.allTransactions)}
                            </Button>
                        </div>
                    </Col>
                </Row>
            )}

            {(candidate.props.wp ?? false) && (
                <>
                    <h2 className="mt-4">{t(labels.news.latest)}</h2>
                    <Posts
                        categories={[wpCat.news]}
                        limit={2}
                        showMoreLink={routes.candidate(
                            candidate.props.name,
                            segments.NEWS
                        )}
                        tags={[candidate.props.wp]}
                        template={templates.condensed}
                    />
                </>
            )}
        </div>
    );
}

export default CandidateOverview;
