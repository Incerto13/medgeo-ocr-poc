const Vision = require("@google-cloud/vision");


const client = new Vision.ImageAnnotatorClient({
  keyFilename: '../service_account_creds.json'
})

export const googleVisionClient = async (fileName: string) : Promise<string[]> => {
    // const textAnnotations: string[] = []
    const res = await client.textDetection(fileName)
    const [{ textAnnotations }] = res
    const annotations = textAnnotations.map((text: any) => text.description)
    return annotations
    
    // .then((results: any) => {
    //     const annotations = results[0].textAnnotations

    //     console.log('Annoted Text:')
    //     annotations.forEach((text: any) => {
    //         // console.log(text.description)
    //         textAnnotations.push(text.description)
    //     })
    //     return textAnnotations
    // })
    // .catch((err: any) => {
    //     console.log('ERROR:', err)
    // })
}   