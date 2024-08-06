import { Response } from "express";
import { PayloadRequest, TypeWithID } from "payload/types";
import { PluginTypes, RobotsDocument, RobotsEntriesResponse } from "../types";
import { PaginatedDocs } from "payload/dist/database/types";

export const generateRobotsTxt = (robotsData: RobotsDocument[], hostname: string) => {
  let robotsContent = '';

  robotsData.forEach((entry) => {
    robotsContent += `User-agent: ${entry.userAgent}\n`;
    entry.directives?.forEach((directive) => {
      robotsContent += `${directive.type}: ${directive.path}\n`
    })
    robotsContent += "\n";
  })
  robotsContent += `Sitemap: ${hostname}/sitemap.xml\n`;

  return robotsContent.trim();
}

export const getRobotsTxt = async (req: PayloadRequest, res: Response, pluginOptions: PluginTypes) => {
    try {
        const { payload } = req;
        const entries = await payload.find({ collection: 'robots-entries' }) as unknown as PaginatedDocs<RobotsDocument>

        const robotsContent = generateRobotsTxt(entries.docs, pluginOptions.hostname)
        
        res.set('Content-Type', 'text/plain');
        res.set('Cache-Control', 'public,max-age=86400');

        res.status(200).send(robotsContent.trim())
      } catch (error) {
        res.status(500).send('An error occured when attempting to generate robots.txt')
      }
}

export const getRobots = async (req: PayloadRequest, res: Response) => {
    try {
        const { payload } = req;
        const entries = await payload.find({ collection: 'robots-entries' });
        res.status(200).send(entries.docs)
    } catch (error) {
        res.status(500).send('An error occured when attempting to fetch robots entries')
    }
  }