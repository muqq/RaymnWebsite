'use strict';

var opApp = angular.module('opApp', [
    'angularFileUpload',
    '$strap.directives',
    'opControllers'
], function($locationProvider) {
    $locationProvider.html5Mode(true);
});

var opControllers = angular.module('opControllers', []);


opControllers.controller('op-home-control', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        var arrowCount = 0 ;
        setInterval(function(){
            if (arrowCount%2==0){
                $('#arrow').removeClass('down');
            }else{
                $('#arrow').addClass('down');
            }
            arrowCount += 1 ;
        },500);
        function changeText(cont1,cont2,speed){
            var Otext= "Raymn Agency , a team consist of vitality , creativity and dream";
            var Otext2 = "We design visual , build connection , we narrate brand story.";
            var Ocontent=Otext.split("");
            var Ocontent2 = Otext2.split("");
            var interval ;
            var counter = 0 ;
            function showLine(textArray, htmlText, htmlClass){
                if (counter<textArray.length){
                    htmlText.append(textArray[counter]);
                    counter += 1 ;
                }else{
                    clearInterval(interval);
                    setTimeout(function(){
                        $(htmlClass).html("");
                        if (counter%2 ===0){
                            start(function(){showLine(Ocontent2, cont2, ".p2")});
                        }else{
                            start(function(){showLine(Ocontent, cont1, ".p1")});
                        }
                        counter = 0 ;
                    },2000);
                }
            }
            function start(line) {
                interval = setInterval(line,speed);
            }
            start(function(){showLine(Ocontent, cont1, ".p1")});
        }

        $(document).ready(function() {
            $('#fullpage').fullpage({
                 anchors: ['home','aboutPage','servicesPage','newsPage','workPage','contactPage'],
                afterLoad: function(anchorLink, index){
                //using index
                    anchorLink = anchorLink.replace('Page','');
                    var array = ['about' , 'services','news','work','contact'];
                    var idx = array.indexOf(anchorLink);
                    array.splice(idx,1);
                    console.log(array);
                    $('#'+anchorLink).attr("src", "/img/LoginView/"+anchorLink+"_0.png");
                    for (var i=0 ; i<array.length ; i++){
                        $('#'+array[i]).attr("src", "/img/LoginView/"+array[i]+"_1.png");
                    }
                },
                onLeave: function(index, direction){
                    console.log(index, direction);
                     if (direction==2){
                        for (var i = 1 ; i<6 ; i++){
                            $('#card'+i).removeClass('out-of-edgecard'+i);
                        }
                    }else{
                        for (var i = 1 ; i<6 ; i++){
                            $('#card'+i).addClass('out-of-edgecard'+i);
                        }
                    }
                    
                }
            });
            changeText($(".p1"),$(".p2"),50);
        });
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
            //do something to update current scope based on the new innerWidth and let angular update the view.
                size();
            });
        });
        //pictucre slider
 
   

        $scope.buttonChange = function(name){
            var query = '#'+name ;
            $(query).mouseenter(function() {
                $(query).attr("src", "/img/LoginView/"+name+"_0.png");
            }).mouseleave(function() {
                if (!$(this).hasClass('clicked')){
                    console.log('cancel');
                    $(query).attr("src", "/img/LoginView/"+name+"_1.png");
                }
            }).click(function(){
                $(this).addClass('clicked');
                var array = ['about' , 'services','news','work','contact'];
                var idx = array.indexOf(name);
                array.splice(idx,1);
                $(query).attr("src", "/img/LoginView/"+name+"_0.png");
                for (var i=0 ; i<array.length ; i++){
                    $('#'+array[i]).attr("src", "/img/LoginView/"+array[i]+"_1.png");
                    if($('#'+array[i]).hasClass('clicked'))
                        $('#'+array[i]).removeClass('clicked');
                }
            });
        }

        $scope.homeButton = function(){
            var array = ['about' , 'services','news','work','contact'];
            for (var i=0 ; i<array.length ; i++){
                    $('#'+array[i]).attr("src", "/img/LoginView/"+array[i]+"_1.png");
                    if($('#'+array[i]).hasClass('clicked'))
                        $('#'+array[i]).removeClass('clicked');
            }
            
        }
        
        // $scope.showCard = function(id){
        //     var textId = id ;
        //     textId = textId.replace('card', 'photo');
        //     $scope.show = true ; 
        //     //$('#'+textId).css({display:'block'});
        // }

        // $scope.hideCard = function(id){
        //     var textId = id ;
        //     textId = textId.replace('card', 'photo');
        //     $scope.show = false ;
        //     //$('#'+textId).css({display:'none'});
        // }



        $scope.showContent = function(id){
            $('#section1_2').show();
            $('#section1_2_1').show();
            var textId = id ;
            textId = textId.replace('card','');
            $scope.content = $scope.data[textId-1];
        }

        $scope.hideContent = function(){
            $('#section1_2').hide();
            $('#section1_2_1').hide();
        }

        $(document).keyup(function(e) {
            if (e.keyCode == 27) { 
                $('#section1_2').hide();
                $('#section1_2_1').hide(); 
            }   // esc
        });

        $scope.data = [
            {
                id: 'card1',
                nameImg: 'img/About/ms.png',
                img: 'img/About/photo_1.jpg',
                allName:'Muqq Shih',
                title:'CEO',
                photoId :'photo1',
                p1:'話說天下大勢．分久必合，合久必分：周末七國分爭，并入於秦。及秦滅之後，楚、漢分爭，又并入於漢。漢朝自高祖斬白蛇而起義，一統天下。後來光武中興，傳至獻帝，遂分為三國。'
            },
            {
                id: 'card2',
                nameImg: 'img/About/sk.png',
                img: 'img/About/photo_2.jpg',
                allName:'Sprout Kuo',
                title:'CTO',
                photoId :'photo2',
                p1:'話說天下大勢．分久必合，合久必分：周末七國分爭，并入於秦。及秦滅之後，楚、漢分爭，又并入於漢。漢朝自高祖斬白蛇而起義，一統天下。後來光武中興，傳至獻帝，遂分為三國。'          
            },
            {
                id: 'card3',
                nameImg: 'img/About/yk.png',
                img: 'img/About/photo_3.jpg',
                allName:'Youlanda Kuo',
                title:'Desinger',
                photoId :'photo3',
                p1:'話說天下大勢．分久必合，合久必分：周末七國分爭，并入於秦。及秦滅之後，楚、漢分爭，又并入於漢。漢朝自高祖斬白蛇而起義，一統天下。後來光武中興，傳至獻帝，遂分為三國。'
            },
            {
                id: 'card4',
                nameImg: 'img/About/sf.png',
                img: 'img/About/photo_4.jpg',
                allName:'Shaofu',
                title:'Manager',
                photoId :'photo4',
                p1:'話說天下大勢．分久必合，合久必分：周末七國分爭，并入於秦。及秦滅之後，楚、漢分爭，又并入於漢。漢朝自高祖斬白蛇而起義，一統天下。後來光武中興，傳至獻帝，遂分為三國。'  
            },
            {
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
        


     }
]);
