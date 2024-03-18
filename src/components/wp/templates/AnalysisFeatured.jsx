import Col from 'react-bootstrap/Col';

import { candidateData } from '../../../helpers/constants';
import { badgePctFormat } from '../../../helpers/helpers';
import { transparencyClass } from '../../../helpers/wp';

import useAdsData from '../../../hooks/AdsData';
import { labels, t } from '../../../helpers/dictionary';

function AnalysisFeatured({ article, clickHandler, keyUpHandler }) {
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
    const name = findCandidateByWpTags(article.tags);
    const adsData = candidateAdsData(name);
    const candidate = candidateData(name, null, adsData);

    return (
        <Col>
            <div
                id={article.slug}
                className={`article analysis-preview score-${cls}`}
                onClick={clickHandler}
                onKeyUp={keyUpHandler}
                role="link"
                tabIndex={0}
            >
                <div
                    className="thumb"
                    data-label={badgePctFormat(analysis.lastScore)}
                >
                    <figure className="text-center">
                        <img src={candidate.image} alt={candidate} />
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
            </div>
        </Col>
    );
}

export default AnalysisFeatured;
