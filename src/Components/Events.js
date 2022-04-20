import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import API from '../Lib/API'
import EventPagination from './EventPagination'
import EventTable from './EventTable'



const Events = (props) => {
    let { page } = useParams();
    const navigate = useNavigate();
    const goPageOne = () => {
        navigate("/events/1");
    }


    const [events, setEvents] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [totalEvents, setTotalEvents] = useState(0);
    const [isLoading, setIsLoading] = useState(false);



    const onEventsChange = (events, loading, total) => {
        setEvents(events);
        setIsLoading(loading);
        setTotalEvents(total);
    }


    useEffect(() => {
        API.get(page, pageSize, onEventsChange);
    }, [pageSize, page]);


    const onPageSizeChange = event => {
        const pageSize = event.target.value;
        goPageOne();
        setPageSize(pageSize);
    }



    return (
        <div className='mt-5'>
            <Card className="shadow border-0 ">
                <Card.Header className='bg-white '>
                    <h5>Events</h5>
                    <div>
                        <small className='text-muted'>
                            Life of events! - <Link to="/create" className='text-decoration-none'>Create</Link>
                        </small>
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
                    <EventTable events={events} isLoading={isLoading}></EventTable>
                </Card.Body>


                <Card.Footer className=" bg-white ">
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
