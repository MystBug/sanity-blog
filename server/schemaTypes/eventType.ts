import {defineField, defineType} from 'sanity'

import {CalendarIcon} from '@sanity/icons'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'eventType',
      type: 'string',
      options: {
        list: ['in-person', 'more'],
        layout: 'radio',
      },
      group: ['details'],
    }),
    defineField({
      name: 'numberOfPeople',
      type: 'number',
      hidden: ({document}) => document?.eventType === 'in-person',
      readOnly: ({value, document}) => !value && document?.eventType === 'in-person',
      validation: (rule) => [
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === 'in-person') {
            return 'Only in-person events can have a an amount of people'
          }

          return true
        }),
        rule.min(0).error('Amount should be a positive number'),
        rule.max(10).warning('Damn, I am really intrigued by this event!'),
      ],
      group: ['details'],
    }),
    defineField({
      name: 'name',
      type: 'string',
      group: ['details'],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      hidden: ({document}) => !document?.name,
      group: ['details'],
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      group: ['details'],
    }),
    defineField({
      name: 'exactDate',
      type: 'boolean',
      group: ['details'],
      initialValue: false,
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
      readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === 'virtual') {
            return 'Only in-person events can have a venue'
          }

          return true
        }),
      group: ['details'],
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
      group: ['details'],
    }),
    defineField({
      name: 'grams',
      type: 'number',
      initialValue: 0.25,
      group: ['details'],
      validation: (rule) => [
        rule.min(0).error('Amount should be a positive number'),
        rule.max(10).warning('Damn, I am really intrigued by this event!'),
        rule.precision(2).error('Only a max of two decimals allowed'),
      ],
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: ['editorial'],
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: `Some of your visitors cannot see images, 
              be they blind, color-blind, low-sighted; 
              alternative text is of great help for those 
              people that can rely on it to have a good idea of 
              what\'s on your page.`,
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
      group: ['editorial'],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      venue: 'venue.name',
      artist: 'headline.name',
      grams: 'grams',
      date: 'date',
      image: 'image',
    },
    prepare({name, venue, artist, grams, date, image}) {
      const nameFormatted = name || 'Untitled event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : 'No date'

      return {
        title: artist ? `${nameFormatted} (${artist}, ${grams}g)` : nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },
})
