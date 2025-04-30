
import { Link } from "react-router-dom";

interface Banner {
  id: string;
  imageUrl: string;
  linkUrl: string;
  altText?: string;
}

interface PromoBannerProps {
  banner: Banner;
}

export default function PromoBanner({ banner }: PromoBannerProps) {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <Link to={banner.linkUrl}>
          <img 
            src={banner.imageUrl} 
            alt={banner.altText || "Promotional Banner"}
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow"
          />
        </Link>
      </div>
    </section>
  );
}
