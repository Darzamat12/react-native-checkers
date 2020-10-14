export interface ICell {
  checkerColor: string
  isQueen: boolean
  name: string
  isSelected: boolean
  isPossibleMove: boolean
  startAnimationTo: {
    x: number
    y: number
    color: string
  }
}
