import usersData from '../../../seeds.json';
import Avatar from '../ui/Avatar';

function AllPosts() {
    return (
        <>
            {usersData.users.map(user =>
                user.posts.map((post, index) => (
                    <div key={index} className="mt-4 flex flex-col gap-4 rounded-lg border border-neutral-6 bg-gradient-to-tl from-neutral-1 to-neutral-2">
                        <div className="flex gap-4 px-4 pt-4">
                            <Avatar alt="" size="sm" src={user.profilePhoto} />
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-neutral-12">{user.pseudo}</h1>
                                <p className="text-xs text-neutral-11">@{user.bio}</p>
                            </div>
                        </div>
                        <img className="h-auto w-full" src={post.photo} alt={post.title} />
                        <div className="px-4">
                            <h2 className="text-lg font-semibold">{post.title}</h2>
                            <p>{post.content}</p>
                            <div className="flex gap-4 py-4">
                                <button className="text-neutral-12 hover:text-neutral-11">Like</button>
                                <button className="text-neutral-12 hover:text-neutral-11">Comment</button>
                                <button className="text-neutral-12 hover:text-neutral-11">Share</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}

export default AllPosts;
