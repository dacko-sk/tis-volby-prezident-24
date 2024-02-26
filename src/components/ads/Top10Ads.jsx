import {
    candidateChartLabel,
    chartKeys,
    columnVariants,
} from '../../helpers/charts';
import { labels, t } from '../../helpers/dictionary';
import { sortByNumericProp } from '../../helpers/helpers';
import { routes, segments } from '../../helpers/routes';

import useAdsData, { csvConfig } from '../../hooks/AdsData';

import TisBarChart from '../charts/TisBarChart';

function Top10Ads({ maxItems = 10 }) {
    const {
        findCandidateForGoogleAccount,
        findCandidateForMetaAccount,
        mergedWeeksData,
        sheetsData,
    } = useAdsData();

    // parse data
    const spending = {};
    if (sheetsData.lastUpdateFb) {
        Object.entries(mergedWeeksData).forEach(([pageId, pageProps]) => {
            const candidate = findCandidateForMetaAccount(pageId);
            if (candidate) {
                if (!(spending[candidate] ?? false)) {
                    spending[candidate] = {
                        name: candidateChartLabel(candidate, segments.ONLINE),
                        [chartKeys.META]: 0,
                        [chartKeys.GOOGLE]: 0,
                        [chartKeys.TOTAL]: 0,
                    };
                }
                spending[candidate][chartKeys.META] += pageProps.outgoing;
                spending[candidate][chartKeys.TOTAL] += pageProps.outgoing;
            }
        });
    }
    if (sheetsData.lastUpdateGgl) {
        sheetsData.googleAds.forEach((pageData) => {
            const candidate = findCandidateForGoogleAccount(
                pageData[csvConfig.GOOGLE.columns.ID]
            );
            if (candidate) {
                if (!(spending[candidate] ?? false)) {
                    spending[candidate] = {
                        name: candidateChartLabel(candidate, segments.ONLINE),
                        [chartKeys.META]: 0,
                        [chartKeys.GOOGLE]: 0,
                        [chartKeys.TOTAL]: 0,
                    };
                }
                spending[candidate][chartKeys.GOOGLE] +=
                    pageData[csvConfig.GOOGLE.columns.SPENDING];
                spending[candidate][chartKeys.TOTAL] +=
                    pageData[csvConfig.GOOGLE.columns.SPENDING];
            }
        });
    }
    const columns = Object.values(spending)
        .sort(sortByNumericProp(chartKeys.TOTAL))
        .slice(0, maxItems);

    return (
        <div id="online-charts">
            <TisBarChart
                bars={columnVariants.online}
                buttonLink={routes.online()}
                buttonText={t(labels.ads.showMore)}
                currency
                data={columns}
                timestamp={Math.min(
                    sheetsData.lastUpdateFb,
                    sheetsData.lastUpdateGgl
                )}
                subtitle={t(labels.ads.topDisclaimer)}
                title={t(labels.ads.topTitle)}
                vertical
            />
        </div>
    );
}

export default Top10Ads;
