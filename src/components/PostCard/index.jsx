export const PostCard = ({ cover, title, body, id }) => (
    <div  className="post">
        <img className="photo"
            src={cover}
            alt={title} />
        <div key={id} className="post-content">
            <h2>{title}</h2>
            <p>{body}</p>

        </div>
    </div>
)