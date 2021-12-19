import {useState} from 'react'
import './App.css';

function App() {
  const [fileInfo, setFileInfo] = useState()
  const [imgSrc, setimgSrc] = useState(null)
  const fileSelect=(e)=>{
    //initialise
    const reader=new FileReader();
    //set what happens on load
    reader.onload=function(onLoadEvent){
      console.dir(onLoadEvent.target.result,'target.result')
      //file in readable format
      setimgSrc(onLoadEvent.target.result)
    }
    //pass file
    reader.readAsDataURL(e.target.files[0])

  }
  const fileSubmit=async(e)=>{
    //_________________________________________//
    e.preventDefault()

    //_________________________________________//
    //from all inputs find the input that holds image.
   const fileList= Array.from(e.currentTarget).filter(values=>values.name=='file')
    //FormData packages data to send in ~ FORM FORMAT
   const formData=new FormData();
   for (const file of fileList){
     console.dir(file)
     formData.append("file",file.files[0])
   }

   formData.append('upload_preset','basic_test')
   //send data to cloudinary
   //https://api.cloudinary.com/v1_1/demo/image/upload

   const data= await fetch('https://api.cloudinary.com/v1_1/testingaaronsrebelo/image/upload',{
     method:'POST',
     body:formData
   }).then(r=>r.json())

   //what I recieved from cloudinary
   console.log('data info',data)
   setFileInfo(data)

   //url of image stored in cloudinary
   console.log(data.secure_url)
   setimgSrc(data.secure_url)
   



  }
  return (
    <>
   <form onChange={fileSelect} onSubmit={fileSubmit}>
     <input type='file' name='file' />
     
     <input type="submit" value='submit' class="btn btn-default"/>
     
   </form>

{
   imgSrc && <img src={imgSrc} width={400}/>
}
   </>
  );
}

export default App;
