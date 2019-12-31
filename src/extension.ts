// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "backbreaker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.startCodingSession', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		var dateNow = new Date();
		var hoursNow = dateNow.getHours();
		var minutesNow =  dateNow.getMinutes();

		console.log("Coding Session started at: " + hoursNow.toString() + ":" + minutesNow.toString());
		vscode.window.showInformationMessage("Coding Session started at: " + hoursNow.toString() + ":" + minutesNow.toString());

		var minuteInterv = 0.5;		// Change this value later
		var myTimer = setInterval(()=>{
			var newDate = new Date();
			var newHours = newDate.getHours();
			var newMinutes = newDate.getMinutes();

			// console.log("Time Now : " + newHours.toString() + ":" + newMinutes.toString() +"\n" + "You should take a brake");
			// vscode.window.showInformationMessage("Time Now : " + newHours.toString() + ":" + newMinutes.toString() + "\n" + "You should take a brake");
			vscode.window.showInformationMessage("You've been coding for: " +  minuteInterv + " minutes. You should take a break");
		}, 1000*60*minuteInterv);

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
