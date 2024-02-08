import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { colors } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { routes, segments } from '../../helpers/routes';
import { wpCat } from '../../helpers/wp';

import { aggregatedKeys as agk } from '../../hooks/AccountsData';
import { csvConfig } from '../../hooks/AdsData';

import TisBarChart from '../../components/charts/TisBarChart';
import AlertWithIcon from '../../components/general/AlertWithIcon';
import HeroNumber from '../../components/general/HeroNumber';
import Posts, { templates } from '../../components/wp/Posts';

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
