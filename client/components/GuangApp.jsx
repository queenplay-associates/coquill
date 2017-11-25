import React, { Component } from 'react'
import GuangAppDetail from './GuangAppDetail.jsx'
import fire from '~/public/secrets'
const db = fire.database()

const GuangApp = () => (
    <div>
        <h1> 🔥 </h1>
        <GuangAppDetail fireRef={db.ref().child('screenplay')} />
    </div>
)
export default GuangApp
