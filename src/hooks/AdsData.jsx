import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useGoogleSheets from 'use-google-sheets';
import { usePapaParse } from 'react-papaparse';
import { useQuery } from '@tanstack/react-query';

import { dates, offlineMode } from '../helpers/constants';
import {
    fixNumber,
    getEodTimestampFromDate,
    getTimestampFromIsoDate,
    isNumeric,
} from '../helpers/helpers';

import accounts from '../../public/csv/online/accounts.csv';
import google from '../../public/csv/online/Google.csv';
import meta from '../../public/csv/online/Meta.csv';

export const sheetsId = '1trHKAwQ2ryhzrG5GsSK9BDVMEg3_yaSEOujGVPPeI5U';

export const csvConfig = {
    ACCOUNTS: {
        columns: {
            CANDIDATE: 'Kandidát',
            FB: 'FB Účty',
            GOOGLE: 'Google účty',
            WP: 'WP tag',
            INFO: 'Info',
            REPORT: 'Záverečná správa',
            CAMPAIGN: 'Kampaň',
            PRECAMPAIGN: 'Predkampaň',
        },
        file: accounts,
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
        file: google,
        name: 'Google reklama',
    },
    META: {
        columns: {
            PAGE_ID: 'Page ID',
            PAGE_NAME: 'Page name',
            SPENDING: 'Amount spent (EUR)',
        },
        file: meta,
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

const parseAccountsSheet = (allData, sheetData) => {
    const candidates = {};
    sheetData.forEach((row) => {
        candidates[row[csvConfig.ACCOUNTS.columns.CANDIDATE]] = {
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
                row[csvConfig.ACCOUNTS.columns.WP] ?? false
                    ? fixNumber(row[csvConfig.ACCOUNTS.columns.WP])
                    : null,
            [csvConfig.ACCOUNTS.columns.INFO]: row[
                csvConfig.ACCOUNTS.columns.INFO
            ]?.length
                ? fixNumber(row[csvConfig.ACCOUNTS.columns.INFO])
                : null,
            [csvConfig.ACCOUNTS.columns.REPORT]:
                row[csvConfig.ACCOUNTS.columns.REPORT] ?? null,
            [csvConfig.ACCOUNTS.columns.CAMPAIGN]:
                row[csvConfig.ACCOUNTS.columns.CAMPAIGN] ?? false
                    ? fixNumber(row[csvConfig.ACCOUNTS.columns.CAMPAIGN])
                    : 0,
            [csvConfig.ACCOUNTS.columns.PRECAMPAIGN]:
                row[csvConfig.ACCOUNTS.columns.PRECAMPAIGN] ?? false
                    ? fixNumber(row[csvConfig.ACCOUNTS.columns.PRECAMPAIGN])
                    : 0,
        };
    });
    return { ...allData, candidates };
};

const parseGoogleSheet = (allData, sheetData) => ({
    ...allData,
    googleAds: sheetData.map((pageData) => ({
        ...pageData,
        [csvConfig.GOOGLE.columns.AMOUNT]: fixNumber(
            pageData[csvConfig.GOOGLE.columns.AMOUNT]
        ),
        [csvConfig.GOOGLE.columns.SPENDING]:
            fixNumber(pageData[csvConfig.GOOGLE.columns.SPENDING]) * VAT,
        [csvConfig.GOOGLE.columns.TEXT]:
            fixNumber(pageData[csvConfig.GOOGLE.columns.TEXT]) * VAT,
        [csvConfig.GOOGLE.columns.IMAGE]:
            fixNumber(pageData[csvConfig.GOOGLE.columns.IMAGE]) * VAT,
        [csvConfig.GOOGLE.columns.VIDEO]:
            fixNumber(pageData[csvConfig.GOOGLE.columns.VIDEO]) * VAT,
    })),
    lastUpdateGgl: Math.max(
        ...sheetData.map((pageData) =>
            getEodTimestampFromDate(pageData[csvConfig.GOOGLE.columns.UPDATED])
        )
    ),
});

const parseMetaSheet = (allData, sheetData, date) => ({
    ...allData,
    metaAds: {
        ...allData.metaAds,
        [date]: sheetData.filter(filterPoliticAccounts(allData.candidates)),
    },
    lastUpdateFb: date,
});

export const loadingErrorSheets = (error) => {
    return { ...initialState.sheetsData, error, loaded: true };
};

export const processDataSheets = (data) => {
    let pd = { ...initialState.sheetsData, loaded: true };
    if (Array.isArray(data)) {
        data.forEach((sheet) => {
            switch (sheet.id ?? '') {
                case csvConfig.ACCOUNTS.name: {
                    pd = parseAccountsSheet(pd, sheet.data);
                    break;
                }
                case csvConfig.GOOGLE.name: {
                    pd = parseGoogleSheet(pd, sheet.data);
                    break;
                }
                default: {
                    const words = sheet.id.split(' ');
                    const date = words.length
                        ? getEodTimestampFromDate(words[words.length - 1])
                        : getTimestampFromIsoDate(dates.monitoringEnd);
                    pd = parseMetaSheet(pd, sheet.data, date);
                }
            }
        });
    }
    return pd;
};

const processDataCsv = (filesData) => {
    let pd = { ...initialState.sheetsData, loaded: true };
    Object.keys(csvConfig).forEach((key) => {
        if (Array.isArray(filesData[key].data) && filesData[key].data.length) {
            switch (key) {
                case 'ACCOUNTS': {
                    pd = parseAccountsSheet(pd, filesData[key].data);
                    break;
                }
                case 'GOOGLE': {
                    pd = parseGoogleSheet(pd, filesData[key].data);
                    break;
                }
                case 'META':
                default: {
                    pd = parseMetaSheet(
                        pd,
                        filesData[key].data,
                        getTimestampFromIsoDate(dates.monitoringEnd)
                    );
                }
            }
        }
    });
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
    const { readRemoteFile } = usePapaParse();

    if (offlineMode) {
        // initial ads data load from csv files
        useEffect(() => {
            const csvFiles = Object.entries(csvConfig);
            const filesData = {};
            Promise.all(
                csvFiles.map(
                    ([key, config]) =>
                        new Promise((resolve, reject) => {
                            readRemoteFile(config.file, {
                                worker: false,
                                header: true,
                                dynamicTyping: false, // do not resolve types
                                skipEmptyLines: true,
                                complete: (csv) => {
                                    filesData[key] = csv;
                                    return resolve(key);
                                },
                                error: reject,
                            });
                        })
                )
            )
                .then((results) => {
                    const pd =
                        results.length === csvFiles.length
                            ? processDataCsv(filesData)
                            : loadingErrorSheets('Failed to load all files');
                    setSheetsData(pd);
                })
                .catch((error) => {
                    const pd = loadingErrorSheets(error);
                    setSheetsData(pd);
                });
        }, []);
    } else {
        // initial ads data load from google sheets
        const {
            data: gsData,
            loading: gsLoading,
            error: gsError,
        } = useGoogleSheets({
            apiKey: process.env.REACT_APP_SHEETS_API_KEY,
            sheetId: sheetsId,
        });

        // store ads data in context provider once loaded
        useEffect(() => {
            if (gsError) {
                const parsed = loadingErrorSheets(gsError);
                setSheetsData(parsed);
            } else if (!gsLoading && gsData) {
                const parsed = processDataSheets(gsData);
                setSheetsData(parsed);
            }
        }, [gsData, gsLoading, gsError]);
    }

    // load ads data from meta API & reload every 12 hours
    const d = new Date();
    const reloadKey = `${d.getMonth() + 1}${d.getDate()}${Math.floor(
        d.getHours() / 12
    )}`;
    const {
        isLoading: maLoading,
        error: maError,
        data: maData,
    } = useQuery([`meta_api_all_${reloadKey}`], () =>
        fetch(`${metaApiUrl}?${reloadKey}`).then((response) => response.json())
    );
    // store meta API data in context provider once loaded
    useEffect(() => {
        if (maError) {
            const parsed = loadingErrorMetaApi(maError, metaApiData);
            setMetaApiData(parsed);
        } else if (!maLoading && maData) {
            const parsed = processDataMetaApi(maData);
            if (parsed.lastUpdate > metaApiData.lastUpdate) {
                setMetaApiData(parsed);
            }
        }
    }, [maData, maLoading, maError, reloadKey]);

    // selectors
    const getAllFbAccounts = () => {
        const all = [];
        Object.values(sheetsData.candidates).forEach((candidate) => {
            all.push(...candidate[csvConfig.ACCOUNTS.columns.FB]);
        });
        return all;
    };

    const mergedWeeksData = () => {
        const profiles = {};
        // add weekly spending from all weeks
        Object.values(sheetsData.metaAds).forEach((week) => {
            week.forEach((profile) => {
                if (isNumeric(profile[csvConfig.META.columns.SPENDING])) {
                    if (
                        !(
                            profiles[profile[csvConfig.META.columns.PAGE_ID]] ??
                            false
                        )
                    ) {
                        profiles[profile[csvConfig.META.columns.PAGE_ID]] = {
                            name: profile[csvConfig.META.columns.PAGE_NAME],
                            outgoing: 0,
                        };
                    }
                    profiles[
                        profile[csvConfig.META.columns.PAGE_ID]
                    ].outgoing +=
                        Number(profile[csvConfig.META.columns.SPENDING]) * VAT;
                }
            });
        });

        return profiles;
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

    const findCandidateByWpTags = (tags) => {
        const found = Object.entries(sheetsData.candidates).find(
            ([, candidate]) =>
                tags.includes(candidate[csvConfig.ACCOUNTS.columns.WP])
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
            findCandidateByWpTags,
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
