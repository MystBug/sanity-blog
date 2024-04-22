import {defineField, defineType} from 'sanity'
import {ColorWheelIcon, StarIcon} from '@sanity/icons'

export const productRegistrationType = defineType({
  name: 'productRegistration',
  title: 'Product registration',
  type: 'document',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'strainName',
      title: 'Strain name',
      type: 'string',
    }),
    defineField({
      name: 'variant',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'flushGeneration',
      title: 'Flush generation',
      type: 'number',
    }),
    defineField({
      title: 'Grow Registration',
      name: 'growRegistration',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              dateGrowStart: 'dateGrowStart',
            },
            prepare(selection) {
              return {
                title: `Grow: ${selection.dateGrowStart}`,
              }
            },
          },
          fields: [
            {
              title: 'Date grow start',
              name: 'dateGrowStart',
              type: 'date',
            },
            {
              title: 'Flush',
              name: 'flush',
              type: 'array',
              of: [
                {
                  type: 'object',
                  preview: {
                    select: {
                      dateFlushPicked: 'dateFlushPicked',
                      gramsWet: 'gramsWet',
                      gramsDry: 'gramsDry',
                      numberOfSporePrints: 'numberOfSporePrints',
                    },
                    prepare(selection) {
                      return {
                        title: `Flush: ${selection.dateFlushPicked}`,
                        subtitle: `Wet: ${selection.gramsWet}g,
                        Dry: ${selection.gramsDry}g,
                        Prints: ${selection.numberOfSporePrints}`,
                      }
                    },
                  },
                  fields: [
                    {
                      title: 'Date flush picked',
                      name: 'dateFlushPicked',
                      type: 'date',
                    },
                    {
                      title: 'Grams wet',
                      name: 'gramsWet',
                      type: 'number',
                      validation: (Rule) => Rule.min(0),
                    },
                    {
                      title: 'Grams dry',
                      name: 'gramsDry',
                      type: 'number',
                      validation: (Rule) => Rule.min(0),
                    },
                    {
                      title: 'Number of spore prints',
                      name: 'numberOfSporePrints',
                      type: 'number',
                      validation: (Rule) => Rule.min(0),
                    },
                    {
                      title: 'Picutres',
                      name: 'pictures',
                      type: 'array',
                      of: [{type: 'image'}],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      title: 'Features list',
      type: 'object',
      name: 'featuresList',
      fieldsets: [
        {
          name: 'visual',
          title: 'Visual',
          options: {collapsible: true, collapsed: true},
        },
        {name: 'creative', title: 'Creative', options: {collapsible: true, collapsed: true}},
        {
          name: 'philosophical',
          title: 'Philosophical',
          options: {collapsible: true, collapsed: true},
        },
        {name: 'intensive', title: 'Intensive', options: {collapsible: true, collapsed: true}},
        {name: 'overall', title: 'Overall', options: {collapsible: true, collapsed: true}},
      ],
      fields: [
        {
          title: 'Value',
          name: 'visual',
          type: 'number',
          description: 'Number between 0 and 10',
          validation: (Rule) => Rule.min(0).max(10),
          fieldset: 'visual',
        },
        {
          title: 'Value',
          name: 'creative',
          type: 'number',
          description: 'Number between 0 and 10',
          validation: (Rule) => Rule.min(0).max(10),
          fieldset: 'creative',
        },
        {
          title: 'Value',
          name: 'philosophical',
          type: 'number',
          description: 'Number between 0 and 10',
          validation: (Rule) => Rule.min(0).max(10),
          fieldset: 'philosophical',
        },
        {
          title: 'Value',
          name: 'intensive',
          type: 'number',
          description: 'Number between 0 and 10',
          validation: (Rule) => Rule.min(0).max(10),
          fieldset: 'intensive',
        },
        {
          title: 'Value',
          name: 'overall',
          type: 'number',
          description: 'Number between 0 and 10',
          validation: (Rule) => Rule.min(0).max(10),
          fieldset: 'overall',
        },
      ],
    }),
  ],
})
