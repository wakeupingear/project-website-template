import Credits from './components/credits';
import { SiteConfig } from './types';

const SITE_CONFIG: SiteConfig = {
    gameName: 'Example Game',
    logline: 'A simple example game',
    linkEmbeds: {
        abby: {
            link: 'https://www.google.com/',
            site: 'discord',
            name: 'Abby',
        },
    },
    sections: [
        {
            id: 'about',
            title: 'About',
            content: [
                'This is an example game about {{abby}}.',
                'This is an example game.',
            ],
        },
        {
            id: 'credits',
            title: 'Credits',
            content: [<Credits key="credits" />],
        },
    ],
    teamName: 'Example Team',
    teamLink: 'https://www.google.com/',
    includePress: true,
    socialLinks: [
        {
            link: 'https://twitter.com/',
        },
    ],
    contributors: [
        {
            name: 'Example Contributor 1',
            role: 'Programmer',
            department: 'Engineering',
            socialLinks: ['abby'],
        },
        {
            name: 'Example Contributor 2',
            role: 'Artist',
            department: 'Art',
            socialLinks: [
                {
                    link: 'https://twitter.com/',
                },
                'abby',
            ],
        },
    ],
};

export default SITE_CONFIG;
