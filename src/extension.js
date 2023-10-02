const vscode = require('vscode');

const Snippet = require('./Snippet');
const SnippetsManager = require('./SnippetsManager');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('extension.createSnippet', function () {

		let editor = vscode.window.activeTextEditor;
		let selection = editor.selection;
		var selectedText = editor.document.getText(selection);

		if (!editor || selection.isEmpty) {
			vscode.window.showWarningMessage('Cannot create snippet from empty string. Select some text first.');
			return;
		}

		var snippet = new Snippet();
		var snippetsManager = new SnippetsManager();

		vscode.languages.getLanguages()
			.then(vsCodeLangs => {
				let placeHolder = `Probably '${vscode.window.activeTextEditor.document.languageId}' (Use ▴ or ▾ to choose, or type language name - do not just hit enter immediately)`
				return vscode.window.showQuickPick(vsCodeLangs, { placeHolder: placeHolder });
			})
			.then(language => {
				snippet.language = language;
				// vscode.window.showInformationMessage(`Language chosen '${language}'`)
				return vscode.window.showInputBox({ prompt: `Enter snippet name for inclusion in '${language}.json' snippets file, spaces allowed)` });
			})
			.then(name => {
				if (name === undefined) {
					return;
				}
				snippet.name = name;
				return vscode.window.showInputBox({ prompt: 'Enter snippet prefix (phrase that triggers) - leave blank to auto-use snippet name' });
			})
			.then(prefix => {
				if (prefix === undefined) {
					return;
				}
				snippet.prefix = prefix;
				return vscode.window.showInputBox({ prompt: 'Enter snippet description - leave blank to auto-use snippet name' });
			})
			.then(description => {
				if (description === undefined) {
					return;
				}
				snippet.description = description;
			})
			.then(() => {
				snippet.body = selectedText;

				snippetsManager.addSnippet(snippet, context);
			});

	});

	context.subscriptions.push(disposable);
}

// exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
