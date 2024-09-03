import type { TypeWithID } from 'payload/dist/collections/config/types';
import type { PaginatedDocs } from 'payload/dist/database/types';

export interface PluginTypes {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean;
  collections: string[];
  uploadsCollection: string;
  hostname: string;
}

export type PayloadResult<T> = PaginatedDocs<TypeWithID & Record<string, T>>;

type SitemapFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
export interface SiteMapEntry extends TypeWithID {
  url: string;
  priority: number;
  changeFrequency: SitemapFrequency;
}

export interface SiteMapEntriesResponse {
  docs: SiteMapEntry[];
}

interface Directive {
  type: 'Allow' | 'Disallow';
  path: string;
}
export interface RobotsDocument extends TypeWithID {
  userAgent: string;
  directives: Directive[];
}

export interface RobotsSeoField {
  userAgent: string;
  directive: 'Allow' | 'Disallow';
}

export interface RobotsEntriesResponse {
  docs: RobotsDocument[];
}

export type RedirectCodes = '301' | '302' | '303' | '307' | '308';

export interface RedirectsDocument extends TypeWithID {
  path: string;
  redirectType: RedirectCodes;
  redirectUrl: string;
}

export interface RedirectsResponse {
  docs: RedirectsDocument[];
}

interface SerpSchema extends TypeWithID {
  path: string;
  schema: string;
}

export interface SeoFieldsDocument {
  id: number;
  seo: {
    title: string;
    description: string;
    path: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
  };
  sitemap: {
    addToSitemap: 'yes' | 'no';
    priority: number;
    changeFrequency: SitemapFrequency;
  };
  robots: {
    addToRobots: 'yes' | 'no';
    robotsEntries: RobotsSeoField[];
  };
  serpSchema: { schema: string };
  updatedAt: string;
  createdAt: string;
}
