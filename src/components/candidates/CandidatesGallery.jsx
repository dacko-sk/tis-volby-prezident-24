import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

import { allCandidatesProps } from '../../helpers/constants';
import { routes } from '../../helpers/routes';
import { labels, t } from '../../helpers/dictionary';

function CandidatesGallery() {
    const navigate = useNavigate();

    const navigateToDetail = (candidate) => {
        navigate(routes.candidate(candidate.name), {
            state: { candidate },
        });
    };
    const getClickHandler = (candidate) => (event) => {
        if (event.target.tagName.toLowerCase() !== 'a') {
            navigateToDetail(candidate);
        }
    };
    const getKeyUpHandler = (candidate) => (event) => {
        if (event.keyCode === 13) {
            navigateToDetail(candidate);
        }
    };

    return (
        <div className="my-4">
            <h2 className="mb-4">{t(labels.candidates.monitoring)}</h2>
            <Row className="gy-4">
                {allCandidatesProps.map((candidate) => (
                    <Col xs={6} md={3} key={candidate.name}>
                        <div
                            className="article analysis-preview"
                            onClick={getClickHandler(candidate)}
                            onKeyUp={getKeyUpHandler(candidate)}
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
                ))}
            </Row>
        </div>
    );
}

export default CandidatesGallery;
