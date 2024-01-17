import { useOutletContext } from 'react-router-dom';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { wpCat } from '../../helpers/wp';

import AlertWithIcon from '../../components/general/AlertWithIcon';
import Posts, { templates } from '../../components/wp/Posts';

function CandidateNews() {
    const candidate = useOutletContext();

    const content =
        candidate.wp ?? false ? (
            <Posts
                categories={[wpCat.news]}
                tags={[candidate.wp]}
                template={templates.list}
            />
        ) : (
            <AlertWithIcon className="my-4" variant="danger">
                {t(labels.news.noData)}
            </AlertWithIcon>
        );

    setTitle(`${candidate.name} : Aktuality`);

    return <div className="subpage">{content}</div>;
}

export default CandidateNews;
