'use strict';
var apiServer = 'http://raymn.com.tw:8080/api/'; // Staging
var opApp = angular.module('opApp', [
    'once',
    'angularFileUpload',
    '$strap.directives',
    'opControllers'
    ], function($locationProvider) {
        $locationProvider.html5Mode(true);
    });

var opControllers = angular.module('opControllers', []);


opControllers.controller('op-home-control', ['$scope', '$http', '$window', '$model',
    function($scope, $http, $window, $model) {
        $(document).ready(function() {
            for (var i = 1 ; i<6 ; i++){
                $('#card' + i).css({bottom:-200*i, opacity:0});
            } 
            $('#fullpage').fullpage({
                anchors: ['Home', 'About', 'Service', 'News', 'Work', 'Contact'],
                afterLoad: function(anchorLink, index){
                    $scope.changeColor(index-1);
                },
                onLeave: function(index, direction){
                    console.log(index, direction);
                    if (direction==2){
                        setTimeout(function(){
                            for (var i = 1 ; i<6 ; i++){
                                $('#card' + i).css({bottom:'0px', opacity:1});
                            }
                        },500);

                    }else if ((index>direction) && (direction!=2)){
                        for (var i = 1 ; i<6 ; i++){
                            $('#card' + i).css({bottom:-200*i, opacity:0});
                        }                        
                    }else if ((index<direction) && (direction!=2)){
                        for (var i = 1 ; i<6 ; i++){
                            $('#card' + i).css({bottom:+200*i, opacity:0});
                        } 
                    }
                    if (direction==6){
                        setTimeout(function(){
                            $('#section5_1_2_1').attr('style','margin-top: 66px ; opacity:1;');
                            $('#section5_1_2_2').attr('style','margin-top: 84px ; opacity:1;');
                            $('#section5_1_2_3').attr('style','margin-top: 103px ; opacity:1;');
                            $('#section5_1_2_4').attr('style','margin-top: 120px ; opacity:1;');
                            typeMachine();
                        },500);
                    }else{
                        clearInterval(contactInterval);
                        $('#p5_1_1_1').html("");
                        $('#p5_1_1_2').html("");
                        $('#p5_1_1_3').html("");
                        $('#p5_1_3').html(""); 
                        setTimeout(function(){
                            $('#section5_1_2_1').attr('style','margin-top: 32px ; opacity:0;');
                            $('#section5_1_2_2').attr('style','margin-top: 50px ; opacity:0;');
                            $('#section5_1_2_3').attr('style','margin-top: 68px ; opacity:0;');
                            $('#section5_1_2_4').attr('style','margin-top: -12px ; opacity:0;'); 
                        },750);
                    }
                    
                }
            });
        });

        function cardExplode(cardNumber)  {
            var ran = [];
            for (var i = 0; i<11; i++) {
                ran[i] = (Math.random()-0.5)*2000;
            }
            for (var j = 1; j<6; j++) {
                if (j != cardNumber){
                    $('#card'+j).attr('id', 'card' + j + 'WhenClick');
                }else{
                    $('#card'+j+'WhenHover').attr('id', 'card' + j + 'WhenClick');
                }
                $('#card' + j + 'WhenClick').css({bottom: ran[j]+'px', left: ran[j+5]+'px', visibility: 'hidden'});
            }
        }
        function cardExplodeRe() {
            for (var i = 1; i < 6; i++) {
                $('#card' + i + 'WhenClick').css({bottom: 0+'px', left: 0+'px', visibility: 'visible'});
                $('#card' + i + 'WhenClick').attr('id','card' + i);
            }
        }     
        function changeText(cont1,cont2,cont3,speed){
            var Otext= "Welcome to Raymn  ";
            var Otext2 = "A team consist of vitality , creativity and dream!"
            var Otext3 = "We design visual , build connection , we narrate brand story.";
            var Ocontent = Otext.split("");
            var Ocontent2 = Otext2.split("");
            var Ocontent3 = Otext3.split("");
            console.log(Ocontent.length, Ocontent2.length, Ocontent3.length);
            var interval ;
            var counter = 0 ;
            function showLine(textArray, htmlText, htmlClass){
                if (counter<textArray.length){
                    htmlText.append(textArray[counter]);
                    counter += 1 ;
                }else{
                    clearInterval(interval);
                    setTimeout(function(){
                        if (counter%3 ===0){
                            start(function(){showLine(Ocontent2, cont2, "#p2")});
                        }else if(counter%3===2){
                            $(htmlClass).html("");
                            start(function(){showLine(Ocontent3, cont3, "#p3")});
                        }else{
                            $(htmlClass).html("");
                            $('#p1').html("");
                            start(function(){showLine(Ocontent, cont1, "#p1")});
                        }
                        counter = 0 ;
                    },2000);
                }
            }
            function start(line) {
                interval = setInterval(line,speed);
            }
            start(function(){showLine(Ocontent, cont1, "#p1")});
        }
        // init size
        //i love fifi's mother
        var rate = $window.innerWidth/1458 ;
        var middlePoint = $window.innerHeight/2 - 100;
        //detect the size of window height
        var size = function(){
            //$("#sideBottom").css({bottom:10, right:0, position:'absolute'});
            $("#about").css({top:middlePoint-80, left:$window.innerWidth-(110*rate)});
            $("#services").css({top:middlePoint-40, left:$window.innerWidth-(110*rate)});
            $("#news").css({top:middlePoint, left:$window.innerWidth-(110*rate)});
            $("#work").css({top:middlePoint+45, left:$window.innerWidth-(110*rate)});
            $("#contact").css({top:middlePoint+90, left:$window.innerWidth-(110*rate)});
            $("#side02").css({height:$window.innerHeight});
            $("#side03").css({width:$window.innerWidth});

        }
        
        //window resize
        $(window).resize(function(){
            $scope.$apply(function(){
            size();
        });
        });
        $scope.changeColor = function(textNumber){
            for (var i=1; i<6 ; i++){
                $('#text'+i).attr('class', 'rightWord');
            }
            if(textNumber != 0){
                $('#text'+textNumber).attr('class', 'rightWord2');
            }else{

            }
        }
        
        $scope.clickCard = function(cardNumber){
            if($('#photoImg'+cardNumber).css('opacity')!=0){
                $('#section1_2').css('visibility','visible');
                $scope.content = $scope.data[cardNumber-1];
                $('#section1_2_2').css('top','50%');
                $('#section1_2_3').css('top','50%');
                $('#section1_2_2').attr('class','whenClick2');
                $('#section1_2_3').attr('class','whenClick3');
                cardExplode(cardNumber);   
            }
        }

        $scope.clickDark = function(){
            $('#section1_2').css('visibility','hidden');
            $('#section1_2_2').css('top','0%');
            $('#section1_2_3').css('top','0%');

            cardExplodeRe();
        }

        $scope.photoImgShow = function(cardNumber){
            $('#card'+cardNumber).attr('id','card'+cardNumber+'WhenHover');
            $('#photoImg'+cardNumber).css({cursor:'pointer'});
        }
        $scope.photoImgHide = function(cardNumber){
            $('#card'+cardNumber+'WhenHover').attr('id','card'+cardNumber);
            $('#photoImg'+cardNumber).css({cursor:''});
        }
        $scope.photoImgShowAgain = function(cardNumber){
            if($('#photoImg'+cardNumber).css('opacity')!=0){
                $scope.photoImgShow(cardNumber);
            }else{

            }
        }

        $(document).keyup(function(e) {
            if (e.keyCode == 27) { 
                $scope.clickDark();
                $scope.clickDark2();
            }   // esc
        });


        //service page
        $scope.serviceMove = function(number){
            console.log('mouseover'+number);
            $('#white'+number).css({top: 25+'px', opacity: 1}); 
            $('#service'+number).css({top:10+'px'}); 
            $('#word'+number).css({opacity:1});
        }
        $scope.serviceQuit = function(number){
            $('#white'+number).css({top: 15+'px', opacity: 0});    
            $('#service'+number).css({top:0+'px'});
            $('#word'+number).css({opacity:0});
        }
        //news page
        var right = 0;
        var keR = true;
        var keL = true;
        var repeatL = false;
        var repeatR = false;

        var newsWidth = 262;

        var s31ml = new Array();
        for (var j = 0; j<51; j++) {
            s31ml[j] = 80 - newsWidth*j;
        }
        // s31ml = [80, -182, -444, -706, -968 .....]
        var s31w =  new Array();
        for (var j = 0; j<51; j++) {
            s31w[j] = (newsWidth)*j;
        }
        // s31w = [262, 524, 786, 1048, 1310 .....]

        $scope.newsLeft = function() {
            if (!repeatL) {
                if (right > 0) {
                    var elem = document.getElementById("section3_1");
        //          elem.setAttribute("style","margin-left: "+s31ml[right-1]+"px;");
                    elem.style.marginLeft = s31ml[right-1] +"px";
                    right--;
                }
                repeatL = true;
                setTimeout(function() {
                    newsKeepLeft();
                }, 300);
            } else {

            }
        }

        $scope.newsRight = function() {
            console.log('newsright mouseover');
            if ($scope.news.length > 4) {
                if (!repeatR) {
                    if (right < $scope.news.length-4) {
                        var elem = document.getElementById("section3_1");
        //                elem.setAttribute("style","margin-left: "+s31ml[right+1]+"px;");
                        elem.style.marginLeft = s31ml[right+1] +"px";
                        right++;
                    }
                    repeatR = true;
                    setTimeout(function() {
                        newsKeepRight();
                    }, 300);
                } else {

                }
            } else {

            }
        }

        $scope.newsLStop = function() {
            keL = false;
        }

        $scope.newsRStop = function() {
            keR = false;
        }


        function newsKeepRight() {
            repeatR = false;
            if (keR) {
                $scope.newsRight();
            } else {
                keR = true;
            }
        }

        function newsKeepLeft() {
            repeatL = false;
            if (keL) {
                $scope.newsLeft();
            } else {
                keL = true;
            }
        }

        $scope.clickNews = function(newsNumber) {
            var elem = document.getElementById("section3_4");
            elem.style.visibility = "visible";

            var elem = document.getElementById("section3_4_2");
            elem.setAttribute("style", "top: 50%;");
            var elem = document.getElementById("section3_4_3");
            elem.setAttribute("style", "top: 50%;");
            console.log($scope.news);
            var findArray = _.findIndex($scope.news, {'newsid':newsNumber});
            $scope.newsContent = _.clone($scope.news[findArray]);
            console.log($scope.newsContent);
            console.log(newsNumber);
            newsExplode();
        }

        $scope.clickDark2 = function() {
            var elem = document.getElementById("section3_4");
            elem.style.visibility = "hidden";
            var elem = document.getElementById("section3_4_2");
            elem.setAttribute("style", "top: 0%");
            var elem = document.getElementById("section3_4_3");
            elem.setAttribute("style", "top: 0%");
            newsExplodeRe()
        }

        function newsExplode() {
            $('#section3_1').css({top:'100%', opacity:0});            
        }

        function newsExplodeRe() {
            $('#section3_1').css({top:'35%', opacity:1});

        }



        //contact page
        var contactInterval ;
        function typeMachine()  {
            var text= "LEAVE A MESSGE TO US!";
            var text2 = "WE ARE LOOKING FORWARD TO HEARING YOUR IDEAS  "
            var text3 = "AND WILL CONTACT YOU SOON !  ";
            var text4 = "SEND"
            var content = text.split("");
            var content2 = text2.split("");
            var content3 = text3.split("");
            var content4 = text4.split("");
            var counter = 0 ;
            var counter2 = 0;
            var counter3 = 0 ;
            var counter4 = 0 ;

            contactInterval = setInterval(function(){
                if (counter < text.length){
                    $('#p5_1_1_1').append(text[counter]);
                    counter += 1; 
                }else if (counter2 < text2.length){
                    $('#p5_1_1_2').append(text2[counter2]);
                    counter2 += 1;  
                }else if (counter3 <text3.length){
                    $('#p5_1_1_3').append(text3[counter3]);
                    counter3 += 1;    
                }else if (counter4 <text4.length){
                    $('#p5_1_3').append(text4[counter4]);
                    counter4 += 1;      
                }
            },50);
        }
        $scope.email = function(){
            if (checkEmail($scope.Email)){
                console.log('ok');
                $model.Contact.contactUs($scope.Email, function(err, res){
                    if(err) alert(err);
                    else {
                        alert(res);
                        $scope.Email = {};
                    }
                });
            }else{
                alert('請輸入完整資料');
            }
        }
        //web init
        $model.About.users(function(err, res){
            if (err) alert(err);
            else {
                $scope.data = res ;
                $scope.data.sort(function(a,b) { 
                    return parseInt(a.number) - parseInt(b.number) 
                });
            }
        });
        $model.News.getNews(function(err, res){
            if (err) alert(err);
            else {
                $scope.news = res ;
                $scope.news.sort(function(a,b) { 
                    return parseInt(a.newsid) - parseInt(b.newsid) 
                });
                var section = document.getElementById("section3_1");
//    section.setAttribute("style","width: "+ s31w[newsCount] +"px;");
                section.style.width = s31w[$scope.news.length]+"px";
                console.log($scope.news);            
            }
        });

        $scope.Email = {};
        size();
        changeText($("#p1"),$("#p2"),$("#p3"),50);
        console.log('service:left:' + $('#side03').css('width'));

    }
    ]);

//model
opControllers.factory('$model' , function($http){
    return {
        Contact : {
            contactUs : function(emailData, callback){          
                $http.post(apiServer + 'ContactUs', emailData,  config).success(function(resp){
                    console.log(resp);
                    if (resp.error) callback(resp.error);
                    else{
                        callback(null, 'Thank you! We will contact with you ASAP!');
                    }
                }).error(function(err){
                    callback(err);
                });    
            }
        },
        About :{
            users : function(callback){
                $http.get('/json/user.json').success(function(resp){
                    console.log(resp);
                    if (resp.error) callback(resp.error);
                    else callback(null, resp);
                }).error(function(err){
                    callback(err);
                });
            }
        },
        News :{
            getNews : function(callback){
                $http.get(apiServer+'GetNews' , config).success(function(resp){
                    if (resp.error) callback(resp.error);
                    else callback(null, resp);
                }).error(function(err){
                    callback(err);
                });

            }
        }
    }
});

//http config
var config = {
    headers: {
        'Content-Type' : 'application/json',
    }
}

//check Category input
var checkEmail = function(data){
  console.log(data);
  if(!data.name) return false ;
  if(!data.email) return false ;  
  if(!data.title) return false ;
  if(!data.content) return false ;
  return true ;
}
