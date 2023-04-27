import sharp from 'sharp'

export const cropImage = async (base64Str: any) : Promise<any> => {
    try {
        let imgBuffer = Buffer.from(base64Str, 'base64');
        const croppedBuffer = await sharp(imgBuffer)
          .extract({ width: 200, height: 60, left: 60, top: 60  })
          .toBuffer()
        const croppedBase64Image = croppedBuffer.toString('base64')
        return croppedBase64Image
      } catch (error) {
        console.log(error);
      }
}
