import React, { useEffect, useState } from 'react'
import CustomInput from './../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from './../features/upload/uploadSlice';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { getCategories } from './../features/bcategory/bcategorySlice';
import { createBlogs } from '../features/blogs/blogSlice';
import { resetState } from './../features/blogs/blogSlice';

let schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    category: yup.string().required('Category is required'),
});

const AddBlog = () =>
{
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);

    useEffect(() =>
    {
        dispatch(getCategories());
    }, [dispatch]);

    const bCatState = useSelector((state) => state.bCategory.bCategories);
    const imgState = useSelector((state) => state.upload.images);
    const newBlog = useSelector((state) => state.blog);

    const { isSuccess, isError, isLoading, createdProduct } = newBlog;

    useEffect(() =>
    {
        if (isSuccess && createdProduct) {
            toast.success("Blog Added Successfully!");
        }

        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createdProduct]);

    const img = [];
    imgState.forEach((i) =>
    {
        img.push({
            public_id: i.public_id,
            url: i.url,
        })
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) =>
        {
            dispatch(createBlogs(values));
            formik.resetForm();
            setTimeout(() =>
            {
                dispatch(resetState());
            }, 3000);
        }
    });
    useEffect(() =>
    {
        formik.values.images = img;
    }, [img, formik.values]);

    return (
        <div>
            <h3 className="mb-4 title">Add Blog</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className='mt-4'>
                        <CustomInput type='text' label='Enter Blog Title'  
                            name='title'
                            onCh={formik.handleChange('title')}
                            onBl={formik.handleBlur('title')}
                            val={formik.values.title}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <select className='form-control py-3 mt-3 form-select' id=""
                        name="category"
                        onChange={formik.handleChange('category')}
                        onBlur={formik.handleBlur('category')}
                        value={formik.values.category}
                    >
                        <option value="" disabled>Select Blog Category</option>
                        {bCatState.map((i, j) =>
                        {
                            return (<option key={j} value={i.title}>{i.title}</option>);
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <ReactQuill theme="snow" name="description" className='mt-3'
                        onChange={formik.handleChange('description')}
                        value={formik.values.description}
                    />
                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <div className='bg-white border-1 p-5 text-center mt-3'>
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag and drop some files here, click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap mt-3 gap-3">
                        {imgState?.map((i, j) =>
                        {
                            return (
                                <div className='position-relative' key={j}>
                                    <button type='button' onClick={() => dispatch(delImg(i.public_id))} className='btn-close position-absolute' style={{ top: "10px", right: "10px" }}></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            );
                        })}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>Add Blog</button>
                </form>
            </div>
        </div>
    )
}

export default AddBlog;
