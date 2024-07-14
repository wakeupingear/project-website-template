export type SiteSection = {
    id: string;
    title: string;
    shortTitle?: string;
    content: string[];
    hideInNav?: boolean;
};

export type SiteConfig = {
    gameName: string;
    logline: string;
    sections: SiteSection[];
    teamName?: string;
    teamLink?: string;
};
