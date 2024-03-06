import React from 'react'
import { ChatText, Link, Quotes, Table } from 'phosphor-react'
/*
  Custom typography components that will override Sanity's RTE default styling
  See "block editor render" notes below
*/
import { Text } from '../../components/Text'

export default (
  selectedDecorators,
  selectedStyles,
  selectedLists,
  selectedAnnotations
) => {
  const options = {
    // Decorators
    italic: { title: 'Italic', value: 'em' },
    strong: { title: 'Strong', value: 'strong' },
    underline: { title: 'Underline', value: 'underline' },
    /* 
      Block styles
      - blockEditor render: Override Sanity's RTE UI defaults with our Design System component styles.
      - Example: H1 within the Sanity RTE renders with Endy's H1 style, not Sanity's default H1 style.
    */
    h1: {
      title: 'H1',
      value: 'h1',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'h1'} color={'gravy'}>
            {children}
          </Text>
        )
      }
    },
    h2: {
      title: 'H2',
      value: 'h2',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'h2'} color={'gravy'}>
            {children}
          </Text>
        )
      }
    },
    h3: {
      title: 'H3',
      value: 'h3',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'h3'} color={'gravy'}>
            {children}
          </Text>
        )
      }
    },
    h4: {
      title: 'H4',
      value: 'h4',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'h4'} color={'rubine'}>
            {children}
          </Text>
        )
      }
    },
    h5: {
      title: 'H5',
      value: 'h5',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'h5'} color={'gravy'}>
            {children}
          </Text>
        )
      }
    },
    largebody: {
      title: 'Large Body',
      value: 'largeBody',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'largeBody'} color={'gravy'}>
            {children}
          </Text>
        )
      }
    },
    mediumbody: {
      title: 'Medium Body',
      value: 'mediumBody',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'mediumBody'} color={'gravy'}>
            {children}
          </Text>
        )
      }
    },
    smallbody: {
      title: 'Small Body',
      value: 'smallBody',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'smallBody'} color={'gravy'}>
            {children}
          </Text>
        )
      }
    },
    micro: {
      title: 'Micro Body',
      value: 'micro',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'micro'} color={'gravy'}>
            {children}
          </Text>
        )
      }
    },
    caption: {
      title: 'Small Body/Caption',
      value: 'caption',
      blockEditor: {
        render: ({ children }) => (
          <Text color={'gravy'} variant={'caption'}>
            {children}
          </Text>
        )
      }
    },
    displayserif: {
      title: 'Display Serif',
      value: 'displaySerif',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'displaySerif'} color={'gravy'}>
            {children}
          </Text>
        )
      }
    },
    displaysans: {
      title: 'Display Sans',
      value: 'displaySans',
      blockEditor: {
        render: ({ children }) => (
          <Text variant={'displaySans'} color={'gravy'}>
            {children}
          </Text>
        )
      }
    },
    // Lists
    bullet: {
      title: 'Bullet',
      value: 'bullet'
    },
    number: {
      title: 'Number',
      value: 'number'
    },
    alphabet: {
      title: 'Alphabet List',
      value: 'alphabet',
      blockEditor: {
        render: ({ children }) => <AlphabetList>{children}</AlphabetList>,
        icon: () => 'ABC'
      }
    },
    checklist: {
      title: 'Checklist',
      value: 'checklist',
      blockEditor: {
        icon: () => '✓'
      }
    },
    // Annotations
    superscript: {
      title: 'Superscript',
      name: 'superscript',
      type: 'object',
      fields: [
        {
          title: 'URL/Trademark',
          name: 'href',
          type: 'string'
        }
      ],
      blockEditor: {
        icon: () => <sup>Sup</sup>,
        render: ({ children }) => (
          <sup>
            <strong>{children}</strong>
          </sup>
        )
      }
    },
    link: {
      title: 'Inline Link',
      name: 'inlineLink',
      type: 'object',
      fields: [
        {
          title: 'URL',
          name: 'href',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          title: 'Variant',
          name: 'variant',
          type: 'string',
          description: 'Link Variation',
          options: {
            list: [
              'solid-rubine',
              'solid-gravy',
              'hollow-rubine',
              'hollow-gravy',
              'hollow-white',
              'block-line-gravy',
              'block-line-white'
            ]
          }
        }
      ],
      blockEditor: {
        icon: () => <Link />
      }
    },
    modal: {
      title: 'Modal',
      name: 'modalButton',
      type: 'object',
      fields: [
        {
          title: 'Modal Type',
          name: 'modalType',
          type: 'string',
          initialValue: 'Custom',
          options: {
            list: ['Custom', 'Terms & Conditions', 'Comparison']
          }
        },
        {
          title: 'Content',
          name: 'content',
          type: 'reference',
          options: {
            disableNew: true
          },
          hidden: ({ parent }) =>
            parent?.modalType !== 'Custom' &&
            parent?.modalType !== 'Comparison',
          to: [
            { type: 'customModal', title: 'Custom Modal' },
            { type: 'comparisonModal', title: 'Comparison Modal' }
          ]
        }
      ],
      blockEditor: {
        icon: () => <ChatText />
      }
    }
  }

  const getCustomSelections = (selections) => {
    return selections.map((selection) => {
      return options[selection.toLowerCase()]
    })
  }

  let decorators = []
  if (selectedDecorators) {
    decorators = getCustomSelections(selectedDecorators.split(' '))
  }

  let styles = []
  if (selectedStyles) {
    styles = getCustomSelections(selectedStyles.split(' '))
  }

  let lists = []
  if (selectedLists) {
    lists = getCustomSelections(selectedLists.split(' '))
  }

  let annotations = []
  if (selectedAnnotations) {
    annotations = getCustomSelections(selectedAnnotations.split(' '))
  }

  return {
    title: 'Rich Text',
    type: 'block',
    name: 'richText',
    styles: styles,
    lists: [...lists],
    marks: {
      decorators: [...decorators],
      annotations: [...annotations]
    }
  }
}
