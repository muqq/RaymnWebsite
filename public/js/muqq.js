'use strict';

var opApp = angular.module('opApp', [
    'once',
    'angularFileUpload',
    '$strap.directives',
    'opControllers'
    ], function($locationProvider) {
        $locationProvider.html5Mode(true);
    });

var opControllers = angular.module('opControllers', []);


opControllers.controller('op-home-control', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        $(document).ready(function() {
            for (var i = 1 ; i<6 ; i++){
                $('#card' + i).css({bottom:-200*i, opacity:0});
            } 
            $('#fullpage').fullpage({
                anchors: ['Page0', 'Page1', 'Page2', 'Page3', 'Page4', 'Page5'],
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
                    
                }
            });
        });

        function cardExplode()  {
            var ran = new Array();
            for (var i = 0; i<11; i++) {
                ran[i] = (Math.random()-0.5)*2000;
            }
            for (var j = 1; j<6; j++) {
                $('#card'+j).attr('id', 'card' + j + 'WhenClick');
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
            var Otext= "Raymn ";
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
                cardExplode();   
            }
        }

        $scope.clickDark = function(){
            $('#section1_2').css('visibility','hidden');
            cardExplodeRe();
        }

        $scope.photoImgShow = function(cardNumber){
            $('#nameImgHover'+cardNumber).attr('href','css/cardHover/card'+cardNumber+'Hover.css');
            $('#photoImg'+cardNumber).css({cursor:'pointer'});
        }
        $scope.photoImgHide = function(cardNumber){
            console.log('leave');
            $('#nameImgHover'+cardNumber).attr('href','');
            $('#photoImg'+cardNumber).css({cursor:''});
        }
        $scope.photoImgShowAgain = function(cardNumber){
            if($('#photoImg'+cardNumber).css('opacity')!=0){
                $scope.photoImgShow(cardNumber);
            }else{

            }
        }

        function test(cardNumber){
            console.log(cardNumber);
        }

        $(document).keyup(function(e) {
            if (e.keyCode == 27) { 
                $scope.clickDark();
            }   // esc
        });

        $scope.data = [
        {
            number : 1,
            id: 'card1',
            nameImg: 'img/About/ms.png',
            img: 'img/About/photo_1.jpg',
            allName:'Muqq Shih',
            title:'CEO',
            photoId :'photo1',
            p1:'話說天下大勢．分久必合，合久必分：周末七國分爭，并入於秦。及秦滅之後，楚、漢分爭，又并入於漢。漢朝自高祖斬白蛇而起義，一統天下。後來光武中興，傳至獻帝，遂分為三國。'
        },
        {
            number : 2,
            id: 'card2',
            nameImg: 'img/About/sk.png',
            img: 'img/About/photo_2.jpg',
            allName:'Sprout Kuo',
            title:'CTO',
            photoId :'photo2',
            p1:'話說天下大勢．分久必合，合久必分：周末七國分爭，并入於秦。及秦滅之後，楚、漢分爭，又并入於漢。漢朝自高祖斬白蛇而起義，一統天下。後來光武中興，傳至獻帝，遂分為三國。'          
        },
        {
            number : 3 ,
            id: 'card3',
            nameImg: 'img/About/yk.png',
            img: 'img/About/photo_3.jpg',
            allName:'Youlanda Kuo',
            title:'Desinger',
            photoId :'photo3',
            p1:'話說天下大勢．分久必合，合久必分：周末七國分爭，并入於秦。及秦滅之後，楚、漢分爭，又并入於漢。漢朝自高祖斬白蛇而起義，一統天下。後來光武中興，傳至獻帝，遂分為三國。'
        },
        {
            number : 4 ,
            id: 'card4',
            nameImg: 'img/About/sf.png',
            img: 'img/About/photo_4.jpg',
            allName:'Shaofu',
            title:'Manager',
            photoId :'photo4',
            p1:'話說天下大勢．分久必合，合久必分：周末七國分爭，并入於秦。及秦滅之後，楚、漢分爭，又并入於漢。漢朝自高祖斬白蛇而起義，一統天下。後來光武中興，傳至獻帝，遂分為三國。'  
        },
        {
            number : 5 ,
            id: 'card5',
            nameImg: 'img/About/nn.png',
            img: 'img/About/photo_5.jpg',
            allName:'Niao Niao',
            title:'Mascot',
            photoId :'photo5',
            p1:'話說天下大勢．分久必合，合久必分：周末七國分爭，并入於秦。及秦滅之後，楚、漢分爭，又并入於漢。漢朝自高祖斬白蛇而起義，一統天下。後來光武中興，傳至獻帝，遂分為三國。'
        }
        ]

        size();
        changeText($("#p1"),$("#p2"),$("#p3"),50);


    }
    ]);
