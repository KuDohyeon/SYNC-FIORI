sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            onInit: function () {

                var oData = {
                    history : [
                        
                    ]
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel,"list");
            },
            
            onRandomPress : function () {
                var Random = Math.floor(Math.random() * 100) + 1;
                this.byId("idInput").setValue(Random);

                var oModel = this.getView().getModel('list');
                var oHistory = oModel.getProperty("/history");
                oHistory.push({key: Random});
                oModel.setProperty("/history", oHistory);



            },

            onOpen : function() {

                this.byId("idDialog").open();
            },

            onClose : function () {
                this.byId("idDialog").close();
            },

            transformDiscontinued : function (sValue) {
              
               if(sValue) { 
                return "Yes" 
               } else {
                return "No"
            };

            }
             
        });
    });
