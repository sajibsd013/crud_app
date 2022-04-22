import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../Lib/API';



const CreateEdit = () => {


    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [location, setLocation] = useState(-1);
    const [date, setDate] = useState('');

    const onInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        switch (name) {
            case "name":
                setName(value);
                break;

            case "location":
                setLocation(value);
                break;

            case "date":
                setDate(value);
                console.log(date)
                break;

            default:
                break;
        }
    }


    const onFormSubmit = (event) => {
        event.preventDefault();
        let form_data = new FormData();

        form_data.append("Name", name);
        form_data.append("Location", location);
        form_data.append("Date", date);

        let API_URL = '';
        if (id) {
            API_URL = `/api/events/${id}/`;
            API.put(API_URL, form_data);
            navigate(-1);


        } else {
            API_URL = `/api/events/`;
            API.post(API_URL, form_data);
            navigate('/events/1');


        }

    }



    const setFormState = (event) => {
        const { Name, Location, Date } = event;
        const date = Date.slice(0, -4);

        setName(Name);
        setLocation(Location);
        setDate(date);

    }

    useEffect(() => {
        if (id) {
            const API_URL = `/api/events/${id}`;
            API.getOne(API_URL, setFormState);
        }

    }, [])


    return (
        <div className='my-2' >
            <div style={{ height: '70px' }}>
                {/* <Alert variant="danger" show={showAlert}>
                    <strong>Success! </strong>
                    <span>
                        Event Successfully Deleted...
                    </span>
                </Alert> */}
            </div>

            <Card className="shadow border-0 my-1">

                <Card.Header className='bg-white '>
                    <h5>Events</h5>
                    <div>
                        <small className='text-muted'>
                            {id ? 'Edit' : 'Create'} an events! - <small onClick={() => navigate(-1)} className='text-primary pointer'>Back</small>
                        </small>
                    </div>
                </Card.Header>
                <Form onSubmit={event => onFormSubmit(event)}>
                    <Card.Body>
                        <div className="row g-1 py-3">
                            <div className="col-12 ">
                                <label className="">Name</label>
                                <input type="text" name='name' className="form-control" value={name} onChange={event => onInputChange(event)} placeholder="Enter event name" required />
                            </div>
                            <div className="col-md-8 ">
                                <label >Location</label>
                                <select aria-label="Default select example" name="location" value={location} onChange={event => onInputChange(event)} className="form-select" required>
                                    <option disabled value="-1">Select Location</option>
                                    <option >Dhaka</option>
                                    <option >Sylhet</option>
                                    <option >London</option>
                                    <option >Khulna</option>
                                </select>
                            </div>
                            <div className="col-md-4 ">
                                <label className="">Date</label>
                                <input type="datetime-local" name='date' value={date} onChange={event => onInputChange(event)} className='form-control' required />
                            </div>
                        </div>

                    </Card.Body>


                    <Card.Footer className="d-flex justify-content-end py-3">
                        <button className='btn btn-primary ' type="submit">
                            {id ? 'Update' : 'Create'}
                        </button>
                    </Card.Footer>
                </Form>

            </Card>
        </div>
    )
}


export default CreateEdit;
