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

import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React from 'react'
import styled from 'styled-components'

import { toolbar } from '../toolbar'

const ToolbarItem = styled.div`
  display: inline-flex;
  position: relative;
`

const ToolbarButton = styled.button.attrs({
  type: 'button',
})<{
  'data-active'?: boolean
}>`
  background-color: ${(props) =>
    props['data-active'] ? '#eee' : props.theme.colors.background.primary};
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  cursor: pointer;
  padding: 2px ${(props) => props.theme.grid.unit * 3}px;
  display: inline-flex;
  align-items: center;
  transition: 0.2s all;

  &:hover {
    background: ${(props) =>
      props['data-active'] ? '#eee' : props.theme.colors.background.secondary};
    z-index: 2;
  }

  &:active {
    background: #ddd;
  }

  &:disabled {
    opacity: 0.2;
  }
`

export const ToolbarContainer = styled.div`
  margin: ${(props) => props.theme.grid.unit}px;
  display: flex;
  flex-wrap: wrap;
`

export const ToolbarGroup = styled.div`
  margin-right: ${(props) => props.theme.grid.unit * 2}px;
  margin-bottom: ${(props) => props.theme.grid.unit * 2}px;
  white-space: nowrap;

  & ${ToolbarItem} button {
    margin-right: 0;
  }

  & ${ToolbarItem}:not(:first-of-type) button {
    margin-left: -1px;
  }

  & ${ToolbarItem}:first-of-type button {
    border-top-left-radius: ${(props) => props.theme.grid.radius.small}px;
    border-bottom-left-radius: ${(props) => props.theme.grid.radius.small}px;
  }

  & ${ToolbarItem}:last-of-type button {
    border-top-right-radius: ${(props) => props.theme.grid.radius.small}px;
    border-bottom-right-radius: ${(props) => props.theme.grid.radius.small}px;
  }
`

interface ToolbarButtonConfig {
  title: string
  content: React.ReactNode
  active?: (state: EditorState) => boolean
  run: (state: EditorState, dispatch: (tr: Transaction) => void) => void
  enable?: (state: EditorState) => boolean
}

export interface ToolbarConfig {
  [key: string]: {
    [key: string]: ToolbarButtonConfig
  }
}

export const TitleToolbar: React.FC<{
  view: EditorView
}> = ({ view }) => (
  <ToolbarContainer>
    {Object.entries(toolbar).map(([groupKey, toolbarGroup]) => (
      <ToolbarGroup key={groupKey}>
        {Object.entries(toolbarGroup).map(([itemKey, item]) => (
          <ToolbarItem key={itemKey}>
            <ToolbarButton
              title={item.title}
              data-active={item.active && item.active(view.state)}
              disabled={item.enable && !item.enable(view.state)}
              onMouseDown={(event) => {
                event.preventDefault()
                item.run(view.state, view.dispatch)
              }}
            >
              {item.content}
            </ToolbarButton>
          </ToolbarItem>
        ))}
      </ToolbarGroup>
    ))}
  </ToolbarContainer>
)
