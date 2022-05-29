import Api from './core/index';

const S3Api = {
  async getImageUrl(imageFile: File): Promise<string> {
    const formData = new FormData();
    formData.append('imageFile', imageFile);

    return await Api.post('api/v1/s3/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
export default S3Api;
