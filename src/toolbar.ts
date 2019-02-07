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
  formatting: {
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
