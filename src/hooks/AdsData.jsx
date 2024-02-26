import { createContext, useContext, useMemo, useState } from 'react';

import { fixNumber, getTimestampFromDate, isNumeric } from '../helpers/helpers';

export const sheetsId = '1trHKAwQ2ryhzrG5GsSK9BDVMEg3_yaSEOujGVPPeI5U';

export const csvConfig = {
    ACCOUNTS: {
        columns: {
            CANDIDATE: 'Kandidát',
            FB: 'FB Účty',
            GOOGLE: 'Google účty',
            WP: 'WP tag',
        },
        name: 'účty',
    },
    GOOGLE: {
        columns: {
            ID: 'ID',
            PAGE_NAME: 'Inzerent',
            SPENDING: 'Výdavky na reklamu',
            AMOUNT: 'Počet reklám',
            VIDEO: 'Video',
            IMAGE: 'Obrázková',
            TEXT: 'Textová',
            UPDATED: 'Aktualizácia',
        },
        name: 'Google reklama',
    },
    META: {
        columns: {
            PAGE_ID: 'Page ID',
            PAGE_NAME: 'Page name',
            SPENDING: 'Amount spent (EUR)',
        },
        endDate: '21.1.2024',
    },
};

export const metaApiUrl =
    'https://volby.transparency.sk/api/meta/prezident24/ads_json.php';

export const VAT = 1.2;

const initialState = {
    sheetsData: {
        error: null,
        candidates: {},
        googleAds: [],
        metaAds: {},
        lastUpdateFb: 0,
        lastUpdateGgl: 0,
        loaded: false,
    },
    metaApiData: {
        error: null,
        pages: {},
        lastUpdate: 0,
        loaded: false,
    },
};

const filterPoliticAccounts = (candidates) => (account) => {
    if (account[csvConfig.META.columns.PAGE_ID] ?? false) {
        return !!Object.values(candidates).find((candidate) =>
            candidate[csvConfig.ACCOUNTS.columns.FB].includes(
                account[csvConfig.META.columns.PAGE_ID]
            )
        );
    }
    return false;
};

export const loadingErrorSheets = (error) => {
    return { ...initialState.sheetsData, error, loaded: true };
};

export const processDataSheets = (data) => {
    const pd = { ...initialState.sheetsData, loaded: true };
    if (Array.isArray(data)) {
        data.forEach((sheet) => {
            switch (sheet.id ?? '') {
                case csvConfig.ACCOUNTS.name: {
                    sheet.data.forEach((row) => {
                        pd.candidates[
                            row[csvConfig.ACCOUNTS.columns.CANDIDATE]
                        ] = {
                            [csvConfig.ACCOUNTS.columns.FB]:
                                row[csvConfig.ACCOUNTS.columns.FB] ?? false
                                    ? row[csvConfig.ACCOUNTS.columns.FB]
                                          .replaceAll(' ', '')
                                          .split(',')
                                    : [],
                            [csvConfig.ACCOUNTS.columns.GOOGLE]:
                                row[csvConfig.ACCOUNTS.columns.GOOGLE] ?? false
                                    ? row[csvConfig.ACCOUNTS.columns.GOOGLE]
                                          .replaceAll(' ', '')
                                          .split(',')
                                    : [],
                            [csvConfig.ACCOUNTS.columns.WP]:
                                row[csvConfig.ACCOUNTS.columns.WP] ?? null,
                        };
                    });
                    break;
                }
                case csvConfig.GOOGLE.name: {
                    pd.googleAds = sheet.data;
                    sheet.data.forEach((pageData, index) => {
                        const time = getTimestampFromDate(
                            pageData[csvConfig.GOOGLE.columns.UPDATED]
                        );
                        if (time > pd.lastUpdateGgl) {
                            pd.lastUpdateGgl = time;
                        }
                        // process numbers & add VAT
                        pd.googleAds[index][csvConfig.GOOGLE.columns.AMOUNT] =
                            fixNumber(
                                pageData[csvConfig.GOOGLE.columns.AMOUNT]
                            );
                        [
                            csvConfig.GOOGLE.columns.SPENDING,
                            csvConfig.GOOGLE.columns.TEXT,
                            csvConfig.GOOGLE.columns.IMAGE,
                            csvConfig.GOOGLE.columns.VIDEO,
                        ].forEach((col) => {
                            pd.googleAds[index][col] =
                                fixNumber(pageData[col]) * VAT;
                        });
                    });
                    break;
                }
                default: {
                    const words = sheet.id.split(' ');
                    const date = words.length
                        ? words[words.length - 1]
                        : csvConfig.META.endDate;
                    pd.metaAds[date] = sheet.data.filter(
                        filterPoliticAccounts(pd.candidates)
                    );
                    pd.lastUpdateFb = getTimestampFromDate(date);
                }
            }
        });
    }
    return pd;
};

export const loadingErrorMetaApi = (error, originalData) => {
    return { ...originalData, error, loaded: true };
};

export const processDataMetaApi = (data) => {
    if (data.pages ?? false) {
        const pd = { ...initialState.metaApiData, ...data, loaded: true };
        Object.entries(data.pages).forEach(([pageId, pageProps]) => {
            // find highest date
            pd.lastUpdate = Math.max(pd.lastUpdate, pageProps.updated ?? 0);
            // calculate amounts with VAT
            pd.pages[pageId].spend.min = pageProps.spend.min * VAT;
            pd.pages[pageId].spend.max = pageProps.spend.max * VAT;
            pd.pages[pageId].spend.est = pageProps.spend.est * VAT;
        });
        return pd;
    }
    return data;
};

const AdsDataContext = createContext(initialState);

export const AdsDataProvider = function ({ children }) {
    const [sheetsData, setSheetsData] = useState(initialState.sheetsData);
    const [metaApiData, setMetaApiData] = useState(initialState.metaApiData);

    // selectors

    const getAllFbAccounts = () => {
        const all = [];
        Object.values(sheetsData.candidates).forEach((candidate) => {
            all.push(...candidate[csvConfig.ACCOUNTS.columns.FB]);
        });
        return all;
    };

    const mergedWeeksData = () => {
        const accounts = {};
        // add weekly spending from all weeks
        Object.values(sheetsData.metaAds).forEach((week) => {
            week.forEach((account) => {
                if (isNumeric(account[csvConfig.META.columns.SPENDING])) {
                    if (
                        !(
                            accounts[account[csvConfig.META.columns.PAGE_ID]] ??
                            false
                        )
                    ) {
                        accounts[account[csvConfig.META.columns.PAGE_ID]] = {
                            name: account[csvConfig.META.columns.PAGE_NAME],
                            outgoing: 0,
                        };
                    }
                    accounts[
                        account[csvConfig.META.columns.PAGE_ID]
                    ].outgoing +=
                        Number(account[csvConfig.META.columns.SPENDING]) * VAT;
                }
            });
        });

        return accounts;
    };

    const allCandidatesNames = () =>
        sheetsData.loaded ? Object.keys(sheetsData.candidates) : null;

    const candidateAdsData = (name) =>
        sheetsData.loaded ? sheetsData.candidates[name] ?? false : null;

    const findCandidateForGoogleAccount = (accountId) => {
        const found = Object.entries(sheetsData.candidates).find(
            ([, candidate]) =>
                candidate[csvConfig.ACCOUNTS.columns.GOOGLE].includes(accountId)
        );
        return found ? found[0] : null;
    };

    const findCandidateForMetaAccount = (accountId) => {
        const found = Object.entries(sheetsData.candidates).find(
            ([, candidate]) =>
                candidate[csvConfig.ACCOUNTS.columns.FB].includes(accountId)
        );
        return found ? found[0] : null;
    };

    const value = useMemo(
        () => ({
            sheetsData,
            setSheetsData,
            metaApiData,
            setMetaApiData,
            allFbAccounts: getAllFbAccounts(),
            mergedWeeksData: mergedWeeksData(),
            allCandidatesNames,
            candidateAdsData,
            findCandidateForGoogleAccount,
            findCandidateForMetaAccount,
        }),
        [sheetsData, metaApiData]
    );

    return (
        <AdsDataContext.Provider value={value}>
            {children}
        </AdsDataContext.Provider>
    );
};

const useAdsData = () => {
    const context = useContext(AdsDataContext);

    if (context === undefined) {
        throw new Error('useAdsData must be used within an AdsDataContext');
    }

    return context;
};

export default useAdsData;
