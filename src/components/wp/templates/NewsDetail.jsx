import { dateTimeFormat } from '../../../helpers/helpers';
import { parseWpHtml } from '../../../helpers/wp';

import Tags from '../Tags';

function NewsDetail({ article }) {
    return (
        <div className="article-body">
            <div className="d-md-flex">
                <div className="article-date my-4 me-auto">
                    {dateTimeFormat(article.date)}
                </div>
                <Tags className="article-tags my-4" link tags={article.tags} />
            </div>
            {parseWpHtml(article.content.rendered)}
        </div>
    );
}

export default NewsDetail;
