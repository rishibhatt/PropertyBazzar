export default function convertToBase64(file){
    return new Promise((resolve, reject) => {
        const fileReader= new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

// Function to convert an array of images to Base64
export function convertImagesToBase64(files) {
    return Promise.all(
        files.map(file => convertToBase64(file))
    );
}