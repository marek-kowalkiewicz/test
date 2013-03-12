jQuery.sap.require("mynewproject.component.hr.detailslist.control.ListRepeater");
jQuery.sap.require("mynewproject.component.hr.detailslist.control.StateImage");
jQuery.sap.require("mynewproject.util.Types");

sap.ui.controller("mynewproject.component.hr.detailslist.view.DetailsList", {

	onInit : function() {
		var oRepeater = this.byId("pageDetailsListRepeater");
		var oRepeaterListTemplate = oRepeater.getBindingInfo("lists").template;

		oRepeaterListTemplate.getItems()[0].bindProperty("value", {
			path : "from",
			type : mynewproject.util.Types.DATE_FULL
		});

		oRepeaterListTemplate.getItems()[1].bindProperty("value",{
			path : "to",
			type : mynewproject.util.Types.DATE_FULL
		});

		oRepeater.bindAggregation("lists", {path: "items", template:oRepeaterListTemplate, sorter: new sap.ui.model.Sorter("from", true)});
	}

});