const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      // next: { tags: ["posts"] },
    },
  ).then((response) => response.json());
}

// function extractPost(fetchResponse: any): any {
//   return fetchResponse?.data?.projectCollection?.items?.[0];
// }

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.projectCollection?.items?.[0];
}

function extractHeroPostEntries(fetchResponse: any): any {
  return fetchResponse?.data?.heroCollection?.items;
}


function extractAboutPostEntries(fetchResponse: any): any {
  return fetchResponse?.data?.aboutCollection?.items;
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.projectCollection?.items;
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractPost(entry);
}

export async function getHeroSection(isDraftMode: boolean): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      heroCollection(preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          title,
          subtitle
        }
      }
    }`,
    true,
  );
  return extractHeroPostEntries(entry);
}

export async function getAboutSection(isDraftMode: boolean): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      aboutCollection(preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          title,
          aboutDescription
        }
      }
    }`,
    true,
  );
  return extractAboutPostEntries(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      projectCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          title
      slug
      websiteLink
      gitHubLink
      image {
        url
      }
      shortDescription
      longDescription {
        json
      }
        }
      }
    }`,
    isDraftMode,
  );
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      projectCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          title
          slug
          websiteLink
          gitHubLink
          shortDescription
          longDescription {
            json
          }
          image {
            url
          }
        }
      }
    }`,
    preview,
  );
  return {
    post: extractPost(entry),
  };
}