import { labels, t } from '../../helpers/dictionary';
import { currencyFormat } from '../../helpers/helpers';

import useAccountsData, {
    aggregatedKeys as agk,
} from '../../hooks/AccountsData';

import LastUpdateTag from '../general/LastUpdateTag';
import Loading from '../general/Loading';

function TotalSpending() {
    const { accountsData } = useAccountsData();

    const total = (accountsData.data ?? []).reduce(
        (sum, row) => (row[agk.outgoing] > 0 ? sum + row[agk.outgoing] : sum),
        0
    );

    return (
        <div className="total-spending">
            <h2>{t(labels.account.totalSpending)}</h2>
            <div className="hero-number">
                {accountsData.data ?? false ? (
                    currencyFormat(total)
                ) : (
                    <Loading small />
                )}
                <LastUpdateTag timestamp={accountsData.lastUpdate ?? null}>
                    {t(labels.account.totalDisclaimer)}
                </LastUpdateTag>
            </div>
        </div>
    );
}

export default TotalSpending;
