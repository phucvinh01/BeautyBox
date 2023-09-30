import React, { useState, useContext, useEffect } from 'react';
import './Uploads.css'
function Upload(props) {
    const [error, setErrors] = useState(null);
    const [preview, setPreview] = useState(null);
    const { setImage, value } = props

    useEffect(() => {
        return () => {
            preview && URL.revokeObjectURL(preview)
        }
    }, [preview])

    const handlePreview = (file) => {
        const pr = URL.createObjectURL(file)
        setPreview(pr)
    }

    useEffect(() => {
        if (value) {
            setPreview(value)
            setImage(value)
        }
    }, [value])


    const handleUpload = (file, type) => {
        if (type == "image/jpeg" || type == "image/png") {
            handlePreview(file)
            setImage(file)
            setErrors(null)
        }
        else {
            setErrors("Please upload an image file.")
            setImage(null)
        }
    }

    return (
        <>

            <div style={{ height: "232px" }}>
                {error && <><p>{error}</p></>}
                {preview && <img id='imgUpload' className='rounded-2 z-3 position-absolute' style={{ height: "232px", width: "210px" }} src={preview} />}
            </div>
            <input id='inputFile' type="file" className='w-100'
                onChange={(event) => {
                    // setImage(event.target.files[0])
                    handleUpload(event.target.files[0], event.target.files[0].type)

                }}

            />

        </>
    );
}
export default Upload;