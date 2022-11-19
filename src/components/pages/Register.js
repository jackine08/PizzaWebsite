import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Register = () => {
  const navigate = useNavigate();
  const idRef = useRef();
  const pwRef = useRef();
  const nameRef = useRef();
  const creditRef = useRef();
  const phoneRef = useRef();
  const addrRef = useRef();

  const regiHandler = () => {
    var sendObj = {
      id: idRef.current.value,
      password: pwRef.current.value,
      name: nameRef.current.value,
      credit: creditRef.current.value,
      phone: phoneRef.current.value,
      address: addrRef.current.value,
    };
    console.log(sendObj);
    axios.post("auth/signin_process", sendObj).then((res) => {
      if (res.data === "ID Fail") {
        //아이디 중복
        alert("아이디가 중복 되었습니다.");
      } else if (res.data === "Fail") {
        //입력 오류? DB insert fail
        alert("입력을 확인 해주세요");
      } else {
        //가입 성공 홈으로 이동
        alert("회원가입을 축하드립니다.");
        navigate("/");
      }
    });
  };
  return (
    <div>
      <form>
        <p>
          <input type="text" name="id" ref={idRef} placeholder="id" />
        </p>
        <p>
          <input
            type="password"
            name="password"
            ref={pwRef}
            placeholder="password"
          />
        </p>
        <p>
          <input type="text" name="name" ref={nameRef} placeholder="name" />
        </p>
        <p>
          <input
            type="text"
            name="credit"
            ref={creditRef}
            placeholder="credit"
          />
        </p>
        <p>
          <input
            type="number"
            name="phone"
            ref={phoneRef}
            placeholder="phone"
          />
        </p>
        <p>
          <input
            type="text"
            name="address"
            ref={addrRef}
            placeholder="address"
          />
        </p>
        <p>
          <input type="button" value="signin" onClick={regiHandler} />
        </p>
      </form>
    </div>
  );
};

export default Register;
