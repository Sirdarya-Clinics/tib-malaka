"use client";
import { findAll } from "@/lib/firebase";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import Image from "next/image";
import Link from "next/link";

export interface Blog {
  date: string;
  id: string;
  imageUrl: string;
  message: string;
  name: string;
  uuid: string;
}

export function BlogListItem(props: { blog: Blog }) {
  const { blog } = props;
  //    console.log(blog)
  return (
    <div className="max-w-xl hover:bg-gray-100">
      {blog.imageUrl ? (
        <Link href={`blog/${blog.id}`} className="">
          <Image
            className="object-contain mx-auto h-48 w-96 p-2"
            loading="lazy"
            src={blog.imageUrl}
            width={300}
            height={300}
            alt="img"
          />
          <div className="font-semibold text-blue-500">{blog.date}</div>
          <p className="font-bold object-contain h-auto">{blog.name}</p>
          <p className="object-contain h-28">
            {blog.message.substring(0, 90)}...
          </p>

          {/* 👇️ show component on click */}
          {/* {isShown && <>texrt</>} */}
        </Link>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export function GetNews() {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([{}]);

  const fetchData = async () => {
    setLoading(true);

    const res = await findAll();

    setCountries([...res]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="">
      {loading && <p>loading...</p>}

      <ul className="grid grid-cols-1 gap-4 p-4 text-center sm:grid-cols-2 lg:grid-cols-2">
        {countries.length > 0 &&
          countries.map((blog, id) => (
            //@ts-ignore
            <BlogListItem key={id} blog={blog} />
          ))}
      </ul>
    </section>
  );
}