# SDC/XDC Constraints Support

Provides syntax highlighting, code snippets, and language server support for FPGA/ASIC design constraint files in VS Code.

## Supported Languages

| Language | File Extensions | Description |
|----------|----------------|-------------|
| SDC | `.sdc` | Synopsys Design Constraints |
| XDC | `.xdc` | Xilinx Design Constraints |

## Features

- **Syntax Highlighting**: Full TextMate grammar with dedicated highlighting for:
  - SDC object access commands (`get_ports`, `get_cells`, `get_clocks`, `all_inputs`, etc.)
  - SDC timing constraints (`create_clock`, `set_input_delay`, `set_false_path`, etc.)
  - SDC environment commands (`set_load`, `set_units`, `set_max_transition`, etc.)
  - SDC power optimization commands (`create_voltage_area`, `set_max_dynamic_power`, etc.)
  - XDC-specific commands (`set_property`, `get_property`, `create_pblock`, etc.)
  - Tcl language constructs (`proc`, `foreach`, `if`, `set`, `expr`, etc.)

- **Code Snippets**: 50+ snippets for rapid SDC/XDC authoring:
  - Clock constraints (`create_clock`, `create_generated_clock`)
  - IO timing (`set_input_delay`, `set_output_delay`)
  - Timing exceptions (`set_false_path`, `set_multicycle_path`, `set_max_delay`)
  - Clock relationships (`set_clock_groups`, `set_clock_uncertainty`)
  - XDC pin assignments (`set_property PACKAGE_PIN`, `IOSTANDARD`)
  - XDC debug (`create_debug_core`) and bitstream configuration
  - File templates (`sdc_header`, `xdc_header`, `io_constraints`, `cdc`)

- **Language Server** (optional): Supports the [tclsp](https://github.com/nmoroze/tclint) language server for linting and diagnostics.

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
