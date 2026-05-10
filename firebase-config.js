// Firebase 配置資訊
const firebaseConfig = {
  apiKey: "AIzaSyAClRIrmeRknM7dmS0Td0vX_fTi-eZgYPw",
  authDomain: "moxa-disc.firebaseapp.com",
  projectId: "moxa-disc",
  storageBucket: "moxa-disc.firebasestorage.app",
  messagingSenderId: "226760546744",
  appId: "1:226760546744:web:5c3b5b2e5482647f4cd74d",
  measurementId: "G-7XJRFWYP2B"
};

// 初始化 Firebase (使用相容模式以符合現有架構)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
