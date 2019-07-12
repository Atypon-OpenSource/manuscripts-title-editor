/*!
 * © 2019 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Schema } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

export type Nodes = 'text' | 'title'
export type Marks = 'italic' | 'smallcaps' | 'subscript' | 'superscript'
export type TitleSchema = Schema<Nodes, Marks>
export type TitleEditorState = EditorState<TitleSchema>
export type TitleEditorView = EditorView<TitleSchema>
export type TitleTransaction = Transaction<TitleSchema>

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
