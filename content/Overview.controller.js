sap.ui.getCore().loadLibrary("openui5.googlemaps", "openui5/googlemaps/");
jQuery.sap.require("content.Formatter");
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller, formatter) {
	"use strict";
	return Controller.extend("content.Overview", {
		formatter: formatter,

		onInit: function() {

			var oModel = new sap.ui.model.odata.ODataModel("models/MAP.xsodata");
			this.getView().setModel(oModel);

			oModel.attachMetadataFailed(function(oEvent) {
				var oParams = oEvent.getParameters();
				this.showServiceError(oParams.response);
			}, this);

			oModel.attachRequestFailed(function(oEvent) {
				var oParams = oEvent.getParameters("message");
				// An entity that was not found in the service is also throwing a 404 error in oData.
				// We already cover this case with a notFound target so we skip it here.
				// A request that cannot be sent to the server is a technical error that we have to handle though
				if (oParams.response.statusCode !== "404" || (oParams.response.statusCode === 404 && oParams.response.responseText.indexOf(
					"Cannot POST") === 0)) {
					this.showServiceError(oParams.response);
				}
			}, this);
		},

		/**
		 * Shows a {@link sap.m.MessageBox} when a service call has failed.
		 * Only the first error message will be display.
		 * @param {string} sDetails a technical error to be displayed on request
		 * @private
		 */
		showServiceError: function(sDetails) {
			var dialog = new sap.m.Dialog({
				title: 'Error',
				type: 'Message',
				state: 'Error',
				content: new sap.m.Text({
					text: sDetails.statusText
				}),
				beginButton: new sap.m.Button({
					text: 'OK',
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		}
	});
});