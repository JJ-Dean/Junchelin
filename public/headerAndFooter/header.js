
         //닉네임 띄워주기
         firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
            
            console.log(user.uid);
            console.log(user.displayName);
            document.querySelector('.nav_right #li_left').innerHTML=`<span><a href="#">안녕하세요 ${user.displayName}님</a><span>`;
            document.querySelector('.nav_right #li_right').innerHTML=`<span id="logoutBtn">로그아웃</span>`;
            
            //로그아웃 버튼 누름 이벤트
            const logoutBtn = document.getElementById('logoutBtn');
            logoutBtn.addEventListener("click", logout);
            function logout(){
                localStorage.removeItem('user');
                firebase.auth().signOut();
                location.reload();

            }
            
        }
    })
