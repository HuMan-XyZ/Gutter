var firebaseConfig = {
  apiKey: "AIzaSyC2LHr3WGX3xJu4niDs2vnqMnfEL6jTgqU",
  authDomain: "chatapp-6d5e8.firebaseapp.com",
  databaseURL: "https://chatapp-6d5e8-default-rtdb.firebaseio.com",
  projectId: "chatapp-6d5e8",
  storageBucket: "chatapp-6d5e8.appspot.com",
  messagingSenderId: "338079618299",
  appId: "1:338079618299:web:f7653a4397c1836b25cc5e",
  measurementId: "G-P18P5YTYXZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
document.getElementById("msg").addEventListener("keydown", send1());

function send1(e){

}

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
  //document.getElementById("msg").focus();
  //document.getElementById("btn1").blur();
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code
        console.log(firebase_message_id);
        console.log(message_data);
        name1 = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> " + name1 + "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
        
        //End code
      }
    });
  });
}
getData();

function updateLike(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  if(likes==1){
    window.alert("You Already Liked, Why U Like It More???")
    document.getElementById("firebase_message_id").disabled=true
    
  }
  else{
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  });
  }
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}