import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import {
    homepage,
    languageRoot,
    languages,
    routes,
    segments,
    urlSegment,
} from './helpers/routes';

import ContextProviders from './ContextProviders';
import Layout from './Layout';

import Analyses from './pages/Analyses';
import Article from './pages/Article';
import Candidate from './pages/Candidate';
import CandidateAnalysis from './pages/candidate/CandidateAnalysis';
import CandidateNews from './pages/candidate/CandidateNews';
import CandidateOnline from './pages/candidate/CandidateOnline';
import CandidateOverview from './pages/candidate/CandidateOverview';
import CandidateTransactions from './pages/candidate/CandidateTransactions';
import Candidates from './pages/Candidates';
import CandidatesList from './pages/candidates/CandidatesList';
import CandidatesReports from './pages/candidates/CandidatesReports';
import Home from './pages/Home';
import Online from './pages/Online';
import News from './pages/News';
import Search from './pages/Search';

import './scss/volby-24.scss';

function App() {
    return (
        <ContextProviders>
            <BrowserRouter>
                <Routes>
                    <Route path={homepage} element={<Layout />}>
                        <Route index element={<Home />} />

                        {Object.keys(languages).map((lang) =>
                            [
                                [routes.home(lang), Home],
                                [routes.analyses(lang), Analyses],
                                [routes.article(true, lang), Article],
                                [routes.news(lang), News],
                                [routes.online(lang), Online],
                                [
                                    routes.candidates('', lang),
                                    Candidates,
                                    [
                                        ['', CandidatesList],
                                        [segments.REPORTS, CandidatesReports],
                                    ],
                                ],
                                [
                                    routes.candidate(true, '', lang),
                                    Candidate,
                                    [
                                        ['', CandidateOverview],
                                        [segments.ANALYSIS, CandidateAnalysis],
                                        [segments.NEWS, CandidateNews],
                                        [segments.ONLINE, CandidateOnline],
                                        [
                                            segments.TRANSACTIONS,
                                            CandidateTransactions,
                                        ],
                                    ],
                                ],
                                [routes.search(true, lang), Search],
                            ].map(([path, Page, subpages]) => (
                                <Route
                                    key={path}
                                    path={path}
                                    element={<Page />}
                                >
                                    {(subpages ?? []).map(
                                        ([subSegment, SubPage]) => (
                                            <Route
                                                key={path + subSegment}
                                                index={subSegment ? null : true}
                                                path={
                                                    subSegment
                                                        ? urlSegment(
                                                              subSegment,
                                                              lang
                                                          )
                                                        : null
                                                }
                                                element={<SubPage />}
                                            />
                                        )
                                    )}
                                </Route>
                            ))
                        )}

                        {/* fallback */}
                        <Route
                            path="*"
                            element={<Navigate to={languageRoot()} />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ContextProviders>
    );
}

export default App;
