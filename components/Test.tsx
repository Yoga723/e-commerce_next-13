"use client"
import React from 'react'
import { Hero } from '.'
import { BrowserRouter, HashRouter } from "react-router-dom";

const Test = () => {
  return (
    <HashRouter>
    <Hero/>
  </HashRouter>
  )
}

export default Test