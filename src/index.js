import React from 'react'

import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import Users from './app/components/users.jsx';

const container = document.querySelector('#root')
const root = createRoot(container)

const App = () => {

    return <Users/>
           
}

root.render(<App/>)