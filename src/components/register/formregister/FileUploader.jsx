import React, {useState} from 'react'
import './FileUploader.sass'

const FileUploader = ({onFileSelectSuccess,onFileSelectError, errorMessage}) => {
    const [fileName, setFileName] = useState({
        fileName:'Upload your photo',
        isActive: false
    })
    const handleFileInput = (e) => {
        const file = e.target.files[0]
        var format = file.name.split('.')[1];
        console.log(file)
        console.log(file.name)
        console.log(format) 
        if(format === 'jpeg' || format === 'jpg'){
            if(file.size > 5000000){
                console.log('The photo may not be greater than 5 Mbytes.')
                onFileSelectError({ error: "The photo may not be greater than 5 Mbytes." })
            }else {
                onFileSelectSuccess(file)
                setFileName({fileName: file.name, isActive: true})
            }}
        else if(format !== 'jpeg' || format !== 'jpg'){
            console.log('The photo format must be jpeg/jpg type.')
            onFileSelectError({error:'The photo format must be jpeg/jpg type.'}); 
        }
    }

    return (

            <label>
            <input className='default-input-file' type="file" onChange={handleFileInput} />
            <div className={errorMessage? 'custom-input-file error-uploader-style' : 'custom-input-file'}>
                <div className={errorMessage? 'upload-button button-uploader-error' : 'upload-button'}>
                    Upload
                    </div>
                <div className={fileName.isActive? 'uploaded-file active':'uploaded-file'}>{fileName.fileName}</div>
            </div>
            </label>
    )
}
export default FileUploader