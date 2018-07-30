function signup(){
    firebase.auth().createUserWithEmailAndPassword(getEmail(), getPassword())
    .then(
        function(success) {
            console.log(success)
            alert("회원가입 성공")
        }, function(error) {
            console.log(error)
            alert("회원가입 실패")
        }
    )
    console.log("회원가입");
}

function signin() {
    console.log("로그인");
    firebase.auth().signInWithEmailAndPassword(getEmail(), getPassword())
    .then(
        function(success) {
            console.log(success);
            alert("로그인 성공");
            $("#login-frame").hide();
            $("#db-upload-frame").show();
            uploadDBListenner();
        },
        function(error) {
            console.log(error);
            alert("로그인 실패");
        }
    )
    console.log("로그인 함수 실행 끝");
}

function signout(){
    console.log("로그아웃");
    $("#db-upload-frame").hide();
    $("#login-frame").show();
}

function getEmail(){
    return $("#email").val();
}

function getPassword(){
    return $("#password").val();
}

function setDBdata(data){
    console.log("데이터 확인");
    $("#real-time-val").text(data);
}

function uploadDB() {
    firebase.database().ref().set({
        groupChat: $("#input-txt").val()
    });
}

function uploadDBListenner() {
    console.log("업로드 데이터");
    firebase.database().ref().on('child_changed', function(data) {
        console.log(data.val());
        $("#real-time-val").text(data.val());
      });
}

$("#login-btn").click(
    function(){
        console.log("로그인 버튼 클릭");
        signin();
    }
)

$("#logout-btn").click(
    function(){
        console.log("로그아웃 버튼 클릭");
        signout();
    }
)

$("#signup-btn").click(
    function(){
        console.log("회원가입 버튼 클릭");
        signup();
    }
)

$("#send-btn").click(
    function(){
        uploadDB();
    }
)