import React, { Component } from 'react'
import { render } from 'react-dom'
import KanbanBoard from '@/components/KanbanBoard'


import { useState } from 'react';
import { pages } from 'next/dist/build/templates/app-page';
import LoginPage from '@/pages/login';
import MyApp from '@/pages/_app';


export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <p>Click on the links above to navigate to different pages.</p>
      <MyApp/>
      <LoginPage/>
      
     
    
       
    </div>
    

  )
}