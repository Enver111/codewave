import ReviewsClient from "./ReviewsClient";

export default function Reviews() {
  return <ReviewsClient showAllLink={false} reviews={[]} total={0} page={1} pageSize={6} />;
}
