import { MyUtil } from './my_util'

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')  
const s3 = new S3Client({
  region: process.env.REACT_APP_S3_REGION,
  credentials:{accessKeyId:process.env.REACT_APP_S3_ID,secretAccessKey:process.env.REACT_APP_S3_SECRET}
})
 
async function uploadFile(file_name, file) {
  try {
    const imageUri = `${file_name}`
    const objectParams = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Body: await MyUtil.toBase64(file),
      ContentType: file.type,
      Key: imageUri,
      ACL: 'public-read'
    }
    const data = await s3.send(new PutObjectCommand(objectParams))
    console.log(data);
    return process.env.REACT_APP_S3_URL + imageUri
  } catch (error) {
    console.log('uploading file to S3:\n\t' + error.message)
  }
} 

export {uploadFile}