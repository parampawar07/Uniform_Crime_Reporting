sap.ui.controller("content.FileUpload", {
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	  onInit: function() {
	      	var dialog = new sap.m.Dialog({
			title: 'Information',
			type: 'Message',
			content: new sap.m.Text({
				text: 'Please upload files in CSV format'
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
	
	   },
	doFileLoadComplete: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
	},
	doFileUpload2: function(oEvent) {
		var fileLoader = sap.ui.getCore().byId("FileLoader");
		var uploadUrl;
		var fileName = fileLoader.getValue();
		var selectedRadio = $('input[name=rbg]:checked').val();

		if(selectedRadio === 'property'){
		    //create xsjs specific to property crime table
			     uploadUrl = "https://h02-d03.ucc.ovgu.de/gbi-student-006/UCR/content/PropertyCrime.xsjs?file_name=" + fileName;
			}else 	if(selectedRadio === 'violent'){
			//create xsjs specific to violent crime table
			     uploadUrl = "https://h02-d03.ucc.ovgu.de/gbi-student-006/UCR/content/ViolentCrime.xsjs?file_name=" + fileName;
			}
		jQuery.sap.require("sap.ui.commons.MessageBox");
		if (fileName === "") {
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			var formEle = jQuery.sap.domById("FileLoader");
			var form = $(formEle).find("form")[0];
			var fd = new FormData(form);
			
			$.ajax({
				url: uploadUrl,
				type: "GET",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
				},
				success: function(data, textStatus, XMLHttpRequest) {
					var token = XMLHttpRequest.getResponseHeader('X-CSRF-Token');
					$.ajax({
						url: uploadUrl,
						type: "POST",
						processData: false,
						contentType: false,
						data: fd,
						beforeSend: function(xhr) {
							xhr.setRequestHeader("X-CSRF-Token", token);
						},
						success: function(data, textStatus, XMLHttpRequest) {
							var resptext = XMLHttpRequest.responseText;
							jQuery.sap.require("sap.ui.commons.MessageBox");
							sap.ui.commons.MessageBox.show(resptext, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
							sap.ui.getCore().byId("CRIME_MASTER").getModel().refresh();
						},
						error: function(data, textStatus, XMLHttpRequest) {
							sap.ui.commons.MessageBox.show("File could not be uploaded.", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
						}

					});
				}
			});
		}
	}
});