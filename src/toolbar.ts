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

import { toggleMark } from 'prosemirror-commands'
import { MarkType } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'

import { ToolbarConfig } from './components/TitleToolbar'
import icons from './icons'
import { schema, TitleSchema } from './schema'

const markActive = (type: MarkType) => (
  state: EditorState<TitleSchema>
): boolean => {
  const { from, $from, to, empty } = state.selection

  return empty
    ? Boolean(type.isInSet(state.storedMarks || $from.marks()))
    : state.doc.rangeHasMark(from, to, type)
}

export const toolbar: ToolbarConfig<TitleSchema> = {
  style: {
    italic: {
      title: 'Toggle italic',
      content: icons.italic,
      active: markActive(schema.marks.italic),
      enable: toggleMark(schema.marks.italic),
      run: toggleMark(schema.marks.italic),
    },
    /*smallcaps: {
      title: 'Toggle small caps',
      content: icons.smallcaps,
      active: markActive(schema.marks.smallcaps),
      enable: toggleMark(schema.marks.smallcaps),
      run: toggleMark(schema.marks.smallcaps),
    },*/
  },
  vertical: {
    subscript: {
      title: 'Toggle subscript',
      content: icons.subscript,
      active: markActive(schema.marks.subscript),
      enable: toggleMark(schema.marks.subscript),
      run: toggleMark(schema.marks.subscript),
    },
    superscript: {
      title: 'Toggle superscript',
      content: icons.superscript,
      active: markActive(schema.marks.superscript),
      enable: toggleMark(schema.marks.superscript),
      run: toggleMark(schema.marks.superscript),
    },
  },
}
