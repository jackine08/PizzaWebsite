import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  console.log("entered"); //check
  const idRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("login handler called");
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      alert("아이디를 입력하세요!!!");
      idRef.current.focus();
      return false;
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("패스워드를 입력하세요!!!");
      pwRef.current.focus();
      return false;
    }

    console.log("now id:", idRef.current.value, "now pw:", pwRef.current.value);
    console.log(
      "LoginForm:window.sessionStorage(login_id) =>",
      window.sessionStorage.getItem("id")
    );

    const authObj = {
      id: idRef.current.value,
      password: pwRef.current.value,
    };

    axios
      .post("/auth/login_process", authObj)
      .then((res) => {
        console.log("handleLogin =>", res.data);
        if (res.data === "Customer") {
          //logined
          console.log("login as customer");
          window.sessionStorage.setItem("id", idRef.current.value); // 세션스토리지에 key : id , value : idRef.current.value로 저장
          // sessionsStorage는 창 닫으면 사라짐, localStorage는 안사라짐
          navigate("/OrderList");
        } else if (res.data === "Manager") {
          console.log("login as manager");
          window.sessionStorage.setItem("id", idRef.current.value);
          navigate("/");
          //home으로 이동해서 거기서 navbar새로고침되게 만들고 ordermanage,ingredient manage만 나오게 분기?
        } else {
          alert("아이디, 패스워드가 정확하지 않습니다.");
          idRef.current.value = "";
          pwRef.current.value = "";
          //navigate("/home");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleMemberForm = () => {
    navigate("/Register"); // 해당 url로 바로 이동
  };

  return (
    <div>
      <p></p>
      <form>
        <table border="1" width="300px" align="center">
          <tr>
            <td width="100px">아이디</td>
            <td align="left" width="200px">
              <input
                type="text"
                name="id"
                size="20"
                ref={idRef}
                placeholder="아이디를 입력하세요"></input>
            </td>
          </tr>
          <tr>
            <td width="100px">패스워드</td>
            <td align="left" width="200px">
              <input
                type="password"
                name="pw"
                size="20"
                ref={pwRef}
                placeholder="비밀번호를 입력하세요"></input>
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="center">
              <input type="button" value="로그인" onClick={handleLogin}></input>
              &nbsp;
              <input
                type="button"
                value="회원등록"
                onClick={handleMemberForm}></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Login;
