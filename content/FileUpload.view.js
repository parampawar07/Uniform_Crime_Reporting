sap.ui.jsview("content.FileUpload", {
    getControllerName: function () {
        return "content.FileUpload";
    },
    createContent: function (oController) {
        jQuery.sap.require("jquery.sap.resources");
        var oPanel = new sap.ui.commons.Panel("Panel",
            {
                text: "File Upload",
                height: "500px"
            });
        var oSplitter = new sap.ui.commons.Splitter("ScreenSplitter", 
            { splitterOrientation: "Horizontal" });
        var oVertLayout = new sap.ui.commons.layout.VerticalLayout("VertLayout");
        oSplitter.addFirstPaneContent(oVertLayout);
        oPanel.addContent(oSplitter);
        
        var oRadioButton = new sap.ui.commons.RadioButtonGroup("rbg",{
			tooltip : "Choose the Crime Type"
            
        });
		
		var oItem1 = new sap.ui.core.Item({
			text : "Violent",
			key : "violent"});
				
		var oItem2 = new sap.ui.core.Item({
			text : "Property",
			key : "property"});
	
		
		oRadioButton.addItem(oItem1).addItem(oItem2);
 
        oVertLayout.addContent(oRadioButton);
   
        /*************************************************************************
         * File Uploader Browse
         *************************************************************************/
        var oFLTxt = new sap.ui.commons.TextView("FileLoaderText", { text: "Please choose file for upload." });
        oVertLayout.addContent(oFLTxt);
        var oFileUploader = new sap.ui.commons.FileUploader("FileLoader");
        oFileUploader.attachUploadComplete(oController.doFileLoadComplete);
        oVertLayout.addContent(oFileUploader);
        /*************************************************************************
         * Upload button
         *************************************************************************/
        //To address cross-site request forgery security concern

        var oButton2 = new sap.m.Button({
            id: this.createId("UploadButton2"),
            text: "Upload",
			type: sap.m.ButtonType.Accept
        });
        
        oButton2.attachPress(oController.doFileUpload2);
        oVertLayout.addContent(oButton2);
        //To address cross-site request forgery security concern
        var oButton3 = new sap.m.Button({
            id: this.createId("cancleButton"),
            text: "Cancel",
             type: sap.m.ButtonType.Reject
        });
        oButton3.attachPress(oController.doFileCancel);
        oVertLayout.addContent(oButton3);

     /*************************************************************************
          * Batch table
          *************************************************************************/
        // var oModel = new sap.ui.model.odata.ODataModel("MY_FILE_UPLOAD_TABLE.xsodata");
        // var oControl;
        // var oTable = new sap.ui.table.Table("VIOLENT_CRIME_MASTER", { tableId: "VIOLENT_CRIME_MASTER_TABLE", visibleRowCount: 10 });
        // console.log(oTable);
        // oControl = new sap.ui.commons.TextField().bindProperty("value", "YEAR");
        // oTable.addColumn(new sap.ui.table.Column({
        //     label: new sap.ui.commons.Label({ text: "YEAR" }),
        //     template: oControl,
        //     sortProperty: "YEAR",
        //     filterProperty: "YEAR"
        // }));
        // oControl = new sap.ui.commons.TextField().bindProperty("value", "POPULATION");
        // oTable.addColumn(new sap.ui.table.Column({
        //     label: new sap.ui.commons.Label({ text: "POPULATION" }),
        //     template: oControl,
        //     sortProperty: "POPULATION",
        //     filterProperty: "POPULATION"
        // }));
        // oControl = new sap.ui.commons.TextField().bindProperty("value", "VIOLENT_CRM_TTL");
        // oTable.addColumn(new sap.ui.table.Column({
        //     label: new sap.ui.commons.Label({ text: "VIOLENT_CRM_TTL" }),
        //     template: oControl,
        //     sortProperty: "VIOLENT_CRM_TTL",
        //     filterProperty: "VIOLENT_CRM_TTL"
        // }));
        // oControl = new sap.ui.commons.TextField().bindProperty("value", "MURDR_N0NNEGLT_MANSLTR");
        // oTable.addColumn(new sap.ui.table.Column({
        //     label: new sap.ui.commons.Label({ text: "MURDR_N0NNEGLT_MANSLTR" }),
        //     template: oControl,
        //     sortProperty: "MURDR_N0NNEGLT_MANSLTR",
        //     filterProperty: "MURDR_N0NNEGLT_MANSLTR"
        // }));
        // oControl = new sap.ui.commons.TextField().bindProperty("value", "LEG_RAPE");
        // oTable.addColumn(new sap.ui.table.Column({
        //     label: new sap.ui.commons.Label({ text: "LEG_RAPE" }),
        //     template: oControl,
        //     sortProperty: "LEG_RAPE",
        //     filterProperty: "LEG_RAPE"
        // }));
        // oControl = new sap.ui.commons.TextField().bindProperty("value", "RVSD_RAPE");
        // oTable.addColumn(new sap.ui.table.Column({
        //     label: new sap.ui.commons.Label({ text: "RVSD_RAPE" }),
        //     template: oControl,
        //     sortProperty: "RVSD_RAPE",
        //     filterProperty: "RVSD_RAPE"
        // }));
        // oControl = new sap.ui.commons.TextField().bindProperty("value", "RBRY");
        // oTable.addColumn(new sap.ui.table.Column({
        //     label: new sap.ui.commons.Label({ text: "RBRY" }),
        //     template: oControl,
        //     sortProperty: "RBRY",
        //     filterProperty: "RBRY"
        // }));
        // oControl = new sap.ui.commons.TextField().bindProperty("value", "AGRVTD_ASLT");
        // oTable.addColumn(new sap.ui.table.Column({
        //     label: new sap.ui.commons.Label({ text: "AGRVTD_ASLT" }),
        //     template: oControl,
        //     sortProperty: "AGRVTD_ASLT",
        //     filterProperty: "AGRVTD_ASLT"
        // }));
        // oTable.setModel(oModel);
        // oTable.bindRows("/File_Upload_Table");
        // oSplitter.addSecondPaneContent(oTable);
        return oPanel;
    }
});