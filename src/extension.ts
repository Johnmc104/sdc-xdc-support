// SPDX-License-Identifier: MIT
// Derived from vscode-verilog-hdl-support by Masahiro H (MIT License)
import * as vscode from 'vscode';
import { LanguageClient, ServerOptions } from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

export async function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('SDC/XDC Language Server');
  context.subscriptions.push(outputChannel);

  setupLanguageClient(outputChannel);

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('sdcXdc.languageServer.tclsp')) {
        restartLanguageClient(outputChannel);
      }
    })
  );
}

function buildInitializationOptions(): Record<string, unknown> | undefined {
  const config = vscode.workspace.getConfiguration('sdcXdc.languageServer.tclsp');
  const inspect = config.inspect<string>('configPath');
  const globalConfig = inspect?.globalValue?.trim() ?? '';
  const workspaceConfig = inspect?.workspaceValue?.trim() ?? '';
  const settings: Array<{ cwd: string; configPath: string }> = [];

  const folders = vscode.workspace.workspaceFolders ?? [];
  for (const folder of folders) {
    const folderConfig =
      vscode.workspace
        .getConfiguration('sdcXdc.languageServer.tclsp', folder.uri)
        .get<string>('configPath')
        ?.trim() ?? '';
    const effectiveConfig = folderConfig || workspaceConfig;
    if (effectiveConfig.length > 0) {
      settings.push({ cwd: folder.uri.fsPath, configPath: effectiveConfig });
    }
  }

  const initOptions: Record<string, unknown> = {};
  if (globalConfig.length > 0) {
    initOptions.globalSettings = { configPath: globalConfig };
  }
  if (settings.length > 0) {
    initOptions.settings = settings;
  }

  return Object.keys(initOptions).length > 0 ? initOptions : undefined;
}

function setupLanguageClient(outputChannel: vscode.OutputChannel) {
  const settings = vscode.workspace.getConfiguration('sdcXdc.languageServer.tclsp');
  const enabled = settings.get<boolean>('enabled', false);
  if (!enabled) {
    outputChannel.appendLine('tclsp language server is disabled.');
    return;
  }

  const binPath = settings.get<string>('path', 'tclsp')!;
  const customArgs = settings.get<string>('arguments', '');
  const serverArgs: string[] = [];
  if (customArgs) {
    serverArgs.push(customArgs);
  }

  const serverOptions: ServerOptions = {
    run: { command: binPath, args: serverArgs },
    debug: { command: binPath, args: serverArgs },
  };

  client = new LanguageClient(
    'tclsp',
    'tclsp language server',
    serverOptions,
    {
      initializationOptions: buildInitializationOptions(),
      documentSelector: [
        { scheme: 'file', language: 'sdc' },
        { scheme: 'file', language: 'xdc' },
      ],
    }
  );

  client.start();
  outputChannel.appendLine('tclsp language server started.');
}

async function restartLanguageClient(outputChannel: vscode.OutputChannel) {
  if (client?.isRunning()) {
    await client.stop();
    outputChannel.appendLine('tclsp language server stopped.');
  }
  client = undefined;
  setupLanguageClient(outputChannel);
}

export async function deactivate() {
  if (client?.isRunning()) {
    await client.stop();
  }
}
