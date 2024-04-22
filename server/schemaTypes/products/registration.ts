import {defineField, defineType} from 'sanity'
import {ColorWheelIcon, StarIcon} from '@sanity/icons'

export const productRegistrationType = defineType({
  name: 'productRegistration',
  title: 'Product registration',
  type: 'document',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'name',
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
      name: 'generation',
      type: 'number',
    }),
    defineField({
      name: 'registration',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              dateGrowStart: 'dateStart',
            },
            prepare(selection) {
              return {
                title: `Start Date: ${selection.dateGrowStart}`,
              }
            },
          },
          fields: [
            {
              title: 'Date start',
              name: 'dateStart',
              type: 'date',
            },
            {
              name: 'round',
              type: 'array',
              of: [
                {
                  type: 'object',
                  preview: {
                    select: {
                      datePicked: 'datePicked',
                      wet: 'wet',
                      dry: 'dry',
                      prints: 'prints',
                    },
                    prepare(selection) {
                      return {
                        title: `Flush: ${selection.datePicked}`,
                        subtitle: `Wet: ${selection.wet}g,
                        Dry: ${selection.dry}g,
                        Prints: ${selection.prints}`,
                      }
                    },
                  },
                  fields: [
                    {
                      title: 'Date picked',
                      name: 'datePicked',
                      type: 'date',
                    },
                    {
                      name: 'weight',
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
      type: 'array',
      name: 'featuresList',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              type: 'string',
            },
            {
              name: 'value',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
})
