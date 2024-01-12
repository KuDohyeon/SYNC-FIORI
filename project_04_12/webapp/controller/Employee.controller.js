sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0412.controller.Employee", {
            // 초기화 함수 onInit은 해당 Controller가 로드될 때 한번만 실행 
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteEmployee").attachPatternMatched(this._onPatternMatched, this);
            },
            //PatternMatched 이벤트는 URL 일치 "할때마다" 실행 
            _onPatternMatched : function (oEvent) {
                // RouteDetail 라우트 객체의 pattern이 일치할 때마다 해당 이벤트가 실행됨 
                var oArgu = oEvent.getParameters().arguments;

                console.log("Detail : ", oArgu);
            },



            onNavBack : function () {
                //URL parameter로 넘기는 데이터가 많으면
                //JSONModel 과 같은 모델을 사용하는게 좋음.
                // 왜? URL에 길이 제한이 있기 때문임 
                this.oRouter.navTo('RouteMain', {
                    'query' : {
                        tab : 'okok',
                        test : 10
                    }
                });

            }
        });
    });
