sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("project0406.controller.Main", {
            onInit: function () {

            },

            // HelloFrag.fragment.xml 안에 있는 버튼 Press 이벤트 
            HelloButtonPress: function() {
                sap.m.MessageToast.show("Hello~~~")
            },

            // onOpenDialog: function() {
            //     this.byId("idDialog").open();
            // }, 

            // onClose: function(){
            //     sap.ui.getCore().byId("idDialog").close();
            // },
// controller 내에서 Dialog fragment 호출하기 
            // onOpenDialog_con: function() 

            //     var dialog = sap.ui.getCore().byId("idDialog");
            //     //만약 dialog 변수에 값이 있으면 dialog.open() 하면 되고
            //     // dialog 변수에 값이 없으면 load 메서드를 실행한다.    (조건문 if문을 사용하여 파일을 1번만 load 할 수 있도록 함)
                
            //     if ( dialog==true ) { 

                    

            //         dialog.open();
            //     } else {

            //     Fragment.load({
            //         name : "project0406.view.Fragment.Dialog",    호출하려는 Fragment의 경로 
            //         type : "XML",                                 디폴트 값, 생략가능 
            //         controller : this                             
            //     }).then(function(oDialog) {                      불러온 객체를 then를 자동으로 타서 open이 됨 
            //         oDialog.open();
            //     });
            //     }
            // }

            onOpenDialog: function() {
                this.byId("idDialog2").open();
            }, 

            onClose: function(){
                this.byId("idDialog2").close();
            },


        });
    });
