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

import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React from 'react'
import { parse } from '../parse'
import { plugins } from '../plugins'
import { schema, TitleEditorView, TitleSchema } from '../schema'
import { serialize } from '../serialize'
import { Title, TitleProps } from './Title'

interface Props extends TitleProps {
  handleChange?: (value: string) => void
  handleFocused?: (focused: boolean) => void
  handleStateChange?: (view: TitleEditorView, docChanged: boolean) => void
  editable?: boolean
}

export class TitleField extends Title<Props> {
  public constructor(props: Props) {
    super(props)

    this.editorRef = React.createRef()

    const attributes: { [name: string]: string } = {
      class: 'plain title-editor',
    }

    if ('tabIndex' in this.props) {
      attributes.tabindex = String(this.props.tabIndex)
    }

    this.view = new EditorView<TitleSchema>(undefined, {
      attributes,
      editable: () =>
        this.props.editable === undefined ? true : this.props.editable,
      dispatchTransaction: transaction => {
        const { state, transactions } = this.view.state.applyTransaction(
          transaction
        )

        this.view.updateState(state)
        this.updateClassList()

        const docChanged = transactions.some(tr => tr.docChanged)

        if (this.props.handleStateChange) {
          this.props.handleStateChange(this.view, docChanged)
        }

        // TODO: debounce this to reduce serialization
        if (this.props.handleChange && docChanged) {
          this.props.handleChange(serialize(state.doc))
        }
      },
      handleDOMEvents: {
        blur: () => {
          if (this.props.handleFocused) {
            this.props.handleFocused(false)
          }

          return false
        },
        focus: view => {
          if (this.props.handleStateChange) {
            this.props.handleStateChange(view, false)
          }

          if (this.props.handleFocused) {
            this.props.handleFocused(true)
          }

          return false
        },
      },
      handleKeyDown: (view, event) => {
        if (event.key === 'Enter') {
          const element = this.view.dom as HTMLDivElement
          element.blur()
          return true
        }

        return false
      },
      state: EditorState.create<TitleSchema>({
        doc: parse(props.value),
        plugins,
        schema,
      }),
    })
  }

  public componentDidMount() {
    if (this.editorRef.current) {
      this.editorRef.current.appendChild(this.view.dom)
    }

    this.updateClassList()

    if (this.props.autoFocus) {
      this.view.focus()
    }
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (!this.view.hasFocus()) {
      this.view.updateState(
        EditorState.create<TitleSchema>({
          doc: parse(nextProps.value),
          plugins: this.view.state.plugins,
          schema: this.view.state.schema,
        })
      )
      this.updateClassList()
    }
  }
}
