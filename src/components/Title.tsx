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
import { schema } from '../schema'

export interface TitleProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  value?: string
}

export class Title<Props extends TitleProps> extends React.Component<Props> {
  protected editorRef: React.RefObject<HTMLDivElement>
  protected view: EditorView

  public constructor(props: Props) {
    super(props)

    this.editorRef = React.createRef()

    const attributes: { [name: string]: string } = {
      class: 'plain',
    }

    this.view = new EditorView(undefined, {
      attributes,
      editable: () => false,
      state: EditorState.create({
        doc: parse(props.value),
        schema,
      }),
    })
  }

  public componentDidMount() {
    if (this.editorRef.current) {
      this.editorRef.current.appendChild(this.view.dom)
    }

    this.updateClassList()
  }

  // eslint-disable-next-line react/no-deprecated
  public componentWillReceiveProps(nextProps: Props) {
    this.view.updateState(
      EditorState.create({
        doc: parse(nextProps.value),
        schema: this.view.state.schema,
      })
    )
    this.updateClassList()
  }

  public render() {
    return (
      <div
        className={this.props.className}
        id={this.props.id}
        ref={this.editorRef}
      />
    )
  }

  protected updateClassList() {
    this.view.dom.classList.toggle(
      'empty-node',
      this.view.state.doc.childCount === 0
    )
  }
}
