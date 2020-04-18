import "./index.scss"
import { LikeButtonController } from "../../../plugins/like-button/like-button.controller"

const likebuttons = Array
                    .from(document.getElementsByClassName("js-like-button"))
                    .map(
                        (btn) => new LikeButtonController(btn as HTMLDivElement, {
                            isLiked: Boolean(btn.hasAttribute("data-liked")),
                            likes: Number(btn.getAttribute("data-likes") || 0)
                        })
                        );