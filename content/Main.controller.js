sap.ui.controller("content.Main", { // controller logic goes here

	onInit: function() {
		// this function is called when the view is instantiated.
		// Used to modify the view before displaying
		var shell = this.getView().byId("shell");
		// if there is not content displayed,
		// show the page of the first navigation item
		if (shell.getContent().length === 0) {
			// first, we need to check if there any workitems
			// defined, otherwise we cannot load anything
			var worksetItems = shell.getWorksetItems();
			if (worksetItems.length > 0) {
				// this line is doing the same thing
				// as our "normal" navigation
				shell.setContent(
					this.getContent(worksetItems[0].getKey())
				);
			}
		}
	},
	onExit: function() {
		// this function is called when the view is destroyed.
		// Used for clean-up activities
	},
	onAfterRendering: function() {
		// this function is called when the view has been rendered.
		// Used for post-rendering manipulation of the HTML code
	},
	onBeforeRendering: function() {
		// this function is called before the view is re-rendered // (not before first rendering)
	},
	itemSelected: function(oEvent) {
		// first, we have to get the key of the selected navigation item
		var itemKey = oEvent.getParameter("key");
		// next, we need to get the shell to be able to manipulate it
		var oShell = oEvent.oSource;
		// next, we have to get the right page (content) for the key.
		// For convenience reasons, this is done in a different function
		var content = this.getContent(itemKey);
		// last, we put the content that we retrieved to the content
		// section of the shell. the first argument for the function is
		// the content, the second one defines if we want to destroy old // content (if present) before adding the new content 
		oShell.setContent(content, true);
	},
	// this functions gets the correct page and creates the view
	getContent: function(key) {
		var content = null;
		// because the application will have several pages,
		// we use the switch-case contruct to check the key
		switch (key) {
			case "overview":
				// when the navigation item "overview" is selected,
				// we return the respective view
				content = sap.ui.view({
					// location and name of the view
					viewName: "content.Overview",
					// type of the view, i.e. XML, JavaScript, JSON...
					type: sap.ui.core.mvc.ViewType.XML
				});
				break;
			case "crimeDetails":
				// when the navigation item "salesOrders" is selected,
				// we return the respective view
				content = sap.ui.view({
					// location and name of the view
					viewName: "content.CrimeDetails",
					// type of the view, i.e. XML, JavaScript, JSON...
					type: sap.ui.core.mvc.ViewType.XML
				});
				break;
			case "violentCrimeDetails":
				// when the navigation item "salesOrders" is selected,
				// we return the respective view
				content = sap.ui.view({
					// location and name of the view
					viewName: "content.ViolentCrimeDetails",
					// type of the view, i.e. XML, JavaScript, JSON...
					type: sap.ui.core.mvc.ViewType.XML
				});
				break;
			case "propertyCrimeDetails":
				// when the navigation item "salesOrders" is selected,
				// we return the respective view
				content = sap.ui.view({
					// location and name of the view
					viewName: "content.PropertyCrimeDetails",
					// type of the view, i.e. XML, JavaScript, JSON...
					type: sap.ui.core.mvc.ViewType.XML
				});
				break;
					case "upload":
				content = sap.ui.view({
					// location and name of the view
					viewName: "content.FileUpload",
					// type of the view, i.e. XML, JavaScript, JSON...
					type: sap.ui.core.mvc.ViewType.JS
				});
				break;
			default:
				content = null;
				break;
		}
		return content;
	}
});