const SANITY_PROJECT_ID = 'mvr44wl1';
const SANITY_DATASET = 'production';
const API_VERSION = 'v2022-03-07';

function getSanityUrl(query) {
    return `https://${SANITY_PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
}

// Convert PortableText to basic HTML
function portableTextToHtml(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';
    
    return blocks.map(block => {
        if (block._type !== 'block' || !block.children) return '';
        
        const childrenText = block.children.map(child => {
            let text = child.text;
            if (child.marks && child.marks.includes('strong')) text = `<strong>${text}</strong>`;
            if (child.marks && child.marks.includes('em')) text = `<em>${text}</em>`;
            return text;
        }).join('');

        if (block.style === 'h1') return `<h1>${childrenText}</h1>`;
        if (block.style === 'h2') return `<h2>${childrenText}</h2>`;
        if (block.style === 'h3') return `<h3>${childrenText}</h3>`;
        if (block.style === 'h4') return `<h4>${childrenText}</h4>`;
        if (block.style === 'blockquote') return `<blockquote>${childrenText}</blockquote>`;
        
        // Default to paragraph
        return `<p>${childrenText}</p><br>`;
    }).join('');
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Fetch all posts for blog.html
async function fetchAndRenderBlogList() {
    const container = document.getElementById('sanity-blog-list');
    if (!container) return;

    try {
        const query = `*[_type == "post"] | order(publishedAt desc) { title, slug, publishedAt, excerpt, mainImage{asset->{url}}, author->{name} }`;
        const response = await fetch(getSanityUrl(query));
        const { result } = await response.json();

        if (result.length === 0) {
            container.innerHTML = `<div class="col-12"><p>No posts found. Go to your Sanity Studio to create some!</p></div>`;
            return;
        }

        let html = '';
        result.forEach(post => {
            const imageUrl = post.mainImage?.asset?.url || 'assets/images/blog/b-1.png'; // Fallback image
            const slug = post.slug?.current || '#';
            const date = formatDate(post.publishedAt);
            const title = post.title || 'Untitled Post';
            const authorName = post.author?.name || 'Succeedum Team';

            html += `
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="ed-blog__card ed-blog__card--style2 wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                        <div class="ed-blog__img">
                            <a href="blog-details.html?slug=${slug}">
                                <img src="${imageUrl}" alt="blog-img" style="height: 250px; object-fit: cover; width: 100%;">
                            </a>
                        </div>
                        <div class="ed-blog__content">
                            <ul class="ed-blog__meta">
                                <li><i class="fi fi-rr-calendar"></i>${date}</li>
                                <li><i class="fi fi-rr-user"></i>${authorName}</li>
                            </ul>
                            <h4 class="ed-blog__title">
                                <a href="blog-details.html?slug=${slug}">${title}</a>
                            </h4>
                            <a href="blog-details.html?slug=${slug}" class="ed-blog__btn">Read More <i class="fi fi-rr-arrow-small-right"></i></a>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    } catch (error) {
        console.error('Error fetching Sanity posts:', error);
        container.innerHTML = `<div class="col-12"><p>Error loading posts. Please try again later.</p></div>`;
    }
}

// Fetch single post for blog-details.html
async function fetchAndRenderSinglePost() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    if (!slug) return;

    const container = document.getElementById('sanity-blog-details');
    if (!container) return;

    try {
        const query = `*[_type == "post" && slug.current == "${slug}"][0] { title, publishedAt, body, mainImage{asset->{url}}, author->{name} }`;
        const response = await fetch(getSanityUrl(query));
        const { result: post } = await response.json();

        if (!post) {
            container.innerHTML = `<h2 class="ed-blog__details-title">Post not found.</h2>`;
            return;
        }

        const imageUrl = post.mainImage?.asset?.url || 'assets/images/blog/blog-details/b-details-img-1.png';
        const date = formatDate(post.publishedAt);
        const title = post.title || 'Untitled Post';
        const bodyHtml = portableTextToHtml(post.body);
        const authorName = post.author?.name || 'Succeedum Team';

        const html = `
            <div class="ed-blog__details-top">
                <div class="ed-blog__details-cover">
                    <div class="ed-blog__details-cover-img">
                        <img src="${imageUrl}" alt="b-details-img-1" style="width: 100%; border-radius: 12px; margin-bottom: 30px;">
                    </div>
                    <ul class="ed-blog__details-meta">
                        <li><i class="fi fi-rr-calendar"></i>${date}</li>
                        <li><i class="fi fi-rr-user"></i>${authorName}</li>
                        <li><a href="blog.html">Article</a></li>
                    </ul>
                </div>
                <h2 class="ed-blog__details-title">${title}</h2>
                <div class="ed-blog__details-text">
                    ${bodyHtml}
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.title = `${title} - Succeedum`;
    } catch (error) {
        console.error('Error fetching post:', error);
        container.innerHTML = `<h2 class="ed-blog__details-title">Error loading post.</h2>`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderBlogList();
    fetchAndRenderSinglePost();
});
