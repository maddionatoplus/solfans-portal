import { MyUtil } from "../utils/my_util"

export default function Content(post){
    if(post.link === "")
        return <div></div>

    return (    
            MyUtil.isImage(post.link) ?
                (
                <img width="100%" src={post.link} alt={post.userAddress}  title={post.link} />
                )
                : MyUtil.isVideo(post.link) ?
                (
                    <video width="100%" controls>
                    <source src={post.link} type="video/mp4"></source>
                    </video>
                )
                :
                (
                    <iframe width="400" height="400" src={post.link} alt={post.userAddress}   title={post.link} />
                )
                
)
}