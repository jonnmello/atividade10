import "./styles.css";
import { ReactComponent as StarImage } from "assets/images/star.svg";
import { Review } from "types/review";

type ListingReviews = {
    reviews: Review[];
  };
  
  const ReviewListing = ({ reviews }: ListingReviews) => {
    
    return (
      <div className="reviews-container base-card">
        {reviews?.map(review =>(
          <div className="content-reviews" key={review.id}>
            <div className="cima">
            <StarImage />
            <h3>{review.user.name}</h3>
            </div>
            <div className="review">
            
              <p>{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
export default ReviewListing;
