require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const replaceExt = require("replace-ext");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

// s3 config
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

// upload file to s3 bucket
const uploadFile = (file) => {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    };

    return s3.upload(uploadParams).promise();
};
exports.uploadFile = uploadFile;

// modify file extension on s3 bucket
const modifyExtension = (data) => {
    const fileNameWithNewExt = replaceExt(data.name, data.data);

    return s3
        .copyObject({
            Bucket: bucketName,
            CopySource: `${bucketName}/${data.key}`,
            Key: `${data.key + "-" + fileNameWithNewExt}`,
        })
        .promise()
        .then(() =>
            s3
                .deleteObject({
                    Bucket: bucketName,
                    Key: data.key,
                })
                .promise()
        );
};
exports.modifyExtension = modifyExtension;
