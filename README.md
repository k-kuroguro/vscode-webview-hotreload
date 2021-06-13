# vscode-webview-hotreload
VSCode extension for enabling hot reload when coding webview.

![demo](./demo.gif)

# How to use
1. Set environment variable `IS_EXTENSION_DEBUGGING` as `true` to extension's `launch.json` wanted to use hot reload.
```diff
      {
         "name": "Run Extension",
         "type": "extensionHost",
         "request": "launch",
         "args": [
            "--extensionDevelopmentPath=${workspacIS_EXTENSION_DEBUGGINGeFolder}"
         ],
         "outFiles": [
            "${workspaceFolder}/dist/**/*.js"
         ],
         "preLaunchTask": "${defaultBuildTask}",
+         "env": {
+            "IS_EXTENSION_DEBUGGING": "true"
+         }
      },
```
2. Set folder of webview code as `vscode-webview-hotreload.watchFolder`.
   (ex. `"vscode-webview-hotreload.watchFolder": "c:\\Users\\81701\\Desktop\\vscode-webview-svelte-sample\\dist"`)

3. Start debug session and active webview.
4. If you changed webview code, webview will reload.
