import express from "express";
import bcrypt from "bcrypt";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMDFDZ2N97RHZYYkdUznD02lI8UyPCJsY",
  authDomain: "e-commerce-v1-cd484.firebaseapp.com",
  projectId: "e-commerce-v1-cd484",
  storageBucket: "e-commerce-v1-cd484.appspot.com",
  messagingSenderId: "581731677893",
  appId: "1:581731677893:web:a9675b3f52bca7437be2ac",
};

////////////Initialize Firebase///////////
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
//init server
const app = express();
///////////////////midlleware/////////////
app.use(express.static("public"));
app.use(express.json());
///////////aws for add-product/////////////
import aws from "aws-sdk";
import "dotenv/config";
//aws setup//

//////////////////routes//////////////
//home route//
app.get("/", (req, res) => {
  res.sendFile("html/index.html", {
    root: "public",
  });
});

//  app.get("/index.html", (req, res) => {
//    res.sendFile("html/index.html", {
//      root: "public",
//    });
//  });

///////////////////////////////////////////
///////////////////signup
app.get("/signup", (req, res) => {
  res.sendFile("html/signup.html", {
    root: "public",
  });
});
app.post("/signup", (req, res) => {
  const { name, email, password, number, tac } = req.body;
  //form validtaion//
  if (name.length < 3) {
    res.json({ alert: "name must be 3 letters long" });
  } else if (!email.length) {
    res.json({ alert: "enter your email" });
  } else if (password.length < 5) {
    res.json({ alert: "enter your password and at least 5 letter long" });
  } else if (!Number(number) || number.length < 10) {
    res.json({ alert: "invalid number" });
  } else if (!tac) {
    res.json({ alert: "you must agree with terms and conditin" });
  }
  ////////////////////////////////
  //if they have alredy account//
  else {
    const users = collection(db, "users");
    getDoc(doc(users, email)).then((user) => {
      if (user.exists()) {
        return res.json({ alert: "email already exists" });
      } else {
        //pass
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            req.body.seller = false;
            //set the code
            setDoc(doc(users, email), req.body).then((data) => {
              res.json({
                name: req.body.name,
                email: req.body.email,
                seller: req.body.seller,
              });
            });
          });
        });
      }
    });
  }
});

////////////////////////////////
//seller server//
app.get("/seller", (req, res) => {
  res.sendFile("html/seller.html", {
    root: "public",
  });
});
//seller post
app.post("/seller", (req, res) => {
  let { name, adress, about, number, email } = req.body;
  if (
    !name.length ||
    !adress.length ||
    !about.length ||
    number.length < 10 ||
    !Number(number)
  ) {
    return res.json({ alert: "some information is/are incorrect" });
  }
  // seller data update
  else {
    const sellers = collection(db, "seller");
    setDoc(doc(sellers, email), req.body).then((data) => {
      const users = collection(db, "users");
      updateDoc(doc(users, email), {
        seller: true,
      }).then((data) => {
        res.json({ seller: true });
      });
    });
  }
});

////login
//login server
app.get("/login", (req, res) => {
  res.sendFile("html/login.html", {
    root: "public",
  });
});
////login message for user
app.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (!email.length || !password.length) {
    return res.json({ alert: "fill the inputs" });
  }
  const users = collection(db, "users");
  getDoc(doc(users, email)).then((user) => {
    if (!user.exists()) {
      return res.json({ alert: "email doesnt exists" });
    } else {
      bcrypt.compare(password, user.data().password, (err, result) => {
        if (result) {
          let data = user.data();
          return res.json({
            name: data.name,
            email: data.email,
            seller: data.seller,
          });
        } else {
          return res.json({ alert: "password is inccorect" });
        }
      });
    }
  });
});
//////////////////////
///////////////////////////////////
//dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile("html/dashboard.html", {
    root: "public",
  });
});
///////////////////////////////////
//shop
app.get("/shop", (req, res) => {
  res.sendFile("html/shop.html", {
    root: "public",
  });
});
///////////////////////
//ad-product
app.get("/add-product", (req, res) => {
  res.sendFile("html/add-product.html", {
    root: "public",
  });
});
///////////////////////////
//product
app.get("/product", (req, res) => {
  res.sendFile("html/sproduct.html", {
    root: "public",
  });
});

/////////////////////
//404
app.get("/404", (req, res) => {
  res.sendFile("html/404.html", {
    root: "public",
  });
});
app.use((req, res) => {
  res.redirect("/404");
});

//product details routs
// app.get("/sproduct.html", (req, res) => {
//   res.sendFile("html/sproduct.html", {
//     root: "public",
//   });
// });
///////////////////////////
//port
app.listen(4000, () => {
  console.log("listening server 300");
});
