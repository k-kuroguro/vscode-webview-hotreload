import * as vscode from 'vscode';
import * as fs from 'fs';
import { Config } from './config';

export function activate(context: vscode.ExtensionContext) {
   const config: Config = Config.getInstance();

   if (process.env.VSCODE_WEBVIEW_HOTRELOAD_IS_DEBUGGING !== 'true' || !config.watchFolder) {
      return;
   }

   const watcher = new Watcher();
   watcher.watch();

   context.subscriptions.push(
      config.setListener(),
      watcher
   );

}

export function deactivate() { }


class Watcher {

   static readonly emptyDisposable = { dispose: () => { } };
   private disposables: { event: vscode.Disposable, watcher: vscode.Disposable } = { event: Watcher.emptyDisposable, watcher: Watcher.emptyDisposable };
   private readonly config: Config = Config.getInstance();

   constructor() {
      this.disposables.event = this.config.onDidChangeConfig(() => {
         this.update();
      });
   }

   watch(): void {
      if (!this.config.watchFolder) return;
      const watcher = fs.watch(this.config.watchFolder.fsPath, { recursive: true }, async (event: string, fileName: string | Buffer) => {
         vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction');
      });
      this.disposables.watcher = { dispose: () => watcher.close() };
   }

   private update(): void {
      this.disposables.watcher.dispose();
      this.watch();
   }

   dispose(): void {
      this.disposables.watcher.dispose();
      this.disposables.event.dispose();
   }

}
