import sharp from 'sharp'

export const cropImage = async (base64Str: any) : Promise<any> => {
    try {
        let imgBuffer = Buffer.from(base64Str, 'base64');
        const croppedBuffer = await sharp(imgBuffer)
          .extract({ width: 140, height: 50, left: 100, top: 60  })
          .toBuffer()
        const croppedBase64Image = croppedBuffer.toString('base64')
        return croppedBase64Image
      } catch (error) {
        console.log(error);
      }
}
