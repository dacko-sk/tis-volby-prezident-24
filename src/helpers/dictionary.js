import { elections as el } from './constants';
import {
    attributionKeys as oa,
    genderKeys as og,
    regionOptions as or,
} from './online';
import { getCurrentLanguage, languages } from './routes';

import { csvAccountKeys as ak } from '../hooks/AccountsData';

export const labels = {
    account: {
        allTransactions: [
            'Zobraziť všetky transakcie',
            'Show all transactions',
        ],
        balance: ['Zostatok', 'Balance'],
        download: ['Stiahnuť ako CSV', 'Download as CSV'],
        expensesAmount: ['Počet výdavkov', 'Number of expenses'],
        incomesAmount: ['Počet príjmov', 'Number of incomes'],
        info: ['Informácie o kampani', 'Campaign details'],
        overview: [
            'Prehľad transakcií na transparentnom účte',
            'Transparent Account Transactions',
        ],
        partySpending: ['Priebežné výdavky strany', 'Party spending'],
        tableCols: {
            [ak.account_name]: ['Názov účtu', 'Account name'],
            [ak.date]: ['Dátum', 'Date'],
            [ak.amount]: ['Suma', 'Amount'],
            [ak.message]: ['Popis platby', 'Payment details'],
            [ak.tx_type]: ['Druh platby', 'Type of payment'],
            [ak.vs]: ['VS', 'Variabile symbol'],
            [ak.ss]: ['ŠS', 'Specific symbol'],
        },
        totalDisclaimer: [
            'Súčet výdavkov na všetkých transparentných účtoch politických strán.',
            'Sum of spendings on accounts of all political parties.',
        ],
        totalSpending: ['Celkové výdavky strán', 'Total parties spending'],
    },
    ads: {
        amount: {
            accountsTitle: [
                'Počet reklám jednotlivých profilov',
                'Number of ads of individual profiles',
            ],
            disclaimer: [
                'Počet reklám od začiatku predkampane 11. decembra 2022.',
                'Number of ads since the beginning of precampaign on December 2, 2022.',
            ],
            label: ['Počet reklám', 'Amount of ads'],
            partiesTitle: [
                'Súčet počtov reklám všetkých profilov politickej strany',
                'Sum of ads amounts of all party profiles',
            ],
            partyAccountsTitle: [
                'Počet reklám jednotlivých profilov strany',
                'Number of ads of party individual profiles',
            ],
        },
        google: {
            disclaimer: [
                'Politickú reklamu strán a ich politikov, zverejnenú prostredníctvom služieb Google Ads a Google Display & Video 360, sledujeme vďaka údajom, ktoré publikuje spoločnosť Google v Centre transparentnosti reklám. Sumy sú uvedené bez DPH.',
                'Political ads of parties and their politicians published in Google Ads and Google Display & Video 360 platforms is monitored thanks to the data published by Google in Google Ads Transparency Center. Amounts are without VAT.',
            ],
            format: {
                disclaimer: [
                    'Podiel jednotlivých formátov Google reklamy na celkových výdavkoch.',
                    'Share of individual Google Ads formats in total expenses.',
                ],
                title: ['Formáty reklamy', 'Ad format'],
            },
            spending: {
                accountsTitle: [
                    'Profily s výdavkami na reklamu nad 100 €',
                    'Profiles with advertising expenses exceeding 100 €',
                ],
                disclaimer: [
                    'Zobrazené sú len politické účty, ktoré prostredníctvom služieb Google Ads a Google Display & Video 360 uverejnili reklamy v hodnote nad 100 € od začiatku predkampane 11. decembra 2022.',
                    'We list only profiles whose spending on Google Ads and Google Display & Video 360 platforms exceeded 100 € since the beginning of precampaign on December 2, 2022.',
                ],
                partiesDisclaimer: [
                    'Započítané sú len politické účty, ktoré prostredníctvom služieb Google Ads a Google Display & Video 360 uverejnili reklamy v hodnote nad 100 € od začiatku predkampane 11. decembra 2022. Pre kompletný zoznam započítaných straníckych profilov a podrobnejšie dáta o online kampani, kliknite na názov strany.',
                    'Including political profiles whose spending on Google Ads and Google Display & Video 360 platforms exceeded 100 € since the beginning of precampaign on December 2, 2022. Click the party name for complete list of included profiles.',
                ],
                partiesTitle: [
                    'Súčet výdavkov všetkých profilov politickej strany s výdavkami na reklamu nad 100 €',
                    'Sum of advertising expenses of all profiles of the party exceeding 100 €',
                ],
                partyAccountsTitle: [
                    'Profily strany s výdavkami na reklamu nad 100 €',
                    'Profiles of the party with advertising expenses exceeding 100 €',
                ],
            },
            title: ['Google'],
            topTitle: ['Top 10 Google kampaní', 'Top 10 Google campaigns'],
            totalDisclaimer: [
                'Súčet výdavkov politických účtov, ktoré prostredníctvom služieb Google Ads a Google Display & Video 360 uverejnili reklamy v hodnote nad 100 € od začiatku predkampane 11. decembra 2022.',
                'Sum of expenses of profiles whose spending on Google Ads and Google Display & Video 360 platforms exceeded 100 € since the beginning of precampaign on December 2, 2022.',
            ],
            totalSpendingTitle: [
                'Výdavky na Google reklamu',
                'Advertising expenses in Google',
            ],
        },
        meta: {
            attribution: {
                allTitle: [
                    'Bilancia všetkých strán',
                    'Attribution by all parties',
                ],
                amount: ['Počet', 'Amount'],
                attrLabels: {
                    [oa.YES]: ['Správne označené', 'Correctly tagged'],
                    [oa.NO]: ['Neoznačené', 'Untagged'],
                    [oa['N/A']]: ['Nezistené', 'Unknown'],
                },
                campaign: ['Kampaň', 'Campaign'],
                disclaimer: [
                    'Povinné označenie objednávateľa a dodávateľa podľa zákona o volebnej kampani od oficiálneho začiatku kampane 9. júna 2023. Za správne označenú reklamu vyhodnocujeme statusy, v TEXTE ktorých je uvedený objednávateľ a dodávateľ reklamy. Statusy bez textu vyhodnocujeme ako "Nezistené".',
                    'Mandatory attribution of customer & supplier since the beginning of campaign on June 9, 2023. We evaluate status as correctly labeled if it contains "objednávateľ" and "dodávateľ" words in the TEXT. Statuses with no text are evaluated as "not detected"',
                ],
                pctTitle: [
                    'Rebríček správnosti označovania',
                    'Chart of attribution correctness',
                ],
                pctDisclaimer: [
                    'Podiel správne označených reklám podľa zákona o volebnej kampani od oficiálneho začiatku kampane 9. júna 2023. Za správne označenú reklamu vyhodnocujeme statusy, v TEXTE ktorých je uvedený objednávateľ a dodávateľ reklamy. Statusy bez textu vyhodnocujeme ako "Nezistené".',
                    'Share of correctly labeled ads since the beginning of campaign on June 9, 2023. We evaluate status as correctly labeled if it contains "objednávateľ" and "dodávateľ" words in the TEXT. Statuses with no text are evaluated as "not detected"',
                ],
                precampaign: ['Predkampaň', 'Precampaign'],
                title: [
                    'Označenie objednávateľa a dodávateľa',
                    'Attribution of customer and supplier',
                ],
            },
            demography: {
                ages: ['Vekové skupiny', 'Age groups'],
                agesDisclaimer: [
                    'Podiel zásahu reklám vo vekových skupinách obyvateľstva od začiatku predkampane 11. decembra 2022.',
                    'Distribution of ads impressions between age groups since the beginning of precampaign on December 2, 2022.',
                ],
                genders: ['Pohlavia', 'Genders'],
                gendersDisclaimer: [
                    'Podiel zásahu reklám medzi pohlaviami od začiatku predkampane 11. decembra 2022.',
                    'Distribution of ads impressions between genders since the beginning of precampaign on December 2, 2022.',
                ],
                genderLabels: {
                    [og.female]: ['Ženy', 'Females'],
                    [og.male]: ['Muži', 'Males'],
                    [og.unknown]: ['Nezistené', 'Unknown'],
                },
                title: [
                    'Demografické rozloženie reklamy',
                    'Ads demographic distribution',
                ],
            },
            disclaimer: [
                'Politickú reklamu strán a ich politikov na sociálnych sieťach Facebook a Instagram sledujeme vďaka údajom, ktoré publikuje spoločnosť Meta v knižnici Meta Ad Library. Sumy sú uvedené bez DPH.',
                'Political ads of parties and their politicians published on Facebook and Instagram platforms is monitored thanks to the data published by Meta in Meta Ad Library. Amounts are without VAT.',
            ],
            ranges: {
                accountsTitle: [
                    'Najviac inzerujúce profily od začiatku predkampane',
                    'Profiles with highest advertising expenses range since the beginning of precampaign',
                ],
                disclaimer: [
                    'Meta uvádza výdavky za reklamu v 100-eurových intervaloch, preto nie je možné urciť presnú sumu. Zobrazujeme celý interval a odhad výdavkov, ktorý je súčtom stredov intervalov všetkých reklám daného profilu zobrazovaných od začiatku predkampane 11. decembra 2022.',
                    'Meta publishes advertising expenses in 100-eur intervals, therefore it is not possible to determine the exact amount. We show the whole interval and expenses estimate, which is the sum of middles of expenses intervals of all ads of the profile since the beginning of precampaign on December 2, 2022.',
                ],
                estimate: ['Odhadované výdavky', 'Estimated expenses'],
                partiesTitle: [
                    'Rozsah výdavkov všetkých profilov politickej strany od začiatku predkampane',
                    'Advertising expenses range of all profiles of the party since the beginning of precampaign',
                ],
                partyAccountsTitle: [
                    'Najviac inzerujúce profily strany od začiatku predkampane',
                    'Profiles of the party with highest advertising expenses range since the beginning of precampaign',
                ],
                range: ['Skutočný rozsah výdavkov', 'Real expenses interval'],
            },
            regions: {
                allDisclaimer: [
                    'Podiel zásahu online reklamy všetkých strán v krajoch Slovenska od začiatku predkampane 11. decembra 2022. Pre podrobnejšiu analýzu cielenia strán na regióny vzhľadom na veľkosť krajov, kliknite na názov strany.',
                    'Distribution of ads impressions of all parties between regions of Slovakia since the beginning of precampaign on December 2, 2022. Click the party name for detailed analysis of party targeting on regions based on their sizes.',
                ],
                diffAvg: [
                    'Odchýlka od priemerného zásahu strany v SR',
                    'Deviation from average impressions in Slovakia',
                ],
                diffAvgDisclaimer: [
                    'Odchýlka zásahu reklamy na jedného obyvateľa kraja od priemerného zásahu strany v celej SR.',
                    'Difference between impression per one citizen and average impressions in Slovakia',
                ],
                disclaimer: [
                    'Podiel zásahu online reklamy v krajoch Slovenska od začiatku predkampane 11. decembra 2022. Vnútorný graf zobrazuje veľkosti krajov podľa počtu obyvateľov.',
                    'Distribution of ads impressions between regions of Slovakia since the beginning of precampaign on December 2, 2022. The inner chart shows sizes of regions based on number of citizens.',
                ],
                label: ['Podiel zásahu reklám', 'Distribution of impressions'],
                regionLabels: {
                    [or.BA]: ['Bratislavský kraj', 'Bratislava region'],
                    [or.BB]: ['Banskobystrický kraj', 'Banská Bystrica region'],
                    [or.KE]: ['Košický kraj', 'Košice region'],
                    [or.NR]: ['Nitriansky kraj', 'Nitra region'],
                    [or.PO]: ['Prešovský kraj', 'Prešov region'],
                    [or.TN]: ['Trenčiansky kraj', 'Trenčín region'],
                    [or.TT]: ['Trnavský kraj', 'Trnava region'],
                    [or.ZA]: ['Žilinský kraj', 'Žilina region'],
                },
                sizeLabel: [
                    'Podiel populácie SR žijúcej v tomto kraji',
                    'Share of citizens living in this region',
                ],
                title: [
                    'Regionálne rozloženie reklamy',
                    'Regional distribution of ads',
                ],
            },
            spending: {
                accountsTitle: [
                    'Profily s týždennými výdavkami na reklamu nad 100 €',
                    'Profiles with weekly advertising expenses exceeding 100 €',
                ],
                disclaimer: [
                    'Zobrazené sú len profily, ktorých výdavky počas posledných 90 dní predkampane od 11. marca 2023 alebo týždňové výdavky od začiatku kampane 9. júna 2023 presiahli 100 €.',
                    'Includes Meta profiles whose advertising expenses during last 90 days of precampaign from March 11, 2023 or weekly expenses from the beginning of campaign on June 9, 2023 exceeded 100 €',
                ],
                label: [
                    'Týždňové výdavky na reklamu',
                    'Weekly advertising expenses',
                ],
                partiesDisclaimer: [
                    'Započítané sú len profily na sociálnych sieťach platformy Meta, ktorých výdavky počas posledných 90 dní predkampane od 11. marca 2023 alebo týždňové výdavky od začiatku kampane 9. júna 2023 presiahli 100 €. Pre kompletný zoznam započítaných straníckych profilov a podrobnejšie dáta o online kampani, kliknite na názov strany.',
                    'Includes Meta profiles whose advertising expenses during last 90 days of precampaign from March 11, 2023 or weekly expenses from the beginning of campaign on June 9, 2023 exceeded 100 €. Click the party name for complete list of included profiles.',
                ],
                partiesTitle: [
                    'Súčet výdavkov všetkých profilov politickej strany s týždennými výdavkami na reklamu nad 100 €',
                    'Sum of advertising expenses of all profiles of the party with weekly expenses exceeding 100 €',
                ],
                partyAccountsTitle: [
                    'Profily strany s týždennými výdavkami na reklamu nad 100 €',
                    'Party profiles with weekly advertising expenses exceeding 100 €',
                ],
            },
            title: ['Meta'],
            topTitle: ['Top 10 Meta kampaní', 'Top 10 Meta campaigns'],
            totalDisclaimer: [
                'Súčet výdavkov na politickú reklamu na sociálnych sieťach platformy Meta. Započítane sú všetky profily, ktorých výdavky počas posledných 90 dní predkampane od 11. marca 2023 alebo týždňové výdavky od začiatku kampane 9. júna 2023 presiahli 100 €.',
                'Sum of advertising expenses on social networks of Meta. Includes Meta profiles whose advertising expenses during last 90 days of precampaign from March 11, 2023 or weekly expenses from the beginning of campaign on June 9, 2023 exceeded 100 €',
            ],
            totalSpendingTitle: [
                'Výdavky na Meta reklamu',
                'Advertising expenses in Meta',
            ],
        },
        noAccounts: [
            'Hľadanému výrazu nezodpovedá žiaden online účet.',
            'No online account matches the search query',
        ],
        noData: [
            'Neevidujeme žiaden účet strany s výdavkami na sponzorované príspevky na tejto platforme.',
            'We did not find any profiles of the party with sponsored ads on this platform.',
        ],
        pageTitle: ['Online kampane', 'Online campaigns'],
        partyAccounts: ['Online účty strán', 'Party online accounts'],
        percent: ['Podiel', 'Share'],
        showMore: [
            'Zistiť viac o online kampani',
            'Learn more about Online Campaigns',
        ],
    },
    all: ['Zobraziť všetko', 'Show all'],
    analyses: {
        navTitle: ['Hodnotenia', 'Assessments'],
        pageTitle: [
            'Hodnotenie transparentnosti kampaní',
            'Assessment of campaigns transparency',
        ],
        top: ['Top %i hodnotených kampaní', 'Top %i rated campaigns'],
        showAll: ['Zobraziť všetky hodnotenia', 'Show all assessments'],
    },
    charts: {
        amount: ['Suma', 'Amount'],
        incoming: ['Príjmy', 'Incomes'],
        outgoing: ['Výdavky', 'Expenses'],
        sum: ['Spolu', 'Total'],
    },
    contact: ['Kontakt', 'Contact'],
    cookies: {
        accept: ['Prijať všetky', 'Accept all'],
        about: [
            'Táto webová stránka používa cookies, aby vám priniesla čo najlepší online zážitok.',
            'This website uses cookies to bring you the best online experience.',
        ],
        optional: ['Voliteľné cookies', 'Optional Cookies'],
        reject: ['Odmietnuť všetky', 'Reject all'],
        selected: ['Potvrdiť výber', 'Accept selected'],
        settings: ['Nastavenia cookies', 'Cookies settings'],
        types: {
            analytics: ['Analytické cookies', 'Analytics'],
            functional: ['Funkčné cookies', 'Functional'],
            necessary: ['Nevyhnutné cookies', 'Necessary'],
        },
    },
    donate: {
        buttonShort: ['Darujte', 'Donate'],
        buttonLong: [
            'Darujte na kontrolu volieb',
            'Donate for elections monitoring',
        ],
        modalTitle: [
            'Nenechajme voľby bez kontroly!',
            `Don't let the elections without watch!`,
        ],
        modalText: [
            'Darujte už od 20 €, aby sme ustrážili férovosť volieb.\nĎakujeme.',
            'Donate from 20 € to support elections transparency.\nThank you.',
        ],
    },
    download: ['Stiahnuť', 'Download'],
    elections: {
        [el.p19]: ['Prezidentské\nvoľby 2019', 'President\nelections 2019'],
        [el.n20]: ['Parlamentné\nvoľby 2020', 'Parliamentary\nelections 2020'],
        [el.s22]: ['Samosprávne\nvoľby 2022', 'Municipal\nelections 2022'],
        [el.n23]: ['Parlamentné\nvoľby 2023', 'Parliamentary\nelections 2023'],
        account: ['Transparentný účet', 'Transparent account'],
        date: ['Dátum konania volieb', 'Elections date'],
        over: ['Voľby sa skončili', 'Elections ended'],
        timeTillstart: ['Zostávajúci čas do volieb', 'Time to elections start'],
        timeTillend: [
            'Zostávajúci čas do konca volieb',
            'Time to elections end',
        ],
        title: ['Voľby', 'Elections'],
    },
    errors: {
        loading: [
            'Chyba pri načítaní dát. Prosím načítajte stránku znovu.',
            'Data loading error. Please reload the page.',
        ],
    },
    fbFeed: [
        'Pre zobrazenie facebook vlákna je potrebné prijať ukladanie Funkčných cookies v Nastaveniach cookies',
        'Please accept Functional Cookies in Cookies Settings in order to show Facebook feed',
    ],
    followUs: ['Sledujte nás', 'Follow us'],
    home: {
        navTitle: ['Prezident 2024', 'President 2024'],
        pageTitle: ['Prezidentské\nvoľby 2024', 'President\nelections 2024'],
    },
    learnMore: ['Zistiť viac', 'Learn more'],
    lastUpdate: ['Naposledy aktualizované', 'Last updated on'],
    news: {
        latest: ['Najnovšie aktuality', 'Latest News (Slovak only)'],
        navTitle: ['Aktuality', 'News'],
        noData: ['Neboli nájdené žiadne články.', 'No articles found.'],
        pageTitle: ['Aktuality', 'News\n(Slovak only)'],
    },
    newsletter: {
        title: ['Newsletter'],
        subscribe: ['Prihlásiť sa na newsletter', 'Subscribe to Newsletter'],
    },
    online: {
        navTitle: ['Online'],
    },
    privacy: ['Ochrana súkromia', 'Privacy Policy'],
    readMore: ['Čítať ďalej…', 'Read more…'],
    tis: [
        'Transparency International Slovensko',
        'Transparency International Slovakia',
    ],
    search: {
        label: ['Vyhľadávanie', 'Search'],
        results: [
            'Výsledky vyhľadávania výrazu',
            'Search results for the query',
        ],
    },
    showMore: ['Zobraziť viac', 'Show more'],
    sponsors: ['Donori projektu', 'Project donors'],
    supportTis: ['Podporte Transparency', 'Support Transparency'],
    usefulInfo: ['Užitočné informácie', 'Useful information'],
    webDev: ['Webové riešenie', 'Web development'],
};

export const t = (label, replacements) => {
    let tl = label;
    if (Array.isArray(label)) {
        tl = label[0] ?? '';
        if (getCurrentLanguage() === languages.en) {
            tl = label[1] ?? tl;
        }
    } else if (labels[label] ?? false) {
        return t(labels[label], replacements);
    }
    if (Array.isArray(replacements)) {
        // Use a regular expression to match placeholders (%s or %i)
        tl = tl.replace(/%[dfis]/g, (match) => {
            // Replace %s with the next string from the array
            // Return the placeholder if no replacement is available
            return replacements.length > 0 ? replacements.shift() : match;
        });
    }
    return tl;
};
