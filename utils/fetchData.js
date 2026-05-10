import { unstable_cache } from "next/cache";

const { google } = require('googleapis');

const CACHE_REVALIDATE_SECONDS = 2592000;
const NORTH_ISLAND_BOUNDS = {
  minLat: -41.65,
  maxLat: -34.0,
  minLng: 172.0,
  maxLng: 179.5,
};

const isInNorthIsland = (lat, lng) =>
  lat >= NORTH_ISLAND_BOUNDS.minLat &&
  lat <= NORTH_ISLAND_BOUNDS.maxLat &&
  lng >= NORTH_ISLAND_BOUNDS.minLng &&
  lng <= NORTH_ISLAND_BOUNDS.maxLng;

//get single post with slug 
export const getSinglePostData = async (slug, apiRoute) => {
    let response = await fetch(`${process.env.url}/${apiRoute}?slug=${slug}&acf_format=standard`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });
    let data = await response.json();
    return data
}

// get single post data using post id 
export const getSinglePostDataWithID = async (id, apiRoute) => {
    let response = await fetch(`${process.env.url}/${apiRoute}/${id}?acf_format=standard`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });
    let data = await response.json();
    return data
}

//get all posts 
export const getAllPosts = async (apiRoute) => {
    let response = await fetch(`${process.env.url}/${apiRoute}?acf_format=standard&per_page=100`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });
    let data = await response.json();
    return data
}


export const getOptions = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/options/all`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });
    let data = await fetchData.json();
    return data
}





// get reivews 

export const getGoogleReviews = unstable_cache(async () => {
    // Add revalidation logic
    const nextRevalidateOptions = { next: { revalidate: CACHE_REVALIDATE_SECONDS } }; // Revalidate every 30 days 

    // Fetch reviews directly from Google API
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accountId = process.env.GOOGLE_ACCOUNT_ID;
    const locationId = process.env.GOOGLE_LOCATION_ID;

    // Fetch reviews
    const response = await oauth2Client.request({
        url: `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
        method: "GET",
        ...nextRevalidateOptions, // Pass the revalidate option here
    });

    return response.data.reviews || [];
}, ["google-reviews"], { revalidate: CACHE_REVALIDATE_SECONDS });

//get projects 
// export const getProjects = async () => {
//     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work?acf_format=standard&per_page=100`, {
//         next: { revalidate: 2592000 },
//     });
//     let data = await fetchData.json();
//     return data
// }

//fetch work categories 
// export const getProjectCategories = async () => {
//     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work-category`, {
//         next: { revalidate: 2592000 },
//     });
//     let data = await fetchData.json();
//     return data
// }

// fetch single project 
// export const getSingleProject = async (slug) => {
//     let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work?slug=${slug}&acf_format=standard`, {
//         next: { revalidate: 2592000 },
//     });
//     let data = await fetchData.json();
//     return data
// }



//get service packages  
export const getCommercialServices = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/commercial-cleaning?acf_format=standard&per_page=100`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });
    let data = await fetchData.json();
    return data
}

export const getSingleCommercialService = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/commercial-cleaning?slug=${slug}&acf_format=standard`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });
    let data = await fetchData.json();
    return data
}
// get single service package 

// get all blogs  
export const getBlogsData = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/posts?acf_format=standard&per_page=100`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });
    let data = await fetchData.json();
    return data
}
// get single blog data 
export const getSingleBlog = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/posts?slug=${slug}&acf_format=standard`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });
    let data = await fetchData.json();
    return data
}

// fetch jobs from servicem8 

export const getServiceJobs = unstable_cache(async () => {
    const SERVICE_M8_API = 'https://api.servicem8.com/api_1.0/job.json';
  const email = process.env.SERVICEM8_EMAIL;
  const password = process.env.SERVICEM8_PASSWORD;
  try {
    const res = await fetch(SERVICE_M8_API, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${email}:${password}`).toString('base64'),
        'Accept': 'application/json',
      },
      next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const jobs = await res.json();

    // Keep only jobs that can sensibly appear on the Tauranga/North Island map.
    const filteredJobs = jobs
      .map((job) => ({
        ...job,
        lat: Number(job.lat),
        lng: Number(job.lng),
      }))
      .filter(
        (job) =>
          Number.isFinite(job.lat) &&
          Number.isFinite(job.lng) &&
          (job.status === 'Completed' || job.status === 'Accepted') &&
          isInNorthIsland(job.lat, job.lng)
      );

    return filteredJobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}, ["servicem8-jobs-north-island-v1"], { revalidate: CACHE_REVALIDATE_SECONDS });

export const getServiceClients = unstable_cache(async () => {
    const SERVICE_M8_API = 'https://api.servicem8.com/api_1.0/company.json';
  const email = process.env.SERVICEM8_EMAIL;
  const password = process.env.SERVICEM8_PASSWORD;
  try {
    const res = await fetch(SERVICE_M8_API, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${email}:${password}`).toString('base64'),
        'Accept': 'application/json',
      },
      next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const clients = await res.json();

    // Filter jobs with valid latitude and longitude, and completed or accepted status
  
    return clients;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}, ["servicem8-clients"], { revalidate: CACHE_REVALIDATE_SECONDS });

export const getServiceJobsWithClients = async () => {
  const [serviceJobs, serviceClients] = await Promise.all([
    getServiceJobs(),
    getServiceClients(),
  ]);

  return serviceJobs.map((job) => {
    const client = serviceClients.find((c) => c.uuid === job.company_uuid);
    return {
      ...job,
      client_name: client?.name.split(" ")[0] || "Unknown",
    };
  });
};
