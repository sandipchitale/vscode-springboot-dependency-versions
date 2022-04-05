import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as child_process from 'child_process';

let workspaceFolder: string;

let APPLY_ADD_SPRING_DEPENDECIES_TASK_DOT_GRADLE = 'gradle/add-spring-dependecies-task.gradle';

let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
    APPLY_ADD_SPRING_DEPENDECIES_TASK_DOT_GRADLE = path.join(context.extensionPath, 'gradle', 'add-spring-dependecies-task.gradle');

    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
    }

    outputChannel = vscode.window.createOutputChannel(context.extension.id.replace('sandipchitale.', ''));

    context.subscriptions.push(vscode.commands.registerCommand('vscode-springboot-dependency-versions.show', springbootDependencies));
}

function springbootDependencies() {
    aprt(APPLY_ADD_SPRING_DEPENDECIES_TASK_DOT_GRADLE, 'springbootDependencies');
}

async function aprt(plugin: string, tasks: string) {
    if (workspaceFolder) {
        const command = `${path.join(workspaceFolder, (os.platform() === 'win32' ? 'gradlew.bat' : 'gradlew'))} --init-script ${plugin} ${tasks}`;
        outputChannel?.appendLine(`cd ${workspaceFolder}`);
        outputChannel?.appendLine(command);
        outputChannel?.appendLine('-');

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Running ${(os.platform() === 'win32' ? 'gradlew.bat' : 'gradlew')} ${tasks}`
        }, (progress, token) => {
            return new Promise((resolve, reject) => {
                child_process.exec(command,
                    {
                        cwd: `${workspaceFolder}`
                    },
                    async (err, stdout, stderr) => {
                        if (err) {
                            vscode.window.showErrorMessage(`${tasks} failed.`);
                            // Open the document
                            const templatePreviewDocument: vscode.TextDocument = await vscode.workspace.openTextDocument({
                                language: 'plaintext',
                                content: `${(os.platform() === 'win32' ? 'gradlew.bat' : 'gradlew')} ${tasks}\n\ncd ${workspaceFolder}\n${command}\n-\n\n${stderr}`
                            });
                            const tdependencyUpdatesTextEditor = await vscode.window.showTextDocument(templatePreviewDocument, vscode.ViewColumn.Active);
                            reject(err);
                        } else {
                            let stdoutArray = stdout.split(/\r?\n/).filter((line) => !(/ SKIPPED$/).test(line));
                            // Delete lines till task of interest starts
                            while (stdoutArray.length > 0) {
                                const line = stdoutArray.shift();
                                if (line?.startsWith('> Task')) {
                                    stdoutArray.unshift(line);
                                    break;
                                }
                            }
                            stdout = stdoutArray.join('\n');
                            // Open the document
                            const templatePreviewDocument: vscode.TextDocument = await vscode.workspace.openTextDocument({
                                language: 'plaintext',
                                content: `${(os.platform() === 'win32' ? 'gradlew.bat' : 'gradlew')} ${tasks}\n\ncd ${workspaceFolder}\n${command}\n-\n\n${stdout}`
                            });
                            const tdependencyUpdatesTextEditor = await vscode.window.showTextDocument(templatePreviewDocument, vscode.ViewColumn.Active);
                            resolve(0);
                        }
                    }
                );
            });
        });
    }
}

export function deactivate() {}
