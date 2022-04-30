export interface OptionSettings {
  options: ButtonSettings[]
}

export interface ButtonSettings {
  icon: string,
  literal: string,
  color?: string,
  event: string
}
