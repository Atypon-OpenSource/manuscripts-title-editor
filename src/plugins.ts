import { baseKeymap, toggleMark } from 'prosemirror-commands'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { schema } from './schema'

export const plugins = [
  history(),
  keymap({
    ...baseKeymap,
    'Mod-i': toggleMark(schema.marks.italic),
    'Mod-y': redo,
    'Mod-z': undo,
  }),
]
