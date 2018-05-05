import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeLanding() {
    return (
        <div>
            <Link to='/services-selection' ><button>Get a Free Online Quote!</button></Link>
        </div>
    )
}