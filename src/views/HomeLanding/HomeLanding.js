import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button';

export default function HomeLanding() {
    return (
        <div className="app_verticalCenter">
            <Link to='/services-selection' >
              <Button variant="raised" color="primary">
                Get a Free Online Quote
              </Button>
            </Link>
        </div>
    )
}
  
