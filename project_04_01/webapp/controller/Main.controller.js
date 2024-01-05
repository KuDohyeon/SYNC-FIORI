sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/m/Button",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button, JSONModel) {
        "use strict";

        return Controller.extend("project0401.controller.Main", {
            onInit: function () {
                
                var oData = {
                    datas: [ 
                        { key: "plus", text:"+" },
                        { key: "minus", text:"-"},
                        { key: "multiply", text:"*" },
                        { key: "divide", text:"/"}
                    
                    ]
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, 'test') ;
                //new Button 
                //초기화 함수
                //초기값 설정, 화면에서 사용할 모델 생성
                //아래 함수들이 사용할 공통 변수  
            }, 
            
            // onBeforeRendering : function() 
            // onAfterRendering : function()
            // onExit : function()
    

            onClick: function () {
                // view에 있는 input 객체를 가져온다 
                // input 2개와 select를 불러와서 숫자 2개와 연산자를 얻을 수 있도록 함, getview는 생략 가능 
                var sInput1 = this .getView().byId("idInput").getValue();
                var sInput2 = this .getView().byId("idInput2").getValue();
                var oSelect = this.byId("idSelect");

                // item을 가져옴 
                var sOperator = oSelect.getSelectedItem().getText();
                var nResult = 0;
                // 조건문. switch-case : 범위값이 아닐 때 사용 
                switch(sOperator) {
                    case "+": 
                    nResult = Number(sInput1) + Number(sInput2);
                        break;

                    case "-":
                        nResult = Number(sInput1) - Number(sInput2);
                        break;
                    case "*":
                        nResult = Number(sInput1) * Number(sInput2);
                        break;
                     case "/":
                        nResult = Number(sInput1) / Number(sInput2);
                         break;

                    default:
                        break;

                        
                }
                //alert(nResult);
                sap.m.MessageToast.show(nResult);
                // 잠깐 떴다가 사라짐 

                //this : Controller
                //.getView : Controller에 있는 메서드
                // byId() : View에 있는 메서드 
            
                

                // var sValue1 = Number(this.byID("idInput").getValue()); 
                // var sValue2 = Number(this.byID("inInput2").getValue());
                // var sOperator = this.byID("idSelect").getSelectedItem().getText();

            
               
            }
        });
    });
