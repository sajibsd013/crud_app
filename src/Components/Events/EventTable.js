import React, { Component } from 'react'
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";

export default class EventTable extends Component {
    state = {
        showModal: false,
        deleteEvent: 0,
    }

    render() {
        const { events, isLoading, onEventDelete } = this.props;
        const onDeleteClick = (id) => this.setState({ showModal: true, deleteEvent: id })

        if (isLoading) {
            return (
                <div className='d-flex p-5'>
                    <Spinner className='mx-auto' animation="grow" />
                </div>
            )
        }
        else {
            const handleClose = () => this.setState({ showModal: false, deleteEvent: 0 });
            const handleDelet = (id) => {
                this.setState({ showModal: false, deleteEvent: 0 });
                onEventDelete(id);
            };
            return (
                <div>
                    <Modal show={this.state.showModal} onHide={handleClose}>
                        <Modal.Body className='py-4 text-center'>
                            <h6>Are you sure you want to delete this Event Instance?</h6>
                        </Modal.Body>
                        <Modal.Footer className='py-2'>
                            <Button variant="outline-secondary" onClick={handleClose}>
                                Cencle
                            </Button>
                            <Button variant="danger" onClick={() => handleDelet(this.state.deleteEvent)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Table size="sm">
                        <thead className=''>
                            <tr className='_text_Color1 '>
                                <th className='border-0 '>Name</th>
                                <th className='border-0 '>Location</th>
                                <th className='border-0'>Time</th>
                                <th className='border-0'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='border-0'>
                            {
                                
                                events.map(({ id, Name, Location, Date }) => {
                                    const updateURL = `/Events/edit/${id}`;
                                    return (
                                        <tr key={id} className=''>
                                            <td className=' _table_date pt-4'>{Name}</td>
                                            <td className='border-0 pt-4'>{Location}</td>
                                            <td className='_table_date pt-4'>{dateFormat(Date, "UTC:mmm dd, yyyy - HH:MM:ss Z")}</td>
                                            <td className='_table_date pt-4 d-flex flex-column flex-md-row'>
                                                <Link to={updateURL} className='text-decoration-none _text_Color2 link_weight me-2'>Edit</Link>
                                                <a className='_text_Color2 text-decoration-none pointer link_weight' onClick={() => onDeleteClick(id)}>Delete</a>
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
