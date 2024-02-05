const aws = require('aws-sdk');
const fs = require('fs');

const storeInBucket = async (id) => {
  const s3 = new aws.S3({
    accessKeyId: 'AKIASSHHCCEQDS2OWMVY',
    secretAccessKey: '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',
  });
  const fileContent = fs.readFileSync(`/tmp/emergency_${id}.pdf`)
  const bucketName = 'pdfs-emergencies'
  const objectKey = `emergency_${id}.pdf`

  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: fileContent,
    ContentType: 'application/pdf'
  }

  await s3.upload(params, (err, data) => {
    if (err) {
      reject(err)
    }
  }).promise()

  return { objectKey, bucketName, objectUrl: `https://${bucketName}.s3.amazonaws.com/${objectKey}` }
};

exports.storeInBucket = storeInBucket;