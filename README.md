# @quartz-community/reader-mode

Adds a reader mode toggle button that hides sidebars for distraction-free reading.

## Installation

```bash
npx quartz plugin add @quartz-community/reader-mode
```

Reader mode is already in Quartz's default configuration.

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/reader-mode"
    enabled: true
    layout:
      position: left
      priority: 35
      group: toolbar
```

## Configuration

This plugin has no configuration options. Use the entry's `enabled` field to turn it on or off, and `layout` to place the toggle button.

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/features/reader%20mode) for more information.

## License

MIT
