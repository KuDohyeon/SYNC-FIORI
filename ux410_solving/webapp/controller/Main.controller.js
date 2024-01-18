sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/json/JSONModel'
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {
                var oData = {
                    type : [
                        { key : 'bar'},
                        { key : 'column'},
                        { key : 'line'},
                        { key : 'donut'}
                    ]
                }

                this.getView().setModel(new JSONModel(oData), "typeList");
                

            },

            onSearch: function () {
                var sOrderID = this.byId("idComboBox").getSelectedKey();
                var sType = this.byId("idComboBox2").getSelectedKey();

                //type값이 있을 때 (column, bar,, etc)
                if(sType){
                    this.byId("idComboBox2").setValueState('None');
                    this.byId("idLineChart").setVizType(sType);
                    var aFilter = [];

                    if(sOrderID) {
                        aFilter.push(
                            new Filter({
                                path : 'OrderID',      
                                operator : FilterOperator.EQ, 
                                value1 :sOrderID  
                                    
                            })

                        );
                        
                    }

                    if(aFilter.length>0){
                        this.byId("idViz").getBinding("data").filter(aFilter);
                    }else {
                        this.byId("idViz").getBinding("data").filter();
                    }
                    //type값이 비었을 때(니가 combo박스2번 값을 지움)
                }else{
                    //type값이 비면 콤보박스의 input박스? 상태를 에러 상태롤 바꿈
                    this.byId("idComboBox2").setValueState('Error');
                    this.byId("idComboBox2").setValueStateText('Invaild Entry');
                }

                
                
              
              
          },
        });
    });
