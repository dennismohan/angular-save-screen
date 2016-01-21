# angular-save-screen
An angular directive that listens for click events. on click it will launch a overlay with a loading icon.

The saving screen directive currently depends on JQuery as well as Bootstrap. I plan on creating the following flavors of the directive:angular material, material design lite, and sometime in the future a style independent (icons and button styles will be part set as attributes). As well as removing the JQuery dependency.

<h2 style="margin-top:10px">Directions</h2>
<hr/>

To use, import the provided JS file into your HTML page and Inject the BW.LoadingScreen into the module where you plan on the directive.

The directive accepts a js object for its status attribute with the following 2 properties { message: 'this message is always displayed on screen', isSuccess: true/false}

This js object will control the overlay. The message property will always be displayed on the page, while the isSuccess controls the behaviour with the following states.

isSuccess is undefined;
	Overlay will display a loading icon and message property. This is the scenario where your executing a callout or saving and need the user to wait.

isSuccess is true;
	Overlay will display a check mark and message property, as well as hide after 1.5 seconds. This is the scenario where your saving is successful.

isSuccess is false
	Overlay will display a 'X' button and message property, it will also provide the user a continue button to close the dialog. This is the scenario where your saving failed and you want to prompt the user with a error message.

Currently one further requirement exists, the DOM Element which you want blurred must have the following class 'event-login-container' for the blur effect to work. The blur effect is added using jQuery when the directive is clicked.

Example of use:

<button bw-saving-screen status="statusObjectInController">Click to Save!</button>


I plan on adding some sample code to display how it is used, however this will be done at a later time. Feel free to request it if needed and I will try to make some time.