sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter"
	
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Fragment, Filter) {
        "use strict";

        return Controller.extend("project0414.controller.Main", {
            onInit: function () {

                var oData = {
                    "Memid" : "",
                    "Memnm" : "",
                    "Telno" : "",
                    "Email" : ""
                }
                
                

                this.getView().setModel(new JSONModel(oData),"data");
            },

            onRowSelectionChange: function (oEvent) {

                if(!oEvent.getParameter('rowContext')) return;
                var sPath = oEvent.getParameter('rowContext').getPath();
                // 모델 경로를 통해서, 해당 경로의 전체 데이터를 얻음 
                var oSelectData = this.getView().getModel().getProperty(sPath);
                
                
                var oModel = this.getView().getModel("data");

                oModel.setData(
                    {
                    "Memid" : oSelectData.Memid,
                    "Memnm" : oSelectData.Memnm,
                    "Telno" : oSelectData.Telno,
                    "Email" : oSelectData.Email
                    
                    }
                );
               
            },

            onReset: function () {
                var oModel = this.getView().getModel("data");

                oModel.setData();
                this.getView().getModel().refresh(true);

            },


            onEntitySet: function (oEvent) {
               
                var oDataModel = this.getView().getModel();
                var oButton = oEvent.getSource(),
				    oView = this.getView();
              
               
			// create popover
			if (!this._pPopover) {
				this._pPopover = Fragment.load({   
					id: oView.getId(),
					name: "project0414.view.fragment.Popover",
					controller: this
				}).then(function(oPopover) {
                    oPopover.setModel(new JSONModel(), 'popover');
					oView.addDependent(oPopover);
					
					return oPopover;
				});
			}
			this._pPopover.then(function(oPopover) {
				oPopover.openBy(oButton);
			});

                // oDataModel.read("/ZTMemberSet", {
                //     success: function (oReturn) {
                //         console.log("전체조회: ", oReturn);
                //     },
                //     error: function (oError) {
                //         console.log("전체조회 중 오류발생", oError);
                //     }
                // });


            },

            onRead: function (){

                // var oPopover = sap.ui.getCore().byId("myPopover");

                //Fragment.load() 사용 시,
                //view id를 같이 넘겨줬기 때문에 view 안에 popover가 붙게 됨.
                //따라서 this.byId()로 접근 가능

                var oPopover = this.byId("myPopover");
                var oPopoverModel = oPopover.getModel('popover');
                var oDataModel = this.getView().getModel();
                var oFilter = new Filter("Memnm", "EQ", oPopoverModel.getData().Memnm);

                oDataModel.read("/ZTMemberSet", {
                    urlParameters: {
                        "$expand" : "WorkSet",
                        "$select" : "Memid,WorkSet"
                    },
                    filters : [oFilter], 
                    success : function (oReturn) {
                        debugger;
                        console.log("한건 조회:", oReturn);
                    }

                });

                

                
            },


            onEntity : function () {
                //데이터 한 건 조회
                // GET 요청 : "/Products(ProductNo='1')"

                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/ZTMemberSet", {
                    Memid : '00000001'
                });  
                oDataModel.read(sPath, {
                    success : function (oReturn) {
                        console.log("한건 조회:", oReturn);
                    }
                });


            },

            onCreate: function () {

                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();

                var oBody = {
                    "Memid" : oJSONData.Memid || "",      
                    "Memnm" : oJSONData.Memnm || "",
                    "Telno" : oJSONData.Telno || "",
                    "Email" : oJSONData.Email || ""
                    
                    
                };

                oDataModel.create("/ZTMemberSet", oBody, {
                    success : function(){
                        
                        //sap.m.MessageToast.show("데이터 생성 완료");
                        MessageBox.success("생성에 성공하였습니다.");
                    },
                    error : function (oError) {
                        //sap.m.MessageToast.show("에러 발생");
                        MessageBox.error("생성에 실패하였습니다.");
                    }
                });

            },


            onUpdate : function () {
              

                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/ZTMemberSet", {
                    Memid : oBody.Memid
                });    // "/Products('키값')" 과 동일 

                

                oDataModel.update(sPath, oBody, {
                    success : function () {
                        sap.m.MessageToast.show("데이터 변경 완료");
                    }
                });

            },


            onDelete : function () {
               
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/ZTMemberSet", {
                    Memid : oBody.Memid
                });    

                oDataModel.remove(sPath, {
                    success : function () {
                        //sap.m.MessageToast.show('삭제되었습니다.');
                        MessageBox.success("삭제에 성공하였습니다.");
                    }
                });
            }

        });
    });
