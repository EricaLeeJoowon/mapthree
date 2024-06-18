import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

function ClassifyPage() {
  const [model, setModel] = useState(null);
  const [predictionMessage, setPredictionMessage] = useState('');
  const webcamRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadLayersModel('/model/model.json');
        setModel(model);
        console.log('모델이 성공적으로 로드되었습니다.');
      } catch (error) {
        console.error('모델 로드 중 오류 발생:', error);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    const startWebcam = async () => {
      if (navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          webcamRef.current.srcObject = stream;
        } catch (error) {
          console.error('웹캠 시작 중 오류 발생:', error);
        }
      }
    };

    startWebcam();
  }, []);

  const handlePredict = async () => {
    if (!model) {
      alert('모델이 로드되지 않았습니다.');
      return;
    }

    const video = webcamRef.current;
    const imgTensor = tf.browser.fromPixels(video).toFloat();
    const resizedImgTensor = tf.image.resizeBilinear(imgTensor, [150, 150]);
    const normalizedImgTensor = resizedImgTensor.div(tf.scalar(255.0));
    const batchedImgTensor = normalizedImgTensor.expandDims();

    const predictions = await model.predict(batchedImgTensor).data();
    const prediction = predictions[0];

    if (prediction > 0.5) {
      setPredictionMessage('장애인복지카드가 맞습니다.');
    } else {
      setPredictionMessage('장애인복지카드가 아닙니다.');
    }
  };

  return (
    <div className="App">
      <h1>실시간 이미지 분류기</h1>
      <video ref={webcamRef} autoPlay playsInline width="640" height="480" />
      <button onClick={handlePredict}>예측</button>
      {predictionMessage && (
        <div>
          <h2>예측 결과:</h2>
          <p>{predictionMessage}</p>
        </div>
      )}
    </div>
  );
}

export default ClassifyPage;
