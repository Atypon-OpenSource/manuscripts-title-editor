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
    this.editorRef.current!.appendChild(this.view.dom)
    this.updateClassList()
  }

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
