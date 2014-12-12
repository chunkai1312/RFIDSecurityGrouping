'use strict';

angular.module('myApp.main', ['ngRoute', 'ui.bootstrap', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', function($scope, $timeout) {
  $scope.countdownTimer = '';
  $scope.isDisabled = false;

  // 分組資料
  $scope.students = [
    {"group" : "1", "studentID" : "M10209202", "name" : "許純茹"}, 
    {"group" : "1", "studentID" : "M10209217", "name" : "侯妏綾"}, 
    {"group" : "1", "studentID" : "M10309201", "name" : "郭佩宜"}, 
    {"group" : "1", "studentID" : "M10309213", "name" : "陳筱淨"}, 
    {"group" : "2", "studentID" : "D10309205", "name" : "王茂吉"}, 
    {"group" : "2", "studentID" : "M10102301", "name" : "陳翊宣"}, 
    {"group" : "2", "studentID" : "M10305506", "name" : "林楷崴"}, 
    {"group" : "2", "studentID" : "M10309210", "name" : "黃振皓"}, 
    {"group" : "2", "studentID" : "M10315056", "name" : "梁珪信"}, 
    {"group" : "3", "studentID" : "M10309101", "name" : "邱佩俞"}, 
    {"group" : "3", "studentID" : "M10309105", "name" : "林荃啟"}, 
    {"group" : "3", "studentID" : "M10309107", "name" : "葉庭杰"}, 
    {"group" : "3", "studentID" : "M10215002", "name" : "鄭期傑"}, 
    {"group" : "4", "studentID" : "M10209101", "name" : "唐偲瑋"}, 
    {"group" : "4", "studentID" : "M10309102", "name" : "陳伶貞"}, 
    {"group" : "4", "studentID" : "M10309115", "name" : "譚學勇"}, 
    {"group" : "4", "studentID" : "M10309116", "name" : "林子鈞"}, 
    {"group" : "5", "studentID" : "M10209123", "name" : "王偲帆"}, 
    {"group" : "5", "studentID" : "M10309108", "name" : "林宜駿"}, 
    {"group" : "5", "studentID" : "M10309104", "name" : "陳政謙"}, 
    {"group" : "5", "studentID" : "M10209124", "name" : "曾亭媗"}, 
    {"group" : "6", "studentID" : "M10309303", "name" : "鐘士昌"}, 
    {"group" : "6", "studentID" : "M10309304", "name" : "劉子慶"}, 
    {"group" : "6", "studentID" : "M10309307", "name" : "吳世琦"}, 
    {"group" : "6", "studentID" : "M10309310", "name" : "王晨芳"},  
    {"group" : "7", "studentID" : "M10209210", "name" : "高毓嬪"}, 
    {"group" : "7", "studentID" : "M10209310", "name" : "鄭有順"}, 
    {"group" : "7", "studentID" : "M10209314", "name" : "鐘珮珊"},
    {"group" : "7", "studentID" : "M10209316", "name" : "王信翔"}
  ]; 

  // 組別
  $scope.groups = [
    {'group' : '第 1 組'},
    {'group' : '第 2 組'},
    {'group' : '第 3 組'},
    {'group' : '第 4 組'},
    {'group' : '第 5 組'},
    {'group' : '第 6 組'},
    {'group' : '第 7 組'}
  ];
  
  // 論文清單
  $scope.paperList = [
    {'title' : 'Dynamic Bit Encoding for Privacy Protection against Correlation Attacks in RFID Backward Channel'},
    {'title' : 'Mutual Distance Bounding Protocols'},
    {'title' : 'Grouping-Proofs-Based Authentication Protocol for Distributed RFID Systems'},
    {'title' : 'Privacy-Friendly Authentication in RFID Systems: On Sublinear Protocols Based on Symmetric-Key Cryptography'},
    {'title' : 'Distance Bounding: A Practical Security Solution for Real-Time Location Systems'},
    {'title' : 'Location-Aware and Safer Cards: Enhancing RFID Security and Privacy via Location Sensing'},
    {'title' : 'Secure RFID Tag Ownership Transfer Based on Quadratic Residues'},
    {'title' : 'Unreconciled Collisions Uncover Cloning Attacks in Anonymous RFID Systems'},
    {'title' : 'Interconnection Framework for mHealth and Remote Monitoring Based on the Internet of Things'},
    {'title' : 'Hard and Soft Security Provisioning for Computationally Weak Pervasive Computing Systems in E-health'},
    {'title' : 'Context-Aware Defenses to RFID Unauthorized Reading and Relay Attacks'},
    {'title' : 'Untraceability Model for RFID'},
    {'title' : 'An Improved Scheme for Key Management of RFID in Vehicular Adhoc Networks'},
    {'title' : 'A Multiple Hashing Approach to Complete Identification of Missing RFID Tags'},
    {'title' : 'Managing RFID Data: Challenges, Opportunities and Solutions'},
    {'title' : 'Proper RFID Privacy: Model and Protocols'},
    {'title' : 'Scalable and Resynchronisable Radio Frequency Identification Ownership Transfer Protocol Based on a Sliding Window Mechanism'},
    {'title' : 'A Secure Supply-Chain RFID System that Respects Your Privacy'},
  ];
  
  // 報告順序
  $scope.orderList = [
    {'order' : '2014 年 12 月 30 日 -> 第 1 順位'},
    {'order' : '2014 年 12 月 30 日 -> 第 2 順位'},
    {'order' : '2014 年 12 月 30 日 -> 第 3 順位'},
    {'order' : '2014 年 12 月 30 日 -> 第 4 順位'},
    {'order' : '2015 年 01 月 06 日 -> 第 1 順位'},
    {'order' : '2015 年 01 月 06 日 -> 第 2 順位'},
    {'order' : '2015 年 01 月 06 日 -> 第 3 順位'},
  ];

  /**
   * 抽籤
   * 
   * @param second 倒數計時秒數
   */
  $scope.drawLots = function(second) {
    $scope.isDisabled = true;

    var start = function() {
      $scope.countdownTimer = '<strong><small>抽籤倒數</small> ' + second + ' <small>秒</small></strong>';
      $timeout(function() { 
        if (second == 0) {
          $scope.second = '';
          $scope.countdownTimer = '';
          random();
        } else {
          second--;
          start();        
        }            
      }, 1000);   
    };
    start();
    
    var random = function() {  
      for(var i = 0; i < $scope.groups.length; i++) {
        // 挑選論文
        var pickPaper = Math.floor(Math.random() * $scope.paperList.length); 
        $scope.groups[i].paper = $scope.paperList[pickPaper].title;
        $scope.paperList.splice(pickPaper, 1);         
        console.log($scope.groups[i].paper);
        
        // 挑選順序
        var pickOrder = Math.floor(Math.random() * $scope.orderList.length); 
        $scope.groups[i].order = $scope.orderList[pickOrder].order;
        $scope.orderList.splice(pickOrder, 1);   
        console.log($scope.groups[i].order);  
      }      
       
      alert('抽籤完成！');
      scrollTo('result');     
    };

    var scrollTo = function(id) {
        var anchor = document.getElementById(id);
        anchor.scrollIntoView();
    };  
  };

  /**
   * 匯出excel檔 
   */
  $scope.export = function () {
      var blob = new Blob([document.getElementById('exportable').innerHTML], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      });
      saveAs(blob, "result.xls");
  };  
});