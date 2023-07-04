import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAEnquiry, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import { BiArrowBack } from "react-icons/bi";
const ViewEnq = () =>
{
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getEnqId = location.pathname.split("/")[3];

    const enqState = useSelector((state) => state.enquiry);
    const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;

    useEffect(() => {
        dispatch(resetState());
        dispatch(getAEnquiry(getEnqId));
    }, [getEnqId, dispatch]);

    const goBack = () => {
        navigate(-1);
    };

    const setEnquiryStatus = (e, i) => {
        const data = {id: i, enqData: e};
        dispatch(updateAEnquiry(data));
        dispatch(resetState());
        setTimeout(() => {
            dispatch(getAEnquiry(getEnqId));
        }, 100);
    };
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-4 title">View Enquiry</h3>
                <button className='bg-transparent border-0 align-items-center d-flex mb-0 gap-1' onClick={goBack}>
                    <BiArrowBack className='fs-6'/> Go Back
                </button>
            </div>
            <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Name: </h6>
                    <p className='mb-0'>{enqName}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Mobile: </h6>
                    <p className='mb-0'><a href={`tel:+84${enqMobile}`}>{enqMobile}</a></p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Email: </h6>
                    <p className='mb-0'><a href={`mailto:${enqEmail}`}>{enqMobile}</a></p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Comment: </h6>
                    <p className='mb-0'>{enqComment}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Status: </h6>
                    <p className='mb-0'>{enqStatus}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className='mb-0'>Change Status: </h6>
                    <div>
                        <select name="" defaultValue={enqStatus ? enqStatus : "Submitted"} 
                            className='form-control form-select' id=""
                            onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
                        >
                            <option value="Submitted" selected>Submitted</option>
                            <option value="Contacted" selected>Contacted</option>
                            <option value="In Progress" selected>In Progress</option>
                            <option value="Resolved" selected>Resolved</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEnq;
