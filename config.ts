import { SiteConfig } from './types';

const SITE_CONFIG: SiteConfig = {
    gameName: 'Example Game',
    logline: 'A simple example game',
    sections: [
        {
            id: 'about',
            title: 'About',
            content: ['This is an example game.', 'This is an example game.'],
        },
    ],
    teamName: 'Example Team',
};

export default SITE_CONFIG;
