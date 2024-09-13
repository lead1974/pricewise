"use server"

import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from '../utils/global';
import { readFromFile, simulateAxiosResponseForCheerio, writeToFile } from '../utils/fileWriter';

export async function scrapeAmazonProduct(url: string) {
  if(!url) return;

  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }

  try {
    // Fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    // console.log(response.data);

    //simulating bright data response via axios
    //writeToFile(response.data);
    // const simulatedResponse = await simulateAxiosResponseForCheerio(); 
    // const $ = cheerio.load(simulatedResponse.data); 
 
    // Extract the product title
    const title = $('#productTitle').text().trim();
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );

    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    const images = 
      $('#imgBlkFront').attr('data-a-dynamic-image') || 
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}'

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol'))
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

    const description = extractDescription($)

     // Use Cheerio to find the span element containing the rating
    const rating = $('#acrPopover .a-size-base.a-color-base').text().trim();
    // Use Cheerio to find the span element containing the review count
    const reviewCountText = $('#acrCustomerReviewText').text().trim();
    
    // Extract just the number part (e.g., "98" from "98 ratings")
    const match = reviewCountText.match(/\d+/);
    const reviewCount = match ? match[0] : '';

      // Use Cheerio to find the first category link (Home & Kitchen)
    const category = $('ul.a-unordered-list.a-horizontal li:first-child .a-link-normal').text().trim();
  

    // Construct data object with scraped information
    const data = {
      url,
      description,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: category,
      reviewsCount: Number(reviewCount) || 0,
      rating: Number(rating) || 0,
      isOutOfStock: outOfStock,      
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    }
    
    console.log(data);

    return data;
  } catch (error: any) {
    console.log(error);
  }
}