jQuery.sap.declare("sap.ui.core.Application");
jQuery.sap.require("sap.ui.base.ManagedObject");
jQuery.sap.require("jquery.sap.history");

(function(window, undefined) {
	sap.ui.base.ManagedObject.extend("sap.ui.core.Application", {

		metadata : {
			properties : {
				root : "string",
				homePage : "string"
			}
		},

		constructor : function(oSettings) {
			sap.ui.base.ManagedObject.apply(this, arguments);

			if (this.main) {
				jQuery(jQuery.proxy(this.main, this));
			}

			if (this.onBeforeExit) {
				jQuery(window).on('beforeunload',
						jQuery.proxy(this.onBeforeExit, this));
			}

			if (this.onExit) {
				jQuery(window).on('unload', jQuery.proxy(this.onExit, this));
			}

			if (this.onError) {
				window.onerror = jQuery.proxy(function(sMessage, sFile, iLine) {
					this.onError(sMessage, sFile, iLine);
				}, this);
			}

			var bus = sap.ui.getCore().getEventBus();
			var that = this;
			jQuery.sap.history({
				routes : [ {
					path : "page",
					handler : function(params, navType) {
						// This handler is executed when you navigate back to the history state on the path "page"
						if (!params || !params.id) {
							jQuery.sap.log.error("invalid page parameter: "
									+ params);
						} else {
							if (navType === jQuery.sap.history.NavType.Back) {
								bus.publish("nav", "back", {id: params.id, navType: navType});
							} else {
								bus.publish("nav", "to", {id: params.id, navType: navType});
							}
						}
					}
				} ],
				defaultHandler : function(navType) {
					// The default handler is executed when you navigate back to the history state with an empty hash
					//var defaultPage = that.byId("leaveRequestsPage").getId();
					bus.publish("nav", "back", {id: that.getHomePage(), navType: navType});
					//that.navTo(defaultPage, false, navType);
				}
			});
		}
	});
})(window);