import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

function VC() {
  const [VC_value, setValue] = useState('simple');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setValue(result);
    },
  });



  return (
    <div>
      <div>{VC_value}</div>
      <button onMouseDown={listen} onMouseUp={stop}>
        🎤      {listening && <p>음성인식 활성화 중</p>}
      </button>

    </div>
  );
}

export default VC;
