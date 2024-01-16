import { labels, t } from '../../helpers/dictionary';
import { candidateChartLabel } from '../../helpers/charts';
import { sortByNumericProp } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

import useAccountsData, {
    csvAggregatedKeys as ak,
} from '../../hooks/AccountsData';

import TisBarChart from '../charts/TisBarChart';

function Top10({ maxItems = 10 }) {
    const { accountsData } = useAccountsData();

    const columns = (accountsData.data ?? []).map((row) => ({
        [ak.name]: candidateChartLabel(row[ak.name]),
        [ak.incoming]: row[ak.incoming],
        [ak.outgoing]: row[ak.outgoing],
    }));

    return (
        <TisBarChart
            buttonLink={routes.charts}
            className="mb-4"
            currency
            data={columns
                .sort(sortByNumericProp(ak.outgoing))
                .slice(0, maxItems)}
            subtitle={`${t(labels.charts.disclaimer)} ${t(
                labels.charts.disclaimerClick
            )}`}
            title={t(labels.charts.top10)}
            timestamp={accountsData.lastUpdate}
            showSum={false}
            vertical
        />
    );
}

export default Top10;
