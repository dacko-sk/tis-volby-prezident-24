import { Link, useParams } from 'react-router-dom';

import { getLastWord } from '../../helpers/helpers';
import { decodeSlug, routes, segments } from '../../helpers/routes';

import useAdsData, { csvConfig } from '../../hooks/AdsData';

function Tags({ tags, className }) {
    const { slug } = useParams();
    const { allCandidatesNames, candidateAdsData } = useAdsData();

    const currentCandidate = slug ? decodeSlug(slug) : null;
    const allCandidates = allCandidatesNames();

    const matchedTags = [];

    (allCandidates ?? []).forEach((name) => {
        const adsData = candidateAdsData(name);
        const partyTag = adsData[csvConfig.ACCOUNTS.columns.WP] ?? false;
        if (partyTag && tags.includes(partyTag)) {
            matchedTags.push(
                <Link key={name} to={routes.candidate(name, segments.NEWS)}>
                    {currentCandidate === name ? (
                        <strong>{getLastWord(name)}</strong>
                    ) : (
                        getLastWord(name)
                    )}
                </Link>
            );
        }
    });

    return matchedTags.length ? (
        <div className={className}>{matchedTags}</div>
    ) : (
        <></>
    );
}

export default Tags;
