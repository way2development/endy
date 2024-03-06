export interface ColorProps {
  alpha: number
  hex: string
  hsl: HslProps
  hsv: HsvProps
  rgb: RgbProps
  _type: string
}

interface HslProps {
  a: number
  h: number
  l: number
  s: number
  _type: string
}

interface HsvProps {
  a: number
  h: number
  s: number
  v: number
  _type: string
}

interface RgbProps {
  a: number
  b: number
  g: number
  r: number
  _type: string
}
