interface BadgeProps {
  /**
   * Text content to show in the Badge
   */
  text: string
}

export const Badge = ({ text }: BadgeProps) => {
  return (
    <span className='top-product-badge'>
      <div className='calibre-semibold uppercase font-size-small'>
        <span>{text}</span>
      </div>
    </span>
  )
}
