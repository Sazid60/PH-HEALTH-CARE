
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import config from '../../config'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, '/tmp/my-uploads')
        cb(null, path.join(process.cwd(), "/uploads")) //C:\Users\Sazid\my-project\uploads

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

// for cloudinary 
const uploadToCloudinary = async (file: Express.Multer.File) => {
    console.log("file", file)

    cloudinary.config({
        cloud_name: config.cloudinary.cloud_name,
        api_key: config.cloudinary.api_key,
        api_secret: config.cloudinary.api_secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            file.path, {
            public_id: file.filename,
        }
        )
        .catch((error) => {
            console.log(error);
        });

    console.log({uploadResult});

    return uploadResult
}






export const fileUploader = {
    upload,
    uploadToCloudinary
}