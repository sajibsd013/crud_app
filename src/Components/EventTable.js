import React, { Component } from 'react'
import { Spinner, Table } from 'react-bootstrap';

export default class EventTable extends Component {

    render() {
        const { events, isLoading } = this.props;

        if (isLoading) {
            return (
                <div className='d-flex p-5'>
                    <Spinner className='mx-auto' animation="grow" />
                </div>
            )
        }
        else {
            return (
                <div>
                    <Table size="sm">
                        <thead className=''>
                            <tr className='text-secondary'>
                                <th className='border-0'>Name</th>
                                <th className='border-0'>Location</th>
                                <th className='border-0'>Time</th>
                                <th className='border-0'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='border-0'>
                            {
                                events.map(event => {
                                    return (
                                        <tr key={event.id} className=''>
                                            <td className='border-0 '>{event.Name}</td>
                                            <td className='border-0'>{event.Location}</td>
                                            <td className='border-0'>{event.Date}</td>
                                            <td className='border-0'>
                                                <a href="#" className='text-decoration-none me-2'>Edit</a>
                                                <a href="#" className='text-decoration-none'>Delete</a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </Table>

                </div>
            )
        }

    }
}
