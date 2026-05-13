export function pixelTextStyle(size: number, color = '#ffffff'): Phaser.Types.GameObjects.Text.TextStyle {
  return {
    fontFamily: 'monospace',
    fontSize: `${size}px`,
    color,
    stroke: '#162033',
    strokeThickness: Math.max(3, Math.floor(size / 8)),
    shadow: {
      offsetX: 2,
      offsetY: 2,
      color: '#000000',
      blur: 0,
      fill: true
    }
  };
}
