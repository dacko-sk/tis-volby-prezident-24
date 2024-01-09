import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
// import { routes } from '../helpers/routes';
import { wpCat } from '../helpers/wp';

// import TotalAdsSpending from '../components/ads/TotalAdsSpending';
// import Top10 from '../components/charts/Top10';
// import Top10Ads from '../components/charts/Top10Ads';
import DonateButton from '../components/general/DonateButton';
import ElectionsCountdown from '../components/general/ElectionsCountdown';
// import TotalSpending from '../components/accounts/TotalSpending';
import Title from '../components/structure/Title';
import Posts, { templates } from '../components/wp/Posts';

function Home() {
    setTitle(t(labels.home.pageTitle));

    return (
        <section>
            <Title secondaryWords={1} uppercase>
                {t(labels.home.pageTitle)}
            </Title>

            <Row className="gy-3 gy-lg-0 text-center mb-4">
                <Col lg={6}>
                    <ElectionsCountdown
                        start="2024-03-23T07:00:00"
                        end="2024-03-23T22:00:00"
                    />
                </Col>
                <Col lg={6}>{/* <TotalSpending /> */}</Col>
            </Row>

            <div className="text-center mb-4">
                <DonateButton long xl />
            </div>

            {/* <Top10 /> */}

            {/* <Posts
                categories={[wpCat.featured]}
                showMore={t(labels.analyses.showAll)}
                showMoreLink={routes.analyses()}
                template={templates.featured}
            /> */}

            {/* <TotalAdsSpending /> */}

            {/* <Top10Ads /> */}

            <h2 className="mt-4 mb-3">{t(labels.news.latest)}</h2>
            <Posts
                categories={[wpCat.news]}
                limit={2}
                template={templates.condensed}
            />
        </section>
    );
}

export default Home;
