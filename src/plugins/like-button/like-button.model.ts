export interface LikeButtonModel{
    // count of likes
    likes: number;
    // was it liked, default false;
    liked: boolean;
    // takes hook when smth was liked
    onLike: (fn: (likes: number) => void) => void;
    // takes hook when smth was canceled like
    onCancelLike: (fn: (likes: number) => void) => void;
}