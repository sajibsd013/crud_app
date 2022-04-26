import React, { useEffect, useState } from 'react'
import { Card, Form, Alert } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import API from '../../Lib/API'
import EventPagination from './EventPagination'
import EventTable from './EventTable'



const Events = () => {
    let { page } = useParams();
    const navigate = useNavigate();
    const goPageOne = () => {
        navigate("/events/1");
    }

    const [events, setEvents] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [totalEvents, setTotalEvents] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const onEventsChange = (events, loading, total) => {
        setEvents(events);
        setIsLoading(loading);
        setTotalEvents(total);
    }

    const onPageSizeChange = event => {
        const pageSize = event.target.value;
        goPageOne();
        setPageSize(pageSize);
    }
    const onDelete = (loading) => setIsLoading(loading);

    const onEventDelete = (id) => {
        const API_URL = `/api/events/${id}`;
        API.delete(API_URL, onDelete);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        navigate("/events/1");

    }


    useEffect(() => {
        document.title = `Events - Page ${page}`;
        const API_URL = `/api/events/?page=${page}&size=${pageSize}`;
        API.get(API_URL, onEventsChange);
    }, [pageSize, page, isLoading]);



    return (
        <div className=' container' >
            <div style={{ height: '70px' }} className="my-2">
                <Alert variant="danger" show={showAlert}>
                    <strong>Success! </strong>
                    <span>
                        Event Successfully Deleted...
                    </span>
                </Alert>
            </div>
            <Card className="shadow-lg border-0 my-1 ">

                <Card.Header className='bg-white'>
                    <h5 className='mt-1'>Events</h5>
                    <div>
                        <p className='_text_Color1'>
                            List of events! - <Link to="/events/create" className='text-decoration-none _text_Color2'>Create</Link>
                        </p>
                    </div>
                </Card.Header>

                <Card.Body>
                    <div className='d-flex align-items-center my-4'>
                        <h6>Show</h6>
                        <Form.Select aria-label="Default select example" value={pageSize} onChange={(event) => onPageSizeChange(event)} className='mx-2' style={{ maxWidth: "70px" }}>
                            <option value="5" >5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50" >50</option>
                        </Form.Select>
                        <h6>entries</h6>
                    </div>
                    <EventTable
                        events={events}
                        isLoading={isLoading}
                        onEventDelete={onEventDelete}
                    />
                </Card.Body>


                <Card.Footer className=" bg-white">
                    <EventPagination
                        totalEvents={totalEvents}
                        pageSize={pageSize}
                        currentPage={page}
                        isLoading={isLoading}
                    />
                </Card.Footer>
            </Card>


        </div>
    )


}
export default Events;
