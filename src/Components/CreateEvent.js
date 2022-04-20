import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class CreateEvent extends Component {
    render() {
        return (
            <div>
                Life of events! - <Link to="/events/1" className='text-decoration-none'>Create</Link>

            </div>
        )
    }
}
