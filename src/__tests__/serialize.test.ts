import { schema } from '../schema'
import { serialize } from '../serialize'

describe('serialize', () => {
  test('serializes a simple title', () => {
    const input = schema.nodeFromJSON({
      content: [{ text: 'This is a title', type: 'text' }],
      type: 'title',
    })

    const output = serialize(input)

    expect(output).toEqual(`This is a title`)
  })

  test('serializes a title with italicised text', () => {
    const input = schema.nodeFromJSON({
      content: [
        { text: 'This is a title with ', type: 'text' },
        { marks: [{ type: 'italic' }], text: 'italicised', type: 'text' },
        { text: ' text', type: 'text' },
      ],
      type: 'title',
    })

    const output = serialize(input)

    expect(output).toEqual(`This is a title with <i>italicised</i> text`)
  })
})
