import * as vscode from 'vscode';
import { Config } from './config';
import { Watcher } from './watcher';

export function activate(context: vscode.ExtensionContext) {
   if (process.env.IS_EXTENSION_DEBUGGING !== 'true') {
      return;
   }

   const watcher = new Watcher();
   watcher.watch();

   context.subscriptions.push(
      Config.getInstance().setListener(),
      watcher
   );

}

export function deactivate() { }
