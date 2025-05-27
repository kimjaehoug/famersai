import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { customAxios } from "../customAxios";
import { useAuth } from "../AuthContext";

const StyledPost = styled.div`
  .boardContainer {
    border: 1px solid #e0e0e0;
    margin: 20px auto;
    padding: 25px;
    max-width: 900px;
    background: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    color: #2c2c2c;
    font-size: 16px;
    line-height: 1.6;

    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .meta {
      color: #6e6e6e;
      margin-bottom: 20px;
    }

    .content {
  white-space: pre-wrap;
  margin-bottom: 30px;
  min-height: 100px; /* 원하는 최소 높이 지정 (예: 200px) */
}

    .like-section {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #6e6e6e;

      button {
        background-color: transparent;
        border: 1px solid #4CAF50;
        color: #4CAF50;
        padding: 5px 10px;
        font-size: 13px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      button.liked {
        background-color: #4CAF50;
        color: white;
      }

      button:hover {
        background-color: #388E3C;
        color: white;
        border-color: #388E3C;
      }
    }

    .buttonContainer {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-bottom: 20px;
    }

    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 12px;
      padding: 8px 15px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    button:hover {
      background-color: #388E3C;
    }

    .listButton {
      background-color: white;
      color: #4CAF50;
      border: 2px solid #4CAF50;
    }

    .commentSection {
      margin-top: 30px;
      border-top: 1px solid #ddd;
      padding-top: 20px;

      h3 {
        font-size: 18px;
        margin-bottom: 15px;
      }

      .comment {
        margin-bottom: 15px;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 10px;

        .comment-meta {
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
        }

        .comment-content {
          font-size: 15px;
          margin-bottom: 8px;
        }

        .comment-like {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6e6e6e;
          margin-top: 5px;

          button {
            background-color: transparent;
            border: 1px solid #4CAF50;
            color: #4CAF50;
            padding: 3px 8px;
            font-size: 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          button.liked {
            background-color: #4CAF50;
            color: white;
          }

          button:hover {
            background-color: #388E3C;
            color: white;
            border-color: #388E3C;
          }
        }

        .comment-actions {
          display: flex;
          gap: 6px;

          button {
            font-size: 12px;
            padding: 4px 8px;
            background-color: #ddd;
            color: #333;
            border-radius: 4px;
            border: none;
            cursor: pointer;
          }

          button:hover {
            background-color: #bbb;
          }
        }
      }

      textarea {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        resize: vertical;
      }

      .comment-submit {
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        font-weight: bold;
        cursor: pointer;
      }

      .comment-submit:hover {
        background-color: #388E3C;
      }
    }
  }
`;

const Post = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [postLikes, setPostLikes] = useState(0);
  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const [postRes, likeRes] = await Promise.all([
          customAxios.get(`posts/get/${postId}`),
          customAxios.get(`/likes/post/${postId}`)
        ]);
        setPost(postRes.data);
        setPostLikes(likeRes.data.count);
        setHasLikedPost(likeRes.data.hasLiked);
        setIsLoading(false);
      } catch (err) {
        console.error("❌ 게시글 조회 실패:", err);
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const [commentsRes, commentLikesRes] = await Promise.all([
        customAxios.get(`comments/${postId}`),
        customAxios.get(`/likes/comments/${postId}`)
      ]);
      setCommentList(commentsRes.data);
      setCommentLikes(commentLikesRes.data);
    } catch (err) {
      console.error("❌ 댓글 조회 실패:", err);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  const handlePostLike = async () => {
  if (!user()) return;
  try {
    const res = await customAxios.post(`/likes/post/${postId}`, {
      userId: user().id, // ✅ user id를 body에 포함
    });
    setPostLikes(res.data.count);
    setHasLikedPost(res.data.hasLiked);
  } catch (err) {
    console.error("❌ 게시글 좋아요 실패:", err);
  }
};

  const handleCommentLike = async (commentId) => {
  if (!user()) return;
  try {
    const res = await customAxios.post(`/likes/comment/${commentId}`, {
      userId: user().id, // ✅ user id 포함
    });
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: {
        count: res.data.count,
        hasLiked: res.data.hasLiked,
      },
    }));
  } catch (err) {
    console.error("❌ 댓글 좋아요 실패:", err);
  }
};

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await customAxios.post("/comments", {
        postId,
        author_id: user().id,
        author_name: user().name,
        content: newComment,
      });
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("❌ 댓글 작성 실패:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await customAxios.delete(`/comments/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error("❌ 댓글 삭제 실패:", err);
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleUpdateComment = async () => {
    try {
      await customAxios.put(`/comments/${editingCommentId}`, {
        content: editingContent,
      });
      setEditingCommentId(null);
      setEditingContent("");
      fetchComments();
    } catch (err) {
      console.error("❌ 댓글 수정 실패:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await customAxios.delete(`posts/${postId}`);
      alert("삭제 완료");
      navigate("/board");
    } catch (err) {
      alert("삭제 실패");
    }
  };

  return (
    <StyledPost>
      <div className="boardContainer">
        {isLoading ? (
          <h2>불러오는 중...</h2>
        ) : !post ? (
          <h2>게시글을 찾을 수 없습니다.</h2>
        ) : (
          <>
            <h1>{post.title}</h1>
            <div className="meta">
              작성자: {post.author_name} | 작성일:{" "}
              {post.created_at?.split("T")[0]}
            </div>
            <div className="content">{post.content}</div>
            {user() && (
              <div className="like-section">
                <button
                  className={hasLikedPost ? "liked" : ""}
                  onClick={handlePostLike}
                >
                  좋아요
                </button>
                <span>{postLikes}명이 좋아합니다</span>
              </div>
            )}
            {user() && user().id === post.author_id && (
              <div className="buttonContainer">
                <button onClick={() => navigate(`/editPost?id=${postId}`)}>
                  수정
                </button>
                <button onClick={handleDelete}>삭제</button>
              </div>
            )}
            <div className="buttonContainer">
              <button className="listButton" onClick={() => navigate("/board")}>
                뒤로가기
              </button>
            </div>

            <div className="commentSection">
              <h3>댓글</h3>
              {commentList.map((c) => (
                <div key={c.id} className="comment">
                  <div className="comment-meta">
                    <span>
                      {c.author_name} | {c.created_at?.split("T")[0]}
                    </span>
                    {user() && user().id === c.author_id && (
                      <div className="comment-actions">
                        <button onClick={() => handleEditComment(c.id, c.content)}>
                          수정
                        </button>
                        <button onClick={() => handleDeleteComment(c.id)}>삭제</button>
                      </div>
                    )}
                  </div>
                  <div className="comment-content">{c.content}</div>
                  {user() && (
                    <div className="comment-like">
                      <button
                        className={commentLikes[c.id]?.hasLiked ? "liked" : ""}
                        onClick={() => handleCommentLike(c.id)}
                      >
                        좋아요
                      </button>
                      <span>{commentLikes[c.id]?.count || 0}명이 좋아합니다</span>
                    </div>
                  )}
                </div>
              ))}

              {editingCommentId && (
                <div style={{ marginTop: "15px" }}>
                  <textarea
                    rows="3"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <button onClick={handleUpdateComment}>수정 완료</button>
                  <button onClick={() => setEditingCommentId(null)}>취소</button>
                </div>
              )}

              {user() && (
                <>
                  <textarea
                    rows="3"
                    placeholder="댓글을 입력하세요"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button className="comment-submit" onClick={handleCommentSubmit}>
                    댓글 작성
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </StyledPost>
  );
};

export default Post;