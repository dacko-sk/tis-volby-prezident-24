import Col from 'react-bootstrap/Col';

import { badgePctFormat } from '../../../helpers/helpers';
import { transparencyClass } from '../../../helpers/wp';

import useAdsData from '../../../hooks/AdsData';
import { candidateImage } from '../../../helpers/constants';

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

    const { findCandidateByWpTags } = useAdsData();
    const candidate = findCandidateByWpTags(article.tags);

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
                        <img src={candidateImage(candidate)} alt={candidate} />
                    </figure>

                    <div className="name text-center">
                        <span className="badge">{candidate}</span>
                    </div>
                </div>
            </div>
        </Col>
    );
}

export default AnalysisFeatured;
