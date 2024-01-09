import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { contains } from '../helpers/helpers';
import { routes, segments } from '../helpers/routes';
import { wpCat } from '../helpers/wp';

// import useAdsData, { csvConfig, csvFiles } from '../h/AdsData';
// import useAccountsData, { csvAggregatedKeys } from '../hooks/AccountsData';

import AlertWithIcon from '../components/general/AlertWithIcon';
import Title from '../components/structure/Title';
import Posts from '../components/wp/Posts';

function Search(/* { googleColumns = csvConfig[csvFiles.GOOGLE].columns } */) {
    const params = useParams();
    const query = params.query ?? null;
    const navigate = useNavigate();

    // const { csvData, findPartyByFbName } = useAccountsData();
    // const {
    //     findPartyForFbAccount,
    //     findPartyForGoogleAccount,
    //     mergedWeeksData,
    //     sheetsData,
    // } = useAdsData();

    // parse data
    const parties = [];
    // if (csvData.data ?? false) {
    //     csvData.data.forEach((row) => {
    //         // party name matches - list party
    //         if (
    //             contains(row[csvAggregatedKeys.name], query) ||
    //             contains(row.fbName, query) ||
    //             contains(row.fullName, query) ||
    //             contains(row.slug, query)
    //         ) {
    //             const link = routes.party(row[csvAggregatedKeys.name]);
    //             parties.push(
    //                 <Col
    //                     key={row[csvAggregatedKeys.name]}
    //                     className="d-flex"
    //                     sm
    //                 >
    //                     <Link
    //                         to={link}
    //                         className="d-flex flex-column justify-content-between w-100 cat-local"
    //                     >
    //                         <h3>{row[csvAggregatedKeys.name]}</h3>
    //                         <div className="town mt-3">{row.fullName}</div>
    //                     </Link>
    //                 </Col>
    //             );
    //         }
    //     });
    // }

    // parse data from sheets
    const online = [];
    // if (sheetsData.lastUpdateFb) {
    //     Object.entries(mergedWeeksData).forEach(([pageId, pageProps]) => {
    //         // account name matches - list party
    //         if (contains(pageProps.name, query)) {
    //             const accountParty = findPartyForFbAccount(pageId);
    //             if (accountParty) {
    //                 const party = findPartyByFbName(accountParty);
    //                 if (party) {
    //                     const link = routes.party(
    //                         party[csvAggregatedKeys.name],
    //                         segments.ONLINE
    //                     );
    //                     online.push(
    //                         <Col key={`fb${pageId}`} className="d-flex" sm>
    //                             <Link
    //                                 to={link}
    //                                 className="d-flex flex-column justify-content-between w-100 cat-local"
    //                             >
    //                                 <h3>{pageProps.name}</h3>
    //                                 <div className="town my-3">
    //                                     {party.fullName}
    //                                 </div>
    //                                 <div className="type">
    //                                     {t(labels.ads.meta.title)}
    //                                 </div>
    //                             </Link>
    //                         </Col>
    //                     );
    //                 }
    //             }
    //         }
    //     });
    // }
    // if (sheetsData.lastUpdateGgl) {
    //     sheetsData.googleAds.forEach((pageData) => {
    //         const accountName = pageData[googleColumns.PAGE_NAME] ?? null;
    //         // account name matches - list party
    //         if (contains(accountName, query)) {
    //             const accountParty = findPartyForGoogleAccount(
    //                 pageData[googleColumns.ID]
    //             );
    //             if (accountParty) {
    //                 const party = findPartyByFbName(accountParty);
    //                 if (party) {
    //                     const link = routes.party(
    //                         party[csvAggregatedKeys.name],
    //                         segments.ONLINE
    //                     );
    //                     online.push(
    //                         <Col
    //                             key={`ggl${pageData[googleColumns.ID]}`}
    //                             className="d-flex"
    //                             sm
    //                         >
    //                             <Link
    //                                 to={link}
    //                                 className="d-flex flex-column justify-content-between w-100 cat-regional"
    //                             >
    //                                 <h3>{accountName}</h3>
    //                                 <div className="town my-3">
    //                                     {party.fullName}
    //                                 </div>
    //                                 <div className="type">
    //                                     {t(labels.ads.google.title)}
    //                                 </div>
    //                             </Link>
    //                         </Col>
    //                     );
    //                 }
    //             }
    //         }
    //     });
    // }

    useEffect(() => {
        if (!query) {
            // redirect to root page if no query string is provided
            navigate(routes.home());
        }
    }, [query]);

    setTitle(`${t(labels.search.results)} „${query}“`);

    return (
        <section className="search-results">
            <Title secondary={`„${query}“`}>
                {t(labels.search.results)}
                <br />
            </Title>

            <h2 className="my-4">{t(labels.parties.pageTitle)}</h2>
            {parties.length ? (
                <Row className="tiles gx-4 gy-4">{parties}</Row>
            ) : (
                <AlertWithIcon className="my-4" variant="danger">
                    {t(labels.parties.noParty)}
                </AlertWithIcon>
            )}

            <h2 className="my-4">{t(labels.ads.partyAccounts)}</h2>
            {online.length ? (
                <Row className="tiles gx-4 gy-4">{online}</Row>
            ) : (
                <AlertWithIcon className="my-4" variant="danger">
                    {t(labels.ads.noAccounts)}
                </AlertWithIcon>
            )}

            <h2 className="my-4">{t(labels.news.pageTitle)}</h2>
            <Posts
                categories={[wpCat.news]}
                noResults={t(labels.news.noData)}
                search={query}
            />
        </section>
    );
}

export default Search;
