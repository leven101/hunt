      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyA9gXNdPWd06x609xAv1Ciymgz8Gqs_nJ8",
        authDomain: "hunt-d0fb5.firebaseapp.com",
        databaseURL: "https://hunt-d0fb5.firebaseio.com",
        storageBucket: "hunt-d0fb5.appspot.com",
      };
      firebase.initializeApp(config);
      App.controller('SignUp', function (page) {
          $(page)
              .find('#btnSignUp')
              .on('click', function() {
                  var email = $('#btnEmail').val();
                  var password = $('#btnPassword').val();
            if(email && password) {
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // [START_EXCLUDE]
                  if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                  } else {
                    console.error(error);
                    alert(error);
                  }
                  // [END_EXCLUDE]
                });
            } else {
             App.dialog({
                    title: 'Validation Error',
                    text: 'Please enter username and password.',
                    okButton: 'Try Again',
                    cancelButton: 'Cancel'
                }, function (tryAgain) {
                    if (tryAgain) {
                        App.load('SignUp');
                    } else {
                        App.load('home');
                    }
                });
            }
         });
      });
      try {
        App.restore(); // it loads/restores the app
      } catch (err) {
        App.load('home'); // in case of error it loads the default page
      }

