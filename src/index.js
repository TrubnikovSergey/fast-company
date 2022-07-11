import React from 'react'

import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import TablePatyGuys from './components/tablepatyguys';

const container = document.querySelector('#root')
const root = createRoot(container)

const App = () => {

    return <TablePatyGuys/>
           
}

root.render(<App/>)