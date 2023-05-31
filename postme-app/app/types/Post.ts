export type PostType={
  title: string
  id: string
  createdAt: string
  user: {
    id: string
    email: string
    name: string
    image: string
  }
  Comment?:{
    createdAt: string
    id : string
    postId: string
    userId : string
    title: string
    user:{
      id: string
    email: string
    name: string
    image: string
    }
  }[]
}