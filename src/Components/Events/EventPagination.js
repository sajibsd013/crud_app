import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { Pagination, Spinner } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';


export default class EventPagination extends Component {

    render() {
        const { isLoading } = this.props;

        if (isLoading) {
            return (
                <div className="d-flex justify-content-center py-2">
                    <Spinner animation="border" size="sm" />
                </div>
            )
        } else {
            const { totalEvents, pageSize, currentPage } = this.props;

            const totalPage = totalEvents / pageSize;
            let pageNumbers = [];

            for (let i = 1; i <= Math.ceil(totalPage); i++) {
                pageNumbers.push(i);
            }

            const active_class = "page-item page-link active-link";
            const others_class = "page-item page-link text-muted";

            let PagiNation = null;
            if (pageNumbers.length > 6) {
                let fPageNumbers = pageNumbers.slice(0, 3);
                let lPageNumbers = pageNumbers.slice(-3);

                let InnerPN = (
                    <Pagination.Ellipsis />
                )
                const cp = parseInt(currentPage);

                if (fPageNumbers.indexOf(cp) == -1 && lPageNumbers.indexOf(cp) == -1) {
                    const url = `/events/${cp}`;

                    InnerPN = (
                        <span className='d-flex'>
                            <Pagination.Ellipsis />
                            <NavLink className={(navInfo) => navInfo.isActive ? active_class : others_class} to={url}>{cp}</NavLink>
                            <Pagination.Ellipsis />
                        </span>

                    )

                }


                PagiNation = (
                    <span className='d-flex'>
                        {
                            fPageNumbers.map((page) => {
                                const url = `/events/${page}`;

                                return (
                                    <NavLink key={page}  className={(navInfo) => navInfo.isActive ? active_class : others_class} to={url}>{page}</NavLink>

                                )
                            })
                        }
                        {InnerPN}
                        {
                            lPageNumbers.map((page) => {
                                const url = `/events/${page}`;

                                return (
                                    <NavLink key={page}  className={(navInfo) => navInfo.isActive ? active_class : others_class} to={url}>{page}</NavLink>
                                )
                            })
                        }
                    </span>
                )


            } else {
                PagiNation = (
                    <span className='d-flex'>
                        {
                            pageNumbers.map((page) => {
                                const url = `/events/${page}`;
                                return (
                                    <NavLink key={page} className={(navInfo) => navInfo.isActive ? active_class : others_class} to={url}>{page}</NavLink>
                                )
                            })
                        }
                    </span>
                )

            }


            const PrevURL = `/events/${parseInt(currentPage) - 1}`;
            const NextURL = `/events/${parseInt(currentPage) + 1}`;
            if (totalEvents != 0) {
                return (
                    <div className='d-flex flex-md-row flex-column   justify-content-between align-items-center py-3'>
                        <p className='my-1 text-muted'> Showing <span className='_footer_text_weight'>{pageSize * currentPage - pageSize + 1}</span> to <span className='_footer_text_weight'> {pageSize * currentPage <= totalEvents ? pageSize * currentPage : totalEvents}</span> out of <span  className='_footer_text_weight'>{totalEvents}</span> results</p>

                        <Pagination className='my-1'>
                            <li className={currentPage == 1 ? "page-item disabled" : "page-item text-muted"} >
                                <NavLink className='page-link text-muted ' to={PrevURL} > <FontAwesomeIcon icon={faAngleLeft} /> Previous</NavLink>
                            </li>
                            {PagiNation}
                            <li className={currentPage == pageNumbers.length ? "page-item disabled" : "page-item "} >
                                <NavLink className='page-link text-muted' to={NextURL} >Next <FontAwesomeIcon icon={faAngleRight} /></NavLink>
                            </li>

                        </Pagination>
                    </div>

                )

            }else{
                return(
                    <h6 className='text-center text-mute '>No Events</h6>
                )
            }
        }

    }
}
