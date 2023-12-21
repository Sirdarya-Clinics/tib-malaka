'use client'

import { redirect } from 'next/navigation';
import { useAuth } from "../../providers/AuthProvider"
import ImageUploader from "@/components/ImageUploader"
import Loader from "@/components/Loader"
import { db, findAll, storage } from "@/lib/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useState, useEffect } from 'react'



export default function BackendPage() {
  const auth = useAuth();

   if(auth.currentUser){
            console.log('OK')
          }else{
             console.log('dont login')
            redirect('/login')
          }
    return (
      <>
    <main className="flex flex-col items-center justify-center w-auto">
      
      <ImageUploader />
        
      <BlogList />
    </main>
    
    </>
    )
}


function BlogListItem(props) {

  interface Blog {
    date: string,
    id: string,
    imageUrl: string,
    massage: string,
    name: string,
    uuid: string
  }

  const [isShown, setIsShown] = useState(false);

  const [imgUrl, setImgUrl] = useState();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [progresspercent, setProgresspercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentBlogData, setCurrentBlogData] = useState<Blog>()

  const handleSubmit = (e: any, fileUrl: string) => {
    e.preventDefault()

    const storageRef2 = ref(storage, 'files');
    //console.log('storage:', storageRef2)

    const file = e.target?.files[0]
    //console.log('file:', e.target?.files[0])
    if (!file) return;

    // const photoRef = storage.getInstance().getReferenceFromUrl(contentDTOs[p1].imageUrl.toString())
    // photoRef.delete()

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress)
        setProgresspercent(progress);
        setLoading(true)
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //@ts-ignore 
          setImgUrl(downloadURL)
          setLoading(false)
          // console.log(downloadURL)
        });
      }
    );
  }

  const handleClick = (blog: Blog) => {
    // 👇️ toggle shown state
    setIsShown(current => !current);
    setCurrentBlogData(blog)

    //console.log(blog)
  };

  const onSubmit = async (event: Event | undefined, blog: Blog) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    //console.log('blog:',blog)
    event?.preventDefault();
    await setDoc(doc(db, "blogs", blog.id), {
      uuid: blog.id,
      name: name,
      message: text,
      imageUrl: imgUrl || blog.imageUrl,
      date: currentDate
    });

    // console.log({
    //   id: blog.id,
    //   uuid: blog.uuid,
    //   name: name,
    //   message: text,
    //   imageUrl: imgUrl || blog.imageUrl,
    //   date: currentDate
    // })
    alert('yangi ozgarishlarni korish uchun saxifani yangilang!')
  }

  const { blog } = props
  // console.log(blog)

  const handleDelete = async (id: string) => {
    const taskDocRef = doc(db, 'blogs', id)
    try {
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    } finally {
      alert('yangi ozgarishlarni korish uchun saxifani yangilang!')
    }
  }
  return (
    <li className=" mt-8">
      {blog.imageUrl ?
        <div className="content-center max-w-xl gap-5 m-4">
          <Image className="object-contain sm:ml-24 h-96 w-96" loading="lazy" src={blog.imageUrl} width={300} height={300} alt="img" />
          <div className="font-bold ">sana:<p className=" text-blue-500">{blog.date}</p></div>
          <div><p className=" font-bold">Yangilik mavzusi:</p> {blog.name}</div>

          <p className=" font-bold">Yangilik matni:</p> {blog.message}

          <br />
          <button className="rounded-md border-2 border-gray-700 hover:bg-gray-300 p-2" onClick={() => handleClick(blog)}>O&apos;zgartirish</button>
          {isShown && (
            <div className='flex flex-col justify-center gap-2'>
              <label className="cursor-pointer hover:bg-blue-200 bg-blue-100 p-2 rounded-md mx-auto border-1 text-black m-2" htmlFor="inputField">Rasm yuklash</label>
              {
                !imgUrl &&
                <div className='outerbar py-2'>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 " style={{ width: progresspercent + "%" }}>{progresspercent}%</div>
                  </div>
                </div>

              }

              <input className="hidden" onChange={() => handleSubmit(event, blog.imageUrl)} id="inputField" type='file' aria-label="rasm kiriting" accept=".jpg, .jpeg, .png" />
              <input className=" text-black h-8 " value={name} onChange={e => setName(e.target.value)} type='text' placeholder="yangilik nomi" />

               <textarea  value={text} onChange={e => setText(e.target.value)} placeholder="yangilik matni" />
              <button className="rounded-md border-2 border-gray-700 hover:bg-gray-300 p-2  mx-auto" onClick={() => onSubmit(event, blog)} type='submit'>serverga saqlash</button>
              <button className=' flex rounded-md border-2 border-red-700 hover:bg-red-300  mx-auto p-2' onClick={()=>handleDelete(blog.id)}>Delete</button>

            </div>


          )}
        </div> :
        <Loader />
      }
    </li>
  )
}


function BlogList() {
  const [loading, setLoading] = useState(false)
  const [countries, setCountries] = useState([{}])

  const fetchData = async () => {
    setLoading(true)

    const res = await findAll()

    setCountries([...res])
    setLoading(false)

  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section className="">


      {loading &&
        <p>loading...</p>
      }

      <ul className="flex flex-col justify-center p-8 text-center">
        {countries.length > 0 && countries.map((blog, id) => (

          <BlogListItem key={id} blog={blog} />
        ))}
      </ul>
    </section>
  )
}