// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "backbreaker" is now active!');

	var isStarted = false;
	var myTimer: NodeJS.Timeout;
	var isPaused = false;
	var minuteInterv = 50;		// Change this value later (default value = 50)

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	// START CODING SESSION
	let disposableStart = vscode.commands.registerCommand('extension.startCodingSession', () => {
		// The code you place here will be executed every time your command is executed

		// if the session has been already started
		if (isStarted == true) {
			console.log("You've already started the session");
			vscode.window.showErrorMessage("You've already started the session");
		} else {
			// set isStarted as true to indicate the session has started
			isStarted = true;

			var dateNow = new Date();
			var hoursNow = dateNow.getHours();
			var minutesNow = dateNow.getMinutes();

			console.log("Coding Session started at: " + hoursNow.toString() + ":" + minutesNow.toString());
			vscode.window.showInformationMessage("Coding Session started at: " + hoursNow.toString() + ":" + minutesNow.toString());

			var intervCounter = 1;		// Intervals Counter

			myTimer = setInterval(() => {
				console.log("You've been coding for: " + (minuteInterv * intervCounter) + " minutes straight. You should take a break");
				vscode.window.showInformationMessage("You've been coding for: " + (minuteInterv * intervCounter) + " minutes straight. You should take a break");
				intervCounter++;
			}, 1000 * 60 * minuteInterv);
		}

	});

	// STOP CODING SESSION
	let disposableStop = vscode.commands.registerCommand('extension.stopCodingSession', () => {
		if (isStarted == false) {
			console.log("There is no session to stop");
			vscode.window.showErrorMessage("There is no session to stop");
		}
		else {
			// set isStarted to false to indicate that the session has stopped
			isStarted = false;
			// clear timer
			clearInterval(myTimer);

			var dateNow = new Date();
			var hoursNow = dateNow.getHours();
			var minutesNow = dateNow.getMinutes();

			console.log("Coding Session stopped at: " + hoursNow.toString() + ":" + minutesNow.toString());
			vscode.window.showInformationMessage("Coding Session stopped at: " + hoursNow.toString() + ":" + minutesNow.toString());
		}
	});

	// START BREAK
	let disposableBreak = vscode.commands.registerCommand('extension.startBreak', () => {
		// clear timer ?
		// log it	?
		if (isStarted == false) {
			console.log("There is no active session, cannot take a break");
			vscode.window.showErrorMessage("There is no active session, cannot take a break");
		}
		else {

			// set isPaused to true to indicate that the session is paused
			isPaused = true;

			var dateNow = new Date();
			var hoursNow = dateNow.getHours();
			var minutesNow = dateNow.getMinutes();

			console.log("Break started at: " + hoursNow.toString() + ":" + minutesNow.toString());
			vscode.window.showInformationMessage("Break started at: " + hoursNow.toString() + ":" + minutesNow.toString());

			clearInterval(myTimer);
		}
	});

	// RESUME CODING SESSION
	let disposableResume = vscode.commands.registerCommand('extension.resumeCodingSession', () => {

		if (isStarted == false) {
			console.log("There is no active session, cannot resume from break");
			vscode.window.showErrorMessage("There is no active session, cannot resume from break");
		} else if (isPaused == false) {
			console.log("There is no break active");
			vscode.window.showErrorMessage("There is no break active");
		} else {

			// set isPaused to true to indicate that the session is paused
			isPaused = false;

			var dateNow = new Date();
			var hoursNow = dateNow.getHours();
			var minutesNow = dateNow.getMinutes();

			console.log("Coding Session Resumed at: " + hoursNow.toString() + ":" + minutesNow.toString());
			vscode.window.showInformationMessage("Coding Session Resumed at: " + hoursNow.toString() + ":" + minutesNow.toString());

			var intervCounter = 1;		// Intervals Counter

			myTimer = setInterval(() => {
				console.log("You've been coding for: " + (minuteInterv * intervCounter) + " minutes straight. You should take a break");
				vscode.window.showInformationMessage("You've been coding for: " + (minuteInterv * intervCounter) + " minutes straight. You should take a break");
				intervCounter++;
			}, 1000 * 60 * minuteInterv);
		}
	});

	context.subscriptions.push(disposableStart);
	context.subscriptions.push(disposableStop);
	context.subscriptions.push(disposableBreak);
	context.subscriptions.push(disposableResume);
}

// this method is called when your extension is deactivated
export function deactivate() { }
