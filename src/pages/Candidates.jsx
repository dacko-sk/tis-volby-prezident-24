import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';

import CandidatesGallery from '../components/candidates/CandidatesGallery';
import Title from '../components/structure/Title';

function Candidates() {
    setTitle(t(labels.candidates.navTitle));

    return (
        <section>
            <Title>{t(labels.candidates.navTitle)}</Title>

            <CandidatesGallery />
        </section>
    );
}

export default Candidates;
