// import { useEffect, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { getDownloadURL, getStorage, ref } from "firebase/storage";

// const useFirebaseConfig = (filePath) => {
//   // Initialize Firebase
//   const app = initializeApp({
//     apiKey: "AIzaSyBhGNzCMq6Ry9baeT7QbkslIwmFLXku-FM",
//     authDomain: "musicapp-5037d.firebaseapp.com",
//     projectId: "musicapp-5037d",
//     storageBucket: "musicapp-5037d.appspot.com",
//     messagingSenderId: "113458820380",
//     appId: "1:113458820380:web:663fb17452cb70d00236d9",
//     measurementId: "G-6YPWVJ7DSR",
//   });

//   // Firebase storage reference
//   const storage = getStorage(app);
//   useEffect(() => {
//     const fetchFile = async () => {
//       try {
//         upload = await getDownloadURL(ref(storage, filePath));
//         console.log("Raza hi : ", upload);
//         return upload;
//       } catch (error) {
//         console.error("Error fetching file:", error.message);
//       }
//     };

//     fetchFile();
//   }, [storage, filePath]);

//   return upload
// };

// export default useFirebaseConfig;
