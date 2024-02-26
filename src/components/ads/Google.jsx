import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {
    candidateChartLabel,
    chartKeys,
    columnVariants,
} from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import { setTitle } from '../../helpers/browser';
import { sortByNumericProp } from '../../helpers/helpers';
import { formatDefs } from '../../helpers/online';
import { segments } from '../../helpers/routes';

import useAdsData, { csvConfig } from '../../hooks/AdsData';

import TisBarChart from '../charts/TisBarChart';
import AlertWithIcon from '../general/AlertWithIcon';
import Loading from '../general/Loading';
import TisPieChart from '../charts/TisPieChart';
import HeroNumber from '../general/HeroNumber';

function Google({
    accKeys = {
        SPENDING: 'SPENDING',
        AMOUNTS: 'AMOUNTS',
        FORMATS: 'FORMATS',
    },
}) {
    const [activeKeys, setActiveKeys] = useState([accKeys.SPENDING]);
    const [loadedCharts, setLoadedCharts] = useState([accKeys.SPENDING]);

    const { findCandidateForGoogleAccount, sheetsData } = useAdsData();

    // parse data from sheets
    let totalSpending = 0;
    let totalAmount = 0;
    const spendingAggr = {};
    const amountsAggr = {};
    const formatAggr = {};
    const formatPie = {
        data: [],
        nameKey: 'name',
        dataKey: 'value',
        label: t(labels.charts.outgoing),
    };
    if (sheetsData.lastUpdateGgl) {
        sheetsData.googleAds.forEach((pageData) => {
            const candidate = findCandidateForGoogleAccount(
                pageData[csvConfig.GOOGLE.columns.ID]
            );
            if (candidate) {
                const chartLabel = candidateChartLabel(
                    candidate,
                    segments.ONLINE
                );

                // aggregated candidate charts
                const spending = pageData[csvConfig.GOOGLE.columns.SPENDING];
                totalSpending += spending;
                if (!(spendingAggr[candidate] ?? false)) {
                    spendingAggr[candidate] = {
                        name: chartLabel,
                        [chartKeys.SPENDING]: 0,
                    };
                }
                spendingAggr[candidate][chartKeys.SPENDING] += spending;

                const amount = pageData[csvConfig.GOOGLE.columns.AMOUNT];
                totalAmount += amount;
                if (loadedCharts.includes(accKeys.AMOUNTS)) {
                    if (!(amountsAggr[candidate] ?? false)) {
                        amountsAggr[candidate] = {
                            name: chartLabel,
                            [chartKeys.AMOUNT]: 0,
                        };
                    }
                    amountsAggr[candidate][chartKeys.AMOUNT] += amount;
                }

                if (loadedCharts.includes(accKeys.FORMATS)) {
                    Object.keys(formatDefs).forEach((fKey) => {
                        if (pageData[fKey] ?? false) {
                            formatAggr[fKey] =
                                (formatAggr[fKey] ?? 0) + pageData[fKey];
                        }
                    });
                }
            }
        });
    }

    // sort & preprocess aggregated data for charts
    Object.entries(formatAggr).forEach(([fKey, value]) => {
        formatPie.data.push({
            name: fKey,
            value,
            color: formatDefs[fKey],
        });
    });

    const charts = {
        [accKeys.SPENDING]: loadedCharts.includes(accKeys.SPENDING) ? (
            <TisBarChart
                bars={columnVariants.spending}
                currency
                data={Object.values(spendingAggr).sort(
                    sortByNumericProp(chartKeys.SPENDING)
                )}
                subtitle={t(labels.ads.google.spending.disclaimer)}
                timestamp={sheetsData.lastUpdateGgl}
                vertical
            />
        ) : null,
        [accKeys.AMOUNTS]: loadedCharts.includes(accKeys.AMOUNTS) ? (
            <TisBarChart
                bars={columnVariants.amount}
                data={Object.values(amountsAggr).sort(
                    sortByNumericProp(chartKeys.AMOUNT)
                )}
                subtitle={t(labels.ads.amount.disclaimer)}
                timestamp={sheetsData.lastUpdateGgl}
                vertical
            />
        ) : null,
        [accKeys.FORMATS]: loadedCharts.includes(accKeys.FORMATS) ? (
            <Row className="gy-3">
                <Col xl={6}>
                    <TisPieChart
                        currency
                        pie={formatPie}
                        percent={false}
                        subtitle={t(labels.ads.google.format.disclaimer)}
                        timestamp={sheetsData.lastUpdateGgl}
                    />
                </Col>
            </Row>
        ) : null,
    };

    const accordions = [
        [accKeys.SPENDING, labels.ads.google.spending.title],
        [accKeys.AMOUNTS, labels.ads.amount.title],
        [accKeys.FORMATS, labels.ads.google.format.title],
    ].map(([key, label]) => (
        <Accordion.Item key={key} eventKey={key}>
            <Accordion.Header>{t(label)}</Accordion.Header>
            <Accordion.Body>{charts[key]}</Accordion.Body>
        </Accordion.Item>
    ));

    if (!sheetsData.lastUpdateGgl || sheetsData.error) {
        // waiting for data or error in loding
        return <Loading error={sheetsData.error} />;
    }

    const onSelect = (ak) => {
        // open/close accordion
        setActiveKeys(ak);
        // remember if chart was already loaded
        ak.forEach((key) => {
            if (!loadedCharts.includes(key)) {
                setLoadedCharts([...loadedCharts, ...[key]]);
            }
        });
    };

    let content = null;
    if (!sheetsData.loaded) {
        // waiting for data or error in loding
        content = <Loading error={sheetsData.error} />;
    } else {
        content = (
            <Accordion
                className="mt-4"
                activeKey={activeKeys}
                alwaysOpen
                onSelect={onSelect}
            >
                {accordions}
            </Accordion>
        );
    }

    setTitle('Online kampane Google');

    return (
        <div>
            <AlertWithIcon className="my-4" variant="primary">
                {t(labels.ads.google.disclaimer)}
            </AlertWithIcon>
            <Row className="gy-3 gy-lg-0 my-4">
                <Col lg={6}>
                    <HeroNumber
                        disclaimer={t(labels.ads.google.totalDisclaimer)}
                        lastUpdate={sheetsData.lastUpdateGgl || null}
                        loading={!sheetsData.loaded}
                        number={totalSpending}
                        title={t(labels.ads.google.totalSpendingTitle)}
                    />
                </Col>
                <Col lg={6}>
                    <HeroNumber
                        currency={false}
                        disclaimer={t(labels.ads.amount.disclaimer)}
                        lastUpdate={sheetsData.lastUpdateGgl || null}
                        loading={!sheetsData.loaded}
                        number={totalAmount}
                        title={t(labels.ads.amount.title)}
                    />
                </Col>
            </Row>
            {content}
        </div>
    );
}

export default Google;
