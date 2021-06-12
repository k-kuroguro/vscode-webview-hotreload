import * as vscode from 'vscode';
import { extensionName } from './constants';

export class Config {

   private _onDidChangeConfig: vscode.EventEmitter<Config | undefined | void> = new vscode.EventEmitter<Config | undefined | void>();
   readonly onDidChangeConfig: vscode.Event<Config | undefined | void> = this._onDidChangeConfig.event;

   private static instance: Config = new Config();
   private workspaceConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(extensionName);
   private hasSetListener: boolean = false;

   private constructor() { }

   static getInstance(): Config {
      return Config.instance;
   }

   setListener(): vscode.Disposable {
      if (this.hasSetListener) return { dispose: () => { } };
      this.hasSetListener = true;
      return vscode.workspace.onDidChangeConfiguration(() => {
         this.loadWorkspaceConfig();
         this._onDidChangeConfig.fire();
      });
   }

   loadWorkspaceConfig(): void {
      this.workspaceConfig = vscode.workspace.getConfiguration(extensionName);
   }

   //#region workspaceConfig

   get watchFolder(): vscode.Uri | undefined {
      const folder = this.workspaceConfig.get<string>('watchFolder');
      return folder ? vscode.Uri.file(folder) : undefined;
   }

   set watchFolder(uri: vscode.Uri | undefined) {
      this.workspaceConfig.update('showViewCommand', uri?.fsPath, vscode.ConfigurationTarget.Global);
      this._onDidChangeConfig.fire();
   }

   //#endregion

}

export namespace Config { }
