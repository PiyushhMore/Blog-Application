import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseconfig from "../appwrite/databaseconfig";
import { Container, PostForm } from "../components";


function EditPosts(){
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            databaseconfig.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }

    },[slug, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post = {post} />
            </Container>

        </div>
    ) : null
}


export default EditPosts;