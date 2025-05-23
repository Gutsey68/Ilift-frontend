import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Earth, Ellipsis, Heart, LoaderCircle, MessageCircle, Repeat,} from "lucide-react";
import {useContext, useState} from "react";
import toast from "react-hot-toast";
import {useParams} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import {formatRelativeTime} from "../../lib/formatRelativeTime";
import {like, unLike} from "../../services/likesService";
import {sharePost, unsharePost} from "../../services/sharesService";
import {CommonPost, PostType} from "../../types/postsType";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import ConfirmShareModal from "../modals/ConfirmShareModal";
import CommentsModal from "../thread/CommentsModal";
import EditPostModal from "../thread/EditPostModal";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import ResultsSection from "./ResultsSection";

/**
 * Props du composant AllPosts
 * @typedef {object} AllPostsProps
 * @property {(PostType | CommonPost)[]} posts - Liste des publications à afficher
 * @property {() => void} fetchNextPage - Fonction pour charger la page suivante
 * @property {boolean | undefined} hasNextPage - Indique s'il y a une page suivante
 * @property {boolean} isFetchingNextPage - Indique si le chargement de la page suivante est en cours
 */
type AllPostsProps = {
  posts: (PostType | CommonPost)[];
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
};

/**
 * Composant d'affichage des publications d'un profil sur la page profil
 * Gère l'affichage, les likes, les partages et les commentaires des publications
 * @component
 * @param {AllPostsProps} props - Les propriétés du composant
 * @returns {JSX.Element} Section des publications avec gestion des interactions
 */
function AllPosts({
  posts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: AllPostsProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [postToShare, setPostToShare] = useState<CommonPost | null>(null);
  const [postToUnshare, setPostToUnshare] = useState<CommonPost | null>(null);
  const [postToEdit, setPostToEdit] = useState<CommonPost | null>(null);
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useInfiniteScroll(fetchNextPage, hasNextPage || false, isFetchingNextPage);

  const likeMutation = useMutation({
    mutationFn: (id: string) => like(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPosts", id] });
      queryClient.invalidateQueries({ queryKey: ["likedPosts", id] });
      queryClient.invalidateQueries({ queryKey: ["sharedPosts", id] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (id: string) => unLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPosts", id] });
      queryClient.invalidateQueries({ queryKey: ["likedPosts", id] });
      queryClient.invalidateQueries({ queryKey: ["sharedPosts", id] });
    },
  });

  const shareMutation = useMutation({
    mutationFn: (id: string) => sharePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPosts", id] });
      queryClient.invalidateQueries({ queryKey: ["sharedPosts", id] });
    },
  });

  const unshareMutation = useMutation({
    mutationFn: (id: string) => unsharePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPosts", id] });
      queryClient.invalidateQueries({ queryKey: ["sharedPosts", id] });
    },
  });

  /**
   * Gère le like/unlike d'une publication
   * @param {CommonPost} post - Publication à liker/unliker
   */
  const handleLike = (post: CommonPost) => {
    if (post.doILike) {
      unlikeMutation.mutate(post.id);
    } else {
      likeMutation.mutate(post.id);
    }
  };

  /**
   * Gère le clic sur le bouton de partage
   * @param {CommonPost} post - Publication à partager/départager
   */
  const handleShareClick = (post: CommonPost) => {
    if (post.isShared && post.sharedBy === id) {
      setPostToUnshare(post);
    } else {
      setPostToShare(post);
    }
  };

  /**
   * Gère la confirmation du partage d'une publication
   */
  const handleConfirmShare = () => {
    if (postToShare) {
      try {
        shareMutation.mutate(postToShare.id);
        setPostToShare(null);
        toast.success("La publication a bien été republiée");
      } catch {
        toast.error("Une erreur est survenue lors de la republication");
      }
    }
  };

  /**
   * Gère la confirmation de la suppression d'un partage
   */
  const handleConfirmUnshare = () => {
    if (postToUnshare) {
      try {
        unshareMutation.mutate(postToUnshare.id);
        setPostToUnshare(null);
        toast.success("La republication a bien été supprimée");
      } catch {
        toast.error(
          "Une erreur est survenue lors de la suppression de la republication",
        );
      }
    }
  };

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="p-4 text-center text-neutral-11">
        Aucune publication à afficher
      </div>
    );
  }

  return (
    <>
      {posts?.map((post) => {
        const commonPost = post as CommonPost;
        const author = commonPost.author;

        if (!author) return null;

        return (
          <div key={commonPost.id} className="border-t border-neutral-6 p-4">
            <div className="flex flex-col gap-4 sm:w-4/5">
              {commonPost.isShared && (
                <>
                  <div className="flex flex-col gap-1 px-4 pt-4 text-neutral-11">
                    <div className="flex items-center gap-2 text-sm ">
                      <Repeat size={16} />
                      <span>
                        {`${commonPost.sharedByUser?.pseudo} a`} republié
                      </span>
                    </div>
                    <div className="ml-7 flex items-center gap-1 text-xs text-neutral-10">
                      <p>
                        {commonPost.sharedAt
                          ? formatRelativeTime(commonPost.sharedAt)
                          : ""}{" "}
                        •{" "}
                      </p>
                      <Earth size={14} />
                    </div>
                  </div>
                  <hr className="border-neutral-6" />
                </>
              )}
              <div className="relative flex gap-4 px-4 pt-4">
                <div className="flex gap-4">
                  <Avatar
                    src={author.profilePhoto || "/uploads/profil.png"}
                    alt={`Photo de ${author.pseudo}`}
                    size="sm"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-neutral-12">
                      {author?.pseudo}
                    </h1>
                    <div className="flex items-center gap-1 text-xs text-neutral-11">
                      <p>{formatRelativeTime(post.createdAt)} • </p>
                      <Earth size={14} />
                    </div>
                  </div>
                </div>
                {post.authorId === user?.id && (
                  <button
                    onClick={() => setPostToEdit(commonPost)}
                    className="absolute right-4 top-4 text-neutral-11 hover:text-green-9 sm:right-20 sm:top-6"
                  >
                    <Ellipsis size={16} />
                  </button>
                )}
              </div>
              <div className="mx-auto flex w-11/12 flex-col sm:w-3/4">
                <p className="text-neutral-11 max-sm:text-sm">{post.content}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag.tag.id}>{tag.tag.name}</Badge>
                    ))}
                  </div>
                )}
                {post.exercicesResultsPosts && (
                  <ResultsSection
                    exercicesResultsPosts={post.exercicesResultsPosts}
                  />
                )}
              </div>
              {post.photo && (
                <img
                  className="mx-auto w-11/12 rounded-lg sm:w-3/4"
                  src={post.photo}
                  alt={`Photo de ${post.author.pseudo}`}
                />
              )}
              <div>
                <div className="mx-auto flex w-11/12 items-center gap-4 border-b border-neutral-6 pb-2 text-xs text-neutral-11 sm:w-3/4">
                  <div className="flex items-center gap-1">
                    <Heart size={14} />
                    <p>{post._count?.likes}</p>
                  </div>
                  <div
                    onClick={() => setSelectedPostId(post.id)}
                    className="flex cursor-pointer items-center gap-1 hover:text-green-11"
                  >
                    <MessageCircle size={14} />
                    <p>{post._count?.comments} commentaires</p>
                  </div>
                </div>
                <div className="mx-auto flex w-11/12 justify-between pb-4 pt-2 sm:w-3/4">
                  <button
                    onClick={() => handleLike(commonPost)}
                    className="xs:gap-2 flex items-center gap-1 hover:text-green-9"
                  >
                    <Heart size={16} />
                    {commonPost.doILike ? (
                      <span className="max-sm:text-xs">Je n'aime plus</span>
                    ) : (
                      <span className="max-sm:text-xs">J'aime</span>
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedPostId(post.id)}
                    className="xs:gap-2 flex items-center gap-1 hover:text-green-9"
                  >
                    <MessageCircle size={16} />
                    <span className="max-sm:text-xs">Commenter</span>
                  </button>
                  <button
                    onClick={() => handleShareClick(commonPost)}
                    className="xs:gap-2 flex items-center gap-1 hover:text-green-9"
                  >
                    <Repeat size={16} />
                    <span className="max-sm:text-xs">
                      {commonPost.isShared && commonPost.sharedBy === id
                        ? "Ne plus republier"
                        : "Republier"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {isFetchingNextPage && (
        <LoaderCircle
          className="m-auto mt-4 w-fit animate-spin text-neutral-11"
          size={30}
        />
      )}
      {selectedPostId && (
        <CommentsModal
          postId={selectedPostId}
          closeModal={() => setSelectedPostId(null)}
        />
      )}
      {postToShare && (
        <ConfirmShareModal
          onClose={() => setPostToShare(null)}
          onConfirm={handleConfirmShare}
          isLoading={shareMutation.isPending}
        />
      )}
      {postToUnshare && (
        <ConfirmDeleteModal
          onClose={() => setPostToUnshare(null)}
          onConfirm={handleConfirmUnshare}
          isLoading={unshareMutation.isPending}
          title="Supprimer la republication"
          message="Voulez-vous vraiment supprimer cette republication ?"
        />
      )}
      {postToEdit && (
        <EditPostModal
          post={postToEdit}
          closeModal={() => setPostToEdit(null)}
        />
      )}
    </>
  );
}

export default AllPosts;
