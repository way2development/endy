export interface InventoryInfoProps {
  id: number
  variants: {
    id: number
    isAvailable: boolean
  }[]
}