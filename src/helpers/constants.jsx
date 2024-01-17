import dummy from '../../public/img/user_grey.png';

// import all csv files from the accounts folder via webpack
const candidatesImages = require.context(
    '../../public/img/candidates',
    false,
    /\.jpg$/
);

const candidates = {
    'Marta Čurajová': {
        fb: null,
        wp: 941,
    },
    'Krisztián Forró': {
        fb: 1009998019021765,
        wp: 940,
    },
    'Štefan Harabin': {
        fb: 1680731138870391,
        wp: 938,
    },
    'Ivan Korčok': {
        fb: 1185998661417403,
        wp: 936,
    },
    'Ján Kubiš': {
        fb: 106795542522284,
        wp: 937,
    },
    // 'Peter Pellegrini': {
    //     fb: 403027089864701,
    //     wp: 939,
    // },
};

export const candidateImage = (name) => {
    const file = candidatesImages
        .keys()
        .find((key) => key.endsWith(`${name}.jpg`));
    return file ? candidatesImages(file) : dummy;
};

export const candidateProps = (name) => {
    if (candidates[name] ?? false) {
        return {
            ...candidates[name],
            name,
            image: candidateImage(name),
        };
    }
    return null;
};

export const allCandidatesProps = Object.keys(candidates).map((candidate) =>
    candidateProps(candidate)
);

export const colorLightBlue = '#2bace2';
export const colorLightBlueDs = '#b9c6cc';
export const colorDarkBlue = '#1b335f';
export const colorDarkBlueDs = '#79869d';
export const colorOrange = '#f06c50';
export const colorOrangeDs = '#a9a4a4';
export const colorGrey = '#e9f2f9';

export const colors = {
    colorLightBlue,
    colorDarkBlue,
    colorOrange,
    colorLightBlueDs,
    colorDarkBlueDs,
    colorOrangeDs,
    colorGrey,
};

export const elections = {
    n23: 'n23',
    s22: 's22',
    n20: 'n20',
    p19: 'p19',
};

export const icons = {
    info: {
        alt: 'Info:',
        path: (
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        ),
    },
    warning: {
        alt: 'Upozornenie:',
        path: (
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        ),
    },
};

export const links = {
    [elections.p19]: 'https://volby.transparency.sk/prezident2019/',
    [elections.n20]: 'https://volby.transparency.sk/parlament2020/',
    [elections.s22]: 'https://volby.transparency.sk/samosprava2022/',
    [elections.n23]: 'https://volby.transparency.sk/parlament2023/',
    donateUrl: 'https://transparency.sk/volby',
};
