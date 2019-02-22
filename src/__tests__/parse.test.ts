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

import { parse } from '../parse'

describe('parser', () => {
  test('parses a simple title', () => {
    const input = `This is a title`

    const output = parse(input)

    expect(output.toJSON()).toEqual({
      content: [{ text: 'This is a title', type: 'text' }],
      type: 'title',
    })
  })

  test('parses a title with italicised text', () => {
    const input = `This is a title with <i>italicised</i> text`

    const output = parse(input)

    expect(output.toJSON()).toEqual({
      content: [
        { text: 'This is a title with ', type: 'text' },
        { marks: [{ type: 'italic' }], text: 'italicised', type: 'text' },
        { text: ' text', type: 'text' },
      ],
      type: 'title',
    })
  })
})
