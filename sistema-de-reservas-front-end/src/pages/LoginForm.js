
import React from 'react';
import {Link} from 'react-router-dom';

class LoginForm extends React.Component{
    constructor(){
    super();
    };
    render(){
        return(
    <div className="col-lg-12 text-center">
            <h2>Login Form</h2>
            <button onclick="myFunction()">Loginn</button>
            <div class="div_black">
        <div id="id01" class="modal">
                <span onclick="document.getElementById('id01').style.display='none'"></span>
            <form className="modal-content animate" action="/action_page.php" method="post">
                <div class="imgcontainer">
                    <img src="img_avatar2.png" alt="Avatar" class="avatar"/>
                </div>
                <div class="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required/>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required/>

                    <button type="submit">Login</button>
                    <label>
                        <input type="checkbox" checked="checked" name="remember"/> Remember me
                    </label>
                    </div>

                    <div class="container">
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
                    <span class="psw">Forgot <a href="#">password?</a></span>
                </div>
            </form>
         </div>
         </div>
    </div>
    );
        var modal = document.getElementById('id01');
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        function myFunction() {
            modal.style.display ='block';
          }
    }
}

export default LoginForm;