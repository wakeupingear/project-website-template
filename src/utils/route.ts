import { Metadata } from 'next';
import getConfig from '../lib/getConfig';

export type SiteRouteProps = {
    params: { siteId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export const generateSiteMetadata =
    async (transform?: (metadata: Metadata) => Metadata) =>
    async (routeProps: SiteRouteProps) => {
        const config = getConfig(routeProps);
        const metadata: Metadata = {
            title: config.project.name,
            description: config.project.description,
        };

        return transform ? transform(metadata) : metadata;
    };
