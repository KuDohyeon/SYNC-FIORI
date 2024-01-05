sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button) {
        "use strict";

        return Controller.extend("project0403.controller.Main", {
            onInit: function () {

            }, 

            onClick: function() {
                var oInput = this .getView().byId("idInput");
                //가져온 객체의 정보를 변수에 가져옴 
                
                
                 // 사용자입력값 얻음!

                /*
                1. Input 객체 가져오듯이 Text 객체를 가져온다 (id값)
                2. Text 객체의 setText 메서드를 사용해서 text 속성을 변경(=세팅)한다.
                */
               var oText = this .getView().byId("idText");
               var sValue = oInput.getValue();     //input의 value를 가져옴

               oText.setText(sValue); //text 객체에 세팅 
                                        //sValue에 들어간 정보를 가져옴 
            },

            onClick2: function() {
                var oInput = this .getView().byId("idInput");
                var oText = this .getView().byId("idText");
                oInput.setValue("");
                oText.setText("");

            }

        });
    });
