import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdCYDAN-pqhjtiKN9Wo9dcfwntsrZOYdI",
  authDomain: "memories-re.firebaseapp.com",
  projectId: "memories-re",
  storageBucket: "memories-re.appspot.com",
  messagingSenderId: "367834969081",
  appId: "1:367834969081:web:44a1a633ce5d47a1b04328",
  measurementId: "G-DHKTVG12CZ"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
/*
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };*/

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const firestore = firebase.firestore();
export const firestorage = firebase.storage();
