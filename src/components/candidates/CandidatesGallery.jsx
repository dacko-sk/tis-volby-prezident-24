import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

import { candidateData } from '../../helpers/constants';
import { labels, t } from '../../helpers/dictionary';
import { routes } from '../../helpers/routes';

import useAccountsData from '../../hooks/AccountsData';
import useAdsData from '../../hooks/AdsData';

import Loading from '../general/Loading';
import { sortBySurname } from '../../helpers/helpers';

function CandidatesGallery() {
    const navigate = useNavigate();

    const { allTransparentCandidatesNames, candidateAccountData } =
        useAccountsData();
    const { allCandidatesNames, candidateAdsData } = useAdsData();

    const getClickHandler = (name) => (event) => {
        if (event.target.tagName.toLowerCase() !== 'a') {
            navigate(routes.candidate(name));
        }
    };
    const getKeyUpHandler = (name) => (event) => {
        if (event.keyCode === 13) {
            navigate(routes.candidate(name));
        }
    };

    const transparentCandidates = allTransparentCandidatesNames();
    const gsCandidates = allCandidatesNames();

    return (
        <div className="my-4">
            <h2 className="mb-4">{t(labels.candidates.monitoring)}</h2>
            {transparentCandidates === null || gsCandidates === null ? (
                <Loading />
            ) : (
                <Row className="gy-4">
                    {Array.from(
                        new Set([...transparentCandidates, ...gsCandidates])
                    )
                        .sort(sortBySurname)
                        .map((name) => {
                            const accountData = candidateAccountData(name);
                            const adsData = candidateAdsData(name);
                            const candidate = candidateData(
                                name,
                                accountData,
                                adsData
                            );
                            return (
                                <Col xs={6} md={3} key={candidate.name}>
                                    <div
                                        className="article analysis-preview"
                                        onClick={getClickHandler(
                                            candidate.name
                                        )}
                                        onKeyUp={getKeyUpHandler(
                                            candidate.name
                                        )}
                                        role="link"
                                        tabIndex={0}
                                    >
                                        <div className="thumb">
                                            <figure className="text-center">
                                                <img
                                                    src={candidate.image}
                                                    alt={candidate.name}
                                                />
                                            </figure>

                                            <div className="name text-center">
                                                <span className="badge">
                                                    {candidate.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                </Row>
            )}
        </div>
    );
}

export default CandidatesGallery;
