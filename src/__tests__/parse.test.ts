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
