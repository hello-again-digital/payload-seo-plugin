import { CollectionConfig } from 'payload/types'

const SEOEntries: CollectionConfig = {
  slug: 'seo-entries',
  admin: {
    useAsTitle: 'url',
  },
  fields: []
//   fields: [
//     {
//       name: 'url',
//       label: 'URL',
//       type: 'text',
//       required: true,
//       admin: {
//         description: 'What URL do you wish to configure SEO for',
//       },
//     },
//     /** Sitemap Entries */
//     {
//       name: 'sitemap',
//       type: 'group',
//       fields: [
//         {
//           name: 'url',
//           label: 'URL',
//           type: 'text',
//           required: true,
//         },

//         { name: 'priority', type: 'number', required: true, min: 0, max: 1, admin: { step: 0.1 } },
//         {
//           name: 'changeFrequency',
//           label: 'Change Frequency',
//           type: 'select',
//           options: [
//             { label: 'Always', value: 'always' },
//             { label: 'Hourly', value: 'hourly' },
//             { label: 'Daily', value: 'daily' },
//             { label: 'Weekly', value: 'weekly' },
//             { label: 'Monthly', value: 'monthly' },
//             { label: 'Yearly', value: 'yearly' },
//             { label: 'Never', value: 'never' },
//           ],
//           required: true,
//         },
//       ],
//     },
//     /** Robots Entries */
//     {
//       name: 'robots', // required
//       type: 'group', // required
//       fields: [
//         {
//           name: 'userAgent',
//           label: 'User Agent',
//           type: 'text',
//           required: true,
//           admin: {
//             description: 'Which user agent are you targetting with this rule',
//           },
//         },
//         {
//           name: 'directives',
//           label: 'Directive',
//           type: 'array',
//           minRows: 1,
//           labels: {
//             singular: 'Directive',
//             plural: 'Directives',
//           },
//           fields: [
//             {
//               name: 'type',
//               label: 'Type',
//               type: 'select',
//               options: [
//                 { label: 'Allow', value: 'Allow' },
//                 { label: 'Disallow', value: 'Disallow' },
//               ],
//             },
//             {
//               name: 'value',
//               label: 'Value',
//               type: 'text',
//             },
//           ],
//         },
//       ],
//     },
//     /** SERP Schema */
//     // {},
//     /** Redirects */
//     {
//         name: 'redirects',
//         type: "group",
//         fields: [{
//           name: 'url',
//           label: 'Current URL',
//           type: 'text',
//           required: true,
//           admin: {
//               description: "The URL you wish to redirect from"
//           }
//         }, {
//           /** @TODO - Might be an idea to include 307 and 308, or to simply use permanent: true/false */
//           name: 'redirectType',
//           label: 'Redirect Type',
//           type: 'select',
//           required: true,
//           options:[
//               { label: 'Permanent (301)', value: '301' },
//               { label: 'Temporary (302)', value: '302' },
//           ]
//         }, {
//           name: 'redirectUrl',
//           label: 'Redirect to',
//           type: 'text',
//           required: true,
//         }]
//       }
//   ],
}

export default SEOEntries
