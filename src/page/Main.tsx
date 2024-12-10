import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import { firebaseApp } from '@api/Firebase';
import { getDatabase, ref, onValue } from "firebase/database";
import 'bootstrap/dist/js/bootstrap.js'
import '@assets/bootstrap.scss';
import '@assets/all.scss'
import Header from '@components/Header';
import Footer from '@components/Footer';
import { DATABASEProps } from '@typeTS/dataBase'
export default function Main() {
  const NAV_LINK = [
    { name: 'HOME', link: '/' },
    { name: 'WEB', link: '/web' },
    { name: 'WEB DESIGN', link: '/webDesign' },
    { name: 'GRAPHIC DESIGN', link: '/graphic' },
  ]
  const [myDataBase, setMyDataBase] = useState<DATABASEProps[]>([]);
  const db = getDatabase(firebaseApp);
  const dbRef = ref(db)
  const getData = () => {
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setMyDataBase(data)
    });
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Header NAV_LINK={NAV_LINK} />
      <main>
        <Outlet context={{ myDataBase }} />
      </main>
      <Footer />
    </>
  )
}