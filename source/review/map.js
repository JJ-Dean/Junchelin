
		var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
		var options = { //지도를 생성할 때 필요한 기본 옵션
			center : new kakao.maps.LatLng(37.350983570324395, 127.11128557300214), //지도의 중심좌표.
											//37.330236675567086, 127.1095991166326 test 1
											//37.340533450511515, 127.10686900108028 test 2
											//37.350983570324395, 127.11128557300214 test 3
											//37.350983570324395, 127.11128557300214
			level : 4
		//지도의 레벨(확대, 축소 정도)
		};
		
		var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
		
		var fx = options.center.getLat(); //처음 받은 음식점의 위도
		var fy = options.center.getLng(); //처음 받은 음식점의 경도
		console.log(fx,fy);
//--------------------------------------------------------------------------------------------------------------
		//음식점 중심(default center) 반경 500m 원 만들기
		var circle = new kakao.maps.Circle({
		    center : map.getCenter(),  // 원의 중심좌표 입니다 
		    radius: 500, // 미터 단위의 원의 반지름입니다 
		    strokeWeight: 5, // 선의 두께입니다 
		    strokeColor: '#75B8FA', // 선의 색깔입니다
		    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
		    strokeStyle: 'dashed', // 선의 스타일 입니다
		    fillColor: '#CFE7FF', // 채우기 색깔입니다
		    fillOpacity: 0.7  // 채우기 불투명도 입니다   
		}); 
		
		// 지도에 원을 표시합니다 
		circle.setMap(map); 
//--------------------------------------------------------------------------------------------------------------		
 		//음시점 마커 생성
		// 마커가 표시될 위치입니다 
		var markerPosition  = map.getCenter(); 

		// 마커를 생성합니다
		var marker = new kakao.maps.Marker({
		    position: markerPosition
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);
		
		var iwContent = '<div style="padding:5px;">음식점 <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
	    iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

	// 인포윈도우를 생성합니다
	var infowindow = new kakao.maps.InfoWindow({
	    position : iwPosition, 
	    content : iwContent 
	});
	  
	// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
	infowindow.open(map, marker); 
		
		// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
		// marker.setMap(null);     
//--------------------------------------------------------------------------------------------------------------
		 //gps 정보 받아와서 내 위치에 마커 표시하기
		
		// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
if (navigator.geolocation) {
    
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(position) {
        
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">현재 위치입니다.</div>'; // 인포윈도우에 표시될 내용입니다
        
        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
            
      });
    
} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    
    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
        message = 'geolocation을 사용할수 없어요..'
        
    displayMarker(locPosition, message);
} // navigator.geolocation


// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({  
        map: map, 
        position: locPosition
    }); 
    
    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    // 인포윈도우를 마커위에 표시합니다 
    infowindow.open(map, marker);
    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);  
    
    //현재 내 위치 좌표입니다.
    var ux = locPosition.getLat(); //내 위치 위도
	var uy = locPosition.getLng(); //내 위치 경도
	console.log(ux,uy);
	
	//음식점의 위치를 제대로 가져올 수 있는지 test 합니다.
	console.log(options.center.getLat(), options.center.getLng());
	
	//음식점과 내 위치를 이어주는 선을 만들어 길이를 시각화 했습니다.
	//음식점 좌표와 내 위치 좌표를 linePath에 넣어줍니다.
	var linePath = [
   	 new kakao.maps.LatLng(fx,fy),
    	new kakao.maps.LatLng(ux,uy)
    ]
	
	var polyline = new kakao.maps.Polyline({
		
       map: map, // 선을 표시할 지도입니다 
       path : linePath,
       strokeWeight: 3, // 선의 두께입니다 
       strokeColor: '#db4040', // 선의 색깔입니다
       strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
       strokeStyle: 'solid' // 선의 스타일입니다
   });
	
    polyline.setMap(map);
    //거리를 distance 변수에 넣어주고 출력으로 test 합니다.
    var distance = polyline.getLength();
    console.log("음식점과 나의 위치의 거리는 ="+distance+"m");
    
	//음식점과의 거리 표시
    document.getElementById('revMeter').innerHTML=`${Math.floor(distance)}m`;
    
    //500m 안에 있는지 확인 문구
    if (distance <= 500) {
    	document.getElementById("review").innerText = "지금 리뷰를 쓰시면 뜨거운 등급을 받으실 수 있습니다!!";
    }else {
    	document.getElementById("review").innerText = "음식점과 멀어졌습니다. 음식점 주위 500m 이내에서 리뷰를 쓰시면 더 뜨거운 리뷰 등급을 받으실 수 있습니다.";
    }
}
//--------------------------------------------------------------------------------------------------------------    
   
//--------------------------------------------------------------------------------------------------------------

// 내 위치 가져오기 버튼
function getCurrentPosBtn(){
    navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
};


//--------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------

