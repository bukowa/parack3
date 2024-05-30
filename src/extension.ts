import * as vscode from "vscode";
import { commands, ExtensionContext } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showHelloWorldCommand = commands.registerCommand("hello-world.showHelloWorld", () => {
    HelloWorldPanel.render(context);
  });

  // Add command to the extension context
  context.subscriptions.push(showHelloWorldCommand);

  // Add example message passing
  context.subscriptions.push(
    vscode.commands.registerCommand("hello-world.postMessage", () => {

      if (!HelloWorldPanel.currentPanel) {
        return;
      }

      HelloWorldPanel.currentPanel._panel.webview.postMessage({ command: "alert", text: "Hello from VS Code!" });
    }),
  );
  vscode.window.showInformationMessage("activated");
}

