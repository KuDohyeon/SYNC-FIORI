sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("odata.project0413.controller.Main", {
            onInit: function () {

                var oData = {
                    "Productno" : "",
                    "Productname" : "",
                    "Fname" : "",
                    "Lname" : "",
                    "Memo" : ""
                }
                
                //Input value에다가 Binding 하기 => {data>/Productno}

                this.getView().setModel(new JSONModel(oData),"data");
            },

            onRowSelectionChange: function (oEvent) {
                var sPath = oEvent.getParameter('rowContext').getPath();
                // 모델 경로를 통해서, 해당 경로의 전체 데이터를 얻음 
                var oSelectData = this.getView().getModel().getProperty(sPath);
                
                
                var oModel = this.getView().getModel("data");

                oModel.setData(
                    {
                    "Productno" : oSelectData.Productno,
                    "Productname" : oSelectData.Productname,
                    "Fname" : oSelectData.Fname,
                    "Lname" : oSelectData.Lname,
                    "Memo" : oSelectData.Memo
                    }
                );

                
                 


                //debugger로 모델 데이터를 가져와서 각각의 Input에 세팅할 수 있음.
                //이 때 세티하는 방법은 id 말고, JSON Model로 해보기
                //JSON Model의 이름은 'data'로 

            },

            onReset: function () {
                var oModel = this.getView().getModel("data");

                oModel.setData();
                this.getView().getModel().refresh(true);

            },


            onEntitySet: function () {
                // 전체 조회 구현
                // GET 요청 : "/Products"
                var oDataModel = this.getView().getModel();

                oDataModel.read("/Products", {
                    filters : [/*필터객체배열*/],
                    success: function (oReturn) {
                        console.log("전체조회: ", oReturn);
                    },
                    error: function (oError) {
                        console.log("전체조회 중 오류발생", oError);
                    }
                });

            },

            onEntity : function () {
                //데이터 한 건 조회
                // GET 요청 : "/Products(ProductNo='1')"

                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products", {
                    Productno : '1000'
                });  // sPath값 => "/Products('1000')"
                     // Productno가 '1000'번에 해당하는 데이터 한 건을 조회함 

                oDataModel.read(sPath, {
                    success : function (oReturn) {
                        console.log("한건 조회:", oReturn);
                    }
                });


            },



            onCreate : function () {
                //데이터 생성 구현
                //POST 요청 : "/Products" + Body

                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();

                // 아래 코드 중 A || ''의 뜻?
                // => A 값이 없으면 (false), 빈 문자열을 넣어라 
                var oBody = {
                    "Productno" : oJSONData.Productno || "",      
                    "Productname" : oJSONData.Productname || "",
                    "Fname" : oJSONData.Fname || "",
                    "Lname" : oJSONData.Lname || "",
                    "Memo" : oJSONData.Memo || ""
                };

                oDataModel.create("/Products", oBody, {
                    success : function(){
                        sap.m.MessageToast.show("데이터 생성 완료");
                    }
                });

            },

            onUpdate : function () {
                //데이터 변경 요청
                // PUT 요청 : "/Products('1000')" + Body 

                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products", {
                    Productno : oBody.Productno
                });    // "/Products('키값')" 과 동일 

                debugger;

                oDataModel.update(sPath, oBody, {
                    success : function () {
                        sap.m.MessageToast.show("데이터 변경 완료");
                    }
                });

            },


            onDelete : function () {
                //데이터 삭제 요청
                // Delete 요청 : "/Products('키값')" 과 동일 
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products", {
                    Productno : oBody.Productno
                });    

                oDataModel.remove(sPath, {
                    success : function () {
                        sap.m.MessageToast.show('삭제되었습니다.');
                    }
                });
            }

        });
    });
