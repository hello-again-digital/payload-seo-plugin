import { TypeWithID } from 'payload/dist/collections/config/types'

export interface PluginTypes {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean
  collections: string[]
  uploadsCollection?: 'media'
}

export interface SiteMapEntry extends TypeWithID {
  url: string
  priority: number
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

export interface SiteMapEntriesResponse {
  docs: SiteMapEntry[]
}

interface Directive {
  type: 'Allow' | 'Disallow';
  value: string;
}
export interface RobotsEntry extends TypeWithID {
  userAgent: string;
  directives: Directive[];
}

export interface RobotsEntriesResponse {
  docs: RobotsEntry[]
}
