import Credits from './src/components/credits';
import { SiteConfig } from './src/utils/types';

const SITE_CONFIG: SiteConfig = {
    project: {
        name: 'The WereCleaner',
        logline:
            "Kyle is a Janitor. He's also a Werewolf. And now he's got the night shift.",
        description:
            'The WereCleaner is a stealth-comedy game about cleaning messes and fighting your own instincts. You play as Kyle, a Werewolf-Janitor working the night shift to pay his rent. Explore an ever-expanding office space and master an arsenal of gadgets to clean the office of messes, accidents... and the carnage of your own ongoing rampage.',
        platforms: ['steam', 'apple'],
        socialLinks: ['discord', 'twitter', 'youtube', 'tiktok', 'linkedin'],
    },
    team: {
        name: "Howlin' Hugs",
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
                        href: 'https://twitter.com/',
                    },
                    'abby',
                ],
            },
        ],
    },
    homepage: {
        content: [
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
    },
    press: {
        content: [
            {
                id: 'features',
                title: 'Features',
                content: [
                    'One unique and interconnected game world, filled with secret routes and handcrafted details',
                    'A dynamic NPC system, with dozens of characters to avoid, trick or kill if needed',
                    '7 levels of wacky scenarios, shifting layouts, and hilarious surprises',
                    '3 multipurpose tools to dispose of every kind of mess - intentional or not',
                ],
                bulletPoints: true,
            },
        ],
        videos: ['releaseTrailer'],
        images: [
            'screenshot1',
            'screenshot2',
            'screenshot3',
            'screenshot4',
            'screenshot5',
            'screenshot6',
        ],
    },
    cache: {
        linkEmbeds: {
            discord: {
                href: 'https://discord.gg/kp9hm5jB4Z',
                name: 'Community Discord',
            },
            steam: {
                href: 'https://store.steampowered.com/app/2795000/The_WereCleaner/',
                name: 'Steam',
            },
            apple: {
                href: 'https://apps.apple.com/us/app/the-werecleaner/id6478448519',
                name: 'iOS & Mac',
            },
            twitter: {
                href: 'https://x.com/The_WereCleaner',
                name: 'Twitter',
            },
            youtube: {
                href: 'https://www.youtube.com/@WereCleaner',
                name: 'YouTube',
            },
            tiktok: {
                href: 'https://tiktok.com/@the.werecleaner',
                name: 'TikTok',
            },
            linkedin: {
                href: 'https://www.linkedin.com/company/the-werecleaner',
                name: 'LinkedIn',
            },
            tips: {
                href: 'https://tiptopjar.com/thewerecleaner',
                name: 'Tip Jar',
            },
            merch: {
                href: 'https://www.redbubble.com/people/thewerecleaner/shop?asc=u',
                name: 'Merch Store',
            },
        },
        mediaEmbeds: {
            releaseTrailer: {
                name: 'Release Trailer',
                url: 'https://www.youtube.com/watch?v=UXZ7PWtJC0c',
            },
            screenshot1: {
                name: 'Screenshot 1',
                url: '/example/screenshots/Blood_Room.PNG',
            },
            screenshot2: {
                name: 'Screenshot 2',
                url: '/example/screenshots/Seminar.PNG',
            },
            screenshot3: {
                name: 'Screenshot 3',
                url: '/example/screenshots/Office.PNG',
            },
            screenshot4: {
                name: 'Screenshot 4',
                url: '/example/screenshots/LevelSelect.PNG',
            },
            screenshot5: {
                name: 'Screenshot 5',
                url: '/example/screenshots/Lobby.PNG',
            },
            screenshot6: {
                name: 'Screenshot 6',
                url: '/example/screenshots/Collectibles_Screen.PNG',
            },
        },
    },
};

export default SITE_CONFIG;
