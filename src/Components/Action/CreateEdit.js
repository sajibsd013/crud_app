
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../Lib/API';
import dateFormat from "dateformat";




const CreateEdit = () => {


    const { id } = useParams();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({ Location: "-1" });
    const [nameError, setNameError] = useState('');
    const [locError, setLocError] = useState('');
    const [dateError, setDateError] = useState('');


    const formValidation = () => {
        if (formData["Name"]) {
            setNameError(false);
        } else {
            setNameError(true);
        }

        if (formData["Date"]) {
            setDateError(false);
        } else {
            setDateError(true);
        }

        if (formData["Location"] == -1) {
            setLocError(true)
        } else {
            setLocError(false);
        }


    }



    const handleSubmit = (event) => {
        event.preventDefault();
        formValidation();


        if (formData["Date"] && formData["Date"] && formData["Location"] != -1) {
            let API_URL = '';
            if (id) {
                API_URL = `/api/events/${id}/`;
                API.put(API_URL, formData);
                navigate(-1);


            } else {
                API_URL = `/api/events/`;
                API.post(API_URL, formData);
                navigate('/events/1');

            }
        }


    }


    const onInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({
            ...formData,
            [name]: value,
        })
        switch (name) {
            case "Name":
                setNameError(false);
                break;
            case "Date":
                setDateError(false);
                break;
            case "Location":
                setLocError(false);
                break;

            default:
                break;
        }

    }

    const setFormState = ({ Name, Location, Date }) => {

        const date = dateFormat(Date, "UTC:yyyy-mm-dd'T'HH:MM");
        setFormData({
            ...formData,
            ["Name"]: Name,
            ["Location"]: Location,
            ["Date"]: date,
        })


    }

    useEffect(() => {
        if (id) {
            document.title = `Edit Event`;
            const API_URL = `/api/events/${id}`;
            API.getOne(API_URL, setFormState);
        } else {
            document.title = `Create Event`;
        }


    }, [])

    const { Name, Location, Date } = formData;


    return (
        <div className='my-2 container' >
            <div style={{ height: '70px' }}>
                {/* <Alert variant="danger" show={showAlert}>
                    <strong>Success! </strong>
                    <span>
                        Event Successfully Deleted...
                    </span>
                </Alert> */}

            </div>



            <Card className="shadow-lg border-0 my-1">

                <Card.Header className='bg-white '>
                    <h5 className='mt-1'>Events</h5>
                    <div>
                        <p className='_text_Color1'>
                            {id ? 'Edit' : 'Create'} an event! - <a onClick={() => navigate(-1)} className='_text_Color2 text-decoration-none pointer'>Back</a>
                        </p>
                    </div>
                </Card.Header>
                <Form onSubmit={handleSubmit}>
                    <Card.Body>

                        <Row className="g-2">
                            <Form.Group as={Col} md={12} controlId="validationName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Event Name"
                                    value={Name}
                                    onChange={event => onInputChange(event)}
                                    name="Name"
                                    isInvalid={nameError}


                                />
                                <Form.Control.Feedback type="invalid">
                                    Please type event name!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="8" controlId="validationLocation">
                                <Form.Label>Location  </Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={Location}
                                        isInvalid={locError}
                                        onChange={event => onInputChange(event)}
                                        name="Location"
                                    >
                                        <option disabled value="-1">Select Location</option>
                                        <option >Russia</option>
                                        <option >El Salvador</option>
                                        <option >United States</option>
                                        <option >Macedonia</option>
                                        <option >China</option>

                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please select location.
                                    </Form.Control.Feedback>

                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationDate">
                                <Form.Label>Date</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="datetime-local"
                                        name="Date"
                                        aria-describedby="inputGroupPrepend"
                                        isInvalid={dateError}
                                        value={Date}
                                        onChange={event => onInputChange(event)}


                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose date.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>


                    </Card.Body>


                    <Card.Footer className="d-flex justify-content-end py-3 border-0">
                        <button className='btn submit_btn px-3' type="submit">
                            {id ? 'Update' : 'Create'}
                        </button>
                    </Card.Footer>
                </Form>

            </Card>
        </div >
    )
}


export default CreateEdit;
