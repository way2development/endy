import { RichText } from './RichText'

export interface RichTextBlockProps {
  content: React.ElementRef<typeof RichText>
}

export const RichTextBlock = ({content}: RichTextBlockProps) => {
  return content
}
