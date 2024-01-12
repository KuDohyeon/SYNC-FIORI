sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("odata.project0409.controller.Main", {
            onInit: function () {

                this.oRouter = this.getOwnerComponent().getRouter()
                var oData = {
                    OrderID : '',
                    CustomerID : '',
                    OrderDate_start : null,
                    OrderDate_finish : null
                }

                this.getView().setModel(new JSONModel(oData), 'search');
            },

            fnDateToString: function (sValue) {
                if(sValue) {
                    var result;
                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern : 'yyyy-MM-dd'
                    });
                    result = oFormat.format(sValue); 
                    return result;
                }
            },

            onValueHelpRequest: function (){
                this.byId("idCustomer").open();
                
            },

            onClose : function () {
                this.byId("idCustomer").close();
            },

            

            
             onSearch: function() {
                // var sOrderID = this.byId("idOrderID").getValue();
                // var sCustomerID = this.byId("idCustomerID").getValue();

                // var sStartDate = this.byId("idOrderDate").getDateValue();
                // var sFinishDate = this.byId("idOrderDate").getSecondDateValue();

                var oSearchData = this.getView().getModel('search').getData();
                // oSearchData { OrderID : '', CustomerID : '', OrderDate_start : '', OrderDate_finish : '' }
                var aFilter = [];

                debugger;

                if(oSearchData.OrderID) {
                    aFilter.push(
                        new Filter({
                            path : 'OrderID',      // 대상 필드명
                            operator : FilterOperator.EQ,  // 연산자(조건)
                            value1 : oSearchData.OrderID,    // 값 (BT의 경우 From)
                            value2 : ''     // (BT의 경우 To)
                        })

                    );
                    
                }

                if(oSearchData.CustomerID) {
                    aFilter.push(
                        new Filter({
                            path : 'CustomerID',      
                            operator : FilterOperator.Contains,  
                            value1 : oSearchData.CustomerID,    
                            value2 : ''     
                        })

                    );
                }

              

                if(oSearchData.OrderDate_start && oSearchData.OrderDAte_finish) {
                    aFilter.push(
                        new Filter({
                            path : 'OrderDateID',
                            operator : FilterOperator. BT,
                            value1 : oSearchData.OrderDate_start,
                            value2 : oSearchData.OrderDAte_finish
                        })
                    )

                }

                this.byId("idTable").getBinding("items").filter(aFilter);

                
            },

            // // Filters 사용 시 
            //     var sOrderID = this.byId("idOrderID").getValue();
            //     var sCustomerID = this.byId("idCustomerID").getValue();
            //     var aFilter = [];

            //     var oFilter = new Filter ({
            //         filters : [
            //             new Filter('OrderID', 'EQ', sOrderID),
            //             new Filter('CustomerID', 'Contains', sCustomerID)
            //         ],
            //         and : false  //OR 조건이 됨 
            //     });
            //     this.byId("idTable").getBinding("items").filter(oFilter);
                
            // filters 쓸 때 주의
            // aFilter 배열에 필터 객체가 1개 이상인 경우만 적용하고,
            // 필터 객체가 없는 빈 배열이면 적용하지 않기


            onSelectionChange : function(oEvent) {

                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                // 모델 경로를 통해서, 해당 경로의 전체 데이터를 얻음 
                var oSelectData = this.getView().getModel().getProperty(sPath);

                //alert(oSelectData.ShipName);

                //Dialog 호출
                //local이름의 JSONModel이 전역으로 사용할 수 있도록 생성되어 있음
                //local 모델에 데이터를 담아놓으면 Dialog에서도 사용이 가능함 

                //주의) Fragment.load() 를 통해서 팝업 호출 시 
                // 해당 팝업에 모델 데이터를 띄우기 위해서는 
                // 호출된 Dialog에 .setModel(모델객체) 해줘야 함 

                this.oRouter.navTo('RouteDetail', {
                    OrderID : oSelectData.OrderID
                    
                }, true);
            },

            

        });
    });
