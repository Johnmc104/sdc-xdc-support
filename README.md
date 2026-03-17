# SDC/XDC 约束文件支持

为 VS Code 提供 FPGA/ASIC 设计约束文件的语法高亮、代码片段和语言服务器支持。

## 支持的语言

| 语言 | 文件扩展名 | 说明 |
|------|-----------|------|
| SDC | `.sdc` | Synopsys 设计约束 |
| XDC | `.xdc` | Xilinx 设计约束 |

## 功能特性

- **语法高亮**：基于 TextMate 语法的专用高亮规则：
  - SDC 对象查询命令（`get_ports`、`get_cells`、`get_clocks`、`all_inputs` 等）
  - SDC 时序约束命令（`create_clock`、`set_input_delay`、`set_false_path` 等）
  - SDC 环境命令（`set_load`、`set_units`、`set_max_transition` 等）
  - SDC 功耗优化命令（`create_voltage_area`、`set_max_dynamic_power` 等）
  - XDC 专有命令（`set_property`、`get_property`、`create_pblock` 等）
  - Tcl 语言结构（`proc`、`foreach`、`if`、`set`、`expr` 等）

- **代码片段**：50+ 个片段，快速编写 SDC/XDC 约束：
  - 时钟约束（`create_clock`、`create_generated_clock`）
  - IO 延迟（`set_input_delay`、`set_output_delay`）
  - 时序例外（`set_false_path`、`set_multicycle_path`、`set_max_delay`）
  - 时钟关系（`set_clock_groups`、`set_clock_uncertainty`）
  - XDC 引脚分配（`set_property PACKAGE_PIN`、`IOSTANDARD`）
  - XDC 调试核（`create_debug_core`）和比特流配置
  - 文件模板（`sdc_header`、`xdc_header`、`io_constraints`、`cdc`）

- **语言服务器**（可选）：支持 [tclsp](https://github.com/nmoroze/tclint) 语言服务器，提供语法检查和诊断。

## 安装方式

```
vsce package --allow-missing-repository
```

本插件支持离线安装，无需网络连接。

1. 在 VS Code 中按 `Ctrl+Shift+P`，输入 `Extensions: Install from VSIX...`
2. 选择 `sdc-xdc-support-1.0.0.vsix` 文件即可

## 语言服务器设置（可选）

1. 安装 [tclsp](https://github.com/nmoroze/tclint)：
   ```
   pip install tclint
   ```
2. 在设置中启用语言服务器：
   ```json
   {
     "sdcXdc.languageServer.tclsp.enabled": true
   }
   ```

## 配置项

| 设置项 | 默认值 | 说明 |
|--------|--------|------|
| `sdcXdc.languageServer.tclsp.enabled` | `false` | 启用 tclsp 语言服务器 |
| `sdcXdc.languageServer.tclsp.path` | `"tclsp"` | tclsp 可执行文件路径 |
| `sdcXdc.languageServer.tclsp.arguments` | `""` | tclsp 自定义参数 |
| `sdcXdc.languageServer.tclsp.configPath` | `""` | tclint 配置文件路径 |

## 致谢

语法定义和语言服务器集成源自 Masahiro H 的 [vscode-verilog-hdl-support](https://github.com/mshr-h/vscode-verilog-hdl-support)，基于 MIT 许可证。
