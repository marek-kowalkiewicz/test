jQuery.sap.declare("mynewproject.util.Types");

mynewproject.util.Types = function() {
};

mynewproject.util.Types.DATE = new sap.ui.model.type.Date({
	pattern : "yyyy-MM-dd"
});

mynewproject.util.Types.DATE_FULL = new sap.ui.model.type.Date({
	source : {
		pattern : "yyyy-MM-dd"
	},
	pattern : "EEE dd MMM. yyyy"
});