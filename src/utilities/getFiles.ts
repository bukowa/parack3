import * as vscode from "vscode";

export function getWorkspacePath(context: vscode.ExtensionContext): string {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    return workspaceFolders[0].uri.fsPath;
  } else {
    throw new Error("No workspace folder found");
  }
}
