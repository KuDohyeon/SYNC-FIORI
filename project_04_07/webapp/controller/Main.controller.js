sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("project0407.controller.Main", {
            onInit: function () {

                
                var oData = {
                name : {
                    firstName : 'Hong',
                    lastName : 'Gildong'
                },
                datas: [
                    {name : 'Kim', age : 30, tel : '010-2222-6811'},
                    {name : 'Park', age : 10, tel : '010-3333-1321'},
                    {name : 'Moon', age : 20, tel : '010-5555-8621'}
                ]
            };
            var oModel2 = new JSONModel(oData);
            this.getView().setModel(oModel2, 'test') 

                // var oModel = new JSONModel(oData);
                
                //  oModel2.loadData('../model/test.json', {}, false);     

                //  console.log(oModel2.getData());

              /*view에다 json model 세팅, 이름없는 기본모델 */
                
                //this.getView().setModel(모델객체, "모델이름"); 두번째 부터는 이름있는 모델 
            }


            onClick : function() {



                var oModel = this.getView().getModel("test");
               var data =  oModel.getData();
                var data2 = oModel.getProperty("/name/firstName");

                debugger; 
                // oModel.setData({ name: 'Hong Gildong' }, true );
                // oModel.setProperty("/name/firstName", "Park");
                // var oModel = this.getView().getModel('local');

                // oModel.getData().history;               //전체 가져온 후 history 가져오기
                // oModel.getProperty('/history');         //history 데이터만 가져오기 

                // oModel.setData( { name: 'okok'}, true );
                // //oModel.setData(세팅할 데이터, 합치기 여부)
                // oModel.setProperty( "/name", "okok" );
            }
            



        });
    });
