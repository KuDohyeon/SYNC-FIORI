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

        // 클로저 변수 (편하게 전역 변수라고 부름)
        // var TEST = "okok";c

        return Controller.extend("project0401.controller.Main", {
            onInit: function () {
                
                var oData = {
                  title : {
                    subTitle : 'Calculator Program'
                  },
                  
                    datas: [ 
                        { key: "plus", text:"+" },
                        { key: "minus", text:"-"},
                        { key: "multiply", text:"*" },
                        { key: "divide", text:"/"}
                        
                    
                    ]
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, 'test');
                
                // this.byId("idTitle").bindElement();
                // 이름 없는 기본모델의 경우, 경로만 작성해주면 된다.

                //이름이 있는 모델의 경우, 경로 및 이름을 객체 형태로 전달한다.
                // this.byId("idTitle").bindElement({
                //  path: 'title',
                //  model : 'main1'
                //})




                //new Button 
                //초기화 함수
                //초기값 설정, 화면에서 사용할 모델 생성
                //아래 함수들이 사용할 공통 변수  \

                var oBinding = {
                    history: [
                        { num1 : "1" , oper : "+" , num2 : "1" , result : "2"} 
                    ]

                };
                var oModel2 = new JSONModel(oBinding);
                this.getView().setModel(oModel2, 'local');


            }, 

            fnColorFormat : function(sValue){
                if(sValue) {
                    if(sValue > 100) {
                        return '#47C83E';
                    } else {
                        return '#FF5E00';
                    }
                }

            },
            
            // onBeforeRendering : function() 
            // onAfterRendering : function()
            // onExit : function()
    

            onClick: function () {
                // view에 있는 input 객체를 가져온다 
                // input 2개와 select를 불러와서 숫자 2개와 연산자를 얻을 수 있도록 함, getview는 생략 가능 
                var sInput1 = this.getView().byId("idInput1").getValue();
                var sInput2 = this.getView().byId("idInput2").getValue();
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


                var oModel2 = this.getView().getModel('local');
                var oHistory = oModel2.getProperty("/history");
                oHistory.push({ num1 : sInput1 , oper : sOperator , num2 : sInput2 ,result : nResult} );
                oModel2.setProperty("/history", oHistory);

                // 잠깐 떴다가 사라짐 

                //this : Controller
                //.getView : Controller에 있는 메서드
                // byId() : View에 있는 메서드 
            
                

                // var sValue1 = Number(this.byID("idInput").getValue()); 
                // var sValue2 = Number(this.byID("inInput2").getValue());
                // var sOperator = this.byID("idSelect").getSelectedItem().getText();

            
               
            },

            // onCalc:function() {

            //     var sInput1 = this.byId("idInput1").getVaule();
            //     var sInput2 = this.byId("idInput2").getValue();
            //     var oSelect = this.byId("idSelect");
            //     var oModel = this.getView().getModel('local');



            //     oModel.getData().history;               //전체 가져온 후 history 가져오기
            //    // oModel.getProperty('/history');         //history 데이터만 가져오기 

               // oModel.setData( { name: 'okok'}, true );
                //oModel.setData(세팅할 데이터, 합치기 여부)
                //oModel.setProperty( "/name", "okok" );
                //oModel.setProperty(대상경로, 값)
                

            



        });
    });
