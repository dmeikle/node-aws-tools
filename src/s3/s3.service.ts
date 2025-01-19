import AWS from 'aws-sdk';

class S3Service {
    private s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3();
    }

    async uploadFile(bucketName: string, key: string, body: Buffer | Uint8Array | Blob | string): Promise<AWS.S3.ManagedUpload.SendData> {
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: body,
        };

        try {
            return await this.s3.upload(params).promise();
        } catch (error) {
            console.error(`Error uploading file to S3: ${error.message}`);
            throw error;
        }
    }

    async readFile(bucketName: string, key: string): Promise<AWS.S3.GetObjectOutput> {
        const params = {
            Bucket: bucketName,
            Key: key,
        };

        try {
            return await this.s3.getObject(params).promise();
        } catch (error) {
            console.error(`Error reading file from S3: ${error.message}`);
            throw error;
        }
    }
}

export default S3Service;