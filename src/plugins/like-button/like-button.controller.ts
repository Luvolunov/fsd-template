import "./like-button.scss";
import { LikeButtonModel } from "./like-button.model";
import { LikeButtonOptionsModel } from "./like-button-options.model";
import { createElement } from "../../shared/libs/createElement.function";
import { LIKE_BUTTON_STYLE_CLASSES } from "./like-button.style-classes";

export class LikeButtonController implements LikeButtonModel{
    private _likes: number;
    private _liked: boolean;

    private likeBtn: HTMLDivElement;

    private like: (likes: number) => void;
    private cancel: (likes: number) => void;
    private countController: HTMLDivElement;

    get liked(){
        return this._liked;
    }

    set liked(value: boolean){
        if (value){
            this._liked = true;
            this.likes++;
            this.likeBtn.classList.add("liked");
            return;
        }
        this._liked = false;
        this.likes--;
        this.likeBtn.classList.remove("liked")
    }

    get likes(){
        return this._likes;
    }

    set likes(value: number){
        this._likes = value;
        this.countController.textContent = String(value);
    }

    constructor(root: HTMLDivElement, options?: LikeButtonOptionsModel){
        const likeBtn = createElement<HTMLDivElement>("div", LIKE_BUTTON_STYLE_CLASSES.likeBtn);
        const count = createElement<HTMLDivElement>("div", LIKE_BUTTON_STYLE_CLASSES.count);

        this.likeBtn = likeBtn;

        this.countController = count;
        this.liked = options?.isLiked ?? false;
        this.likes = options?.likes ?? 0;
        count.textContent = String(this.likes);

        likeBtn.addEventListener("click", () => this.clickHandler());
        likeBtn.appendChild(count);

        

        root.appendChild(likeBtn);
    }

    clickHandler(){
        if (this.liked){
            this.liked = false;
            this.cancel && this.cancel(this.likes);
            return;
        }

        this.liked = true;
        this.like && this.like(this.likes);
    }

    onLike(cb){
        this.like = cb;
    }

    onCancelLike(cb){
        this.cancel = cb;
    }
}