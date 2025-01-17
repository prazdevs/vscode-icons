import type { AccentName, FlavorName, MonochromaticName } from '@catppuccin/palette'
import { flavorEntries, flavors } from '@catppuccin/palette'

type Flavor = FlavorName | 'css-variables'
type ColorName = AccentName | Extract<MonochromaticName, 'text' | 'overlay1'>
export const palettes = {
  ...flavorEntries.reduce((acc, [flavorName, flavor]) => ({
    ...acc,
    [flavorName]: flavor.colorEntries
      .filter(([color, { accent }]) => accent || ['text', 'overlay1'].includes(color))
      .map(([color, { hex }]) => [color, hex]),
  }), {} as Record<Flavor, Array<[ColorName, string]>>),
  'css-variables': flavors.latte.colorEntries
    .filter(([color, { accent }]) => accent || ['text', 'overlay1'].includes(color))
    .map(([color]) => ([color, `var(--vscode-ctp-${color})`])) as Array<[ColorName, string]>,
}
