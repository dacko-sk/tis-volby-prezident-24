import { Link } from 'react-router-dom';

import { setTitle } from '../helpers/browser';
import { labels, t } from '../helpers/dictionary';
import { getCurrentLanguage, languages } from '../helpers/routes';
import { resources, wpCat } from '../helpers/wp';

import AlertWithIcon from '../components/general/AlertWithIcon';
import Title from '../components/structure/Title';
import Posts, { templates } from '../components/wp/Posts';

function Analyses() {
    setTitle(t(labels.analyses.pageTitle));

    const introText = {
        [languages.sk]: (
            <>
                <AlertWithIcon className="my-4" variant="primary">
                    Tlačová správa k hodnoteniu transparentnosti kampaní:{' '}
                    <Link to={resources.pressRelease}>
                        Najmenej transparentnú kampaň vedie Peter Pellegrini
                    </Link>
                    .
                </AlertWithIcon>

                <p className="mt-4">
                    V poradí šiesta priama voľba prezidenta neunikla pozornosti
                    Transparency International Slovensko, ktorá sleduje kampane
                    všetkých 11 prezidentských kandidátov. Do hodnotenia
                    transparentnosti zaradila šesť kampaní, pri ktorých výdavky
                    ku dňu hodnotenia prekročili hranicu 20-tisíc eur, čo sú
                    4-percentá z limitu výdavkov 500-tisíc eur platiaceho pre
                    prezidentské voľby. Zvyšných päť kandidátov neviedlo žiadnu
                    platenú kampaň, alebo len v minimálnom rozsahu, kvôli čomu
                    ich nebolo možné adekvátne zhodnotiť a porovnať.
                </p>
                <p>
                    Výsledkom hodnotenia je rozradenie kandidátov na princípe
                    semafora do štyroch kategórií
                </p>
                <ul className="arrows lh-lg">
                    <li>
                        <span className="badge score-good">
                            Transparentná kampaň (zelená farba)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-average">
                            Kampaň s výhradami (oranžová farba)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-bad">
                            Netransparentná kampaň (červená farba)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-unknown">
                            Nedostatok dát / nehodnotené (šedá farba)
                        </span>
                    </li>
                </ul>
                <p>
                    Hodnotenie je doplnené informáciou o dosiahnutom výslednom
                    percentuálnom skóre.
                </p>
                <p>
                    Podstatou hodnotenia je nielen preskúmať dodržiavanie
                    zákonných pravidiel pre vedenie kampaní, ktoré sú však v
                    mnohom deravé, ale aj ochotu kandidátov spraviť pre verejnú
                    kontrolu niečo naviac. Pozostáva z 15 indikátorov
                    rozdelených do troch kategórií – Transparentný účet (50%
                    váha); Financovanie kampane (30% váha); Informovanosť o
                    kampani (20% váha).
                </p>
                <p>
                    Kľúčovým pre hodnotenie (najvyššia váha) je spôsob, akým
                    kandidát vedie svoj transparentný účet, ktorý má poskytovať
                    úplný a reálny obraz o jeho kampani. Dôležitým je i spôsob
                    financovania kampane, ktorá v prípade prezidentských volieb
                    môže byť postavená iba na daroch.
                </p>
                <p>
                    Hodnotenie vychádza aj z informácií zverejnených na
                    volebných weboch, sociálnych sieťach strán, z dát v knižnici
                    reklám Facebooku, monitoringu outdoorovej kampane agentúrou
                    Kantar, ako aj z testovania odozvy strán na otázky voličov.
                    Kandidátom bola ponúknutá možnosť vyplniť rozšírený formulár
                    majetkového priznania v podobe, ako o ňom v uplynulom
                    volebnom období diskutovala pracovná skupina na pôde
                    parlamentu.
                </p>
                <p className="mb-4">
                    Podrobnejšie výsledky nájdete v sekcii nižšie a v{' '}
                    <Link to={resources.methodology}>Metodike hodnotenia</Link>.
                </p>
            </>
        ),
        [languages.en]: (
            <>
                <AlertWithIcon className="my-4" variant="primary">
                    Tlačová správa k hodnoteniu transparentnosti kampaní:{' '}
                    <Link to={resources.pressRelease}>
                        Najmenej transparentnú kampaň vedie Peter Pellegrini
                    </Link>
                    .
                </AlertWithIcon>

                <p className="mt-4">
                    V poradí šiesta priama voľba prezidenta neunikla pozornosti
                    Transparency International Slovensko, ktorá sleduje kampane
                    všetkých 11 prezidentských kandidátov. Do hodnotenia
                    transparentnosti zaradila šesť kampaní, pri ktorých výdavky
                    ku dňu hodnotenia prekročili hranicu 20-tisíc eur, čo sú
                    4-percentá z limitu výdavkov 500-tisíc eur platiaceho pre
                    prezidentské voľby. Zvyšných päť kandidátov neviedlo žiadnu
                    platenú kampaň, alebo len v minimálnom rozsahu, kvôli čomu
                    ich nebolo možné adekvátne zhodnotiť a porovnať.
                </p>
                <p>
                    Výsledkom hodnotenia je rozradenie kandidátov na princípe
                    semafora do štyroch kategórií
                </p>
                <ul className="arrows lh-lg">
                    <li>
                        <span className="badge score-good">
                            Transparentná kampaň (zelená farba)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-average">
                            Kampaň s výhradami (oranžová farba)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-bad">
                            Netransparentná kampaň (červená farba)
                        </span>
                    </li>
                    <li>
                        <span className="badge score-unknown">
                            Nedostatok dát / nehodnotené (šedá farba)
                        </span>
                    </li>
                </ul>
                <p>
                    Hodnotenie je doplnené informáciou o dosiahnutom výslednom
                    percentuálnom skóre.
                </p>
                <p>
                    Podstatou hodnotenia je nielen preskúmať dodržiavanie
                    zákonných pravidiel pre vedenie kampaní, ktoré sú však v
                    mnohom deravé, ale aj ochotu kandidátov spraviť pre verejnú
                    kontrolu niečo naviac. Pozostáva z 15 indikátorov
                    rozdelených do troch kategórií – Transparentný účet (50%
                    váha); Financovanie kampane (30% váha); Informovanosť o
                    kampani (20% váha).
                </p>
                <p>
                    Kľúčovým pre hodnotenie (najvyššia váha) je spôsob, akým
                    kandidát vedie svoj transparentný účet, ktorý má poskytovať
                    úplný a reálny obraz o jeho kampani. Dôležitým je i spôsob
                    financovania kampane, ktorá v prípade prezidentských volieb
                    môže byť postavená iba na daroch.
                </p>
                <p>
                    Hodnotenie vychádza aj z informácií zverejnených na
                    volebných weboch, sociálnych sieťach strán, z dát v knižnici
                    reklám Facebooku, monitoringu outdoorovej kampane agentúrou
                    Kantar, ako aj z testovania odozvy strán na otázky voličov.
                    Kandidátom bola ponúknutá možnosť vyplniť rozšírený formulár
                    majetkového priznania v podobe, ako o ňom v uplynulom
                    volebnom období diskutovala pracovná skupina na pôde
                    parlamentu.
                </p>
                <p className="mb-4">
                    Podrobnejšie výsledky nájdete v sekcii nižšie a v{' '}
                    <Link to={resources.methodology}>Metodike hodnotenia</Link>.
                </p>
            </>
        ),
    };

    return (
        <section>
            <Title>{t(labels.analyses.pageTitle)}</Title>

            <Posts
                categories={[wpCat.featured]}
                noResults={t(labels.analysis.noAnalyses)}
                template={templates.featured}
            />

            {introText[getCurrentLanguage()]}

            <Posts
                categories={[wpCat.analyses]}
                noResults={t(labels.analysis.noAnalyses)}
            />
        </section>
    );
}

export default Analyses;
