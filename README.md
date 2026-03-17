# SDC/XDC/TCL/UCF Constraints Support

Provides syntax highlighting and language server support for FPGA/ASIC design constraint files in VS Code.

## Supported Languages

| Language | File Extensions | Description |
|----------|----------------|-------------|
| SDC | `.sdc` | Synopsys Design Constraints |
| XDC | `.xdc` | Xilinx Design Constraints |
| TCL | `.tcl`, `.tm`, `.tk` | Tool Command Language |
| UPF | `.upf` | Unified Power Format |
| UCF | `.ucf` | User Constraints File (Xilinx legacy) |

## Features

- **Syntax Highlighting**: Full TextMate grammar support for SDC, XDC, TCL, UPF, and UCF files.
- **Language Server** (optional): Supports the [tclsp](https://github.com/nmoroze/tclint) language server for linting and diagnostics in Tcl-based constraint files.

## Language Server Setup

1. Install [tclsp](https://github.com/nmoroze/tclint):
   ```
   pip install tclint
   ```
2. Enable the language server in settings:
   ```json
   {
     "sdcXdc.languageServer.tclsp.enabled": true
   }
   ```

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `sdcXdc.languageServer.tclsp.enabled` | `false` | Enable tclsp Language Server |
| `sdcXdc.languageServer.tclsp.path` | `"tclsp"` | Path to the tclsp binary |
| `sdcXdc.languageServer.tclsp.arguments` | `""` | Custom arguments for tclsp |
| `sdcXdc.languageServer.tclsp.configPath` | `""` | Path to tclint config file |

## Credits

Syntax grammars and language server integration are derived from [vscode-verilog-hdl-support](https://github.com/mshr-h/vscode-verilog-hdl-support) by Masahiro H, licensed under MIT.
