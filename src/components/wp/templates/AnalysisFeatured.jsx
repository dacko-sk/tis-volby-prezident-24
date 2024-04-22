import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

import { candidateData } from '../../../helpers/constants';
import { badgePctFormat } from '../../../helpers/helpers';
import { routes, segments } from '../../../helpers/routes';
import { transparencyClass } from '../../../helpers/wp';

import useAdsData from '../../../hooks/AdsData';
import { labels, t } from '../../../helpers/dictionary';

function AnalysisFeatured({ article }) {
    const { analysis } = article;
    if (analysis.error ?? false) {
        console.log(analysis.error);
        return null;
    }
    if (analysis.lastCol < 0) {
        return null;
    }
    const cls = transparencyClass(analysis.lastScore);

    const { candidateAdsData, findCandidateByWpTags } = useAdsData();
    const name = findCandidateByWpTags(article.tags) ?? article.title.rendered;
    const adsData = candidateAdsData(name);
    const candidate = candidateData(name, null, adsData);

    return (
        <Col>
            <Link
                id={article.slug}
                className={`article analysis-preview score-${cls}`}
                to={routes.candidate(name, segments.ANALYSIS)}
            >
                <div
                    className="thumb"
                    data-label={badgePctFormat(analysis.lastScore)}
                >
                    <figure className="text-center">
                        <img src={candidate.image} alt={name} />
                    </figure>

                    <div className="cover text-center">
                        {candidate.hasInfo && (
                            <span className="info text-white">
                                {t(labels.candidates.info)[candidate.infoKey]}
                            </span>
                        )}
                        <span className="text-white fw-bold">{name}</span>
                    </div>
                </div>
            </Link>
        </Col>
    );
}

export default AnalysisFeatured;
