import { createContext, useContext, useMemo, useState } from 'react';
import { usePapaParse } from 'react-papaparse';

import { contains } from '../helpers/helpers';

// import aggregatedAcounts from '../../public/csv/transparent/final_aggr_no_returns.csv';
// import all csv files from the accounts folder via webpack
// const accountsFolder = require.context(
//     '../../public/csv/transparent/accounts',
//     false,
//     /\.csv$/
// );
// const accountFile = (filename) => {
//     let found = null;
//     accountsFolder.keys().some((key) => {
//         if (key.endsWith(filename)) {
//             found = key;
//             return true;
//         }
//         return false;
//     });
//     return found ? accountsFolder(found) : null;
// };
const accountFile = (filename) =>
    `https://raw.githubusercontent.com/matusv/presidential-elections-slovakia-2024/main/accounts/${filename}`;

export const accountsFile =
    'https://raw.githubusercontent.com/matusv/presidential-elections-slovakia-2024/main/aggregation_no_returns.csv';
export const baseDate = 1705266940;

export const csvAggregatedKeys = {
    account: 'url',
    name: 'name',
    incoming: 'sum_incoming',
    outgoing: 'sum_outgoing',
    timestamp: 'timestamp',
};

export const csvAccountKeys = {
    account_name: 'account_name',
    date: 'date',
    amount: 'amount',
    // currency: 'currency',
    message: 'message',
    tx_type: 'tx_type',
    vs: 'vs',
    ss: 'ss',
};

export const getFileName = (account) => {
    if (
        !(account[csvAggregatedKeys.name] ?? false) ||
        !(account[csvAggregatedKeys.account] ?? false)
    ) {
        return null;
    }
    let fileName = null;
    const match = account[csvAggregatedKeys.account].match(
        /.*(?:SK\d{12})?(\d{10}).*/
    );
    if (match && match.length > 1) {
        // #1) IBAN / 10 digits account number match
        [, fileName] = match;
    } else if (account[csvAggregatedKeys.account].length > 9) {
        // #2) last 10 characters
        fileName = account[csvAggregatedKeys.account].substr(-10);
    }
    return fileName
        ? accountFile(`${account[csvAggregatedKeys.name]} ${fileName}.csv`)
        : null;
};

export const processAccountsData = (data) => {
    if (data.data ?? false) {
        const pd = data;
        let lastUpdate = baseDate;
        pd.data.forEach((row, index) => {
            lastUpdate = Math.max(
                lastUpdate,
                row[csvAggregatedKeys.timestamp] ?? 0
            );

            // trim certain columns
            [csvAggregatedKeys.account, csvAggregatedKeys.name].forEach(
                (column) => {
                    pd.data[index][column] = (row[column] ?? '').trim();
                }
            );

            // fix errors in account numbers
            if (
                contains(
                    pd.data[index][csvAggregatedKeys.account],
                    'transparentneucty.sk/?1/#/'
                )
            ) {
                pd.data[index][csvAggregatedKeys.account] = pd.data[index][
                    csvAggregatedKeys.account
                ].replace('/?1/#/', '/#/');
            }

            // parse numbers
            pd.data[index][csvAggregatedKeys.incoming] =
                row[csvAggregatedKeys.incoming] ?? 0;
            pd.data[index][csvAggregatedKeys.outgoing] = Math.abs(
                row[csvAggregatedKeys.outgoing] ?? 0
            );
            pd.data[index].balance = row.balance ?? 0;
            pd.data[index].num_incoming = row.num_incoming ?? 0;
            pd.data[index].num_outgoing = row.num_outgoing ?? 0;
            pd.data[index].num_unique_donors = row.num_unique_donors ?? 0;
        });

        return {
            ...pd,
            lastUpdate,
        };
    }
    return data;
};

export const findByProperty = (accountsData, property, value) => {
    if (accountsData.data ?? false) {
        return accountsData.data.find((row) => row[property] === value) ?? null;
    }
    return null;
};

export const buildParserConfig = (processCallback, storeDataCallback) => {
    return {
        worker: true, // must be false for local files
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
            const data =
                typeof processCallback === 'function'
                    ? processCallback(results)
                    : results;
            storeDataCallback(data);
        },
    };
};

const initialState = {
    lastUpdate: baseDate,
};

const AccountsDataContext = createContext(initialState);

export const AccountsDataProvider = function ({ children }) {
    const [accountsData, setAccountsData] = useState(initialState);
    const { readRemoteFile } = usePapaParse();

    // selectors
    const loadAccountsData = () => {
        readRemoteFile(
            accountsFile,
            buildParserConfig(processAccountsData, setAccountsData)
        );
    };

    const value = useMemo(
        () => ({
            accountsData,
            setAccountsData,
            loadAccountsData,
        }),
        [accountsData]
    );

    return (
        <AccountsDataContext.Provider value={value}>
            {children}
        </AccountsDataContext.Provider>
    );
};

const useAccountsData = () => {
    const context = useContext(AccountsDataContext);

    if (context === undefined) {
        throw new Error(
            'useAccountsData must be used within a AccountsDataContext'
        );
    }

    return context;
};

export default useAccountsData;
