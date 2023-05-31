"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Toggle from "./Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  //toggle
  const [toggle, setToggle] = useState(false);
  let deleteToastID: string;
  const queryClient = useQueryClient();
  //Delete post
  const { mutate } = useMutation(
    async (id: string) => {
      // console.log(id);
      await axios.delete("/api/posts/deletePost", {
        data: id,
      });
    },
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting that post", { id: deleteToastID });
      },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["auth-posts"]);
        toast.success("Post has been deleted", { id: deleteToastID });
      },
    }
  );

  const deletePost = () => {
    deleteToastID = toast.loading("Deleting post...", {
      id: deleteToastID,
      duration: 2000,
    });
    mutate(id);
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div>
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex gap-4 cursor-pointer items-center">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-700">
              {comments?.length} Comments
            </p>
          </Link>
          <button
            onClick={() => setToggle(true)}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
