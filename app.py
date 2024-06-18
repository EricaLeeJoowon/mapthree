from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)
CORS(app)

# GPT-2 모델 및 토크나이저 로드
model_name = 'gpt2'  # 또는 'gpt2-medium', 'gpt2-large', 'gpt2-xl'
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# 프리셋 응답 정의
preset_responses = {
    "서울역 휠체어 리프트 위치가 어디야?": "서울역 휠체어 리프트는 지하 2층 중앙홀 근처에 위치해 있습니다.",
    "숙대입구역에 휠체어 리프트 어디 있어?": "숙대입구역에는 휠체어 리프트가 존재하지 않습니다.",
    "효창공원앞역에 휠체어 리프트 어디 있어?": "효창공원앞역에는 3번 출구 쪽에 휠체어 리프트가 있습니다."

}

@app.route('/openai/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_message = data.get('message').strip()
    print(f"Received message: {user_message}")  # 디버깅용 출력 추가

    # 프리셋 응답 확인
    for question, response in preset_responses.items():
        if question in user_message:
            return jsonify({'reply': response})

    # 입력 텍스트에 프롬프트 추가
    prompt = f"Q: {user_message}\nA: "
    
    # 입력 텍스트 토크나이징
    inputs = tokenizer.encode(prompt, return_tensors='pt')

    # 모델에 입력 텍스트를 전달하여 출력 생성
    outputs = model.generate(
        inputs,
        max_length=150,
        num_return_sequences=1,
        no_repeat_ngram_size=2,
        pad_token_id=tokenizer.eos_token_id,
        temperature=0.7,  # 다양성 조절
        top_p=0.9,       # nucleus sampling
        top_k=50         # top-k 샘플링
    )
    
    # 출력 텍스트 디코딩
    response_message = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # "Q: " 및 "A: " 텍스트 제거
    response_message = response_message.replace("Q: ", "").replace("A: ", "").strip()

    return jsonify({'reply': response_message})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
