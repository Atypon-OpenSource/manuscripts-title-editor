import { Schema } from 'prosemirror-model'

export type Nodes = 'text' | 'title'
export type Marks = 'italic' | 'smallcaps' | 'subscript' | 'superscript'
export type TitleSchema = Schema<Nodes, Marks>

export const schema: TitleSchema = new Schema<Nodes, Marks>({
  marks: {
    italic: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM() {
        return ['i']
      },
    },
    smallcaps: {
      parseDOM: [
        { style: 'font-variant=small-caps' },
        { style: 'font-variant-caps=small-caps' }, // TODO: all the other font-variant-caps options?
      ],
      toDOM: () => [
        'span',
        {
          style: 'font-variant:small-caps',
        },
      ],
    },
    subscript: {
      excludes: 'superscript',
      group: 'position',
      parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
      toDOM: () => ['sub'],
    },
    superscript: {
      excludes: 'subscript',
      group: 'position',
      parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
      toDOM: () => ['sup'],
    },
  },
  nodes: {
    text: {},
    title: {
      content: 'text*',
      marks: 'italic smallcaps subscript superscript',
      parseDOM: [{ tag: 'div' }],
      toDOM: () => ['div', 0],
    },
  },
  topNode: 'title',
})
